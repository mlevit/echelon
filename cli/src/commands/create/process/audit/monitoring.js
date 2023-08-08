const { Command, Flags } = require("@oclif/core");
const knex = require("../../../../knex.js");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const processAuditId = flags.id;
    const threshold = flags.threshold;
    const sample = flags.sample;
    const api = flags.api;

    try {
      var processAuditResult = await knex
        .select("*")
        .from("process_audit")
        .where("process_audit_id", processAuditId);
    } catch (error) {
      this.error(error);
    }

    if (processAuditResult.length > 0) {
      try {
        var artefactResult;
        var processResult;

        switch (processAuditResult[0]["status"]) {
          case "running":
            processResult = await this.p05(processAuditResult, threshold);
            break;
          case "completed":
            processResult =
              (await this.p02(processAuditResult, threshold, sample)) ||
              (await this.p03(processAuditResult, threshold, sample)) ||
              (await this.p04(processAuditResult, threshold, sample)) ||
              (await this.p05(processAuditResult, threshold, sample));

            artefactResult =
              (await this.a01(processAuditResult)) ||
              (await this.a02(processAuditResult)) ||
              (await this.a03(processAuditResult)) ||
              (await this.a04(processAuditResult, threshold, sample)) ||
              (await this.a05(processAuditResult, threshold, sample));
            break;
          case "failed":
            processResult = {
              code: "P01",
              subject: "Process has failed.",
              message: `Process Audit ID '${processAuditId}' has failed.`,
            };
            break;
          default:
            this.error(
              `Process Audit ID '${processAuditId}' has an unknown status of '${processAuditResult[0]["status"]}'.`
            );
        }

        var returnDict = {};
        if (processResult) {
          try {
            returnDict["process"] = await this.insertAlert(
              processAuditId,
              processResult["code"],
              processResult["subject"],
              processResult["message"]
            );
          } catch (error) {
            this.error(error);
          }
        }

        if (artefactResult) {
          try {
            returnDict["artefact"] = await this.insertAlert(
              processAuditId,
              artefactResult["code"],
              artefactResult["subject"],
              artefactResult["message"]
            );
          } catch (error) {
            this.error(error);
          }
        }

        if (api) {
          return returnDict;
        } else {
          this.debug(JSON.stringify(returnDict, null, 2));
        }
      } catch (error) {
        this.error(error);
      }
    } else {
      this.error(`process audit ID '${processAuditId}' does not exist.`);
    }
  }

  async p02(processAuditResult, threshold, sample) {
    // Process has taken less time than usual to run.
    var processAuditId = processAuditResult[0]["process_audit_id"];
    var processId = processAuditResult[0]["process_id"];

    var currentRuntime = this.getCurrentRuntime(processAuditResult);
    var averageRuntime = await this.getAverageRuntime(
      processAuditId,
      processId,
      sample
    );

    if (averageRuntime) {
      if (currentRuntime < averageRuntime - averageRuntime * threshold) {
        return {
          code: "P02",
          subject: "Process has taken less time than usual to run.",
          message: `Process Audit ID '${processAuditId}' has taken ${currentRuntime} seconds to run; less time than the usual ${averageRuntime} seconds.`,
        };
      } else {
        return null;
      }
    } else {
      this.debug("Not enough data to calculate average.");
      return null;
    }
  }

  async p03(processAuditResult, threshold, sample) {
    // Process has taken more time than usual to run.
    var processAuditId = processAuditResult[0]["process_audit_id"];
    var processId = processAuditResult[0]["process_id"];

    var currentRuntime = this.getCurrentRuntime(processAuditResult);
    var averageRuntime = await this.getAverageRuntime(
      processAuditId,
      processId,
      sample
    );

    if (averageRuntime) {
      if (currentRuntime > averageRuntime + averageRuntime * threshold) {
        return {
          code: "P03",
          subject: "Process has taken more time than usual to run.",
          message: `Process Audit ID '${processAuditId}' has taken ${currentRuntime} seconds to run; more time than the usual ${averageRuntime} seconds.`,
        };
      } else {
        return null;
      }
    } else {
      this.debug("Not enough data to calculate average.");
      return null;
    }
  }

  // async p04(processAuditResult, threshold) {
  //   return null;
  // }

  async p05(processAuditResult, threshold, sample) {
    // Process is currently running longer than expected.
    var processAuditId = processAuditResult[0]["process_audit_id"];
    var processId = processAuditResult[0]["process_id"];

    var currentRuntime = this.getCurrentRuntime(processAuditResult);
    var averageRuntime = await this.getAverageRuntime(
      processAuditId,
      processId,
      sample
    );

    if (averageRuntime) {
      if (currentRuntime > averageRuntime + averageRuntime * threshold) {
        return {
          code: "P05",
          subject: "Process is currently running longer than expected.",
          message: `Process Audit ID '${processAuditId}' has been running for ${currentRuntime} seconds; more time than the usual ${averageRuntime} seconds.`,
        };
      } else {
        return null;
      }
    } else {
      this.debug("Not enough data to calculate average.");
      return null;
    }
  }

  async a01(processAuditResult) {
    // Source artefact has zero rows.
    var processAuditId = processAuditResult[0]["process_audit_id"];

    var artefactFlow = await knex
      .select("count")
      .from("flow")
      .where("process_audit_id", processAuditId)
      .where("label", "source_count");

    if (artefactFlow.length > 0) {
      if (artefactFlow[0]["count"] === 0) {
        return {
          code: "A01",
          subject: "Source artefact has zero rows.",
          message: `Process Audit ID '${processAuditId}' has zero rows in the source artefact.`,
        };
      } else {
        return null;
      }
    }
  }

  async a02(processAuditResult) {
    // Target artefact loaded zero rows.
    var processAuditId = processAuditResult[0]["process_audit_id"];

    var artefactFlow = await knex
      .select("count")
      .from("flow")
      .where("process_audit_id", processAuditId)
      .where("label", "insert_count");

    if (artefactFlow.length > 0) {
      if (artefactFlow[0]["count"] === 0) {
        return {
          code: "A02",
          subject: "Target artefact loaded zero rows.",
          message: `Process Audit ID '${processAuditId}' has loaded zero rows into the target artefact.`,
        };
      } else {
        return null;
      }
    }
  }

  async a03(processAuditResult) {
    // 	Target artefact has rejected rows.
    var processAuditId = processAuditResult[0]["process_audit_id"];

    var artefactFlow = await knex
      .select("count")
      .from("flow")
      .where("process_audit_id", processAuditId)
      .where("label", "reject_count");

    if (artefactFlow.length > 0) {
      if (artefactFlow[0]["count"] > 0) {
        return {
          code: "A03",
          subject: "Target artefact has rejected rows.",
          message: `Process Audit ID '${processAuditId}' has rejected ${artefactFlow[0]["count"]} rows.`,
        };
      } else {
        return null;
      }
    }
  }

  async a04(processAuditResult, threshold, sample) {
    // Artefact loaded fewer rows than the recent average.
    var processAuditId = processAuditResult[0]["process_audit_id"];
    var processId = processAuditResult[0]["process_id"];

    var currentCount = await this.getCurrentCount(
      processAuditId,
      "insert_count"
    );
    var averageCount = await this.getAverageCount(
      processAuditId,
      processId,
      "insert_count",
      sample
    );

    if (averageCount) {
      if (currentCount < averageCount - averageCount * threshold) {
        return {
          code: "A04",
          subject: "Artefact loaded fewer rows than the recent average.",
          message: `Process Audit ID '${processAuditId}' has loaded ${currentCount} rows into the target artefact; fewer rows than the recent average of ${averageCount}.`,
        };
      } else {
        return null;
      }
    }
    {
      this.debug("Not enough data to calculate average.");
      return null;
    }
  }

  async a05(processAuditResult, threshold, sample) {
    // Artefact loaded more rows than the recent average.
    var processAuditId = processAuditResult[0]["process_audit_id"];
    var processId = processAuditResult[0]["process_id"];

    var currentCount = await this.getCurrentCount(
      processAuditId,
      "insert_count"
    );
    var averageCount = await this.getAverageCount(
      processAuditId,
      processId,
      "insert_count",
      sample
    );

    if (averageCount) {
      if (currentCount > averageCount + averageCount * threshold) {
        return {
          code: "A05",
          subject: "Artefact loaded more rows than the recent average.",
          message: `Process Audit ID '${processAuditId}' has loaded ${currentCount} rows into the target artefact; more rows than the recent average of ${averageCount}.`,
        };
      } else {
        return null;
      }
    } else {
      this.debug("Not enough data to calculate average.");
      return null;
    }
  }

  async getAverageRuntime(processAuditId, processId, sample) {
    var processAuditResut = await knex
      .select("start", "end")
      .from("process_audit")
      .where("process_id", processId)
      .where("status", "completed")
      .whereNot("process_audit_id", processAuditId)
      .whereNotIn(
        "process_audit_id",
        knex.select("process_audit_id").from("alert").whereLike("code", "P%")
      )
      .orderBy("start", "desc")
      .limit(sample);

    var runtimeHistory = [];
    for (var audit of processAuditResut) {
      let runtime = Math.abs(new Date(audit["end"]) - new Date(audit["start"]));
      runtimeHistory.push(runtime);
    }

    if (runtimeHistory >= 5) {
      return (
        runtimeHistory.reduce((a, b) => a + b) / runtimeHistory.length / 1000
      );
    } else {
      return null;
    }
  }

  getCurrentRuntime(processAuditResult) {
    return (
      Math.abs(
        new Date(processAuditResult[0]["end"]) -
          new Date(processAuditResult[0]["start"])
      ) / 1000
    );
  }

  async getAverageCount(processAuditId, processId, label, sample) {
    var flowResult = await knex
      .select("flow.count")
      .from("flow")
      .join(
        "process_audit",
        "process_audit.process_audit_id",
        "flow.process_audit_id"
      )
      .where("process_audit.process_id", processId)
      .where("process_audit.status", "completed")
      .where("flow.label", label)
      .whereNot("flow.process_audit_id", processAuditId)
      .whereNotIn(
        "flow.process_audit_id",
        knex.select("process_audit_id").from("alert").whereLike("code", "A%")
      )
      .orderBy("start", "desc")
      .limit(sample);

    var flowHistory = [];
    for (var flow of flowResult) {
      flowHistory.push(flow["count"]);
    }

    if (flowHistory.length >= 5) {
      return flowHistory.reduce((a, b) => a + b) / flowHistory.length;
    } else {
      null;
    }
  }

  async getCurrentCount(processAuditId, label) {
    var flowResult = await knex
      .select("count")
      .from("flow")
      .where("process_audit_id", processAuditId)
      .where("label", label);

    if (flowResult.length > 0) {
      return flowResult[0]["count"];
    } else {
      null;
    }
  }

  async insertAlert(processAuditId, code, subject, message) {
    const alertCommandClass = require("./alert.js");
    var parameters = [
      "--id",
      processAuditId,
      "--code",
      code,
      "--subject",
      subject,
      "--message",
      message,
      "--api",
    ];

    return await alertCommandClass.run(parameters);
  }
}

CustomCommand.description =
  "proactive monitoring of an instance of a process (process audit)";

CustomCommand.flags = {
  id: Flags.string({
    description: "process audit ID",
    required: true,
  }),
  threshold: Flags.string({
    description: "acceptable threshold for monitoring rules",
    required: false,
    default: 0.1,
  }),
  sample: Flags.string({
    description: "sample size for calculating average",
    required: false,
    default: 999,
  }),
  api: Flags.boolean({
    description: "(flag) is API result expected",
    hidden: true,
  }),
};

module.exports = CustomCommand;

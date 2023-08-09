const { Command, Flags } = require("@oclif/core");
const knex = require("../../../../knex.js");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const runId = flags.id;
    const threshold = flags.threshold;
    const sample = flags.sample;
    const api = flags.api;

    try {
      var runResult = await knex.select("*").from("run").where("run_id", runId);
    } catch (error) {
      this.error(error);
    }

    if (runResult.length > 0) {
      try {
        var entityResult;
        var jobResult;

        switch (runResult[0]["status"]) {
          case "running":
            jobResult = await this.p05(runResult, threshold);
            break;
          case "completed":
            jobResult =
              (await this.p02(runResult, threshold, sample)) ||
              (await this.p03(runResult, threshold, sample)) ||
              (await this.p04(runResult, threshold, sample)) ||
              (await this.p05(runResult, threshold, sample));

            entityResult =
              (await this.a01(runResult)) ||
              (await this.a02(runResult)) ||
              (await this.a03(runResult)) ||
              (await this.a04(runResult, threshold, sample)) ||
              (await this.a05(runResult, threshold, sample));
            break;
          case "failed":
            jobResult = {
              code: "P01",
              subject: "Job has failed.",
              message: `Run ID '${runId}' has failed.`,
            };
            break;
          default:
            this.error(
              `Run ID '${runId}' has an unknown status of '${runResult[0]["status"]}'.`
            );
        }

        var returnDict = {};
        if (jobResult) {
          try {
            returnDict["job"] = await this.insertAlert(
              runId,
              jobResult["code"],
              jobResult["subject"],
              jobResult["message"]
            );
          } catch (error) {
            this.error(error);
          }
        }

        if (entityResult) {
          try {
            returnDict["entity"] = await this.insertAlert(
              runId,
              entityResult["code"],
              entityResult["subject"],
              entityResult["message"]
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
      this.error(`run ID '${runId}' does not exist.`);
    }
  }

  async p02(runResult, threshold, sample) {
    // Job has taken less time than usual to run.
    var runId = runResult[0]["run_id"];
    var jobId = runResult[0]["job_id"];

    var currentRuntime = this.getCurrentRuntime(runResult);
    var averageRuntime = await this.getAverageRuntime(runId, jobId, sample);

    if (averageRuntime) {
      if (currentRuntime < averageRuntime - averageRuntime * threshold) {
        return {
          code: "P02",
          subject: "Job has taken less time than usual to run.",
          message: `Run ID '${runId}' has taken ${currentRuntime} seconds to run; less time than the usual ${averageRuntime} seconds.`,
        };
      } else {
        return null;
      }
    } else {
      this.debug("Not enough data to calculate average.");
      return null;
    }
  }

  async p03(runResult, threshold, sample) {
    // Job has taken more time than usual to run.
    var runId = runResult[0]["run_id"];
    var jobId = runResult[0]["job_id"];

    var currentRuntime = this.getCurrentRuntime(runResult);
    var averageRuntime = await this.getAverageRuntime(runId, jobId, sample);

    if (averageRuntime) {
      if (currentRuntime > averageRuntime + averageRuntime * threshold) {
        return {
          code: "P03",
          subject: "Job has taken more time than usual to run.",
          message: `Run ID '${runId}' has taken ${currentRuntime} seconds to run; more time than the usual ${averageRuntime} seconds.`,
        };
      } else {
        return null;
      }
    } else {
      this.debug("Not enough data to calculate average.");
      return null;
    }
  }

  // async p04(runResult, threshold) {
  //   return null;
  // }

  async p05(runResult, threshold, sample) {
    // Job is currently running longer than expected.
    var runId = runResult[0]["run_id"];
    var jobId = runResult[0]["job_id"];

    var currentRuntime = this.getCurrentRuntime(runResult);
    var averageRuntime = await this.getAverageRuntime(runId, jobId, sample);

    if (averageRuntime) {
      if (currentRuntime > averageRuntime + averageRuntime * threshold) {
        return {
          code: "P05",
          subject: "Job is currently running longer than expected.",
          message: `Run ID '${runId}' has been running for ${currentRuntime} seconds; more time than the usual ${averageRuntime} seconds.`,
        };
      } else {
        return null;
      }
    } else {
      this.debug("Not enough data to calculate average.");
      return null;
    }
  }

  async a01(runResult) {
    // Source entity has zero rows.
    var runId = runResult[0]["run_id"];

    var entityFlow = await knex
      .select("count")
      .from("flow")
      .where("run_id", runId)
      .where("label", "source_count");

    if (entityFlow.length > 0) {
      if (entityFlow[0]["count"] === 0) {
        return {
          code: "A01",
          subject: "Source entity has zero rows.",
          message: `Run ID '${runId}' has zero rows in the source entity.`,
        };
      } else {
        return null;
      }
    }
  }

  async a02(runResult) {
    // Target entity loaded zero rows.
    var runId = runResult[0]["run_id"];

    var entityFlow = await knex
      .select("count")
      .from("flow")
      .where("run_id", runId)
      .where("label", "insert_count");

    if (entityFlow.length > 0) {
      if (entityFlow[0]["count"] === 0) {
        return {
          code: "A02",
          subject: "Target entity loaded zero rows.",
          message: `Run ID '${runId}' has loaded zero rows into the target entity.`,
        };
      } else {
        return null;
      }
    }
  }

  async a03(runResult) {
    // 	Target entity has rejected rows.
    var runId = runResult[0]["run_id"];

    var entityFlow = await knex
      .select("count")
      .from("flow")
      .where("run_id", runId)
      .where("label", "reject_count");

    if (entityFlow.length > 0) {
      if (entityFlow[0]["count"] > 0) {
        return {
          code: "A03",
          subject: "Target entity has rejected rows.",
          message: `Run ID '${runId}' has rejected ${entityFlow[0]["count"]} rows.`,
        };
      } else {
        return null;
      }
    }
  }

  async a04(runResult, threshold, sample) {
    // Entity loaded fewer rows than the recent average.
    var runId = runResult[0]["run_id"];
    var jobId = runResult[0]["job_id"];

    var currentCount = await this.getCurrentCount(runId, "insert_count");
    var averageCount = await this.getAverageCount(
      runId,
      jobId,
      "insert_count",
      sample
    );

    if (averageCount) {
      if (currentCount < averageCount - averageCount * threshold) {
        return {
          code: "A04",
          subject: "Entity loaded fewer rows than the recent average.",
          message: `Run ID '${runId}' has loaded ${currentCount} rows into the target entity; fewer rows than the recent average of ${averageCount}.`,
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

  async a05(runResult, threshold, sample) {
    // Entity loaded more rows than the recent average.
    var runId = runResult[0]["run_id"];
    var jobId = runResult[0]["job_id"];

    var currentCount = await this.getCurrentCount(runId, "insert_count");
    var averageCount = await this.getAverageCount(
      runId,
      jobId,
      "insert_count",
      sample
    );

    if (averageCount) {
      if (currentCount > averageCount + averageCount * threshold) {
        return {
          code: "A05",
          subject: "Entity loaded more rows than the recent average.",
          message: `Run ID '${runId}' has loaded ${currentCount} rows into the target entity; more rows than the recent average of ${averageCount}.`,
        };
      } else {
        return null;
      }
    } else {
      this.debug("Not enough data to calculate average.");
      return null;
    }
  }

  async getAverageRuntime(runId, jobId, sample) {
    var runResut = await knex
      .select("start", "end")
      .from("run")
      .where("job_id", jobId)
      .where("status", "completed")
      .whereNot("run_id", runId)
      .whereNotIn(
        "run_id",
        knex.select("run_id").from("alert").whereLike("code", "P%")
      )
      .orderBy("start", "desc")
      .limit(sample);

    var runtimeHistory = [];
    for (var run of runResut) {
      let runtime = Math.abs(new Date(run["end"]) - new Date(run["start"]));
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

  getCurrentRuntime(runResult) {
    return (
      Math.abs(
        new Date(runResult[0]["end"]) - new Date(runResult[0]["start"])
      ) / 1000
    );
  }

  async getAverageCount(runId, jobId, label, sample) {
    var flowResult = await knex
      .select("flow.count")
      .from("flow")
      .join("run", "run.run_id", "flow.run_id")
      .where("run.job_id", jobId)
      .where("run.status", "completed")
      .where("flow.label", label)
      .whereNot("flow.run_id", runId)
      .whereNotIn(
        "flow.run_id",
        knex.select("run_id").from("alert").whereLike("code", "A%")
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

  async getCurrentCount(runId, label) {
    var flowResult = await knex
      .select("count")
      .from("flow")
      .where("run_id", runId)
      .where("label", label);

    if (flowResult.length > 0) {
      return flowResult[0]["count"];
    } else {
      null;
    }
  }

  async insertAlert(runId, code, subject, message) {
    const alertCommandClass = require("./alert.js");
    var parameters = [
      "--id",
      runId,
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
  "proactive monitoring of an instance of a job (run)";

CustomCommand.flags = {
  id: Flags.string({
    description: "run ID",
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

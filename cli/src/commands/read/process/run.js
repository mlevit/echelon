const { Command, Flags } = require("@oclif/core");
const knex = require("../../../knex.js");
const jq = require("node-jq");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const jsonQuery = flags.jq;
    const api = flags.api;

    try {
      var processResult = await knex
        .with("processes", (qb) => {
          qb.select(
            "process.process_id as process_id",
            "process.name as process_name",
            "process.dependency_logic as process_dependency_logic",
            "process_audit.process_audit_id as process_audit_id",
            knex.raw(
              'coalesce("process_audit"."end", \'1900-01-01 00:00:00.000000\') as process_audit_end'
            )
          )
            .rowNumber("row_number", "process.process_id", "process_audit.end")
            .from("process")
            .leftJoin("process_audit", function () {
              this.on("process.process_id", "process_audit.process_id").onIn(
                "process_audit.status",
                ["completed"]
              );
            });
        })
        .with("latest", (qb) => {
          qb.select("*").from("processes").where("row_number", 1);
        })
        .with("relationship", (qb) => {
          qb.distinct(
            "target_par.process_id as target_process_id",
            "target.process_name as target_process_name",
            "target.process_audit_end as target_process_end",
            "target.process_dependency_logic as target_dependency_logic",
            "source_par.process_id as source_process_id",
            "source.process_audit_end as source_process_end",
            "target_par.required_flag as target_required_flag"
          )
            .from("process_artefact_rel as target_par")
            .join(
              "process_artefact_rel as source_par",
              "target_par.source_artefact_id",
              "source_par.target_artefact_id"
            )
            .leftJoin(
              "latest as target",
              "target_par.process_id",
              "target.process_id"
            )
            .leftJoin(
              "latest as source",
              "source_par.process_id",
              "source.process_id"
            );
        })
        .with("and_dependency_logic", (qb) => {
          qb.select("target_process_id", "target_process_name")
            .sum({
              ready_process_count: knex.raw(
                "case when source_process_end > target_process_end then 1 else 0 end"
              ),
            })
            .count({ dependant_process_count: knex.raw("1") })
            .from("relationship")
            .where("target_dependency_logic", "and")
            .andWhere("target_required_flag", true)
            .groupBy("target_process_id", "target_process_name");
        })
        .with("or_dependency_logic", (qb) => {
          qb.select("target_process_id", "target_process_name")
            .sum({
              ready_process_count: knex.raw(
                "case when source_process_end > target_process_end then 1 else 0 end"
              ),
            })
            .count({ dependant_process_count: knex.raw("1") })
            .from("relationship")
            .where("target_dependency_logic", "or")
            .andWhere("target_required_flag", true)
            .groupBy("target_process_id", "target_process_name");
        })
        .select(
          "target_process_id as process_id",
          "target_process_name as process_name"
        )
        .from("and_dependency_logic")
        .where("ready_process_count", knex.raw("dependant_process_count"))
        .union((qb) => {
          qb.select(
            "target_process_id as process_id",
            "target_process_name as process_name"
          )
            .from("or_dependency_logic")
            .where("ready_process_count", ">", 0);
        });
    } catch (error) {
      this.error(error);
    }

    if (jsonQuery) {
      processResult = await jq.run(jsonQuery, processResult, {
        input: "json",
        output: "json",
      });
    }

    if (api) {
      return processResult;
    } else {
      this.log(processResult);
    }
  }
}

CustomCommand.description =
  "retrieve processes that can be run based on their object-based dependencies";

CustomCommand.flags = {
  jq: Flags.string({
    description: "jq string to parse result set",
    required: false,
  }),
  api: Flags.boolean({
    description: "(flag) is API result expected",
    hidden: true,
  }),
};

module.exports = CustomCommand;

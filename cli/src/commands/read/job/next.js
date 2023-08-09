const { Command, Flags } = require("@oclif/core");
const knex = require("../../../knex.js");
const jq = require("node-jq");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const jsonQuery = flags.jq;
    const api = flags.api;

    try {
      var jobResult = await knex
        .with("jobs", (qb) => {
          qb.select(
            "job.job_id as job_id",
            "job.name as job_name",
            "job.dependency_logic as job_dependency_logic",
            "run.run_id as run_id",
            knex.raw(
              'coalesce("run"."end", \'1900-01-01 00:00:00.000000\') as run_end'
            )
          )
            .rowNumber("row_number", "job.job_id", "run.end")
            .from("job")
            .leftJoin("run", function () {
              this.on("job.job_id", "run.job_id").onIn("run.status", [
                "completed",
              ]);
            });
        })
        .with("latest", (qb) => {
          qb.select("*").from("jobs").where("row_number", 1);
        })
        .with("relationship", (qb) => {
          qb.distinct(
            "target_par.job_id as target_job_id",
            "target.job_name as target_job_name",
            "target.run_end as target_job_end",
            "target.job_dependency_logic as target_dependency_logic",
            "source_par.job_id as source_job_id",
            "source.run_end as source_job_end",
            "target_par.required_flag as target_required_flag"
          )
            .from("job_entity_rel as target_par")
            .join(
              "job_entity_rel as source_par",
              "target_par.source_entity_id",
              "source_par.target_entity_id"
            )
            .leftJoin("latest as target", "target_par.job_id", "target.job_id")
            .leftJoin("latest as source", "source_par.job_id", "source.job_id");
        })
        .with("and_dependency_logic", (qb) => {
          qb.select("target_job_id", "target_job_name")
            .sum({
              ready_job_count: knex.raw(
                "case when source_job_end > target_job_end then 1 else 0 end"
              ),
            })
            .count({ dependant_job_count: knex.raw("1") })
            .from("relationship")
            .where("target_dependency_logic", "and")
            .andWhere("target_required_flag", true)
            .groupBy("target_job_id", "target_job_name");
        })
        .with("or_dependency_logic", (qb) => {
          qb.select("target_job_id", "target_job_name")
            .sum({
              ready_job_count: knex.raw(
                "case when source_job_end > target_job_end then 1 else 0 end"
              ),
            })
            .count({ dependant_job_count: knex.raw("1") })
            .from("relationship")
            .where("target_dependency_logic", "or")
            .andWhere("target_required_flag", true)
            .groupBy("target_job_id", "target_job_name");
        })
        .select("target_job_id as job_id", "target_job_name as job_name")
        .from("and_dependency_logic")
        .where("ready_job_count", knex.raw("dependant_job_count"))
        .union((qb) => {
          qb.select("target_job_id as job_id", "target_job_name as job_name")
            .from("or_dependency_logic")
            .where("ready_job_count", ">", 0);
        });
    } catch (error) {
      this.error(error);
    }

    if (jsonQuery) {
      jobResult = await jq.run(jsonQuery, jobResult, {
        input: "json",
        output: "json",
      });
    }

    if (api) {
      return jobResult;
    } else {
      this.log(jobResult);
    }
  }
}

CustomCommand.description =
  "retrieve jobs that can be run based on their object-based dependencies";

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

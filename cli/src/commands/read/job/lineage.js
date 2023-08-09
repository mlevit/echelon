const { Command, Flags } = require("@oclif/core");
const knex = require("../../../knex.js");
const jq = require("node-jq");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const name = flags.name;
    const jsonQuery = flags.jq;
    const api = flags.api;

    try {
      var jobResult = await knex.select("*").from("job").where("name", name);
    } catch (error) {
      this.error(error);
    }

    if (jobResult.length > 0) {
      try {
        var mapResult = await knex
          .select([
            "src_rel.job_id as source_job_id",
            "src_job.name as source_job_name",
            "trg_rel.job_id as target_job_id",
            "trg_job.name as target_job_name",
          ])
          .from("job_entity_rel as src_rel")
          .join(
            "job_entity_rel as trg_rel",
            "src_rel.target_entity_id",
            "trg_rel.source_entity_id"
          )
          .join("job as src_job", "src_job.job_id", "src_rel.job_id")
          .join("job as trg_job", "trg_job.job_id", "trg_rel.job_id")
          .where("job.job_id", jobResult[0]["job_id"]);
      } catch (error) {
        this.error(error);
      }

      if (jsonQuery) {
        mapResult = await jq.run(jsonQuery, mapResult, {
          input: "json",
          output: "json",
        });
      }

      if (api) {
        return mapResult;
      } else {
        this.log(mapResult);
      }
    } else {
      this.error(`Job '${name}' does not exist.`);
    }
  }
}

CustomCommand.description = "retrieve source entities associated with a job";

CustomCommand.flags = {
  name: Flags.string({
    description: "job name",
    required: true,
  }),
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

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
        var jobEntityRelResult = await knex
          .select(
            "job_entity_rel_id",
            "se.entity_id as source_entity_id",
            "se.name as source_entity_name",
            "te.entity_id as target_entity_id",
            "te.name as target_entity_name"
          )
          .from("job_entity_rel")
          .leftJoin(
            "entity as se",
            "job_entity_rel.source_entity_id",
            "se.entity_id"
          )
          .leftJoin(
            "entity as te",
            "job_entity_rel.target_entity_id",
            "te.entity_id"
          )
          .where("job_entity_rel.job_id", jobResult[0]["job_id"])
          .orderBy("sequence_number");
      } catch (error) {
        this.error(error);
      }

      if (jsonQuery) {
        jobEntityRelResult = await jq.run(jsonQuery, jobEntityRelResult, {
          input: "json",
          output: "json",
        });
      }

      if (api) {
        return jobEntityRelResult;
      } else {
        this.log(jobEntityRelResult);
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

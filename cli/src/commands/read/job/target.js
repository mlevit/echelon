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
        var entityResult = await knex
          .distinct("entity.*")
          .from("entity")
          .join(
            "job_entity_rel",
            "entity.entity_id",
            "job_entity_rel.target_entity_id"
          )
          .where("job_entity_rel.job_id", jobResult[0]["job_id"]);
      } catch (error) {
        this.error(error);
      }

      if (jsonQuery) {
        entityResult = await jq.run(jsonQuery, entityResult, {
          input: "json",
          output: "json",
        });
      }

      if (api) {
        return entityResult;
      } else {
        this.log(entityResult);
      }
    } else {
      this.error(`Job '${name}' does not exist.`);
    }
  }
}

CustomCommand.description = "retrieve target entities associated with a job";

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

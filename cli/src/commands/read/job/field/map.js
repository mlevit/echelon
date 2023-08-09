const { Command, Flags } = require("@oclif/core");
const knex = require("../../../../knex.js");
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
            "source_entity.entity_id AS source_entity_id",
            "source_entity.name AS source_entity_name",
            "source_field.physical_name AS source_field_name",
            "target_entity.entity_id AS target_entity_id",
            "target_entity.name AS target_entity_name",
            "target_field.physical_name AS target_field_name",
            "job_field_map.hard_rule",
          ])
          .from("job")
          .join("job_field_map", "job.job_id", "job_field_map.job_id")
          .join(
            "field as source_field",
            "job_field_map.source_field_id",
            "source_field.field_id"
          )
          .join(
            "field as target_field",
            "job_field_map.target_field_id",
            "target_field.field_id"
          )
          .join(
            "entity as source_entity",
            "source_field.entity_id",
            "source_entity.entity_id"
          )
          .join(
            "entity as target_entity",
            "target_field.entity_id",
            "target_entity.entity_id"
          )
          .where("job.job_id", jobResult[0]["job_id"])
          .orderBy("target_field.sequence_number");
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

CustomCommand.description = "retrieve source entitys associated with a job";

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

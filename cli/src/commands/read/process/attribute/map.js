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
      var processResult = await knex
        .select("*")
        .from("process")
        .where("name", name);
    } catch (error) {
      this.error(error);
    }

    if (processResult.length > 0) {
      try {
        var mapResult = await knex
          .select([
            "source_artefact.artefact_id AS source_artefact_id",
            "source_artefact.name AS source_artefact_name",
            "source_attribute.physical_name AS source_attribute_name",
            "target_artefact.artefact_id AS target_artefact_id",
            "target_artefact.name AS target_artefact_name",
            "target_attribute.physical_name AS target_attribute_name",
            "process_attribute_map.hard_rule",
          ])
          .from("process")
          .join(
            "process_attribute_map",
            "process.process_id",
            "process_attribute_map.process_id"
          )
          .join(
            "attribute as source_attribute",
            "process_attribute_map.source_attribute_id",
            "source_attribute.attribute_id"
          )
          .join(
            "attribute as target_attribute",
            "process_attribute_map.target_attribute_id",
            "target_attribute.attribute_id"
          )
          .join(
            "artefact as source_artefact",
            "source_attribute.artefact_id",
            "source_artefact.artefact_id"
          )
          .join(
            "artefact as target_artefact",
            "target_attribute.artefact_id",
            "target_artefact.artefact_id"
          )
          .where("process.process_id", processResult[0]["process_id"])
          .orderBy("target_attribute.sequence_number");
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
      this.error(`Process '${name}' does not exist.`);
    }
  }
}

CustomCommand.description =
  "retrieve source artefacts associated with a process";

CustomCommand.flags = {
  name: Flags.string({
    description: "process name",
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

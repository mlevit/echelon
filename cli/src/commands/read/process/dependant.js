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
          .select("process.process_id", "process.name")
          .from("process_artefact_rel AS current")
          .join(
            "process_artefact_rel AS target",
            "current.target_artefact_id",
            "target.source_artefact_id"
          )
          .join("process", "target.process_id", "process.process_id")
          .where("current.process_id", processResult[0]["process_id"])
          .orderBy("name");
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
  "retrieve target processes this process is the dependant of";

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

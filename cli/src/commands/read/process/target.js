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
        var artefactResult = await knex
          .distinct("artefact.*")
          .from("artefact")
          .join(
            "process_artefact_rel",
            "artefact.artefact_id",
            "process_artefact_rel.target_artefact_id"
          )
          .where(
            "process_artefact_rel.process_id",
            processResult[0]["process_id"]
          );
      } catch (error) {
        this.error(error);
      }

      if (jsonQuery) {
        artefactResult = await jq.run(jsonQuery, artefactResult, {
          input: "json",
          output: "json",
        });
      }

      if (api) {
        return artefactResult;
      } else {
        this.log(artefactResult);
      }
    } else {
      this.error(`Process '${name}' does not exist.`);
    }
  }
}

CustomCommand.description =
  "retrieve target artefacts associated with a process";

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

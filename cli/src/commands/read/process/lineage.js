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
          .select([
            "src_rel.process_id as source_process_id",
            "src_process.name as source_process_name",
            "trg_rel.process_id as target_process_id",
            "trg_process.name as target_process_name",
          ])
          .from("process_artefact_rel as src_rel")
          .join(
            "process_artefact_rel as trg_rel",
            "src_rel.target_artefact_id",
            "trg_rel.source_artefact_id"
          )
          .join(
            "process as src_process",
            "src_process.process_id",
            "src_rel.process_id"
          )
          .join(
            "process as trg_process",
            "trg_process.process_id",
            "trg_rel.process_id"
          )
          .where("process.process_id", processResult[0]["process_id"]);
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

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
      var artefactResult = await knex
        .select("*")
        .from("artefact")
        .where("name", name);
    } catch (error) {
      this.error(error);
    }

    if (artefactResult.length > 0) {
      try {
        var constantResult = await knex.select("*").from("artefact_constant").where({
          artefact_id: artefactResult[0]["artefact_id"]
        });
      } catch (error) {
        this.error(error);
      }

      if (jsonQuery) {
        constantResult = await jq.run(jsonQuery, constantResult, {
          input: "json",
          output: "json",
        });
      }

      if (api) {
        return constantResult;
      } else {
        this.log(constantResult);
      }
    } else {
      this.error(`Artefact '${name}' does not exist.`);
    }
  }
}

CustomCommand.description = "retrieve constants associated with an artefact";

CustomCommand.flags = {
  name: Flags.string({
    description: "artefact name",
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

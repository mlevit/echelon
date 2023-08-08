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
        var attributeResult = await knex
          .select("*")
          .from("attribute")
          .where({
            artefact_id: artefactResult[0]["artefact_id"],
          })
          .orderBy("sequence_number");

        if (jsonQuery) {
          attributeResult = await jq.run(jsonQuery, attributeResult, {
            input: "json",
            output: "json",
          });
        }

        if (api) {
          return attributeResult;
        } else {
          this.log(attributeResult);
        }
      } catch (error) {
        this.error(error);
      }
    } else {
      this.error(`Artefact '${name}' does not exist.`);
    }
  }
}

CustomCommand.description = "retrieve attributes associated with an artefact";

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

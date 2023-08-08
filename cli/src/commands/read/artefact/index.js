const { Command, Flags } = require("@oclif/core");
const knex = require("../../../knex.js");
const jq = require("node-jq");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const name = flags.name;
    const id = flags.id;
    const limit = flags.limit;
    const jsonQuery = flags.jq;
    const api = flags.api;

    var artefactResult;
    try {
      if (name) {
        artefactResult = await knex
          .select("*")
          .from("artefact")
          .where("name", name)
          .orderBy("name")
          .limit(limit);
      } else if (id) {
        artefactResult = await knex
          .select("*")
          .from("artefact")
          .where("artefact_id", id)
          .orderBy("name")
          .limit(limit);
      } else {
        artefactResult = await knex
          .select("*")
          .from("artefact")
          .orderBy("name")
          .limit(limit);
      }
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
  }
}

CustomCommand.description = "retrieve artefact(s)";

CustomCommand.flags = {
  name: Flags.string({
    description: "artefact name",
    required: false,
    exclusive: ["id"],
  }),
  id: Flags.string({
    description: "artefact id",
    required: false,
    exclusive: ["name"],
  }),
  limit: Flags.string({
    description: "limit the result set",
    default: "10",
    required: false,
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

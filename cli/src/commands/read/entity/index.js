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

    var entityResult;
    try {
      if (name) {
        entityResult = await knex
          .select("*")
          .from("entity")
          .where("name", name)
          .orderBy("name")
          .limit(limit);
      } else if (id) {
        entityResult = await knex
          .select("*")
          .from("entity")
          .where("entity_id", id)
          .orderBy("name")
          .limit(limit);
      } else {
        entityResult = await knex
          .select("*")
          .from("entity")
          .orderBy("name")
          .limit(limit);
      }
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
  }
}

CustomCommand.description = "retrieve entity(s)";

CustomCommand.flags = {
  name: Flags.string({
    description: "entity name",
    required: false,
    exclusive: ["id"],
  }),
  id: Flags.string({
    description: "entity id",
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

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
      var entityResult = await knex
        .select("*")
        .from("entity")
        .where("name", name);
    } catch (error) {
      this.error(error);
    }

    if (entityResult.length > 0) {
      try {
        var fieldResult = await knex
          .select("*")
          .from("field")
          .where({
            entity_id: entityResult[0]["entity_id"],
          })
          .orderBy("sequence_number");

        if (jsonQuery) {
          fieldResult = await jq.run(jsonQuery, fieldResult, {
            input: "json",
            output: "json",
          });
        }

        if (api) {
          return fieldResult;
        } else {
          this.log(fieldResult);
        }
      } catch (error) {
        this.error(error);
      }
    } else {
      this.error(`Entity '${name}' does not exist.`);
    }
  }
}

CustomCommand.description = "retrieve fields associated with an entity";

CustomCommand.flags = {
  name: Flags.string({
    description: "entity name",
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

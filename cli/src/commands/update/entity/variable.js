const { Command, Flags } = require("@oclif/core");
const knex = require("../../../knex.js");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const entityId = flags.id;
    const type = flags.type;
    const name = flags.name;
    const value = flags.value;
    const api = flags.api;

    try {
      var entityResult = await knex
        .select("*")
        .from("entity")
        .where("entity_id", entityId);
    } catch (error) {
      this.error(error);
    }

    if (entityResult.length > 0) {
      try {
        var variableResult = await knex
          .insert({
            object_id: entityId,
            object_type: type,
            name: name,
            value: value,
          })
          .returning("*")
          .into("variable")
          .onConflict(["object_id", "object_type", "name"])
          .merge();

        if (api) {
          return variableResult;
        } else {
          this.log(JSON.stringify(variableResult, null, 2));
        }
      } catch (error) {
        this.error(error);
      }
    } else {
      this.error(`Entity '${entityId}' does not exist.`);
    }
  }
}

CustomCommand.description = "update a variable value associated with an entity";

CustomCommand.flags = {
  id: Flags.string({
    description: "entity ID",
    required: true,
  }),
  type: Flags.string({
    description: "entity type",
    required: true,
  }),
  name: Flags.string({
    description: "variable name",
    required: true,
  }),
  value: Flags.string({
    description: "variable value",
    required: true,
  }),
  api: Flags.boolean({
    description: "(flag) is API result expected",
    hidden: true,
  }),
};

module.exports = CustomCommand;

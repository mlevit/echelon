const { Command, Flags } = require("@oclif/core");
const knex = require("../../../knex.js");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const processAuditId = flags.id;
    const type = flags.type;
    const name = flags.name;
    const value = flags.value;
    const api = flags.api;

    try {
      var processResult = await knex
        .select("*")
        .from("process")
        .where("process_id", processAuditId);
    } catch (error) {
      this.error(error);
    }

    if (processResult.length > 0) {
      try {
        var processVariableResult = await knex
          .insert({
            object_id: processAuditId,
            object_type: type,
            name: name,
            value: value,
          })
          .returning("*")
          .into("variable")
          .onConflict(["object_id", "object_type", "name"])
          .merge();

        if (api) {
          return processVariableResult;
        } else {
          this.log(JSON.stringify(processVariableResult, null, 2));
        }
      } catch (error) {
        this.error(error);
      }
    } else {
      this.error(`Process '${processAuditId}' does not exist.`);
    }
  }
}

CustomCommand.description = "update a variable value associated with a process";

CustomCommand.flags = {
  id: Flags.string({
    description: "process audit ID",
    required: true,
  }),
  type: Flags.string({
    description: "process type",
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

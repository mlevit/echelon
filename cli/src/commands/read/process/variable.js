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
        var variableResult = await knex.select("*").from("variable").where({
          object_id: processResult[0]["process_id"],
          object_type: processResult[0]["type"],
        });
      } catch (error) {
        this.error(error);
      }

      if (jsonQuery) {
        variableResult = await jq.run(jsonQuery, variableResult, {
          input: "json",
          output: "json",
        });
      }

      if (api) {
        return variableResult;
      } else {
        this.log(variableResult);
      }
    } else {
      this.error(`Process '${name}' does not exist.`);
    }
  }
}

CustomCommand.description = "retrieve variables associated with a process";

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

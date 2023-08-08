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

    var processResult;
    try {
      if (name) {
        processResult = await knex
          .select("*")
          .from("process")
          .where("name", name)
          .orderBy("name");
      } else if (id) {
        processResult = await knex
          .select("*")
          .from("process")
          .where("process_id", id)
          .orderBy("name");
      } else {
        processResult = await knex
          .select("*")
          .from("process")
          .orderBy("name")
          .limit(limit);
      }
    } catch (error) {
      this.error(error);
    }

    if (jsonQuery) {
      processResult = await jq.run(jsonQuery, processResult, {
        input: "json",
        output: "json",
      });
    }

    if (api) {
      return processResult;
    } else {
      this.log(processResult);
    }
  }
}

CustomCommand.description = "retrieve process(es)";

CustomCommand.flags = {
  name: Flags.string({
    description: "process name",
    required: false,
    exclusive: ["id"],
  }),
  id: Flags.string({
    description: "process id",
    required: false,
    exclusive: ["name"],
  }),
  limit: Flags.string({
    description: "limit the result set",
    default: 10,
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

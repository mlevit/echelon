const { Command, Flags } = require("@oclif/core");
const knex = require("../../../../knex.js");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const name = flags.name;
    const api = flags.api;

    try {
      var processIdResult = await knex
        .select("process_id")
        .from("process")
        .where("name", name);
    } catch (error) {
      this.error(error);
    }

    if (processIdResult.length > 0) {
      try {
        var processResult = await knex
          .insert({ process_id: processIdResult[0]["process_id"] })
          .returning("*")
          .into("process_audit");

        if (api) {
          return processResult;
        } else {
          this.log(JSON.stringify(processResult, null, 2));
        }
      } catch (error) {
        this.error(error);
      }
    } else {
      this.error(`Process '${name}' does not exist.`);
    }
  }
}

CustomCommand.description = "create an instance of a process (process audit)";

CustomCommand.flags = {
  name: Flags.string({
    description: "process name",
    required: true,
  }),
  api: Flags.boolean({
    description: "(flag) is API result expected",
    hidden: true,
  }),
};

module.exports = CustomCommand;

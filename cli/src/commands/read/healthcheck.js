const { Command, Flags } = require("@oclif/core");
const knex = require("../../knex.js");

class HealthcheckCommand extends Command {
  async run() {
    const { flags } = await this.parse(HealthcheckCommand);
    const api = flags.api;
    const database = flags.database;

    var output = { api: "OK" };

    if (database) {
      try {
        output.database = "FAIL";
        await knex.raw("SELECT 1").then(() => {
          output.database = "OK";
        });
      } catch (error) {
        output.database = "FAIL";
      }
    }

    if (api) {
      return output;
    } else {
      this.log(output);
    }
  }
}

HealthcheckCommand.description = "perform a health check";

HealthcheckCommand.flags = {
  database: Flags.boolean({
    description: "(flag) database check",
    default: false,
  }),
  api: Flags.boolean({
    description: "(flag) is API result expected",
    hidden: true,
  }),
};

module.exports = HealthcheckCommand;

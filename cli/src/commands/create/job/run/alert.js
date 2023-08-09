const { Command, Flags } = require("@oclif/core");
const knex = require("../../../../knex.js");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const runId = flags.id;
    const code = flags.code;
    const subject = flags.subject;
    const message = flags.message;
    const api = flags.api;

    try {
      var runResult = await knex.select("*").from("run").where("run_id", runId);
    } catch (error) {
      this.error(error);
    }

    if (runResult.length > 0) {
      try {
        var alertResult = await knex
          .insert({
            run_id: runId,
            code: code,
            subject: subject,
            message: message,
          })
          .returning("*")
          .into("alert");

        if (api) {
          return alertResult;
        } else {
          this.log(JSON.stringify(alertResult, null, 2));
        }
      } catch (error) {
        this.error(error);
      }
    } else {
      this.error(`run ID '${runId}' does not exist.`);
    }
  }
}

CustomCommand.description = "raise an alert against an instance of a job (run)";

CustomCommand.flags = {
  id: Flags.string({
    description: "run ID associated with the alert",
    required: true,
  }),
  code: Flags.string({
    description: "alert code",
    required: true,
  }),
  subject: Flags.string({
    description: "alert subject",
    required: true,
  }),
  message: Flags.string({
    description: "alert message",
    required: true,
  }),
  api: Flags.boolean({
    description: "(flag) is API result expected",
    hidden: true,
  }),
};

module.exports = CustomCommand;

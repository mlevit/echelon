const { Command, Flags } = require("@oclif/core");
const knex = require("../../../../knex.js");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const runId = flags.id;
    const job = flags.job;
    const func = flags.function;
    const priority = flags.priority;
    const message = flags.message;
    const code = flags.code;
    const api = flags.api;

    try {
      var runResult = await knex.select("*").from("run").where("run_id", runId);
    } catch (error) {
      this.error(error);
    }

    if (runResult.length > 0) {
      try {
        var logResult = await knex
          .insert({
            run_id: runId,
            job: job,
            function: func,
            priority: priority,
            message: message,
            code: code,
          })
          .returning("*")
          .into("log");

        if (api) {
          return logResult;
        } else {
          this.log(JSON.stringify(logResult, null, 2));
        }
      } catch (error) {
        this.error(error);
      }
    } else {
      this.error(`run ID '${runId}' does not exist.`);
    }
  }
}

CustomCommand.description = "log a message against an instance of a job (run)";

CustomCommand.flags = {
  id: Flags.string({
    description: "run ID",
    required: true,
  }),
  job: Flags.string({
    description: "ETL job that produced the log",
    required: false,
  }),
  function: Flags.string({
    description: "ETL job function that produced the log",
    required: false,
  }),
  priority: Flags.string({
    description: "priority of log",
    options: ["DEBUG", "ERROR", "FATAL", "INFO", "WARN"],
    required: true,
  }),
  message: Flags.string({
    description: "message of log",
    required: true,
  }),
  code: Flags.string({
    description: "error code of log",
    required: false,
  }),
  api: Flags.boolean({
    description: "(flag) is API result expected",
    hidden: true,
  }),
};

module.exports = CustomCommand;

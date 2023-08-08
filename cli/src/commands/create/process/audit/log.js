const { Command, Flags } = require("@oclif/core");
const knex = require("../../../../knex.js");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const processAuditId = flags.id;
    const job = flags.job;
    const func = flags.function;
    const priority = flags.priority;
    const message = flags.message;
    const code = flags.code;
    const api = flags.api;

    try {
      var processAuditResult = await knex
        .select("*")
        .from("process_audit")
        .where("process_audit_id", processAuditId);
    } catch (error) {
      this.error(error);
    }

    if (processAuditResult.length > 0) {
      try {
        var logResult = await knex
          .insert({
            process_audit_id: processAuditId,
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
      this.error(`process audit ID '${processAuditId}' does not exist.`);
    }
  }
}

CustomCommand.description =
  "log a message against an instance of a process (process audit)";

CustomCommand.flags = {
  id: Flags.string({
    description: "process audit ID",
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

const { Command, Flags } = require("@oclif/core");
const knex = require("../../../../knex.js");
const jq = require("node-jq");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const processAuditId = flags.id;
    const jsonQuery = flags.jq;
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
          .select("*")
          .from("log")
          .where({
            process_audit_id: processAuditId,
          })
          .orderBy("insert_date");
      } catch (error) {
        this.error(error);
      }

      if (jsonQuery) {
        logResult = await jq.run(jsonQuery, logResult, {
          input: "json",
          output: "json",
        });
      }

      if (api) {
        return logResult;
      } else {
        this.log(logResult);
      }
    } else {
      this.error(`process audit ID '${processAuditId}' does not exist.`);
    }
  }
}

CustomCommand.description =
  "retrieve logs associated with a process instance (process audit)";

CustomCommand.flags = {
  id: Flags.string({
    description: "process audit ID",
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

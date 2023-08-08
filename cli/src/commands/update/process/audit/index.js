const { Command, Flags } = require("@oclif/core");
const knex = require("../../../../knex.js");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const processAuditId = flags.id;
    const status = flags.status;
    const api = flags.api;

    try {
      var isRunning = await knex
        .select("*")
        .from("process_audit")
        .where({ process_audit_id: processAuditId, status: "running" });
    } catch (error) {
      this.error(error);
    }

    if (isRunning.length == 1) {
      try {
        var processAuditResult = await knex
          .update({ status: status, end: knex.fn.now() })
          .where({ process_audit_id: processAuditId })
          .returning("*")
          .into("process_audit");

        if (api) {
          return processAuditResult;
        } else {
          this.log(JSON.stringify(processAuditResult, null, 2));
        }
      } catch (error) {
        this.error(error);
      }
    } else {
      this.error(
        `process audit ID '${processAuditId}' is not in a running state.`
      );
    }
  }
}

CustomCommand.description = "update an instance of a process (process audit)";

CustomCommand.flags = {
  id: Flags.string({
    description: "process audit ID",
    required: true,
  }),
  status: Flags.string({
    description: "process audit status",
    options: ["completed", "failed"],
    required: true,
  }),
  api: Flags.boolean({
    description: "(flag) is API result expected",
    hidden: true,
  }),
};

module.exports = CustomCommand;

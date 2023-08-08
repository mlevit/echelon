const { Command, Flags } = require("@oclif/core");
const knex = require("../../../../../knex.js");
const jq = require("node-jq");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const start = flags.filterStart;
    const end = flags.filterEnd;
    const jsonQuery = flags.jq;
    const api = flags.api;

    var processAuditResult = await knex
      .select(
        "process.name as process_name",
        "process.process_id",
        "process_audit.process_audit_id",
        "process_audit.start",
        "process_audit.end",
        "process_audit.status"
      )
      .from("process_audit")
      .join("process", "process_audit.process_id", "process.process_id")
      .where("start", ">=", start)
      .where("start", "<=", end)
      .orderBy("process_audit_id", "desc");

    if (jsonQuery) {
      processAuditResult = await jq.run(jsonQuery, processAuditResult, {
        input: "json",
        output: "json",
      });
    }

    if (api) {
      return processAuditResult;
    } else {
      this.log(processAuditResult);
    }
  }
}

CustomCommand.description =
  "retrieve process instances (process audit) of a process";

CustomCommand.flags = {
  filterStart: Flags.string({
    description: "filter start date",
    default: "1970-01-01",
    required: false,
  }),
  filterEnd: Flags.string({
    description: "filter end date",
    default: "2999-12-31",
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

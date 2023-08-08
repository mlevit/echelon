const { Command, Flags } = require("@oclif/core");
const knex = require("../../../../knex.js");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const processAuditId = flags.id;
    const job = flags.job;
    const func = flags.function;
    const label = flags.label;
    const count = flags.count;
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
        var flowResult = await knex
          .insert({
            process_audit_id: processAuditId,
            job: job,
            function: func,
            label: label,
            count: count,
          })
          .returning("*")
          .into("flow");

        if (api) {
          return flowResult;
        } else {
          this.log(JSON.stringify(flowResult, null, 2));
        }
      } catch (error) {
        this.error(error);
      }
    } else {
      this.error(`Process Audit '${processAuditId}' does not exist.`);
    }
  }
}

CustomCommand.description =
  "store data source metrics against an instance of a process (process audit)";

CustomCommand.flags = {
  id: Flags.string({
    description: "process audit ID",
    required: true,
  }),
  job: Flags.string({
    description: "ETL job that produced the metric",
    required: false,
  }),
  function: Flags.string({
    description: "ETL job function that produced the metric",
    required: false,
  }),
  label: Flags.string({
    description: "label of the metric",
    required: true,
  }),
  count: Flags.string({
    description: "record count",
    required: true,
  }),
  api: Flags.boolean({
    description: "(flag) is API result expected",
    hidden: true,
  }),
};

module.exports = CustomCommand;

const { Command, Flags } = require("@oclif/core");
const knex = require("../../../../knex.js");
const jq = require("node-jq");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const name = flags.name;
    const id = flags.id;
    const start = flags.start;
    const end = flags.end;
    const limit = flags.limit;
    const jsonQuery = flags.jq;
    const api = flags.api;

    var processResult = [];
    try {
      if (name) {
        processResult = await knex
          .select("*")
          .from("process")
          .where("name", name);
      } else if (id) {
        processResult = await knex
          .select("*")
          .from("process_audit")
          .where("process_audit_id", id);
      }
    } catch (error) {
      this.error(error);
    }

    if (processResult.length > 0 || (!name && !id)) {
      var processAuditResult;
      try {
        if (name) {
          processAuditResult = await knex
            .select("process.name as process_name", "process_audit.*")
            .from("process_audit")
            .join("process", "process_audit.process_id", "process.process_id")
            .where("process_audit.process_id", processResult[0]["process_id"])
            .where("process_audit.start", ">=", start)
            .where("process_audit.start", "<=", end)
            .orderBy("process_audit_id", "desc")
            .limit(limit);
        } else if (id) {
          processAuditResult = await knex
            .select("process.name as process_name", "process_audit.*")
            .from("process_audit")
            .join("process", "process_audit.process_id", "process.process_id")
            .where("process_audit.process_audit_id", id)
            .where("process_audit.start", ">=", start)
            .where("process_audit.start", "<=", end)
            .orderBy("process_audit_id", "desc")
            .limit(limit);
        } else {
          processAuditResult = await knex
            .select("process.name as process_name", "process_audit.*")
            .from("process_audit")
            .join("process", "process_audit.process_id", "process.process_id")
            .where("process_audit.start", ">=", start)
            .where("process_audit.start", "<=", end)
            .orderBy("process_audit_id", "desc")
            .limit(limit);
        }
      } catch (error) {
        this.error(error);
      }

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
    } else {
      this.error(`Process '${name}' does not exist.`);
    }
  }
}

CustomCommand.description =
  "retrieve process instances (process audit) of a process";

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
  start: Flags.string({
    description: "date filter start",
    default: "1970-01-01",
    required: false,
  }),
  end: Flags.string({
    description: "date filter end",
    default: "2999-12-31",
    required: false,
  }),
  limit: Flags.string({
    description: "limit the result set",
    default: "10",
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

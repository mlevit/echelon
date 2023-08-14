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

    var runResult = await knex
      .select(
        "job.name as job_name",
        "job.job_id",
        "run.run_id",
        "run.start",
        "run.end",
        "run.status"
      )
      .from("run")
      .join("job", "run.job_id", "job.job_id")
      .where("start", ">=", start)
      .where("start", "<=", end)
      .orderBy("run_id", "desc");

    if (jsonQuery) {
      runResult = await jq.run(jsonQuery, runResult, {
        input: "json",
        output: "json",
      });
    }

    if (api) {
      return runResult;
    } else {
      this.log(runResult);
    }
  }
}

CustomCommand.description = "retrieve job instances (run) of a job";

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

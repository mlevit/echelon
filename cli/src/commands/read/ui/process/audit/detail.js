const { Command, Flags } = require("@oclif/core");
const knex = require("../../../../../knex.js");
const jq = require("node-jq");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const runId = flags.id;
    const jsonQuery = flags.jq;
    const api = flags.api;

    try {
      var runResult = await knex.select("*").from("run").where("run_id", runId);
    } catch (error) {
      this.error(error);
    }

    if (runResult.length > 0) {
      try {
        var runResult = await knex
          .select("job.name as job_name", "run.start", "run.end", "run.status")
          .from("run")
          .join("job", "run.job_id", "job.job_id")
          .where({
            run_id: runId,
          });
      } catch (error) {
        this.error(error);
      }

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
    } else {
      this.error(`run ID '${runId}' does not exist.`);
    }
  }
}

CustomCommand.description =
  "retrieve information associated with a job instance (run)";

CustomCommand.flags = {
  id: Flags.string({
    description: "run ID",
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

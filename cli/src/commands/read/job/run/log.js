const { Command, Flags } = require("@oclif/core");
const knex = require("../../../../knex.js");
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
        var logResult = await knex
          .select("*")
          .from("log")
          .where({
            run_id: runId,
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
      this.error(`run ID '${runId}' does not exist.`);
    }
  }
}

CustomCommand.description =
  "retrieve logs associated with a job instance (run)";

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

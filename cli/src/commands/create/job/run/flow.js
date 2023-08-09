const { Command, Flags } = require("@oclif/core");
const knex = require("../../../../knex.js");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const runId = flags.id;
    const job = flags.job;
    const func = flags.function;
    const label = flags.label;
    const count = flags.count;
    const api = flags.api;

    try {
      var runResult = await knex.select("*").from("run").where("run_id", runId);
    } catch (error) {
      this.error(error);
    }

    if (runResult.length > 0) {
      try {
        var flowResult = await knex
          .insert({
            run_id: runId,
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
      this.error(`Run '${runId}' does not exist.`);
    }
  }
}

CustomCommand.description =
  "store data source metrics against an instance of a job (run)";

CustomCommand.flags = {
  id: Flags.string({
    description: "run ID",
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

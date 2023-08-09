const { Command, Flags } = require("@oclif/core");
const knex = require("../../../../knex.js");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const runId = flags.id;
    const status = flags.status;
    const api = flags.api;

    try {
      var isRunning = await knex
        .select("*")
        .from("run")
        .where({ run_id: runId, status: "running" });
    } catch (error) {
      this.error(error);
    }

    if (isRunning.length == 1) {
      try {
        var runResult = await knex
          .update({ status: status, end: knex.fn.now() })
          .where({ run_id: runId })
          .returning("*")
          .into("run");

        if (api) {
          return runResult;
        } else {
          this.log(JSON.stringify(runResult, null, 2));
        }
      } catch (error) {
        this.error(error);
      }
    } else {
      this.error(`run ID '${runId}' is not in a running state.`);
    }
  }
}

CustomCommand.description = "update an instance of a job (run)";

CustomCommand.flags = {
  id: Flags.string({
    description: "run ID",
    required: true,
  }),
  status: Flags.string({
    description: "run status",
    options: ["completed", "failed"],
    required: true,
  }),
  api: Flags.boolean({
    description: "(flag) is API result expected",
    hidden: true,
  }),
};

module.exports = CustomCommand;

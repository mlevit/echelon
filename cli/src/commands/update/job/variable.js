const { Command, Flags } = require("@oclif/core");
const knex = require("../../../knex.js");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const runId = flags.id;
    const type = flags.type;
    const name = flags.name;
    const value = flags.value;
    const api = flags.api;

    try {
      var jobResult = await knex.select("*").from("job").where("job_id", runId);
    } catch (error) {
      this.error(error);
    }

    if (jobResult.length > 0) {
      try {
        var jobVariableResult = await knex
          .insert({
            object_id: runId,
            object_type: type,
            name: name,
            value: value,
          })
          .returning("*")
          .into("variable")
          .onConflict(["object_id", "object_type", "name"])
          .merge();

        if (api) {
          return jobVariableResult;
        } else {
          this.log(JSON.stringify(jobVariableResult, null, 2));
        }
      } catch (error) {
        this.error(error);
      }
    } else {
      this.error(`Job '${runId}' does not exist.`);
    }
  }
}

CustomCommand.description = "update a variable value associated with a job";

CustomCommand.flags = {
  id: Flags.string({
    description: "run ID",
    required: true,
  }),
  type: Flags.string({
    description: "job type",
    required: true,
  }),
  name: Flags.string({
    description: "variable name",
    required: true,
  }),
  value: Flags.string({
    description: "variable value",
    required: true,
  }),
  api: Flags.boolean({
    description: "(flag) is API result expected",
    hidden: true,
  }),
};

module.exports = CustomCommand;

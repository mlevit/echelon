const { Command, Flags } = require("@oclif/core");
const knex = require("../../../../knex.js");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const runId = flags.id;
    const registryId = flags.registry_id;
    const api = flags.api;

    try {
      var registryResult = await knex
        .insert({
          run_id: runId,
          registry_id: registryId,
        })
        .returning("*")
        .into("registry_run_map");

      if (api) {
        return registryResult;
      } else {
        this.log(JSON.stringify(registryResult, null, 2));
      }
    } catch (error) {
      this.error(error);
    }
  }
}

CustomCommand.description =
  "associate a registry object with an instance of a job (run)";

CustomCommand.flags = {
  id: Flags.string({
    description: "run ID",
    required: true,
  }),
  registry_id: Flags.string({
    description: "registry run_id",
    required: true,
  }),
  api: Flags.boolean({
    description: "(flag) is API result expected",
    hidden: true,
  }),
};

module.exports = CustomCommand;

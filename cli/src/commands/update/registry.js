const { Command, Flags } = require("@oclif/core");
const knex = require("../../knex.js");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const registryId = flags.id;
    const status = flags.status;
    const api = flags.api;

    try {
      var registryResult = await knex
        .select("*")
        .from("registry")
        .where("registry_id", registryId);
    } catch (error) {
      this.error(error);
    }

    if (registryResult.length > 0) {
      try {
        var registryUpdateResult = await knex
          .where("registry_id", registryId)
          .update("status", status)
          .returning("*")
          .into("registry");

        if (api) {
          return registryUpdateResult;
        } else {
          this.log(JSON.stringify(registryUpdateResult, null, 2));
        }
      } catch (error) {
        this.error(error);
      }
    } else {
      this.error(`Registry '${registryId}' does not exist.`);
    }
  }
}

CustomCommand.description = "update a registry object";

CustomCommand.flags = {
  id: Flags.string({
    description: "registry ID",
    required: true,
  }),
  status: Flags.string({
    description: "status of the registered object",
    required: false,
  }),
  api: Flags.boolean({
    description: "(flag) is API result expected",
    hidden: true,
  }),
};

module.exports = CustomCommand;

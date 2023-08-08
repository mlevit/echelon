const { Command, Flags } = require("@oclif/core");
const knex = require("../../../../knex.js");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const processAuditId = flags.id;
    const registryId = flags.registry_id;
    const api = flags.api;

    try {
      var registryResult = await knex
        .insert({
          process_audit_id: processAuditId,
          registry_id: registryId,
        })
        .returning("*")
        .into("registry_process_audit_map");

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
  "associate a registry object with an instance of a process (process audit)";

CustomCommand.flags = {
  id: Flags.string({
    description: "process audit ID",
    required: true,
  }),
  registry_id: Flags.string({
    description: "registry process_audit_id",
    required: true,
  }),
  api: Flags.boolean({
    description: "(flag) is API result expected",
    hidden: true,
  }),
};

module.exports = CustomCommand;

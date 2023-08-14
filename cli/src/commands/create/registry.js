const { Command, Flags } = require("@oclif/core");
const knex = require("../../knex.js");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const name = flags.name;
    const path = flags.path;
    const server = flags.server;
    const size = flags.size;
    const checksum = flags.checksum;
    const type = flags.type;
    const status = flags.status;
    const api = flags.api;

    try {
      var registryResult = await knex
        .insert({
          name: name,
          path: path,
          server: server,
          size: size,
          checksum: checksum,
          type: type,
          status: status,
        })
        .returning("*")
        .into("registry");

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

CustomCommand.description = "register an incoming or outgoing object";

CustomCommand.flags = {
  name: Flags.string({
    description: "full name of the registered object",
    required: true,
  }),
  path: Flags.string({
    description: "path to the registered object",
    required: true,
  }),
  server: Flags.string({
    description:
      "server of the registered object (i.e., file server IP or DNS or S3 Bucket name)    ",
    required: true,
  }),
  size: Flags.string({
    description: "size of the registered object in KB",
    required: true,
  }),
  checksum: Flags.string({
    description: "MD5 checksum of the registered object",
    required: true,
  }),
  type: Flags.string({
    description: "object type (e.g., CSV, TXT, DAT etc.)",
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

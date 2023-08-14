const { Command, Flags } = require("@oclif/core");
const knex = require("../../../knex.js");
const jq = require("node-jq");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const name = flags.name;
    const id = flags.id;
    const limit = flags.limit;
    const jsonQuery = flags.jq;
    const api = flags.api;

    var jobResult;
    try {
      if (name) {
        jobResult = await knex
          .select("*")
          .from("job")
          .where("name", name)
          .orderBy("name");
      } else if (id) {
        jobResult = await knex
          .select("*")
          .from("job")
          .where("job_id", id)
          .orderBy("name");
      } else {
        jobResult = await knex
          .select("*")
          .from("job")
          .orderBy("name")
          .limit(limit);
      }
    } catch (error) {
      this.error(error);
    }

    if (jsonQuery) {
      jobResult = await jq.run(jsonQuery, jobResult, {
        input: "json",
        output: "json",
      });
    }

    if (api) {
      return jobResult;
    } else {
      this.log(jobResult);
    }
  }
}

CustomCommand.description = "retrieve job(es)";

CustomCommand.flags = {
  name: Flags.string({
    description: "job name",
    required: false,
    exclusive: ["id"],
  }),
  id: Flags.string({
    description: "job id",
    required: false,
    exclusive: ["name"],
  }),
  limit: Flags.string({
    description: "limit the result set",
    default: 10,
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

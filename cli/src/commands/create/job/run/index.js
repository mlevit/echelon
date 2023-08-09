const { Command, Flags } = require("@oclif/core");
const knex = require("../../../../knex.js");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const name = flags.name;
    const api = flags.api;

    try {
      var jobIdResult = await knex
        .select("job_id")
        .from("job")
        .where("name", name);
    } catch (error) {
      this.error(error);
    }

    if (jobIdResult.length > 0) {
      try {
        var jobResult = await knex
          .insert({ job_id: jobIdResult[0]["job_id"] })
          .returning("*")
          .into("run");

        if (api) {
          return jobResult;
        } else {
          this.log(JSON.stringify(jobResult, null, 2));
        }
      } catch (error) {
        this.error(error);
      }
    } else {
      this.error(`Job '${name}' does not exist.`);
    }
  }
}

CustomCommand.description = "create an instance of a job (run)";

CustomCommand.flags = {
  name: Flags.string({
    description: "job name",
    required: true,
  }),
  api: Flags.boolean({
    description: "(flag) is API result expected",
    hidden: true,
  }),
};

module.exports = CustomCommand;

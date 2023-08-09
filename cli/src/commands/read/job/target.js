const { Command, Flags } = require("@oclif/core");
const knex = require("../../../knex.js");
const jq = require("node-jq");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const name = flags.name;
    const jsonQuery = flags.jq;
    const api = flags.api;

    try {
      var jobResult = await knex.select("*").from("job").where("name", name);
    } catch (error) {
      this.error(error);
    }

    if (jobResult.length > 0) {
      try {
        var artefactResult = await knex
          .distinct("artefact.*")
          .from("artefact")
          .join(
            "job_artefact_rel",
            "artefact.artefact_id",
            "job_artefact_rel.target_artefact_id"
          )
          .where("job_artefact_rel.job_id", jobResult[0]["job_id"]);
      } catch (error) {
        this.error(error);
      }

      if (jsonQuery) {
        artefactResult = await jq.run(jsonQuery, artefactResult, {
          input: "json",
          output: "json",
        });
      }

      if (api) {
        return artefactResult;
      } else {
        this.log(artefactResult);
      }
    } else {
      this.error(`Job '${name}' does not exist.`);
    }
  }
}

CustomCommand.description = "retrieve target artefacts associated with a job";

CustomCommand.flags = {
  name: Flags.string({
    description: "job name",
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

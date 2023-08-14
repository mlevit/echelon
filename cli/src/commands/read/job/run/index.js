const { Command, Flags } = require("@oclif/core");
const knex = require("../../../../knex.js");
const jq = require("node-jq");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const name = flags.name;
    const id = flags.id;
    const start = flags.start;
    const end = flags.end;
    const limit = flags.limit;
    const jsonQuery = flags.jq;
    const api = flags.api;

    var jobResult = [];
    try {
      if (name) {
        jobResult = await knex.select("*").from("job").where("name", name);
      } else if (id) {
        jobResult = await knex.select("*").from("run").where("run_id", id);
      }
    } catch (error) {
      this.error(error);
    }

    if (jobResult.length > 0 || (!name && !id)) {
      var runResult;
      try {
        if (name) {
          runResult = await knex
            .select("job.name as job_name", "run.*")
            .from("run")
            .join("job", "run.job_id", "job.job_id")
            .where("run.job_id", jobResult[0]["job_id"])
            .where("run.start", ">=", start)
            .where("run.start", "<=", end)
            .orderBy("run_id", "desc")
            .limit(limit);
        } else if (id) {
          runResult = await knex
            .select("job.name as job_name", "run.*")
            .from("run")
            .join("job", "run.job_id", "job.job_id")
            .where("run.run_id", id)
            .where("run.start", ">=", start)
            .where("run.start", "<=", end)
            .orderBy("run_id", "desc")
            .limit(limit);
        } else {
          runResult = await knex
            .select("job.name as job_name", "run.*")
            .from("run")
            .join("job", "run.job_id", "job.job_id")
            .where("run.start", ">=", start)
            .where("run.start", "<=", end)
            .orderBy("run_id", "desc")
            .limit(limit);
        }
      } catch (error) {
        this.error(error);
      }

      if (jsonQuery) {
        runResult = await jq.run(jsonQuery, runResult, {
          input: "json",
          output: "json",
        });
      }

      if (api) {
        return runResult;
      } else {
        this.log(runResult);
      }
    } else {
      this.error(`Job '${name}' does not exist.`);
    }
  }
}

CustomCommand.description = "retrieve job instances (run) of a job";

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
  start: Flags.string({
    description: "date filter start",
    default: "1970-01-01",
    required: false,
  }),
  end: Flags.string({
    description: "date filter end",
    default: "2999-12-31",
    required: false,
  }),
  limit: Flags.string({
    description: "limit the result set",
    default: "10",
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

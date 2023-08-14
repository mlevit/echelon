const { Command, Flags } = require("@oclif/core");
const knex = require("../../knex.js");
const jq = require("node-jq");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const sql = flags.sql;
    const output = flags.output || flags.jq;
    const jsonQuery = flags.jq;
    const api = flags.api;

    try {
      var rawQueryResult = await knex.raw(sql);
      var queryResult = this.normalizeDBResult(rawQueryResult);
    } catch (error) {
      this.error(error);
    }

    if (jsonQuery) {
      queryResult = await jq.run(jsonQuery, JSON.stringify(queryResult), {
        input: "string",
        output: "json",
      });
    }
    if (api) {
      return queryResult;
    }
    if (output) {
      this.log(queryResult);
    }
  }

  normalizeDBResult(result) {
    switch (knex.client.config.client) {
      case 'pg':
        return result && result.rows;
      default:
        return result;
    }
  }
}

CustomCommand.description = "execute a SQL query";

CustomCommand.flags = {
  sql: Flags.string({
    description: "SQL query",
    required: true,
  }),
  output: Flags.boolean({
    description: "output results",
    default: false,
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

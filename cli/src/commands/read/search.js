const { Command, Flags } = require("@oclif/core");
const knex = require("../../knex.js");
const jq = require("node-jq");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const jsonQuery = flags.jq;
    const api = flags.api;

    try {
      var searchResult = await knex
        .select(
          knex.raw("'job_' || job_id as id"),
          "name as title",
          "name",
          "description",
          "type",
          knex.raw("'job' as object")
        )
        .from("job")
        .unionAll(function () {
          this.select(
            knex.raw("'entity_' || entity_id as id"),
            "name as title",
            "name",
            "description",
            "type",
            knex.raw("'entity' as object")
          ).from("entity");
        })
        .unionAll(function () {
          this.select(
            knex.raw(
              "'entity_' || field.entity_id || '_field_' || field.field_id as id"
            ),
            knex.raw("physical_name || ' - ' || entity.name as title"),
            "physical_name as name",
            "field.description",
            "field.data_type as type",
            knex.raw("'field' as object")
          )
            .from("field")
            .join("entity", "field.entity_id", "entity.entity_id");
        });
    } catch (error) {
      this.error(error);
    }

    if (jsonQuery) {
      searchResult = await jq.run(jsonQuery, searchResult, {
        input: "json",
        output: "json",
      });
    }

    if (api) {
      return searchResult;
    } else {
      this.log(searchResult);
    }
  }
}

CustomCommand.description = "retrieve job(es)";

CustomCommand.flags = {
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

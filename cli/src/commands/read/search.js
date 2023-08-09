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
            knex.raw("'data_' || artefact_id as id"),
            "name as title",
            "name",
            "description",
            "type",
            knex.raw("'data' as object")
          ).from("artefact");
        })
        .unionAll(function () {
          this.select(
            knex.raw(
              "'data_' || attribute.artefact_id || '_field_' || attribute.attribute_id as id"
            ),
            knex.raw("physical_name || ' - ' || artefact.name as title"),
            "physical_name as name",
            "attribute.description",
            "attribute.data_type as type",
            knex.raw("'field' as object")
          )
            .from("attribute")
            .join("artefact", "attribute.artefact_id", "artefact.artefact_id");
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

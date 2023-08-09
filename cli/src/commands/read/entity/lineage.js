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
      var entityResult = await knex
        .select("*")
        .from("entity")
        .where("name", name);
    } catch (error) {
      this.error(error);
    }

    if (entityResult.length > 0) {
      try {
        var lineageResult = await knex
          .with("lineage", (qb) => {
            qb.select(["source_entity_id", "target_entity_id"])
              .from("job_entity_rel")
              .where("source_entity_id", entityResult[0]["entity_id"])
              .orWhere("target_entity_id", entityResult[0]["entity_id"]);
          })
          .select([
            "lineage.source_entity_id",
            "source_entity.name as source_entity_name",
            "lineage.target_entity_id",
            "target_entity.name as target_entity_name",
          ])
          .count("*")
          .from("job_entity_rel")
          .join("lineage", function () {
            this.on(
              "lineage.source_entity_id",
              "job_entity_rel.target_entity_id"
            ).orOn(
              "lineage.target_entity_id",
              "job_entity_rel.source_entity_id"
            );
          })
          .join(
            "entity as source_entity",
            "source_entity.entity_id",
            "lineage.source_entity_id"
          )
          .join(
            "entity as target_entity",
            "target_entity.entity_id",
            "lineage.target_entity_id"
          )
          .groupBy([
            "lineage.source_entity_id",
            "source_entity.name",
            "lineage.target_entity_id",
            "target_entity.name",
          ]);
      } catch (error) {
        this.error(error);
      }

      if (jsonQuery) {
        lineageResult = await jq.run(jsonQuery, lineageResult, {
          input: "json",
          output: "json",
        });
      }

      if (api) {
        return lineageResult;
      } else {
        this.log(lineageResult);
      }
    } else {
      this.error(`Entity '${name}' does not exist.`);
    }
  }
}

CustomCommand.description = "retrieve variables associated with an entity";

CustomCommand.flags = {
  name: Flags.string({
    description: "entity name",
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

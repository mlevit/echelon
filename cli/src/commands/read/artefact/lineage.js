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
      var artefactResult = await knex
        .select("*")
        .from("artefact")
        .where("name", name);
    } catch (error) {
      this.error(error);
    }

    if (artefactResult.length > 0) {
      try {
        var lineageResult = await knex
          .with("lineage", (qb) => {
            qb.select(["source_artefact_id", "target_artefact_id"])
              .from("process_artefact_rel")
              .where("source_artefact_id", artefactResult[0]["artefact_id"])
              .orWhere("target_artefact_id", artefactResult[0]["artefact_id"]);
          })
          .select([
            "lineage.source_artefact_id",
            "source_artefact.name as source_artefact_name",
            "lineage.target_artefact_id",
            "target_artefact.name as target_artefact_name",
          ])
          .count("*")
          .from("process_artefact_rel")
          .join("lineage", function () {
            this.on(
              "lineage.source_artefact_id",
              "process_artefact_rel.target_artefact_id"
            ).orOn(
              "lineage.target_artefact_id",
              "process_artefact_rel.source_artefact_id"
            );
          })
          .join(
            "artefact as source_artefact",
            "source_artefact.artefact_id",
            "lineage.source_artefact_id"
          )
          .join(
            "artefact as target_artefact",
            "target_artefact.artefact_id",
            "lineage.target_artefact_id"
          )
          .groupBy([
            "lineage.source_artefact_id",
            "source_artefact.name",
            "lineage.target_artefact_id",
            "target_artefact.name",
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
      this.error(`Artefact '${name}' does not exist.`);
    }
  }
}

CustomCommand.description = "retrieve variables associated with an artefact";

CustomCommand.flags = {
  name: Flags.string({
    description: "artefact name",
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

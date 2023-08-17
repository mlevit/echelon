const { Command, Flags } = require("@oclif/core");
const knex = require("../../knex.js");
const jq = require("node-jq");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const api = flags.api;

    const jqGroupByJobId =
      "group_by(.job_id) | map({(.[0].job_id|tostring): map({id: .id, label: .label})}) | add";
    const jqGroupByEntityId =
      "group_by(.entity_id) | map({(.[0].entity_id|tostring): map({id: .id, label: .label})}) | add";
    const jqGroupByJobIdEntities =
      "group_by(.job_id) | map({(.[0].job_id|tostring): map({id: .source_entity_id, label: .source_entity_name},{id: .target_entity_id, label: .target_entity_name})}) | add";

    try {
      var jobResult = await knex
        .select("job_id as id", "name as label")
        .from("job")
        .orderBy("name");
      jobResult = await jq.run("map({(.id|tostring): .}) | add", jobResult, {
        input: "json",
        output: "json",
      });

      var jobConstantResult = await knex
        .select(
          knex.raw("'job_constant_' || job_constant_id as id"),
          "job_id",
          "name as label"
        )
        .from("job_constant")
        .orderBy("name");
      jobConstantResult = await jq.run(jqGroupByJobId, jobConstantResult, {
        input: "json",
        output: "json",
      });

      var jobEntityRelResult = await knex
        .select(
          knex.raw("'job_entity_rel_' || job_entity_rel_id as id"),
          "job_id",
          knex.raw("se.name || ' > ' || te.name as label"),
          "se.entity_id as source_entity_id",
          "se.name as source_entity_name",
          "te.entity_id as target_entity_id",
          "te.name as target_entity_name"
        )
        .from("job_entity_rel")
        .leftJoin(
          "entity as se",
          "job_entity_rel.source_entity_id",
          "se.entity_id"
        )
        .leftJoin(
          "entity as te",
          "job_entity_rel.target_entity_id",
          "te.entity_id"
        )
        .orderBy("sequence_number");

      var jobEntitiesResult = await jq.run(
        jqGroupByJobIdEntities,
        jobEntityRelResult,
        {
          input: "json",
          output: "json",
        }
      );

      jobEntityRelResult = await jq.run(jqGroupByJobId, jobEntityRelResult, {
        input: "json",
        output: "json",
      });

      var entityConstantResult = await knex
        .select(
          knex.raw("'entity_constant_' || entity_constant_id as id"),
          "entity_id",
          "name as label"
        )
        .from("entity_constant")
        .orderBy("name");
      entityConstantResult = await jq.run(
        jqGroupByEntityId,
        entityConstantResult,
        {
          input: "json",
          output: "json",
        }
      );

      var entityFieldResult = await knex
        .select(
          knex.raw("'field_' || field_id as id"),
          "entity_id",
          "physical_name as label"
        )
        .from("field")
        .orderBy("sequence_number");
      entityFieldResult = await jq.run(jqGroupByEntityId, entityFieldResult, {
        input: "json",
        output: "json",
      });

      var resultDict = { id: "jobs", label: "Jobs", children: [] };

      for (const job in jobResult) {
        let jobDict = {
          id: `job_${job}`,
          label: jobResult[job].label,
          children: [],
        };

        if (jobConstantResult.hasOwnProperty(job)) {
          jobDict["children"].push({
            id: `job_${job}_job_constants`,
            label: "Constants",
            children: jobConstantResult[job],
          });
        }

        if (jobEntitiesResult.hasOwnProperty(job)) {
          let entitiesDict = {
            id: `job_${job}_entities`,
            label: "Entities",
            children: [],
          };

          for (const entity of jobEntitiesResult[job]) {
            console.log(entity);
            let entityDict = {
              id: `entity_${entity.id}`,
              label: entity.label,
              children: [],
            };

            if (entityConstantResult.hasOwnProperty(entity.id)) {
              entityDict["children"].push({
                id: `entity_${entity.id}_constants`,
                label: "Constants",
                children: entityConstantResult[entity.id],
              });
            } else {
              console.log(`${entity.id} not found in entityConstantResult`);
            }

            if (entityFieldResult.hasOwnProperty(entity.id)) {
              entityDict["children"].push({
                id: `entity_${entity.id}_fields`,
                label: "Fields",
                children: entityFieldResult[entity.id],
              });
            }

            entitiesDict["children"].push(entityDict);
          }

          jobDict["children"].push(entitiesDict);
        }

        if (jobEntityRelResult.hasOwnProperty(job)) {
          jobDict["children"].push({
            id: `job_${job}_job_entity_rels`,
            label: "Relationships",
            children: jobEntityRelResult[job],
          });
        }

        resultDict["children"].push(jobDict);
      }
    } catch (error) {
      this.error(error);
    }

    if (api) {
      return resultDict;
    } else {
      this.log(resultDict);
    }
  }
}

CustomCommand.description = "retrieve all data for export";

CustomCommand.flags = {
  api: Flags.boolean({
    description: "(flag) is API result expected",
    hidden: true,
  }),
};

module.exports = CustomCommand;

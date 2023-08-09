exports.seed = function (knex) {
  return knex("job_attribute_map").insert([
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Inventory" })
        .select("job_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_inventory" })
            .select("artefact_id"),
          physical_name: "inventory_id",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_inventory" })
            .select("artefact_id"),
          physical_name: "inventory_id",
        })
        .select("attribute_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Inventory" })
        .select("job_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_inventory" })
            .select("artefact_id"),
          physical_name: "film_id",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_inventory" })
            .select("artefact_id"),
          physical_name: "film_id",
        })
        .select("attribute_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Inventory" })
        .select("job_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_inventory" })
            .select("artefact_id"),
          physical_name: "store_id",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_inventory" })
            .select("artefact_id"),
          physical_name: "store_id",
        })
        .select("attribute_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Inventory" })
        .select("job_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_inventory" })
            .select("artefact_id"),
          physical_name: "last_update",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_inventory" })
            .select("artefact_id"),
          physical_name: "last_update",
        })
        .select("attribute_id"),
    },
  ]);
};

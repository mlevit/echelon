exports.seed = function (knex) {
  return knex("job_field_map").insert([
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Inventory" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "raw_sakila_inventory" })
            .select("entity_id"),
          physical_name: "inventory_id",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_inventory" })
            .select("entity_id"),
          physical_name: "inventory_id",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Inventory" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "raw_sakila_inventory" })
            .select("entity_id"),
          physical_name: "film_id",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_inventory" })
            .select("entity_id"),
          physical_name: "film_id",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Inventory" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "raw_sakila_inventory" })
            .select("entity_id"),
          physical_name: "store_id",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_inventory" })
            .select("entity_id"),
          physical_name: "store_id",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Inventory" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "raw_sakila_inventory" })
            .select("entity_id"),
          physical_name: "last_update",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_inventory" })
            .select("entity_id"),
          physical_name: "last_update",
        })
        .select("field_id"),
    },
  ]);
};

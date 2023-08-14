exports.seed = function (knex) {
  return knex("job_entity_rel").insert([
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Customer" })
        .select("job_id"),
      sequence_number: 1,
      source_entity_id: knex("entity")
        .where({ name: "raw_sakila_customer" })
        .select("entity_id"),
      target_entity_id: knex("entity")
        .where({ name: "staging_sakila_customer" })
        .select("entity_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Inventory" })
        .select("job_id"),
      sequence_number: 1,
      source_entity_id: knex("entity")
        .where({ name: "raw_sakila_inventory" })
        .select("entity_id"),
      target_entity_id: knex("entity")
        .where({ name: "staging_sakila_inventory" })
        .select("entity_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Rental" })
        .select("job_id"),
      sequence_number: 1,
      source_entity_id: knex("entity")
        .where({ name: "raw_sakila_rental" })
        .select("entity_id"),
      target_entity_id: knex("entity")
        .where({ name: "staging_sakila_rental" })
        .select("entity_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Staff" })
        .select("job_id"),
      sequence_number: 1,
      source_entity_id: knex("entity")
        .where({ name: "raw_sakila_staff" })
        .select("entity_id"),
      target_entity_id: knex("entity")
        .where({ name: "staging_sakila_staff" })
        .select("entity_id"),
    },
    {
      job_id: knex("job")
        .where({
          name: "Load Dim Sakila Customer",
        })
        .select("job_id"),
      sequence_number: 1,
      source_entity_id: knex("entity")
        .where({ name: "staging_sakila_customer" })
        .select("entity_id"),
      target_entity_id: knex("entity")
        .where({ name: "presentation_dim_sakila_customer" })
        .select("entity_id"),
    },
    {
      job_id: knex("job")
        .where({
          name: "Load Dim Sakila Inventory",
        })
        .select("job_id"),
      sequence_number: 1,
      source_entity_id: knex("entity")
        .where({ name: "staging_sakila_inventory" })
        .select("entity_id"),
      target_entity_id: knex("entity")
        .where({ name: "presentation_dim_sakila_inventory" })
        .select("entity_id"),
    },
    {
      job_id: knex("job")
        .where({
          name: "Load Dim Sakila Staff",
        })
        .select("job_id"),
      sequence_number: 1,
      source_entity_id: knex("entity")
        .where({ name: "staging_sakila_staff" })
        .select("entity_id"),
      target_entity_id: knex("entity")
        .where({ name: "presentation_dim_sakila_staff" })
        .select("entity_id"),
    },
    {
      job_id: knex("job")
        .where({
          name: "Load Fact Sakila Rental",
        })
        .select("job_id"),
      sequence_number: 1,
      source_entity_id: knex("entity")
        .where({ name: "staging_sakila_rental" })
        .select("entity_id"),
      target_entity_id: knex("entity")
        .where({ name: "presentation_fact_sakila_rental" })
        .select("entity_id"),
    },
    {
      job_id: knex("job")
        .where({
          name: "Load Fact Sakila Rental",
        })
        .select("job_id"),
      sequence_number: 2,
      source_entity_id: knex("entity")
        .where({ name: "presentation_dim_sakila_customer" })
        .select("entity_id"),
      target_entity_id: knex("entity")
        .where({ name: "presentation_fact_sakila_rental" })
        .select("entity_id"),
      required_flag: false,
    },
    {
      job_id: knex("job")
        .where({
          name: "Load Fact Sakila Rental",
        })
        .select("job_id"),
      sequence_number: 3,
      source_entity_id: knex("entity")
        .where({ name: "presentation_dim_sakila_inventory" })
        .select("entity_id"),
      target_entity_id: knex("entity")
        .where({ name: "presentation_fact_sakila_rental" })
        .select("entity_id"),
      required_flag: false,
    },
    {
      job_id: knex("job")
        .where({
          name: "Load Fact Sakila Rental",
        })
        .select("job_id"),
      sequence_number: 4,
      source_entity_id: knex("entity")
        .where({ name: "presentation_dim_sakila_staff" })
        .select("entity_id"),
      target_entity_id: knex("entity")
        .where({ name: "presentation_fact_sakila_rental" })
        .select("entity_id"),
      required_flag: false,
    },
  ]);
};

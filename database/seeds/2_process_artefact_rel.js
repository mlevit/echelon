exports.seed = function (knex) {
  return knex("process_artefact_rel").insert([
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Customer" })
        .select("process_id"),
      sequence_number: 1,
      source_artefact_id: knex("artefact")
        .where({ name: "raw_sakila_customer" })
        .select("artefact_id"),
      target_artefact_id: knex("artefact")
        .where({ name: "staging_sakila_customer" })
        .select("artefact_id"),
    },
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Inventory" })
        .select("process_id"),
      sequence_number: 1,
      source_artefact_id: knex("artefact")
        .where({ name: "raw_sakila_inventory" })
        .select("artefact_id"),
      target_artefact_id: knex("artefact")
        .where({ name: "staging_sakila_inventory" })
        .select("artefact_id"),
    },
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Rental" })
        .select("process_id"),
      sequence_number: 1,
      source_artefact_id: knex("artefact")
        .where({ name: "raw_sakila_rental" })
        .select("artefact_id"),
      target_artefact_id: knex("artefact")
        .where({ name: "staging_sakila_rental" })
        .select("artefact_id"),
    },
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Staff" })
        .select("process_id"),
      sequence_number: 1,
      source_artefact_id: knex("artefact")
        .where({ name: "raw_sakila_staff" })
        .select("artefact_id"),
      target_artefact_id: knex("artefact")
        .where({ name: "staging_sakila_staff" })
        .select("artefact_id"),
    },
    {
      process_id: knex("process")
        .where({
          name: "Load Dim Sakila Customer",
        })
        .select("process_id"),
      sequence_number: 1,
      source_artefact_id: knex("artefact")
        .where({ name: "staging_sakila_customer" })
        .select("artefact_id"),
      target_artefact_id: knex("artefact")
        .where({ name: "presentation_dim_sakila_customer" })
        .select("artefact_id"),
    },
    {
      process_id: knex("process")
        .where({
          name: "Load Dim Sakila Inventory",
        })
        .select("process_id"),
      sequence_number: 1,
      source_artefact_id: knex("artefact")
        .where({ name: "staging_sakila_inventory" })
        .select("artefact_id"),
      target_artefact_id: knex("artefact")
        .where({ name: "presentation_dim_sakila_inventory" })
        .select("artefact_id"),
    },
    {
      process_id: knex("process")
        .where({
          name: "Load Dim Sakila Staff",
        })
        .select("process_id"),
      sequence_number: 1,
      source_artefact_id: knex("artefact")
        .where({ name: "staging_sakila_staff" })
        .select("artefact_id"),
      target_artefact_id: knex("artefact")
        .where({ name: "presentation_dim_sakila_staff" })
        .select("artefact_id"),
    },
    {
      process_id: knex("process")
        .where({
          name: "Load Fact Sakila Rental",
        })
        .select("process_id"),
      sequence_number: 1,
      source_artefact_id: knex("artefact")
        .where({ name: "staging_sakila_rental" })
        .select("artefact_id"),
      target_artefact_id: knex("artefact")
        .where({ name: "presentation_fact_sakila_rental" })
        .select("artefact_id"),
    },
    {
      process_id: knex("process")
        .where({
          name: "Load Fact Sakila Rental",
        })
        .select("process_id"),
      sequence_number: 2,
      source_artefact_id: knex("artefact")
        .where({ name: "presentation_dim_sakila_customer" })
        .select("artefact_id"),
      target_artefact_id: knex("artefact")
        .where({ name: "presentation_fact_sakila_rental" })
        .select("artefact_id"),
      required_flag: false,
    },
    {
      process_id: knex("process")
        .where({
          name: "Load Fact Sakila Rental",
        })
        .select("process_id"),
      sequence_number: 3,
      source_artefact_id: knex("artefact")
        .where({ name: "presentation_dim_sakila_inventory" })
        .select("artefact_id"),
      target_artefact_id: knex("artefact")
        .where({ name: "presentation_fact_sakila_rental" })
        .select("artefact_id"),
      required_flag: false,
    },
    {
      process_id: knex("process")
        .where({
          name: "Load Fact Sakila Rental",
        })
        .select("process_id"),
      sequence_number: 4,
      source_artefact_id: knex("artefact")
        .where({ name: "presentation_dim_sakila_staff" })
        .select("artefact_id"),
      target_artefact_id: knex("artefact")
        .where({ name: "presentation_fact_sakila_rental" })
        .select("artefact_id"),
      required_flag: false,
    },
  ]);
};

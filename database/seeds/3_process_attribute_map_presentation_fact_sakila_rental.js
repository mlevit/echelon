exports.seed = function (knex) {
  return knex("process_attribute_map").insert([
    {
      process_id: knex("process")
        .where({ name: "Load Fact Sakila Rental" })
        .select("process_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_rental" })
            .select("artefact_id"),
          physical_name: "rental_id",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "presentation_fact_sakila_rental" })
            .select("artefact_id"),
          physical_name: "rental_id",
        })
        .select("attribute_id"),
    },
    {
      process_id: knex("process")
        .where({ name: "Load Fact Sakila Rental" })
        .select("process_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "presentation_dim_sakila_inventory" })
            .select("artefact_id"),
          physical_name: "inventory_sk",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "presentation_fact_sakila_rental" })
            .select("artefact_id"),
          physical_name: "inventory_sk",
        })
        .select("attribute_id"),
    },
    {
      process_id: knex("process")
        .where({ name: "Load Fact Sakila Rental" })
        .select("process_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "presentation_dim_sakila_customer" })
            .select("artefact_id"),
          physical_name: "customer_sk",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "presentation_fact_sakila_rental" })
            .select("artefact_id"),
          physical_name: "customer_sk",
        })
        .select("attribute_id"),
    },
    {
      process_id: knex("process")
        .where({ name: "Load Fact Sakila Rental" })
        .select("process_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "presentation_dim_sakila_staff" })
            .select("artefact_id"),
          physical_name: "staff_sk",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "presentation_fact_sakila_rental" })
            .select("artefact_id"),
          physical_name: "staff_sk",
        })
        .select("attribute_id"),
    },
    {
      process_id: knex("process")
        .where({ name: "Load Fact Sakila Rental" })
        .select("process_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_rental" })
            .select("artefact_id"),
          physical_name: "rental_date",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "presentation_fact_sakila_rental" })
            .select("artefact_id"),
          physical_name: "rental_date",
        })
        .select("attribute_id"),
    },
    {
      process_id: knex("process")
        .where({ name: "Load Fact Sakila Rental" })
        .select("process_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_rental" })
            .select("artefact_id"),
          physical_name: "return_date",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "presentation_fact_sakila_rental" })
            .select("artefact_id"),
          physical_name: "return_date",
        })
        .select("attribute_id"),
    },
  ]);
};

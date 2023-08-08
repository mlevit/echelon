exports.seed = function (knex) {
  return knex("process_attribute_map").insert([
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Rental" })
        .select("process_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_rental" })
            .select("artefact_id"),
          physical_name: "rental_id",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_rental" })
            .select("artefact_id"),
          physical_name: "rental_id",
        })
        .select("attribute_id"),
    },
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Rental" })
        .select("process_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_rental" })
            .select("artefact_id"),
          physical_name: "rental_date",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_rental" })
            .select("artefact_id"),
          physical_name: "rental_date",
        })
        .select("attribute_id"),
    },
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Rental" })
        .select("process_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_rental" })
            .select("artefact_id"),
          physical_name: "inventory_id",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_rental" })
            .select("artefact_id"),
          physical_name: "inventory_id",
        })
        .select("attribute_id"),
    },
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Rental" })
        .select("process_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_rental" })
            .select("artefact_id"),
          physical_name: "customer_id",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_rental" })
            .select("artefact_id"),
          physical_name: "customer_id",
        })
        .select("attribute_id"),
    },
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Rental" })
        .select("process_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_rental" })
            .select("artefact_id"),
          physical_name: "return_date",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_rental" })
            .select("artefact_id"),
          physical_name: "return_date",
        })
        .select("attribute_id"),
    },
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Rental" })
        .select("process_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_rental" })
            .select("artefact_id"),
          physical_name: "staff_id",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_rental" })
            .select("artefact_id"),
          physical_name: "staff_id",
        })
        .select("attribute_id"),
    },
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Rental" })
        .select("process_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_rental" })
            .select("artefact_id"),
          physical_name: "last_update",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_rental" })
            .select("artefact_id"),
          physical_name: "last_update",
        })
        .select("attribute_id"),
    },
  ]);
};

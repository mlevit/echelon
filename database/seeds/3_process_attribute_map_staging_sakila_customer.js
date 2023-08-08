exports.seed = function (knex) {
  return knex("process_attribute_map").insert([
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Customer" })
        .select("process_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_customer" })
            .select("artefact_id"),
          physical_name: "customer_id",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_customer" })
            .select("artefact_id"),
          physical_name: "customer_id",
        })
        .select("attribute_id"),
    },
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Customer" })
        .select("process_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_customer" })
            .select("artefact_id"),
          physical_name: "store_id",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_customer" })
            .select("artefact_id"),
          physical_name: "store_id",
        })
        .select("attribute_id"),
    },
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Customer" })
        .select("process_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_customer" })
            .select("artefact_id"),
          physical_name: "first_name",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_customer" })
            .select("artefact_id"),
          physical_name: "first_name",
        })
        .select("attribute_id"),
    },
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Customer" })
        .select("process_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_customer" })
            .select("artefact_id"),
          physical_name: "last_name",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_customer" })
            .select("artefact_id"),
          physical_name: "last_name",
        })
        .select("attribute_id"),
    },
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Customer" })
        .select("process_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_customer" })
            .select("artefact_id"),
          physical_name: "email",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_customer" })
            .select("artefact_id"),
          physical_name: "email",
        })
        .select("attribute_id"),
    },
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Customer" })
        .select("process_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_customer" })
            .select("artefact_id"),
          physical_name: "address_id",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_customer" })
            .select("artefact_id"),
          physical_name: "address_id",
        })
        .select("attribute_id"),
    },
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Customer" })
        .select("process_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_customer" })
            .select("artefact_id"),
          physical_name: "active",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_customer" })
            .select("artefact_id"),
          physical_name: "active",
        })
        .select("attribute_id"),
    },
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Customer" })
        .select("process_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_customer" })
            .select("artefact_id"),
          physical_name: "create_date",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_customer" })
            .select("artefact_id"),
          physical_name: "create_date",
        })
        .select("attribute_id"),
    },
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Customer" })
        .select("process_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_customer" })
            .select("artefact_id"),
          physical_name: "last_update",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_customer" })
            .select("artefact_id"),
          physical_name: "last_update",
        })
        .select("attribute_id"),
    },
  ]);
};

exports.seed = function (knex) {
  return knex("job_field_map").insert([
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Customer" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "raw_sakila_customer" })
            .select("entity_id"),
          physical_name: "customer_id",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_customer" })
            .select("entity_id"),
          physical_name: "customer_id",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Customer" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "raw_sakila_customer" })
            .select("entity_id"),
          physical_name: "store_id",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_customer" })
            .select("entity_id"),
          physical_name: "store_id",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Customer" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "raw_sakila_customer" })
            .select("entity_id"),
          physical_name: "first_name",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_customer" })
            .select("entity_id"),
          physical_name: "first_name",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Customer" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "raw_sakila_customer" })
            .select("entity_id"),
          physical_name: "last_name",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_customer" })
            .select("entity_id"),
          physical_name: "last_name",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Customer" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "raw_sakila_customer" })
            .select("entity_id"),
          physical_name: "email",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_customer" })
            .select("entity_id"),
          physical_name: "email",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Customer" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "raw_sakila_customer" })
            .select("entity_id"),
          physical_name: "address_id",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_customer" })
            .select("entity_id"),
          physical_name: "address_id",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Customer" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "raw_sakila_customer" })
            .select("entity_id"),
          physical_name: "active",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_customer" })
            .select("entity_id"),
          physical_name: "active",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Customer" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "raw_sakila_customer" })
            .select("entity_id"),
          physical_name: "create_date",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_customer" })
            .select("entity_id"),
          physical_name: "create_date",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Customer" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "raw_sakila_customer" })
            .select("entity_id"),
          physical_name: "last_update",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_customer" })
            .select("entity_id"),
          physical_name: "last_update",
        })
        .select("field_id"),
    },
  ]);
};
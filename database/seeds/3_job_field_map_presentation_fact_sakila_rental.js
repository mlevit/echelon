exports.seed = function (knex) {
  return knex("job_field_map").insert([
    {
      job_id: knex("job")
        .where({ name: "Load Fact Sakila Rental" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_rental" })
            .select("entity_id"),
          physical_name: "rental_id",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "presentation_fact_sakila_rental" })
            .select("entity_id"),
          physical_name: "rental_id",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Fact Sakila Rental" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "presentation_dim_sakila_inventory" })
            .select("entity_id"),
          physical_name: "inventory_sk",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "presentation_fact_sakila_rental" })
            .select("entity_id"),
          physical_name: "inventory_sk",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Fact Sakila Rental" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "presentation_dim_sakila_customer" })
            .select("entity_id"),
          physical_name: "customer_sk",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "presentation_fact_sakila_rental" })
            .select("entity_id"),
          physical_name: "customer_sk",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Fact Sakila Rental" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "presentation_dim_sakila_staff" })
            .select("entity_id"),
          physical_name: "staff_sk",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "presentation_fact_sakila_rental" })
            .select("entity_id"),
          physical_name: "staff_sk",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Fact Sakila Rental" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_rental" })
            .select("entity_id"),
          physical_name: "rental_date",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "presentation_fact_sakila_rental" })
            .select("entity_id"),
          physical_name: "rental_date",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Fact Sakila Rental" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_rental" })
            .select("entity_id"),
          physical_name: "return_date",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "presentation_fact_sakila_rental" })
            .select("entity_id"),
          physical_name: "return_date",
        })
        .select("field_id"),
    },
  ]);
};

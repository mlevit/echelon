exports.seed = function (knex) {
  return knex("job_field_map").insert([
    {
      job_id: knex("job")
        .where({ name: "Load Dim Sakila Staff" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_staff" })
            .select("entity_id"),
          physical_name: "staff_id",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "presentation_dim_sakila_staff" })
            .select("entity_id"),
          physical_name: "staff_id",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Dim Sakila Staff" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_staff" })
            .select("entity_id"),
          physical_name: "first_name",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "presentation_dim_sakila_staff" })
            .select("entity_id"),
          physical_name: "first_name",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Dim Sakila Staff" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_staff" })
            .select("entity_id"),
          physical_name: "last_name",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "presentation_dim_sakila_staff" })
            .select("entity_id"),
          physical_name: "last_name",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Dim Sakila Staff" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_staff" })
            .select("entity_id"),
          physical_name: "address_id",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "presentation_dim_sakila_staff" })
            .select("entity_id"),
          physical_name: "address_id",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Dim Sakila Staff" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_staff" })
            .select("entity_id"),
          physical_name: "picture",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "presentation_dim_sakila_staff" })
            .select("entity_id"),
          physical_name: "picture",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Dim Sakila Staff" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_staff" })
            .select("entity_id"),
          physical_name: "email",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "presentation_dim_sakila_staff" })
            .select("entity_id"),
          physical_name: "email",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Dim Sakila Staff" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_staff" })
            .select("entity_id"),
          physical_name: "store_id",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "presentation_dim_sakila_staff" })
            .select("entity_id"),
          physical_name: "store_id",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Dim Sakila Staff" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_staff" })
            .select("entity_id"),
          physical_name: "active",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "presentation_dim_sakila_staff" })
            .select("entity_id"),
          physical_name: "active",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Dim Sakila Staff" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_staff" })
            .select("entity_id"),
          physical_name: "username",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "presentation_dim_sakila_staff" })
            .select("entity_id"),
          physical_name: "username",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Dim Sakila Staff" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_staff" })
            .select("entity_id"),
          physical_name: "password",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "presentation_dim_sakila_staff" })
            .select("entity_id"),
          physical_name: "password",
        })
        .select("field_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Dim Sakila Staff" })
        .select("job_id"),
      source_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "staging_sakila_staff" })
            .select("entity_id"),
          physical_name: "last_update",
        })
        .select("field_id"),
      target_field_id: knex("field")
        .where({
          entity_id: knex("entity")
            .where({ name: "presentation_dim_sakila_staff" })
            .select("entity_id"),
          physical_name: "last_update",
        })
        .select("field_id"),
    },
  ]);
};

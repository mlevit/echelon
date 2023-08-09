exports.seed = function (knex) {
  return knex("job_attribute_map").insert([
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Staff" })
        .select("job_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_staff" })
            .select("artefact_id"),
          physical_name: "staff_id",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_staff" })
            .select("artefact_id"),
          physical_name: "staff_id",
        })
        .select("attribute_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Staff" })
        .select("job_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_staff" })
            .select("artefact_id"),
          physical_name: "first_name",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_staff" })
            .select("artefact_id"),
          physical_name: "first_name",
        })
        .select("attribute_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Staff" })
        .select("job_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_staff" })
            .select("artefact_id"),
          physical_name: "last_name",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_staff" })
            .select("artefact_id"),
          physical_name: "last_name",
        })
        .select("attribute_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Staff" })
        .select("job_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_staff" })
            .select("artefact_id"),
          physical_name: "address_id",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_staff" })
            .select("artefact_id"),
          physical_name: "address_id",
        })
        .select("attribute_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Staff" })
        .select("job_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_staff" })
            .select("artefact_id"),
          physical_name: "picture",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_staff" })
            .select("artefact_id"),
          physical_name: "picture",
        })
        .select("attribute_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Staff" })
        .select("job_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_staff" })
            .select("artefact_id"),
          physical_name: "email",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_staff" })
            .select("artefact_id"),
          physical_name: "email",
        })
        .select("attribute_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Staff" })
        .select("job_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_staff" })
            .select("artefact_id"),
          physical_name: "store_id",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_staff" })
            .select("artefact_id"),
          physical_name: "store_id",
        })
        .select("attribute_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Staff" })
        .select("job_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_staff" })
            .select("artefact_id"),
          physical_name: "active",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_staff" })
            .select("artefact_id"),
          physical_name: "active",
        })
        .select("attribute_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Staff" })
        .select("job_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_staff" })
            .select("artefact_id"),
          physical_name: "username",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_staff" })
            .select("artefact_id"),
          physical_name: "username",
        })
        .select("attribute_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Staff" })
        .select("job_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_staff" })
            .select("artefact_id"),
          physical_name: "password",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_staff" })
            .select("artefact_id"),
          physical_name: "password",
        })
        .select("attribute_id"),
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Staff" })
        .select("job_id"),
      source_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "raw_sakila_staff" })
            .select("artefact_id"),
          physical_name: "last_update",
        })
        .select("attribute_id"),
      target_attribute_id: knex("attribute")
        .where({
          artefact_id: knex("artefact")
            .where({ name: "staging_sakila_staff" })
            .select("artefact_id"),
          physical_name: "last_update",
        })
        .select("attribute_id"),
    },
  ]);
};

exports.seed = function (knex) {
  return knex("artefact_constant").insert([
    {
      artefact_id: knex("artefact")
        .where({ name: "presentation_dim_sakila_inventory" })
        .select("artefact_id"),
      name: "database_server",
      value: "cusmat9ljshy.ap-southeast-2.rds.amazonaws.com",
    },
    {
      artefact_id: knex("artefact")
        .where({ name: "presentation_dim_sakila_inventory" })
        .select("artefact_id"),
      name: "database_port",
      value: "5432",
    },
    {
      artefact_id: knex("artefact")
        .where({ name: "presentation_dim_sakila_inventory" })
        .select("artefact_id"),
      name: "schema_name",
      value: "presentation",
    },
    {
      artefact_id: knex("artefact")
        .where({ name: "presentation_dim_sakila_inventory" })
        .select("artefact_id"),
      name: "table_name",
      value: "dim_sakila_inventory",
    },
  ]);
};

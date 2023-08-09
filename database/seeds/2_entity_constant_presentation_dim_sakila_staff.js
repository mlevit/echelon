exports.seed = function (knex) {
  return knex("entity_constant").insert([
    {
      entity_id: knex("entity")
        .where({ name: "presentation_dim_sakila_staff" })
        .select("entity_id"),
      name: "database_server",
      value: "cusmat9ljshy.ap-southeast-2.rds.amazonaws.com",
    },
    {
      entity_id: knex("entity")
        .where({ name: "presentation_dim_sakila_staff" })
        .select("entity_id"),
      name: "database_port",
      value: "5432",
    },
    {
      entity_id: knex("entity")
        .where({ name: "presentation_dim_sakila_staff" })
        .select("entity_id"),
      name: "schema_name",
      value: "presentation",
    },
    {
      entity_id: knex("entity")
        .where({ name: "presentation_dim_sakila_staff" })
        .select("entity_id"),
      name: "table_name",
      value: "dim_sakila_staff",
    },
  ]);
};

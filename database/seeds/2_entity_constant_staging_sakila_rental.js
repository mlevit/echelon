exports.seed = function (knex) {
  return knex("entity_constant").insert([
    {
      entity_id: knex("entity")
        .where({ name: "staging_sakila_rental" })
        .select("entity_id"),
      name: "database_server",
      value: "cusmat9ljshy.ap-southeast-2.rds.amazonaws.com",
    },
    {
      entity_id: knex("entity")
        .where({ name: "staging_sakila_rental" })
        .select("entity_id"),
      name: "database_port",
      value: "5432",
    },
    {
      entity_id: knex("entity")
        .where({ name: "staging_sakila_rental" })
        .select("entity_id"),
      name: "schema_name",
      value: "staging",
    },
    {
      entity_id: knex("entity")
        .where({ name: "staging_sakila_rental" })
        .select("entity_id"),
      name: "table_name",
      value: "sakila_rental",
    },
  ]);
};

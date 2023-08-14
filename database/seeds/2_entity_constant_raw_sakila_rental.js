exports.seed = function (knex) {
  return knex("entity_constant").insert([
    {
      entity_id: knex("entity")
        .where({ name: "raw_sakila_rental" })
        .select("entity_id"),
      name: "column_delimiter",
      value: ",",
    },
    {
      entity_id: knex("entity")
        .where({ name: "raw_sakila_rental" })
        .select("entity_id"),
      name: "column_quote_character",
      value: '"',
    },
    {
      entity_id: knex("entity")
        .where({ name: "raw_sakila_rental" })
        .select("entity_id"),
      name: "data_file_server",
      value: "s3://data-lake-raw.s3-website-ap-southeast-2.amazonaws.com",
    },
    {
      entity_id: knex("entity")
        .where({ name: "raw_sakila_rental" })
        .select("entity_id"),
      name: "data_file_path",
      value: "sakila_rental/",
    },
    {
      entity_id: knex("entity")
        .where({ name: "raw_sakila_rental" })
        .select("entity_id"),
      name: "data_file_pattern",
      value: "sakila_rental_\\d{8}.csv",
    },
    {
      entity_id: knex("entity")
        .where({ name: "raw_sakila_rental" })
        .select("entity_id"),
      name: "date_pattern",
      value: "\\d{8}",
    },
    {
      entity_id: knex("entity")
        .where({ name: "raw_sakila_rental" })
        .select("entity_id"),
      name: "date_format",
      value: "YYYY-MM-DD",
    },
    {
      entity_id: knex("entity")
        .where({ name: "raw_sakila_rental" })
        .select("entity_id"),
      name: "header_count",
      value: "1",
    },
  ]);
};

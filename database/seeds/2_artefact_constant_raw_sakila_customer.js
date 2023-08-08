exports.seed = function (knex) {
  return knex("artefact_constant").insert([
    {
      artefact_id: knex("artefact")
        .where({ name: "raw_sakila_customer" })
        .select("artefact_id"),
      name: "column_delimiter",
      value: ",",
    },
    {
      artefact_id: knex("artefact")
        .where({ name: "raw_sakila_customer" })
        .select("artefact_id"),
      name: "column_quote_character",
      value: '"',
    },
    {
      artefact_id: knex("artefact")
        .where({ name: "raw_sakila_customer" })
        .select("artefact_id"),
      name: "data_file_server",
      value: "s3://data-lake-raw.s3-website-ap-southeast-2.amazonaws.com",
    },
    {
      artefact_id: knex("artefact")
        .where({ name: "raw_sakila_customer" })
        .select("artefact_id"),
      name: "data_file_path",
      value: "sakila_customer/",
    },
    {
      artefact_id: knex("artefact")
        .where({ name: "raw_sakila_customer" })
        .select("artefact_id"),
      name: "data_file_pattern",
      value: "sakila_customer_\\d{8}.csv",
    },
    {
      artefact_id: knex("artefact")
        .where({ name: "raw_sakila_customer" })
        .select("artefact_id"),
      name: "date_pattern",
      value: "\\d{8}",
    },
    {
      artefact_id: knex("artefact")
        .where({ name: "raw_sakila_customer" })
        .select("artefact_id"),
      name: "date_format",
      value: "YYYY-MM-DD",
    },
    {
      artefact_id: knex("artefact")
        .where({ name: "raw_sakila_customer" })
        .select("artefact_id"),
      name: "header_count",
      value: "1",
    },
  ]);
};

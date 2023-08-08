exports.seed = function (knex) {
  return knex("artefact").insert([
    {
      name: "raw_sakila_rental",
      description: "Sakila Rental data lake file",
      type: "delimited_file",
      source: "Sakila",
    },
    {
      name: "raw_sakila_inventory",
      description: "Sakila Inventory data lake file",
      type: "delimited_file",
      source: "Sakila",
    },
    {
      name: "raw_sakila_customer",
      description: "Sakila Customer data lake file",
      type: "delimited_file",
      source: "Sakila",
    },
    {
      name: "raw_sakila_staff",
      description: "Sakila Staff data lake file",
      type: "delimited_file",
      source: "Sakila",
    },
    {
      name: "staging_sakila_rental",
      description: "Sakila Rental staging table",
      type: "staging_table",
      source: "Sakila",
    },
    {
      name: "staging_sakila_inventory",
      description: "Sakila Inventory staging table",
      type: "staging_table",
      source: "Sakila",
    },
    {
      name: "staging_sakila_customer",
      description: "Sakila Customer staging table",
      type: "staging_table",
      source: "Sakila",
    },
    {
      name: "staging_sakila_staff",
      description: "Sakila Staff staging table",
      type: "staging_table",
      source: "Sakila",
    },
    {
      name: "presentation_fact_sakila_rental",
      description: "Sakila Rental fact table",
      type: "transactional_fact_table",
      source: "Sakila",
    },
    {
      name: "presentation_dim_sakila_inventory",
      description: "Sakila Inventory dimension table",
      type: "dimension_type_2_table",
      source: "Sakila",
    },
    {
      name: "presentation_dim_sakila_customer",
      description: "Sakila Customer dimension table",
      type: "dimension_type_2_table",
      source: "Sakila",
    },
    {
      name: "presentation_dim_sakila_staff",
      description: "Sakila Staff dimension table",
      type: "dimension_type_2_table",
      source: "Sakila",
    },
  ]);
};

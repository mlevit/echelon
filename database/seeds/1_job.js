exports.seed = function (knex) {
  return knex("job").insert([
    {
      name: "Load Staging Sakila Rental",
      description:
        "Load Sakila Rental file from Data Lake Raw to Redshift Staging",
      type: "table_load",
      dependency_logic: "and",
    },
    {
      name: "Load Staging Sakila Inventory",
      description:
        "Load Sakila Inventory file from Data Lake Raw to Redshift Staging",
      type: "table_load",
      dependency_logic: "and",
    },
    {
      name: "Load Staging Sakila Customer",
      description:
        "Load Sakila Customer file from Data Lake Raw to Redshift Staging",
      type: "table_load",
      dependency_logic: "and",
    },
    {
      name: "Load Staging Sakila Staff",
      description:
        "Load Sakila Staff file from Data Lake Raw to Redshift Staging",
      type: "table_load",
      dependency_logic: "and",
    },
    {
      name: "Load Fact Sakila Rental",
      description:
        "Load Sakila Rental table from staging layer to the presentation layer",
      type: "transactional_fact_table_load",
      dependency_logic: "and",
    },
    {
      name: "Load Dim Sakila Inventory",
      description:
        "Load Sakila Inventory table from staging layer to the presentation layer",
      type: "dimension_type_2_table_load",
      dependency_logic: "and",
    },
    {
      name: "Load Dim Sakila Customer",
      description:
        "Load Sakila Customer table from staging layer to the presentation layer",
      type: "dimension_type_2_table_load",
      dependency_logic: "and",
    },
    {
      name: "Load Dim Sakila Staff",
      description:
        "Load Sakila Staff table from staging layer to the presentation layer",
      type: "dimension_type_2_table_load",
      dependency_logic: "and",
    },
  ]);
};

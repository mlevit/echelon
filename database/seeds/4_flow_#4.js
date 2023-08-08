exports.seed = function (knex) {
  return knex("flow").insert([
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({ name: "Load Staging Sakila Customer" })
            .select("process_id"),
          start: "2020-01-04 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "extract_source_data",
      label: "source_count",
      count: 100,
      insert_date: "2020-01-04 3:01:00",
    },
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({ name: "Load Staging Sakila Customer" })
            .select("process_id"),
          start: "2020-01-04 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "load_target",
      label: "insert_count",
      count: 80,
      insert_date: "2020-01-04 3:03:00",
    },
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({
              name: "Load Staging Sakila Inventory",
            })
            .select("process_id"),
          start: "2020-01-04 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "extract_source_data",
      label: "source_count",
      count: 250,
      insert_date: "2020-01-04 3:01:00",
    },
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({
              name: "Load Staging Sakila Inventory",
            })
            .select("process_id"),
          start: "2020-01-04 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "load_target",
      label: "insert_count",
      count: 250,
      insert_date: "2020-01-04 3:03:00",
    },
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({ name: "Load Staging Sakila Rental" })
            .select("process_id"),
          start: "2020-01-04 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "extract_source_data",
      label: "source_count",
      count: 1000,
      insert_date: "2020-01-04 3:01:00",
    },
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({ name: "Load Staging Sakila Rental" })
            .select("process_id"),
          start: "2020-01-04 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "load_target",
      label: "insert_count",
      count: 1000,
      insert_date: "2020-01-04 3:03:00",
    },
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({ name: "Load Staging Sakila Staff" })
            .select("process_id"),
          start: "2020-01-04 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "extract_source_data",
      label: "source_count",
      count: 10,
      insert_date: "2020-01-04 3:01:00",
    },
  ]);
};

exports.seed = function (knex) {
  return knex("flow").insert([
    {
      run_id: knex("run")
        .where({
          job_id: knex("job")
            .where({ name: "Load Staging Sakila Customer" })
            .select("job_id"),
          start: "2020-01-01 03:00:00",
        })
        .select("run_id"),
      job: "load_csv_to_redshift",
      function: "extract_source_data",
      label: "source_count",
      count: 100,
      insert_date: "2020-01-01 3:01:00",
    },
    {
      run_id: knex("run")
        .where({
          job_id: knex("job")
            .where({ name: "Load Staging Sakila Customer" })
            .select("job_id"),
          start: "2020-01-01 03:00:00",
        })
        .select("run_id"),
      job: "load_csv_to_redshift",
      function: "load_target",
      label: "insert_count",
      count: 100,
      insert_date: "2020-01-01 3:03:00",
    },
    {
      run_id: knex("run")
        .where({
          job_id: knex("job")
            .where({
              name: "Load Staging Sakila Inventory",
            })
            .select("job_id"),
          start: "2020-01-01 03:00:00",
        })
        .select("run_id"),
      job: "load_csv_to_redshift",
      function: "extract_source_data",
      label: "source_count",
      count: 250,
      insert_date: "2020-01-01 3:01:00",
    },
    {
      run_id: knex("run")
        .where({
          job_id: knex("job")
            .where({
              name: "Load Staging Sakila Inventory",
            })
            .select("job_id"),
          start: "2020-01-01 03:00:00",
        })
        .select("run_id"),
      job: "load_csv_to_redshift",
      function: "load_target",
      label: "insert_count",
      count: 250,
      insert_date: "2020-01-01 3:03:00",
    },
    {
      run_id: knex("run")
        .where({
          job_id: knex("job")
            .where({ name: "Load Staging Sakila Rental" })
            .select("job_id"),
          start: "2020-01-01 03:00:00",
        })
        .select("run_id"),
      job: "load_csv_to_redshift",
      function: "extract_source_data",
      label: "source_count",
      count: 1000,
      insert_date: "2020-01-01 3:01:00",
    },
    {
      run_id: knex("run")
        .where({
          job_id: knex("job")
            .where({ name: "Load Staging Sakila Rental" })
            .select("job_id"),
          start: "2020-01-01 03:00:00",
        })
        .select("run_id"),
      job: "load_csv_to_redshift",
      function: "load_target",
      label: "insert_count",
      count: 1000,
      insert_date: "2020-01-01 3:03:00",
    },
    {
      run_id: knex("run")
        .where({
          job_id: knex("job")
            .where({ name: "Load Staging Sakila Staff" })
            .select("job_id"),
          start: "2020-01-01 03:00:00",
        })
        .select("run_id"),
      job: "load_csv_to_redshift",
      function: "extract_source_data",
      label: "source_count",
      count: 10,
      insert_date: "2020-01-01 3:01:00",
    },
    {
      run_id: knex("run")
        .where({
          job_id: knex("job")
            .where({ name: "Load Staging Sakila Staff" })
            .select("job_id"),
          start: "2020-01-01 03:00:00",
        })
        .select("run_id"),
      job: "load_csv_to_redshift",
      function: "load_target",
      label: "insert_count",
      count: 10,
      insert_date: "2020-01-01 3:03:00",
    },
  ]);
};

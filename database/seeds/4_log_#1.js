exports.seed = function (knex) {
  return knex("log").insert([
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
      function: "start_job",
      priority: "INFO",
      message: "Job 'Load Staging Sakila Customer' has started.",
      insert_date: "2020-01-01 3:00:00",
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
      function: "start_job",
      priority: "INFO",
      message: "File 'sakila_customer_20200101.csv' was picked up.",
      insert_date: "2020-01-01 3:00:01",
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
      function: "start_job",
      priority: "INFO",
      message:
        "File 'sakila_customer_20200101.csv' was loaded into 'staging.sakila_customer'.",
      insert_date: "2020-01-01 3:03:00",
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
      function: "start_job",
      priority: "INFO",
      message: "Job 'Load Staging Sakila Customer' has completed.",
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
      function: "start_job",
      priority: "INFO",
      message: "Job 'Load Staging Sakila Inventory' has started.",
      insert_date: "2020-01-01 3:00:00",
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
      function: "start_job",
      priority: "INFO",
      message: "File 'sakila_inventory_20200101.csv' was picked up.",
      insert_date: "2020-01-01 3:00:01",
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
      function: "start_job",
      priority: "INFO",
      message:
        "File 'sakila_inventory_20200101.csv' was loaded into 'staging.sakila_inventory'.",
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
      function: "start_job",
      priority: "INFO",
      message: "Job 'Load Staging Sakila Inventory' has completed.",
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
      function: "start_job",
      priority: "INFO",
      message: "Job 'Load Staging Sakila Rental' has started.",
      insert_date: "2020-01-01 3:00:00",
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
      function: "start_job",
      priority: "INFO",
      message: "File 'sakila_rental_20200101.csv' was picked up.",
      insert_date: "2020-01-01 3:00:01",
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
      function: "start_job",
      priority: "INFO",
      message:
        "File 'sakila_rental_20200101.csv' was loaded into 'staging.sakila_rental'.",
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
      function: "start_job",
      priority: "INFO",
      message: "Job 'Load Staging Sakila Rental' has completed.",
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
      function: "start_job",
      priority: "INFO",
      message: "Job 'Load Staging Sakila Staff' has started.",
      insert_date: "2020-01-01 3:00:00",
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
      function: "start_job",
      priority: "INFO",
      message: "File 'sakila_staff_20200101.csv' was picked up.",
      insert_date: "2020-01-01 3:00:01",
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
      function: "start_job",
      priority: "INFO",
      message:
        "File 'sakila_staff_20200101.csv' was loaded into 'staging.sakila_staff'.",
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
      function: "start_job",
      priority: "INFO",
      message: "Job 'Load Staging Sakila Staff' has completed.",
      insert_date: "2020-01-01 3:03:00",
    },
  ]);
};

exports.seed = function (knex) {
  return knex("log").insert([
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({ name: "Load Staging Sakila Customer" })
            .select("process_id"),
          start: "2020-01-02 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "start_process",
      priority: "INFO",
      message: "Process 'Load Staging Sakila Customer' has started.",
      insert_date: "2020-01-02 3:00:00",
    },
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({ name: "Load Staging Sakila Customer" })
            .select("process_id"),
          start: "2020-01-02 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "start_process",
      priority: "INFO",
      message: "File 'sakila_customer_20200102.csv' was picked up.",
      insert_date: "2020-01-02 3:00:01",
    },
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({ name: "Load Staging Sakila Customer" })
            .select("process_id"),
          start: "2020-01-02 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "start_process",
      priority: "INFO",
      message:
        "File 'sakila_customer_20200102.csv' was loaded into 'staging.sakila_customer'.",
      insert_date: "2020-01-02 3:03:00",
    },
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({ name: "Load Staging Sakila Customer" })
            .select("process_id"),
          start: "2020-01-02 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "start_process",
      priority: "INFO",
      message: "Process 'Load Staging Sakila Customer' has completed.",
      insert_date: "2020-01-02 3:03:00",
    },
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({
              name: "Load Staging Sakila Inventory",
            })
            .select("process_id"),
          start: "2020-01-02 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "start_process",
      priority: "INFO",
      message: "Process 'Load Staging Sakila Inventory' has started.",
      insert_date: "2020-01-02 3:00:00",
    },
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({
              name: "Load Staging Sakila Inventory",
            })
            .select("process_id"),
          start: "2020-01-02 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "start_process",
      priority: "INFO",
      message: "File 'sakila_inventory_20200102.csv' was picked up.",
      insert_date: "2020-01-02 3:00:01",
    },
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({
              name: "Load Staging Sakila Inventory",
            })
            .select("process_id"),
          start: "2020-01-02 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "start_process",
      priority: "INFO",
      message:
        "File 'sakila_inventory_20200102.csv' was loaded into 'staging.sakila_inventory'.",
      insert_date: "2020-01-02 3:03:00",
    },
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({
              name: "Load Staging Sakila Inventory",
            })
            .select("process_id"),
          start: "2020-01-02 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "start_process",
      priority: "INFO",
      message: "Process 'Load Staging Sakila Inventory' has completed.",
      insert_date: "2020-01-02 3:03:00",
    },
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({ name: "Load Staging Sakila Rental" })
            .select("process_id"),
          start: "2020-01-02 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "start_process",
      priority: "INFO",
      message: "Process 'Load Staging Sakila Rental' has started.",
      insert_date: "2020-01-02 3:00:00",
    },
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({ name: "Load Staging Sakila Rental" })
            .select("process_id"),
          start: "2020-01-02 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "start_process",
      priority: "INFO",
      message: "File 'sakila_rental_20200102.csv' was picked up.",
      insert_date: "2020-01-02 3:00:01",
    },
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({ name: "Load Staging Sakila Rental" })
            .select("process_id"),
          start: "2020-01-02 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "start_process",
      priority: "INFO",
      message:
        "File 'sakila_rental_20200102.csv' was loaded into 'staging.sakila_rental'.",
      insert_date: "2020-01-02 3:03:00",
    },
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({ name: "Load Staging Sakila Rental" })
            .select("process_id"),
          start: "2020-01-02 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "start_process",
      priority: "INFO",
      message: "Process 'Load Staging Sakila Rental' has completed.",
      insert_date: "2020-01-02 3:03:00",
    },
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({ name: "Load Staging Sakila Staff" })
            .select("process_id"),
          start: "2020-01-02 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "start_process",
      priority: "INFO",
      message: "Process 'Load Staging Sakila Staff' has started.",
      insert_date: "2020-01-02 3:00:00",
    },
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({ name: "Load Staging Sakila Staff" })
            .select("process_id"),
          start: "2020-01-02 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "start_process",
      priority: "INFO",
      message: "File 'sakila_staff_20200102.csv' was picked up.",
      insert_date: "2020-01-02 3:00:01",
    },
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({ name: "Load Staging Sakila Staff" })
            .select("process_id"),
          start: "2020-01-02 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "start_process",
      priority: "INFO",
      message:
        "File 'sakila_staff_20200102.csv' was loaded into 'staging.sakila_staff'.",
      insert_date: "2020-01-02 3:03:00",
    },
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({ name: "Load Staging Sakila Staff" })
            .select("process_id"),
          start: "2020-01-02 03:00:00",
        })
        .select("process_audit_id"),
      job: "load_csv_to_redshift",
      function: "start_process",
      priority: "INFO",
      message: "Process 'Load Staging Sakila Staff' has completed.",
      insert_date: "2020-01-02 3:03:00",
    },
  ]);
};

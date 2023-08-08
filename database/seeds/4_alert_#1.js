exports.seed = function (knex) {
  return knex("alert").insert([
    {
      process_audit_id: knex("process_audit")
        .where({
          process_id: knex("process")
            .where({ name: "Load Staging Sakila Rental" })
            .select("process_id"),
          start: "2020-01-02 03:00:00",
        })
        .select("process_audit_id"),
      code: "P01",
      subject: "Process has failed.",
      message:
        "File 'sakila_rental_20200103.csv' could not loaded \
          into 'staging.sakila_rental' due to type mismatch with \
          field 'rental_date'.",
      insert_date: "2020-01-03 3:03:00",
    },
  ]);
};

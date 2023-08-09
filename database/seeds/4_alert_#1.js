exports.seed = function (knex) {
  return knex("alert").insert([
    {
      run_id: knex("run")
        .where({
          job_id: knex("job")
            .where({ name: "Load Staging Sakila Rental" })
            .select("job_id"),
          start: "2020-01-02 03:00:00",
        })
        .select("run_id"),
      code: "P01",
      subject: "Job has failed.",
      message:
        "File 'sakila_rental_20200103.csv' could not loaded \
          into 'staging.sakila_rental' due to type mismatch with \
          field 'rental_date'.",
      insert_date: "2020-01-03 3:03:00",
    },
  ]);
};

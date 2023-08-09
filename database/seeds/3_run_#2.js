exports.seed = function (knex) {
  return knex("run").insert([
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Customer" })
        .select("job_id"),
      start: "2020-01-02 3:00:00",
      end: "2020-01-02 3:02:00",
      status: "completed",
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Inventory" })
        .select("job_id"),
      start: "2020-01-02 3:00:00",
      end: "2020-01-02 3:06:00",
      status: "completed",
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Rental" })
        .select("job_id"),
      start: "2020-01-02 3:00:00",
      end: "2020-01-02 3:10:00",
      status: "completed",
    },
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Staff" })
        .select("job_id"),
      start: "2020-01-02 3:00:00",
      end: "2020-01-02 3:02:00",
      status: "completed",
    },
  ]);
};

exports.seed = function (knex) {
  return knex("process_audit").insert([
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Customer" })
        .select("process_id"),
      start: "2020-01-01 3:00:00",
      end: "2020-01-01 3:02:00",
      status: "completed",
    },
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Inventory" })
        .select("process_id"),
      start: "2020-01-01 3:00:00",
      end: "2020-01-01 3:06:00",
      status: "completed",
    },
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Rental" })
        .select("process_id"),
      start: "2020-01-01 3:00:00",
      end: "2020-01-01 3:10:00",
      status: "completed",
    },
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Staff" })
        .select("process_id"),
      start: "2020-01-01 3:00:00",
      end: "2020-01-01 3:02:00",
      status: "completed",
    },
  ]);
};

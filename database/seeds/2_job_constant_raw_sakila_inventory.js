exports.seed = function (knex) {
  return knex("job_constant").insert([
    {
      job_id: knex("job")
        .where({ name: "Load Staging Sakila Inventory" })
        .select("job_id"),
      name: "stored_procedure_name",
      value: "truncate_and_load_raw_sakila_inventory",
    },
  ]);
};

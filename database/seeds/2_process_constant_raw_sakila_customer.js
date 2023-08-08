exports.seed = function (knex) {
  return knex("process_constant").insert([
    {
      process_id: knex("process")
        .where({ name: "Load Staging Sakila Customer" })
        .select("process_id"),
      name: "stored_procedure_name",
      value: "truncate_and_load_raw_sakila_customer",
    },
  ]);
};

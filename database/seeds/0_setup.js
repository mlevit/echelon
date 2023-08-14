exports.seed = function (knex) {
  return knex.schema
    .raw("SELECT '1'")
    .then(() => knex("job_field_map").del())
    .then(() => knex("field").del())
    .then(() => knex("job_entity_rel").del())
    .then(() => knex("entity_constant").del())
    .then(() => knex("job_constant").del())
    .then(() => knex("entity").del())
    .then(() => knex("flow").del())
    .then(() => knex("alert").del())
    .then(() => knex("log").del())
    .then(() => knex("run").del())
    .then(() => knex("job").del());
};

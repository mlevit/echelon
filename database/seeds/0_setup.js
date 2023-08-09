exports.seed = function (knex) {
  return knex.schema
    .raw("SELECT '1'")
    .then(() => knex("job_attribute_map").del())
    .then(() => knex("attribute").del())
    .then(() => knex("job_artefact_rel").del())
    .then(() => knex("artefact_constant").del())
    .then(() => knex("job_constant").del())
    .then(() => knex("artefact").del())
    .then(() => knex("flow").del())
    .then(() => knex("alert").del())
    .then(() => knex("log").del())
    .then(() => knex("run").del())
    .then(() => knex("job").del());
};

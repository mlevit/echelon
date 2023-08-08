exports.seed = function (knex) {
  return knex.schema
    .raw("SELECT '1'")
    .then(() => knex("process_attribute_map").del())
    .then(() => knex("attribute").del())
    .then(() => knex("process_artefact_rel").del())
    .then(() => knex("artefact_constant").del())
    .then(() => knex("process_constant").del())
    .then(() => knex("artefact").del())
    .then(() => knex("flow").del())
    .then(() => knex("alert").del())
    .then(() => knex("log").del())
    .then(() => knex("process_audit").del())
    .then(() => knex("process").del());
};

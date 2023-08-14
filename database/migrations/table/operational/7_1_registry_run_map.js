exports.up = async function (knex) {
  return knex.schema.createTable("registry_run_map", function (table) {
    table
      .increments("registry_run_map_id")
      .comment("System generated unique identifier.");
    table
      .integer("registry_id")
      .notNullable()
      .comment(
        "System generated unique identifier of the registry this registry map is associated with."
      );
    table
      .integer("run_id")
      .notNullable()
      .comment(
        "System generated unique identifier of the run this registry map is associated with."
      );
    table
      .timestamp("insert_date")
      .notNullable()
      .defaultTo(knex.fn.now())
      .comment("UTC timestamp when the record was inserted into the table.");
    table.foreign("registry_id").references("registry_id").inTable("registry");
    table.foreign("run_id").references("run_id").inTable("run");
    table.unique(["registry_id", "run_id"], { useConstraint: true });
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("registry_run_map");
};

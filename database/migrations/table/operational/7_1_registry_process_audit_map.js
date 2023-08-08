exports.up = async function (knex) {
  return knex.schema.createTable(
    "registry_process_audit_map",
    function (table) {
      table
        .increments("registry_process_audit_map_id")
        .comment("System generated unique identifier.");
      table
        .integer("registry_id")
        .notNullable()
        .comment(
          "System generated unique identifier of the registry this registry map is associated with."
        );
      table
        .integer("process_audit_id")
        .notNullable()
        .comment(
          "System generated unique identifier of the process audit this registry map is associated with."
        );
      table
        .timestamp("insert_date")
        .notNullable()
        .defaultTo(knex.fn.now())
        .comment("UTC timestamp when the record was inserted into the table.");
      table
        .foreign("registry_id")
        .references("registry_id")
        .inTable("registry");
      table
        .foreign("process_audit_id")
        .references("process_audit_id")
        .inTable("process_audit");
      table.unique(["registry_id", "process_audit_id"], { useConstraint: true });
    }
  );
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("registry_process_audit_map");
};

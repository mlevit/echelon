exports.up = async function (knex) {
  return knex.schema.createTable("process", function (table) {
    table
      .increments("process_id")
      .comment("System generated unique identifier.");
    table.string("name").notNullable().comment("Name of the process.");
    table.text("description").comment("Description of the process.");
    table
      .string("type")
      .notNullable()
      .comment(
        "Type of the process. See acceptable values within the `constraint_process_type` table."
      );
    table
      .integer("priority")
      .notNullable()
      .defaultTo("1")
      .comment(
        "Priority of the process. When multiple processes can be run at the same time, the processes with higher priority run first."
      );
    table
      .string("dependency_logic")
      .notNullable()
      .defaultTo("and")
      .comment(
        "How should artefact dependencies be treated (`and` = all required artefacts require updates, `or` = any required artefacts require updates). See acceptable values within the `constraint_process_dependency_logic` table."
      );
    table
      .timestamp("insert_date")
      .notNullable()
      .defaultTo(knex.fn.now())
      .comment("UTC timestamp when the record was inserted into the table.");
    table
      .timestamp("update_date")
      .comment("UTC timestamp when the record was inserted into the table.");
    table
      .integer("migration_insert_id")
      .comment(
        "System generated unique identifier of the migration this record was inserted by."
      );
    table
      .integer("migration_update_id")
      .comment(
        "System generated unique identifier of the migration this record was updated by."
      );
    table
      .foreign("type")
      .references("value")
      .inTable("constraint_process_type");
    table
      .foreign("dependency_logic")
      .references("value")
      .inTable("constraint_process_dependency_logic");
    table.unique("name", { useConstraint: true });
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("process");
};

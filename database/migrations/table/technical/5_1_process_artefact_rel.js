exports.up = async function (knex) {
  return knex.schema.createTable("process_artefact_rel", function (table) {
    table
      .increments("process_artefact_rel_id")
      .comment("System generated unique identifier.");
    table
      .integer("process_id")
      .notNullable()
      .comment(
        "System generated unique identifier of the process this process artefact relationship is associated with."
      );
    table
      .integer("sequence_number")
      .notNullable()
      .comment("Sequence number of the process artefact relationship.");
    table
      .integer("source_artefact_id")
      .notNullable()
      .comment(
        "System generated unique identifier of the source process this process artefact relationship is associated with."
      );
    table
      .integer("target_artefact_id")
      .notNullable()
      .comment(
        "System generated unique identifier of the target process this process artefact relationship is associated with."
      );
    table
      .boolean("required_flag")
      .notNullable()
      .defaultTo(true)
      .comment(
        "Does the source artefact require updated data for the process to run. Default value: `true`."
      );
    table
      .timestamp("insert_date")
      .notNullable()
      .defaultTo(knex.fn.now())
      .comment("UTC timestamp when the record was inserted into the table.");
    table
      .timestamp("update_date")
      .comment("UTC timestamp when the record was updated into the table.");
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
    table.foreign("process_id").references("process_id").inTable("process");
    table
      .foreign("source_artefact_id")
      .references("artefact_id")
      .inTable("artefact");
    table
      .foreign("target_artefact_id")
      .references("artefact_id")
      .inTable("artefact");
    table.unique(["process_id", "source_artefact_id", "target_artefact_id"], { useConstraint: true });
    table.unique(["process_id", "sequence_number"], { useConstraint: true });
    table.index("process_id");
    table.index("source_artefact_id");
    table.index("target_artefact_id");
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("process_artefact_rel");
};

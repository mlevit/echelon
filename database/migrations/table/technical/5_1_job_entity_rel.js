exports.up = async function (knex) {
  return knex.schema.createTable("job_entity_rel", function (table) {
    table
      .increments("job_entity_rel_id")
      .comment("System generated unique identifier.");
    table
      .integer("job_id")
      .notNullable()
      .comment(
        "System generated unique identifier of the job this job entity relationship is associated with."
      );
    table
      .integer("sequence_number")
      .notNullable()
      .comment("Sequence number of the job entity relationship.");
    table
      .integer("source_entity_id")
      .notNullable()
      .comment(
        "System generated unique identifier of the source job this job entity relationship is associated with."
      );
    table
      .integer("target_entity_id")
      .notNullable()
      .comment(
        "System generated unique identifier of the target job this job entity relationship is associated with."
      );
    table
      .boolean("required_flag")
      .notNullable()
      .defaultTo(true)
      .comment(
        "Does the source entity require updated data for the job to run. Default value: `true`."
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
    table.foreign("job_id").references("job_id").inTable("job");
    table.foreign("source_entity_id").references("entity_id").inTable("entity");
    table.foreign("target_entity_id").references("entity_id").inTable("entity");
    table.unique(["job_id", "source_entity_id", "target_entity_id"], {
      useConstraint: true,
    });
    table.unique(["job_id", "sequence_number"], { useConstraint: true });
    table.index("job_id");
    table.index("source_entity_id");
    table.index("target_entity_id");
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("job_entity_rel");
};

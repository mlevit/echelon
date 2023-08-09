exports.up = async function (knex) {
  return knex.schema.createTable("job", function (table) {
    table.increments("job_id").comment("System generated unique identifier.");
    table.string("name").notNullable().comment("Name of the job.");
    table.text("description").comment("Description of the job.");
    table
      .string("type")
      .notNullable()
      .comment(
        "Type of the job. See acceptable values within the `constraint_job_type` table."
      );
    table
      .integer("priority")
      .notNullable()
      .defaultTo("1")
      .comment(
        "Priority of the job. When multiple jobes can be run at the same time, the jobes with higher priority run first."
      );
    table
      .string("dependency_logic")
      .notNullable()
      .defaultTo("and")
      .comment(
        "How should entity dependencies be treated (`and` = all required entitys require updates, `or` = any required entitys require updates). See acceptable values within the `constraint_job_dependency_logic` table."
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
    table.foreign("type").references("value").inTable("constraint_job_type");
    table
      .foreign("dependency_logic")
      .references("value")
      .inTable("constraint_job_dependency_logic");
    table.unique("name", { useConstraint: true });
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("job");
};

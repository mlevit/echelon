exports.up = async function (knex) {
  return knex.schema.createTable(
    "constraint_job_constant_name",
    function (table) {
      table.increments("constraint_job_constant_name_id");
      table.string("value").notNullable();
      table.string("cast").notNullable();
      table.boolean("required").notNullable().defaultTo(false);
      table.text("comment");
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
      table.unique(["value"], { useConstraint: true });
    }
  );
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("constraint_job_constant_name");
};

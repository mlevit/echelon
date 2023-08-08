exports.up = async function (knex) {
  return knex.schema.createTable("log", function (table) {
    table.increments("log_id").comment("System generated unique identifier.");
    table
      .integer("process_audit_id")
      .notNullable()
      .comment(
        "System generated unique identifier of the process audit this log is associated with."
      );
    table.string("job").comment("ETL job that produced the log.");
    table.string("function").comment("ETL job function that produced the log.");
    table
      .string("priority")
      .notNullable()
      .comment(
        "Priority of log. See acceptable values within the `constraint_log_priority` table."
      );
    table.string("message", 4000).notNullable().comment("Message of the error.");
    table
      .integer("code")
      .comment(
        "Error code of the log. Either system generated or self-assigned."
      );
    table
      .timestamp("insert_date")
      .notNullable()
      .defaultTo(knex.fn.now())
      .comment("UTC timestamp when the record was inserted into the table.");
    table
      .foreign("process_audit_id")
      .references("process_audit_id")
      .inTable("process_audit");
    table
      .foreign("priority")
      .references("value")
      .inTable("constraint_log_priority");
    table.unique(["process_audit_id", "message"], { useConstraint: true });
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("log");
};

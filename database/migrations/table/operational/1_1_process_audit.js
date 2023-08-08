exports.up = async function (knex) {
  return knex.schema.createTable("process_audit", function (table) {
    table
      .increments("process_audit_id")
      .comment("System generated unique identifier.");
    table
      .integer("process_id")
      .notNullable()
      .comment(
        "System generated unique identifier of the process this process audit is associated with."
      );
    table
      .timestamp("start")
      .notNullable()
      .defaultTo(knex.fn.now())
      .comment("UTC timestamp when the process audit was started.");
    table
      .timestamp("end")
      .comment("UTC timestamp when the process audit was stopped.");
    table
      .string("status")
      .notNullable()
      .defaultTo("running")
      .comment(
        "The status of the process audit. See acceptable values within the `constrain_process_audit_status` table."
      );
    table.foreign("process_id").references("process_id").inTable("process");
    table
      .foreign("status")
      .references("value")
      .inTable("constraint_process_audit_status");
    table.index("process_id");
    table.unique(["process_id", "end", "status"], { useConstraint: true });
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("process_audit");
};

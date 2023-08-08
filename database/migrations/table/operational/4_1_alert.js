exports.up = async function (knex) {
  return knex.schema.createTable("alert", function (table) {
    table.increments("alert_id").comment("System generated unique identifier.");
    table
      .integer("process_audit_id")
      .notNullable()
      .comment(
        "System generated unique identifier of the process audit this alert is associated with."
      );
    table
      .string("code")
      .notNullable()
      .comment(
        "Status of the alert. See acceptable values within the `constraint_alert_code` table."
      );
    table.string("subject").notNullable().comment("Subject of the alert.");
    table.text("message").notNullable().comment("Message of the alert.");
    table
      .timestamp("insert_date")
      .notNullable()
      .defaultTo(knex.fn.now())
      .comment("UTC timestamp when the record was inserted into the table.");
    table
      .foreign("process_audit_id")
      .references("process_audit_id")
      .inTable("process_audit");
    table.foreign("code").references("value").inTable("constraint_alert_code");
    table.unique(["process_audit_id", "code"], { useConstraint: true });
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("alert");
};

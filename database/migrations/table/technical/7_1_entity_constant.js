exports.up = async function (knex) {
  return knex.schema.createTable("entity_constant", function (table) {
    table
      .increments("entity_constant_id")
      .comment("System generated unique identifier.");
    table
      .integer("entity_id")
      .notNullable()
      .comment("System generated unique identifier of the entity.");
    table
      .string("name")
      .notNullable()
      .comment(
        "Name of the constant. See acceptable values within the `constraint_entity_constant_name` table."
      );
    table.string("value").notNullable().comment("Value of the constant.");
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
    table
      .foreign("name")
      .references("value")
      .inTable("constraint_entity_constant_name");
    table.foreign("entity_id").references("entity_id").inTable("entity");
    table.unique(["entity_id", "name"], { useConstraint: true });
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("entity_constant");
};

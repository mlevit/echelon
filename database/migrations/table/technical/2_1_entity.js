exports.up = async function (knex) {
  return knex.schema.createTable("entity", function (table) {
    table
      .increments("entity_id")
      .comment("System generated unique identifier.");
    table.string("name").notNullable().comment("Name of the entity.");
    table.text("description").comment("Description of the entity.");
    table
      .text("business_description")
      .comment("Business-oriented description of the entity.");
    table
      .string("type")
      .notNullable()
      .comment(
        "Type of the entity. See acceptable values within the `constraint_entity_type` table."
      );
    table
      .string("source")
      .notNullable()
      .comment("Source system that produced the entity.");
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
    table.foreign("type").references("value").inTable("constraint_entity_type");
    table.unique(["name", "source"], { useConstraint: true });
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("entity");
};

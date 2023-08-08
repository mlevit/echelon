exports.up = async function (knex) {
  return knex.schema.createTable("process_attribute_map", function (table) {
    table
      .increments("process_attribute_map_id")
      .comment("System generated unique identifier.");
    table
      .integer("process_id")
      .notNullable()
      .comment(
        "System generated unique identifier of the process this process attribute mapping is associated with."
      );
    table
      .integer("source_attribute_id")
      .notNullable()
      .comment(
        "System generated unique identifier of the source attribute this process attribute mapping is associated with."
      );
    table
      .integer("target_attribute_id")
      .notNullable()
      .comment(
        "System generated unique identifier of the target attribute this process attribute mapping is associated with."
      );
    table
      .string("hard_rule")
      .comment(
        "A data cleansing or standardisation hard rule that will be applied to the value source attribute before being stored into the target attribute. This rule should be in the language used by the ETL tool. {column} should be used as a placeholder for the source attribute within the hard rule e.g., cast({column} as integer)"
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
      .foreign("source_attribute_id")
      .references("attribute_id")
      .inTable("attribute");
    table
      .foreign("target_attribute_id")
      .references("attribute_id")
      .inTable("attribute");
    table.unique(["process_id", "source_attribute_id", "target_attribute_id"], { useConstraint: true });
    table.index("process_id");
    table.index("source_attribute_id");
    table.index("target_attribute_id");
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("process_attribute_map");
};
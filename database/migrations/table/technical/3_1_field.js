exports.up = async function (knex) {
  return knex.schema.createTable("field", function (table) {
    table.increments("field_id").comment("System generated unique identifier.");
    table
      .integer("entity_id")
      .notNullable()
      .comment(
        "System generated unique identifier of the entity this field is associated with."
      );
    table
      .string("physical_name")
      .notNullable()
      .comment("Name of the field as it appears in the entity.");
    table
      .string("data_type")
      .notNullable()
      .comment("Data type of the field as it appears in the entity.");
    table
      .integer("length")
      .comment(
        "Length in characters of the field as it appears in the entity."
      );
    table
      .integer("precision")
      .comment(
        "Precision in numbers of the field as it appears in the entity."
      );
    table
      .integer("scale")
      .comment("Scale in numbers of the field as it appears in the entity.");
    table
      .integer("sequence_number")
      .notNullable()
      .comment("Sequence number of the field as it appears in the entity.");
    table.integer("group_number").comment("");
    table.text("description").comment("Description of the field.");
    table
      .string("business_description")
      .comment("Business-oriented description of the field.");
    table
      .string("business_name")
      .comment(
        "Business name of the field that the business might be more familiar with."
      );
    table
      .string("business_alias")
      .comment(
        "Business alias of the field that the business might be more familiar with."
      );
    table.string("acronym_name").comment("Acronym of the field.");
    table
      .string("classification")
      .notNullable()
      .comment(
        "Security classification of the field. See acceptable values within the `constraint_field_classification` table. Default value: `public`."
      );
    table
      .boolean("required_flag")
      .notNullable()
      .comment("Is the value of the field mandatory.");
    table
      .boolean("computed_flag")
      .notNullable()
      .comment(
        "Is the value of the field a direct mapping to another field or has the value of the field been generated in the extract or load job."
      );
    table
      .boolean("sequence_flag")
      .notNullable()
      .comment(
        "Does the field contain the record sequence number of the record."
      );
    table
      .boolean("hash_key_flag")
      .notNullable()
      .comment(
        "Is the field used as part of the hash_key column i.e., primary key."
      );
    table
      .boolean("hash_diff_flag")
      .notNullable()
      .comment(
        "Is the field used as part of the hash_diff column i.e., change data detection job."
      );
    table
      .boolean("record_source_flag")
      .notNullable()
      .comment("Does the field contain the source system of the record.");
    table
      .boolean("business_date_flag")
      .notNullable()
      .comment("Does the field contain the business date of the record.");
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
    table.foreign("entity_id").references("entity_id").inTable("entity");
    table
      .foreign("classification")
      .references("value")
      .inTable("constraint_field_classification");
    table.unique(["entity_id", "physical_name"], { useConstraint: true });
    table.unique(["entity_id", "sequence_number"], { useConstraint: true });
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("field");
};

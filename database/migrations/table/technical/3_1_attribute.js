exports.up = async function (knex) {
  return knex.schema.createTable("attribute", function (table) {
    table
      .increments("attribute_id")
      .comment("System generated unique identifier.");
    table
      .integer("artefact_id")
      .notNullable()
      .comment(
        "System generated unique identifier of the artefact this attribute is associated with."
      );
    table
      .string("physical_name")
      .notNullable()
      .comment("Name of the attribute as it appears in the artefact.");
    table
      .string("data_type")
      .notNullable()
      .comment("Data type of the attribute as it appears in the artefact.");
    table
      .integer("length")
      .comment(
        "Length in characters of the attribute as it appears in the artefact."
      );
    table
      .integer("precision")
      .comment(
        "Precision in numbers of the attribute as it appears in the artefact."
      );
    table
      .integer("scale")
      .comment(
        "Scale in numbers of the attribute as it appears in the artefact."
      );
    table
      .integer("sequence_number")
      .notNullable()
      .comment(
        "Sequence number of the attribute as it appears in the artefact."
      );
    table.integer("group_number").comment("");
    table.text("description").comment("Description of the attribute.");
    table
      .string("business_description")
      .comment("Business-oriented description of the attribute.");
    table
      .string("business_name")
      .comment(
        "Business name of the attribute that the business might be more familiar with."
      );
    table
      .string("business_alias")
      .comment(
        "Business alias of the attribute that the business might be more familiar with."
      );
    table.string("acronym_name").comment("Acronym of the attribute.");
    table
      .string("classification")
      .notNullable()
      .comment(
        "Security classification of the attribute. See acceptable values within the `constraint_attribute_classification` table. Default value: `public`."
      );
    table
      .boolean("required_flag")
      .notNullable()
      .comment("Is the value of the attribute mandatory.");
    table
      .boolean("computed_flag")
      .notNullable()
      .comment(
        "Is the value of the attribute a direct mapping to another attribute or has the value of the attribute been generated in the extract or load job."
      );
    table
      .boolean("sequence_flag")
      .notNullable()
      .comment(
        "Does the attribute contain the record sequence number of the record."
      );
    table
      .boolean("hash_key_flag")
      .notNullable()
      .comment(
        "Is the attribute used as part of the hash_key column i.e., primary key."
      );
    table
      .boolean("hash_diff_flag")
      .notNullable()
      .comment(
        "Is the attribute used as part of the hash_diff column i.e., change data detection job."
      );
    table
      .boolean("record_source_flag")
      .notNullable()
      .comment("Does the attribute contain the source system of the record.");
    table
      .boolean("business_date_flag")
      .notNullable()
      .comment("Does the attribute contain the business date of the record.");
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
    table.foreign("artefact_id").references("artefact_id").inTable("artefact");
    table
      .foreign("classification")
      .references("value")
      .inTable("constraint_attribute_classification");
    table.unique(["artefact_id", "physical_name"], { useConstraint: true });
    table.unique(["artefact_id", "sequence_number"], { useConstraint: true });
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("attribute");
};

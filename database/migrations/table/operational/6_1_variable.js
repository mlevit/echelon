exports.up = async function (knex) {
  return knex.schema.createTable("variable", function (table) {
    table
      .increments("variable_id")
      .comment("System generated unique identifier.");
    table
      .integer("object_id")
      .notNullable()
      .comment(
        "System generated unique identifier of the process, artefact, or attribute this variable is associated with."
      );
    table
      .string("object_type")
      .notNullable()
      .comment(
        "The type of the object this variable is associated with. See acceptable values within the `constraint_variable_object_type` table."
      );
    table
      .string("name")
      .notNullable()
      .comment(
        "Name of the variable. See acceptable values within the `constraint_variable_name` table."
      );
    table.string("value").notNullable().comment("Value of the variable.");
    table
      .timestamp("insert_date")
      .notNullable()
      .defaultTo(knex.fn.now())
      .comment("UTC timestamp when the record was inserted into the table.");
    table
      .timestamp("update_date")
      .comment("UTC timestamp when the record was updated into the table.");
    table
      .foreign("object_type")
      .references("value")
      .inTable("constraint_variable_object_type");
    table
      .foreign(["name", "object_type"])
      .references(["value", "object_type"])
      .inTable("constraint_variable_name");
    table.unique(["object_id", "object_type", "name"], { useConstraint: true });
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("variable");
};

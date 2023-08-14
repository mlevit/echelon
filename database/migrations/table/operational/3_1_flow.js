exports.up = async function (knex) {
  return knex.schema.createTable("flow", function (table) {
    table.increments("flow_id").comment("System generated unique identifier.");
    table
      .integer("run_id")
      .notNullable()
      .comment(
        "System generated unique identifier of the run this flow is associated with."
      );
    table.string("job").comment("ETL job that produced the metric.");
    table
      .string("function")
      .comment("ETL job function that produced the metric.");
    table.string("label").notNullable().comment("Label of the flow.");
    table.integer("count").notNullable().comment("Record count.");
    table
      .timestamp("insert_date")
      .notNullable()
      .defaultTo(knex.fn.now())
      .comment("UTC timestamp when the record was inserted into the table.");
    table.foreign("run_id").references("run_id").inTable("run");
    table.foreign("label").references("value").inTable("constraint_flow_label");
    table.unique(["run_id", "label"], { useConstraint: true });
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("flow");
};

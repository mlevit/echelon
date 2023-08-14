exports.up = async function (knex) {
  return knex.schema.createTable("run", function (table) {
    table.increments("run_id").comment("System generated unique identifier.");
    table
      .integer("job_id")
      .notNullable()
      .comment(
        "System generated unique identifier of the job this run is associated with."
      );
    table
      .timestamp("start")
      .notNullable()
      .defaultTo(knex.fn.now())
      .comment("UTC timestamp when the run was started.");
    table.timestamp("end").comment("UTC timestamp when the run was stopped.");
    table
      .string("status")
      .notNullable()
      .defaultTo("running")
      .comment(
        "The status of the run. See acceptable values within the `constrain_run_status` table."
      );
    table.foreign("job_id").references("job_id").inTable("job");
    table
      .foreign("status")
      .references("value")
      .inTable("constraint_run_status");
    table.index("job_id");
    table.unique(["job_id", "end", "status"], { useConstraint: true });
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("run");
};

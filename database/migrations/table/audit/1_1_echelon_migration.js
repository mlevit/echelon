exports.up = async function (knex) {
  return knex.schema.createTable("echelon_migration", function (table) {
    table
      .increments("echelon_migration_id")
      .comment("System generated unique identifier.");
    table.json("request").comment("Migration request.");
    table.json("response").comment("Migration response.");
    table
      .timestamp("insert_date")
      .notNullable()
      .defaultTo(knex.fn.now())
      .comment("UTC timestamp when the record was inserted into the table.");
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("echelon_migration");
};

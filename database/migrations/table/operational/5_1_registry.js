exports.up = async function (knex) {
  return knex.schema.createTable("registry", function (table) {
    table
      .increments("registry_id")
      .comment("System generated unique identifier.");
    table
      .string("name")
      .notNullable()
      .comment("Full name of the registered object.");
    table
      .string("path")
      .notNullable()
      .comment("Path to the registered object.");
    table
      .string("server")
      .notNullable()
      .comment(
        "Server of the registered object (i.e., file server IP or DNS or S3 Bucket name)."
      );
    table
      .string("size")
      .notNullable()
      .comment("Size of the registered object in KB.");
    table
      .string("checksum")
      .notNullable()
      .comment("MD5 checksum of the registered object.");
    table
      .string("type")
      .notNullable()
      .comment("Object type (e.g., CSV, TXT, DAT etc.).");
    table
      .string("status")
      .notNullable()
      .defaultTo("landed")
      .comment(
        "Status of the registered object. See acceptable values within the `constraint_registry_status` table."
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
      .foreign("status")
      .references("value")
      .inTable("constraint_registry_status");
    table.unique(["name", "path", "server", "checksum"], { useConstraint: true });
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("registry");
};

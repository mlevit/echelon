exports.up = async function (knex) {
  return knex.schema.createTable("registry_entity_map", function (table) {
    table
      .increments("registry_entity_map_id")
      .comment("System generated unique identifier.");
    table
      .integer("registry_id")
      .notNullable()
      .comment(
        "System generated unique identifier of the registry this registry map is associated with."
      );
    table
      .integer("entity_id")
      .notNullable()
      .comment(
        "System generated unique identifier of the entity this registry map is associated with."
      );
    table
      .timestamp("insert_date")
      .notNullable()
      .defaultTo(knex.fn.now())
      .comment("UTC timestamp when the record was inserted into the table.");
    table.foreign("registry_id").references("registry_id").inTable("registry");
    table.foreign("entity_id").references("entity_id").inTable("entity");
    table.unique(["registry_id", "entity_id"], { useConstraint: true });
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("registry_entity_map");
};

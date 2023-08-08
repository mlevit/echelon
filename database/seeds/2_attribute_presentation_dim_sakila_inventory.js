exports.seed = function (knex) {
  return knex("attribute").insert([
    {
      artefact_id: knex("artefact")
        .where({ name: "presentation_dim_sakila_inventory" })
        .select("artefact_id"),
      physical_name: "inventory_sk",
      data_type: "integer",
      sequence_number: 1,
      classification: "internal",
      required_flag: true,
      computed_flag: false,
      sequence_flag: true,
      hash_key_flag: false,
      hash_diff_flag: false,
      record_source_flag: false,
      business_date_flag: false,
    },
    {
      artefact_id: knex("artefact")
        .where({ name: "presentation_dim_sakila_inventory" })
        .select("artefact_id"),
      physical_name: "inventory_id",
      data_type: "integer",
      sequence_number: 2,
      classification: "internal",
      required_flag: true,
      computed_flag: false,
      sequence_flag: false,
      hash_key_flag: true,
      hash_diff_flag: false,
      record_source_flag: false,
      business_date_flag: false,
    },
    {
      artefact_id: knex("artefact")
        .where({ name: "presentation_dim_sakila_inventory" })
        .select("artefact_id"),
      physical_name: "film_id",
      data_type: "integer",
      sequence_number: 3,
      classification: "internal",
      required_flag: true,
      computed_flag: false,
      sequence_flag: false,
      hash_key_flag: false,
      hash_diff_flag: true,
      record_source_flag: false,
      business_date_flag: false,
    },
    {
      artefact_id: knex("artefact")
        .where({ name: "presentation_dim_sakila_inventory" })
        .select("artefact_id"),
      physical_name: "store_id",
      data_type: "integer",
      sequence_number: 4,
      classification: "internal",
      required_flag: true,
      computed_flag: false,
      sequence_flag: false,
      hash_key_flag: false,
      hash_diff_flag: true,
      record_source_flag: false,
      business_date_flag: false,
    },
    {
      artefact_id: knex("artefact")
        .where({ name: "presentation_dim_sakila_inventory" })
        .select("artefact_id"),
      physical_name: "last_update",
      data_type: "timestamp",
      sequence_number: 5,
      classification: "internal",
      required_flag: false,
      computed_flag: false,
      sequence_flag: false,
      hash_key_flag: false,
      hash_diff_flag: true,
      record_source_flag: false,
      business_date_flag: false,
    },
  ]);
};

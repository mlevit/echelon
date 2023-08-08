exports.seed = function (knex) {
  return knex("attribute").insert([
    {
      artefact_id: knex("artefact")
        .where({ name: "staging_sakila_staff" })
        .select("artefact_id"),
      physical_name: "staff_id",
      data_type: "integer",
      sequence_number: 1,
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
        .where({ name: "staging_sakila_staff" })
        .select("artefact_id"),
      physical_name: "first_name",
      data_type: "varchar",
      length: 45,
      sequence_number: 2,
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
        .where({ name: "staging_sakila_staff" })
        .select("artefact_id"),
      physical_name: "last_name",
      data_type: "integer",
      length: 45,
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
        .where({ name: "staging_sakila_staff" })
        .select("artefact_id"),
      physical_name: "address_id",
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
        .where({ name: "staging_sakila_staff" })
        .select("artefact_id"),
      physical_name: "picture",
      data_type: "blob",
      sequence_number: 5,
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
        .where({ name: "staging_sakila_staff" })
        .select("artefact_id"),
      physical_name: "email",
      data_type: "varchar",
      sequence_number: 6,
      length: 50,
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
        .where({ name: "staging_sakila_staff" })
        .select("artefact_id"),
      physical_name: "store_id",
      data_type: "integer",
      sequence_number: 7,
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
        .where({ name: "staging_sakila_staff" })
        .select("artefact_id"),
      physical_name: "active",
      data_type: "boolean",
      sequence_number: 8,
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
        .where({ name: "staging_sakila_staff" })
        .select("artefact_id"),
      physical_name: "username",
      data_type: "varchar",
      sequence_number: 9,
      length: 16,
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
        .where({ name: "staging_sakila_staff" })
        .select("artefact_id"),
      physical_name: "password",
      data_type: "varchar",
      sequence_number: 10,
      length: 40,
      classification: "restricted",
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
        .where({ name: "staging_sakila_staff" })
        .select("artefact_id"),
      physical_name: "last_update",
      data_type: "timestamp",
      sequence_number: 11,
      classification: "internal",
      required_flag: true,
      computed_flag: false,
      sequence_flag: false,
      hash_key_flag: false,
      hash_diff_flag: true,
      record_source_flag: false,
      business_date_flag: true,
    },
  ]);
};

# Field

Each field within an entity is represented as an field. Fields store information about the field, such as its name, type, and whether it is nullable.

## Definition

<!-- definition -->

| Name                 | Type                     | Nullable | Description                                                                                                                              |
| -------------------- | ------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| field_id             | integer                  | NO       | System generated unique identifier.                                                                                                      |
| entity_id            | integer                  | NO       | System generated unique identifier of the entity this field is associated with.                                                          |
| physical_name        | character varying        | NO       | Name of the field as it appears in the entity.                                                                                           |
| data_type            | character varying        | NO       | Data type of the field as it appears in the entity.                                                                                      |
| length               | integer                  | YES      | Length in characters of the field as it appears in the entity.                                                                           |
| precision            | integer                  | YES      | Precision in numbers of the field as it appears in the entity.                                                                           |
| scale                | integer                  | YES      | Scale in numbers of the field as it appears in the entity.                                                                               |
| sequence_number      | integer                  | NO       | Sequence number of the field as it appears in the entity.                                                                                |
| group_number         | integer                  | YES      |                                                                                                                                          |
| description          | text                     | YES      | Description of the field.                                                                                                                |
| business_description | character varying        | YES      | Business-oriented description of the field.                                                                                              |
| business_name        | character varying        | YES      | Business name of the field that the business might be more familiar with.                                                                |
| business_alias       | character varying        | YES      | Business alias of the field that the business might be more familiar with.                                                               |
| acronym_name         | character varying        | YES      | Acronym of the field.                                                                                                                    |
| classification       | character varying        | NO       | Security classification of the field. See acceptable values within the `constraint_field_classification` table. Default value: `public`. |
| required_flag        | boolean                  | NO       | Is the value of the field mandatory.                                                                                                     |
| computed_flag        | boolean                  | NO       | Is the value of the field a direct mapping to another field or has the value of the field been generated in the extract or load job.     |
| sequence_flag        | boolean                  | NO       | Does the field contain the record sequence number of the record.                                                                         |
| hash_key_flag        | boolean                  | NO       | Is the field used as part of the hash_key column i.e., primary key.                                                                      |
| hash_diff_flag       | boolean                  | NO       | Is the field used as part of the hash_diff column i.e., change data detection job.                                                       |
| record_source_flag   | boolean                  | NO       | Does the field contain the source system of the record.                                                                                  |
| business_date_flag   | boolean                  | NO       | Does the field contain the business date of the record.                                                                                  |
| insert_date          | timestamp with time zone | NO       | UTC timestamp when the record was inserted into the table.                                                                               |
| update_date          | timestamp with time zone | YES      | UTC timestamp when the record was updated into the table.                                                                                |
| migration_insert_id  | integer                  | YES      | System generated unique identifier of the migration this record was inserted by.                                                         |
| migration_update_id  | integer                  | YES      | System generated unique identifier of the migration this record was updated by.                                                          |

<!-- definitionstop -->

## Constraints

<!-- constraint -->

| Type        | Columns                    |
| ----------- | -------------------------- |
| FOREIGN KEY | entity_id                  |
| FOREIGN KEY | classification             |
| PRIMARY KEY | field_id                   |
| UNIQUE      | entity_id, physical_name   |
| UNIQUE      | entity_id, sequence_number |

<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->

| Column         | Value      | Comment                                                                                                                                  |
| -------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| classification | internal   | Data that is only meant for internal purposes and should not be shared outside of the organisation.                                      |
| classification | public     | Data that has been made public and can be freely disclosed with anyone externally.                                                       |
| classification | restricted | Highly sensitive corporate or customer data that could have senior negative legal or financial ramifications if exposed.                 |
| classification | sensitive  | Moderately sensitive data that should only be shared with authorised individuals inside (and in some cases outside of) the organisation. |

<!-- acceptablevaluesstop -->

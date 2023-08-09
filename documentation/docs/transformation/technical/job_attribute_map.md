# Job Attribute Map

The relationship between two attributes for a particular job.

## Definition

<!-- definition -->

| Name                 | Type                     | Nullable | Description                                                                                                                                                                                                                                                                                                                      |
| -------------------- | ------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| job_attribute_map_id | integer                  | NO       | System generated unique identifier.                                                                                                                                                                                                                                                                                              |
| job_id               | integer                  | NO       | System generated unique identifier of the job this job attribute mapping is associated with.                                                                                                                                                                                                                                     |
| source_attribute_id  | integer                  | NO       | System generated unique identifier of the source attribute this job attribute mapping is associated with.                                                                                                                                                                                                                        |
| target_attribute_id  | integer                  | NO       | System generated unique identifier of the target attribute this job attribute mapping is associated with.                                                                                                                                                                                                                        |
| hard_rule            | character varying        | YES      | A data cleansing or standardisation hard rule that will be applied to the value source attribute before being stored into the target attribute. This rule should be in the language used by the ETL tool. {column} should be used as a placeholder for the source attribute within the hard rule e.g., cast({column} as integer) |
| insert_date          | timestamp with time zone | NO       | UTC timestamp when the record was inserted into the table.                                                                                                                                                                                                                                                                       |
| update_date          | timestamp with time zone | YES      | UTC timestamp when the record was updated into the table.                                                                                                                                                                                                                                                                        |
| migration_insert_id  | integer                  | YES      | System generated unique identifier of the migration this record was inserted by.                                                                                                                                                                                                                                                 |
| migration_update_id  | integer                  | YES      | System generated unique identifier of the migration this record was updated by.                                                                                                                                                                                                                                                  |

<!-- definitionstop -->

## Constraints

<!-- constraint -->

| Type        | Columns                                          |
| ----------- | ------------------------------------------------ |
| FOREIGN KEY | job_id                                           |
| FOREIGN KEY | source_attribute_id                              |
| FOREIGN KEY | target_attribute_id                              |
| PRIMARY KEY | job_attribute_map_id                             |
| UNIQUE      | job_id, source_attribute_id, target_attribute_id |

<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->

No related acceptable values found.

<!-- acceptablevaluesstop -->

# Job Field Map

The relationship between two fields for a particular job.

## Definition

<!-- definition -->

| Name                | Type                     | Nullable | Description                                                                                                                                                                                                                                                                                                          |
| ------------------- | ------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| job_field_map_id    | integer                  | NO       | System generated unique identifier.                                                                                                                                                                                                                                                                                  |
| job_id              | integer                  | NO       | System generated unique identifier of the job this job field mapping is associated with.                                                                                                                                                                                                                             |
| source_field_id     | integer                  | NO       | System generated unique identifier of the source field this job field mapping is associated with.                                                                                                                                                                                                                    |
| target_field_id     | integer                  | NO       | System generated unique identifier of the target field this job field mapping is associated with.                                                                                                                                                                                                                    |
| hard_rule           | character varying        | YES      | A data cleansing or standardisation hard rule that will be applied to the value source field before being stored into the target field. This rule should be in the language used by the ETL tool. {column} should be used as a placeholder for the source field within the hard rule e.g., cast({column} as integer) |
| insert_date         | timestamp with time zone | NO       | UTC timestamp when the record was inserted into the table.                                                                                                                                                                                                                                                           |
| update_date         | timestamp with time zone | YES      | UTC timestamp when the record was updated into the table.                                                                                                                                                                                                                                                            |
| migration_insert_id | integer                  | YES      | System generated unique identifier of the migration this record was inserted by.                                                                                                                                                                                                                                     |
| migration_update_id | integer                  | YES      | System generated unique identifier of the migration this record was updated by.                                                                                                                                                                                                                                      |

<!-- definitionstop -->

## Constraints

<!-- constraint -->

| Type        | Columns                                  |
| ----------- | ---------------------------------------- |
| FOREIGN KEY | job_id                                   |
| FOREIGN KEY | source_field_id                          |
| FOREIGN KEY | target_field_id                          |
| PRIMARY KEY | job_field_map_id                         |
| UNIQUE      | job_id, source_field_id, target_field_id |

<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->

No related acceptable values found.

<!-- acceptablevaluesstop -->

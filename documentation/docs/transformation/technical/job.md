# Job

A job represents the flow of data from source to target. Jobes define point to point relationships between data sources.

## Definition

<!-- definition -->

| Name                | Type                     | Nullable | Description                                                                                                                                                                                                        |
| ------------------- | ------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| job_id              | integer                  | NO       | System generated unique identifier.                                                                                                                                                                                |
| name                | character varying        | NO       | Name of the job.                                                                                                                                                                                                   |
| description         | text                     | YES      | Description of the job.                                                                                                                                                                                            |
| type                | character varying        | NO       | Type of the job. See acceptable values within the `constraint_job_type` table.                                                                                                                                     |
| priority            | integer                  | NO       | Priority of the job. When multiple jobs can be run at the same time, the jobs with higher priority run first.                                                                                                      |
| dependency_logic    | character varying        | NO       | How should entity dependencies be treated (`and` = all required entities require updates, `or` = any required entities require updates). See acceptable values within the `constraint_job_dependency_logic` table. |
| insert_date         | timestamp with time zone | NO       | UTC timestamp when the record was inserted into the table.                                                                                                                                                         |
| update_date         | timestamp with time zone | YES      | UTC timestamp when the record was inserted into the table.                                                                                                                                                         |
| migration_insert_id | integer                  | YES      | System generated unique identifier of the migration this record was inserted by.                                                                                                                                   |
| migration_update_id | integer                  | YES      | System generated unique identifier of the migration this record was updated by.                                                                                                                                    |

<!-- definitionstop -->

## Constraints

<!-- constraint -->

| Type        | Columns          |
| ----------- | ---------------- |
| FOREIGN KEY | dependency_logic |
| FOREIGN KEY | type             |
| PRIMARY KEY | job_id           |
| UNIQUE      | name             |

<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->

| Column           | Value                                 | Comment                                |
| ---------------- | ------------------------------------- | -------------------------------------- |
| type             | accumulating_snapshot_fact_table_load |                                        |
| type             | data_mask                             |                                        |
| type             | data_profile                          |                                        |
| type             | data_quality_check                    |                                        |
| type             | dimension_type_1_table_load           |                                        |
| type             | dimension_type_2_table_load           |                                        |
| type             | file_load                             |                                        |
| type             | generic_activity                      |                                        |
| type             | http_load                             |                                        |
| type             | hub_table_load                        |                                        |
| type             | link_table_load                       |                                        |
| type             | satellite_table_load                  |                                        |
| type             | snapshot_fact_table_load              |                                        |
| type             | staging_table_load                    |                                        |
| type             | table_load                            |                                        |
| type             | transactional_fact_table_load         |                                        |
| dependency_logic | and                                   | All required entities require updates. |
| dependency_logic | or                                    | Any required entities require updates. |

<!-- acceptablevaluesstop -->

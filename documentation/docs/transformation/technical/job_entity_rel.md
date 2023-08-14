# Job Entity Relationship

The relationship between two or more entities for a particular job.

## Definition

<!-- definition -->
| Name                | Type                     | Nullable | Description                                                                                           |
| ------------------- | ------------------------ | -------- | ----------------------------------------------------------------------------------------------------- |
| job_entity_rel_id   | integer                  | NO       | System generated unique identifier.                                                                   |
| job_id              | integer                  | NO       | System generated unique identifier of the job this job entity relationship is associated with.        |
| sequence_number     | integer                  | NO       | Sequence number of the job entity relationship.                                                       |
| source_entity_id    | integer                  | NO       | System generated unique identifier of the source job this job entity relationship is associated with. |
| target_entity_id    | integer                  | NO       | System generated unique identifier of the target job this job entity relationship is associated with. |
| required_flag       | boolean                  | NO       | Does the source entity require updated data for the job to run. Default value: `true`.                |
| insert_date         | timestamp with time zone | NO       | UTC timestamp when the record was inserted into the table.                                            |
| update_date         | timestamp with time zone | YES      | UTC timestamp when the record was updated into the table.                                             |
| migration_insert_id | integer                  | YES      | System generated unique identifier of the migration this record was inserted by.                      |
| migration_update_id | integer                  | YES      | System generated unique identifier of the migration this record was updated by.                       |
<!-- definitionstop -->

## Constraints

<!-- constraint -->
| Type        | Columns                                    |
| ----------- | ------------------------------------------ |
| FOREIGN KEY | job_id                                     |
| FOREIGN KEY | source_entity_id                           |
| FOREIGN KEY | target_entity_id                           |
| PRIMARY KEY | job_entity_rel_id                          |
| UNIQUE      | job_id, sequence_number                    |
| UNIQUE      | job_id, source_entity_id, target_entity_id |
<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->
No related acceptable values found.
<!-- acceptablevaluesstop -->

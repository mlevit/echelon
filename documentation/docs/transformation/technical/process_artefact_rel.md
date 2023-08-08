# Process Artefact Relationship

The relationship between two or more artefacts for a particular process.

## Definition

<!-- definition -->
| Name                    | Type                     | Nullable | Description                                                                                                     |
| ----------------------- | ------------------------ | -------- | --------------------------------------------------------------------------------------------------------------- |
| process_artefact_rel_id | integer                  | NO       | System generated unique identifier.                                                                             |
| process_id              | integer                  | NO       | System generated unique identifier of the process this process artefact relationship is associated with.        |
| sequence_number         | integer                  | NO       | Sequence number of the process artefact relationship.                                                           |
| source_artefact_id      | integer                  | NO       | System generated unique identifier of the source process this process artefact relationship is associated with. |
| target_artefact_id      | integer                  | NO       | System generated unique identifier of the target process this process artefact relationship is associated with. |
| required_flag           | boolean                  | NO       | Does the source artefact require updated data for the process to run. Default value: `true`.                    |
| insert_date             | timestamp with time zone | NO       | UTC timestamp when the record was inserted into the table.                                                      |
| update_date             | timestamp with time zone | YES      | UTC timestamp when the record was updated into the table.                                                       |
| migration_insert_id     | integer                  | YES      | System generated unique identifier of the migration this record was inserted by.                                |
| migration_update_id     | integer                  | YES      | System generated unique identifier of the migration this record was updated by.                                 |
<!-- definitionstop -->

## Constraints

<!-- constraint -->
| Type        | Columns                                            |
| ----------- | -------------------------------------------------- |
| FOREIGN KEY | process_id                                         |
| FOREIGN KEY | source_artefact_id                                 |
| FOREIGN KEY | target_artefact_id                                 |
| PRIMARY KEY | process_artefact_rel_id                            |
| UNIQUE      | process_id, sequence_number                        |
| UNIQUE      | process_id, source_artefact_id, target_artefact_id |
<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->
No related acceptable values found.
<!-- acceptablevaluesstop -->

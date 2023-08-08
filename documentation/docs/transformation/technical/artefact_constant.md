# Artefact Constant

An Artefact constant is a value that is not expected to change over time. Artefact Constants are linked to specific Artefacts and are used to provide extra pieces of metadata for data handling purposes.

## Definition

<!-- definition -->
| Name                 | Type                     | Nullable | Description                                                                                       |
| -------------------- | ------------------------ | -------- | ------------------------------------------------------------------------------------------------- |
| artefact_constant_id | integer                  | NO       | System generated unique identifier.                                                               |
| artefact_id          | integer                  | NO       | System generated unique identifier of the artefact.                                               |
| name                 | character varying        | NO       | Name of the constant. See acceptable values within the `constraint_artefact_constant_name` table. |
| value                | character varying        | NO       | Value of the constant.                                                                            |
| insert_date          | timestamp with time zone | NO       | UTC timestamp when the record was inserted into the table.                                        |
| update_date          | timestamp with time zone | YES      | UTC timestamp when the record was updated into the table.                                         |
| migration_insert_id  | integer                  | YES      | System generated unique identifier of the migration this record was inserted by.                  |
| migration_update_id  | integer                  | YES      | System generated unique identifier of the migration this record was updated by.                   |
<!-- definitionstop -->

## Constraints

<!-- constraint -->
| Type        | Columns              |
| ----------- | -------------------- |
| FOREIGN KEY | artefact_id          |
| FOREIGN KEY | name                 |
| PRIMARY KEY | artefact_constant_id |
| UNIQUE      | artefact_id, name    |
<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->
| Column | Values                                                                       |
| ------ | ---------------------------------------------------------------------------- |
| name   | See full list of values [here](../../constraints/artefact_constant_name.md). |
<!-- acceptablevaluesstop -->

# Process Constant

A Process Constant is a value that is not expected to change over time. Process Constants are linked to a specific Process and are used to provide extra pieces of metadata for data handling purposes.

## Definition

<!-- definition -->
| Name                | Type                     | Nullable | Description                                                                                      |
| ------------------- | ------------------------ | -------- | ------------------------------------------------------------------------------------------------ |
| process_constant_id | integer                  | NO       | System generated unique identifier.                                                              |
| process_id          | integer                  | NO       | System generated unique identifier of the process.                                               |
| name                | character varying        | NO       | Name of the constant. See acceptable values within the `constraint_process_constant_name` table. |
| value               | character varying        | NO       | Value of the constant.                                                                           |
| insert_date         | timestamp with time zone | NO       | UTC timestamp when the record was inserted into the table.                                       |
| update_date         | timestamp with time zone | YES      | UTC timestamp when the record was updated into the table.                                        |
| migration_insert_id | integer                  | YES      | System generated unique identifier of the migration this record was inserted by.                 |
| migration_update_id | integer                  | YES      | System generated unique identifier of the migration this record was updated by.                  |
<!-- definitionstop -->

## Constraints

<!-- constraint -->
| Type        | Columns             |
| ----------- | ------------------- |
| FOREIGN KEY | name                |
| FOREIGN KEY | process_id          |
| PRIMARY KEY | process_constant_id |
| UNIQUE      | process_id, name    |
<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->
| Column | Values                                                                      |
| ------ | --------------------------------------------------------------------------- |
| name   | See full list of values [here](../../constraints/process_constant_name.md). |
<!-- acceptablevaluesstop -->

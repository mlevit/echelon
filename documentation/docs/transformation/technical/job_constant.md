# Job Constant

A Job Constant is a value that is not expected to change over time. Job Constants are linked to a specific Job and are used to provide extra pieces of metadata for data handling purposes.

## Definition

<!-- definition -->
| Name                | Type                     | Nullable | Description                                                                                  |
| ------------------- | ------------------------ | -------- | -------------------------------------------------------------------------------------------- |
| job_constant_id     | integer                  | NO       | System generated unique identifier.                                                          |
| job_id              | integer                  | NO       | System generated unique identifier of the job.                                               |
| name                | character varying        | NO       | Name of the constant. See acceptable values within the `constraint_job_constant_name` table. |
| value               | character varying        | NO       | Value of the constant.                                                                       |
| insert_date         | timestamp with time zone | NO       | UTC timestamp when the record was inserted into the table.                                   |
| update_date         | timestamp with time zone | YES      | UTC timestamp when the record was updated into the table.                                    |
| migration_insert_id | integer                  | YES      | System generated unique identifier of the migration this record was inserted by.             |
| migration_update_id | integer                  | YES      | System generated unique identifier of the migration this record was updated by.              |
<!-- definitionstop -->

## Constraints

<!-- constraint -->
| Type        | Columns         |
| ----------- | --------------- |
| FOREIGN KEY | job_id          |
| FOREIGN KEY | name            |
| PRIMARY KEY | job_constant_id |
| UNIQUE      | job_id, name    |
<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->
| Column | Values                                                                  |
| ------ | ----------------------------------------------------------------------- |
| name   | See full list of values [here](../../constraints/job_constant_name.md). |
<!-- acceptablevaluesstop -->

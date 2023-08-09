# Variable

A variable is value that is expected to change over time. Variables are linked to other Echelon objects such as job and artefact to provide extra piece of metadata for data handling purposes at run time.

## Definition

<!-- definition -->

| Name        | Type                     | Nullable | Description                                                                                                                        |
| ----------- | ------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| variable_id | integer                  | NO       | System generated unique identifier.                                                                                                |
| object_id   | integer                  | NO       | System generated unique identifier of the job, artefact, or attribute this variable is associated with.                            |
| object_type | character varying        | NO       | The type of the object this variable is associated with. See acceptable values within the `constraint_variable_object_type` table. |
| name        | character varying        | NO       | Name of the variable. See acceptable values within the `constraint_variable_name` table.                                           |
| value       | character varying        | NO       | Value of the variable.                                                                                                             |
| insert_date | timestamp with time zone | NO       | UTC timestamp when the record was inserted into the table.                                                                         |
| update_date | timestamp with time zone | YES      | UTC timestamp when the record was updated into the table.                                                                          |

<!-- definitionstop -->

## Constraints

<!-- constraint -->

| Type        | Columns                      |
| ----------- | ---------------------------- |
| FOREIGN KEY | name, object_type            |
| FOREIGN KEY | object_type                  |
| PRIMARY KEY | variable_id                  |
| UNIQUE      | object_id, object_type, name |

<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->

| Column      | Values                                                                     |
| ----------- | -------------------------------------------------------------------------- |
| object_type | See full list of values [here](../../constraints/variable_object_type.md). |
| name        | See full list of values [here](../../constraints/variable_name.md).        |

<!-- acceptablevaluesstop -->

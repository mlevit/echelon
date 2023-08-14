# Registry Run Mapping

The relationship between a registry object and the run that either consumes or produces it.

## Definition

<!-- definition -->
| Name                | Type                     | Nullable | Description                                                                              |
| ------------------- | ------------------------ | -------- | ---------------------------------------------------------------------------------------- |
| registry_run_map_id | integer                  | NO       | System generated unique identifier.                                                      |
| registry_id         | integer                  | NO       | System generated unique identifier of the registry this registry map is associated with. |
| run_id              | integer                  | NO       | System generated unique identifier of the run this registry map is associated with.      |
| insert_date         | timestamp with time zone | NO       | UTC timestamp when the record was inserted into the table.                               |
<!-- definitionstop -->

## Constraints

<!-- constraint -->
| Type        | Columns             |
| ----------- | ------------------- |
| FOREIGN KEY | registry_id         |
| FOREIGN KEY | run_id              |
| PRIMARY KEY | registry_run_map_id |
| UNIQUE      | registry_id, run_id |
<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->
No related acceptable values found.
<!-- acceptablevaluesstop -->

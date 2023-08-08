# Registry Process Audit Mapping

The relationship between a registry object and the process audit that either consumes or produces it.

## Definition

<!-- definition -->
| Name                          | Type                     | Nullable | Description                                                                                   |
| ----------------------------- | ------------------------ | -------- | --------------------------------------------------------------------------------------------- |
| registry_process_audit_map_id | integer                  | NO       | System generated unique identifier.                                                           |
| registry_id                   | integer                  | NO       | System generated unique identifier of the registry this registry map is associated with.      |
| process_audit_id              | integer                  | NO       | System generated unique identifier of the process audit this registry map is associated with. |
| insert_date                   | timestamp with time zone | NO       | UTC timestamp when the record was inserted into the table.                                    |
<!-- definitionstop -->

## Constraints

<!-- constraint -->
| Type        | Columns                       |
| ----------- | ----------------------------- |
| FOREIGN KEY | process_audit_id              |
| FOREIGN KEY | registry_id                   |
| PRIMARY KEY | registry_process_audit_map_id |
| UNIQUE      | registry_id, process_audit_id |
<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->
No related acceptable values found.
<!-- acceptablevaluesstop -->

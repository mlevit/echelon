# Registry Artefact Mapping

The relationship between a registry object and an artefact.

## Definition

<!-- definition -->
| Name                     | Type                     | Nullable | Description                                                                              |
| ------------------------ | ------------------------ | -------- | ---------------------------------------------------------------------------------------- |
| registry_artefact_map_id | integer                  | NO       | System generated unique identifier.                                                      |
| registry_id              | integer                  | NO       | System generated unique identifier of the registry this registry map is associated with. |
| artefact_id              | integer                  | NO       | System generated unique identifier of the artefact this registry map is associated with. |
| insert_date              | timestamp with time zone | NO       | UTC timestamp when the record was inserted into the table.                               |
<!-- definitionstop -->

## Constraints

<!-- constraint -->
| Type        | Columns                  |
| ----------- | ------------------------ |
| FOREIGN KEY | artefact_id              |
| FOREIGN KEY | registry_id              |
| PRIMARY KEY | registry_artefact_map_id |
| UNIQUE      | registry_id, artefact_id |
<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->
No related acceptable values found.
<!-- acceptablevaluesstop -->

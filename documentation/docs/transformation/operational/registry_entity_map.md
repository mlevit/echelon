# Registry Entity Mapping

The relationship between a registry object and an entity.

## Definition

<!-- definition -->

| Name                   | Type                     | Nullable | Description                                                                              |
| ---------------------- | ------------------------ | -------- | ---------------------------------------------------------------------------------------- |
| registry_entity_map_id | integer                  | NO       | System generated unique identifier.                                                      |
| registry_id            | integer                  | NO       | System generated unique identifier of the registry this registry map is associated with. |
| entity_id              | integer                  | NO       | System generated unique identifier of the entity this registry map is associated with.   |
| insert_date            | timestamp with time zone | NO       | UTC timestamp when the record was inserted into the table.                               |

<!-- definitionstop -->

## Constraints

<!-- constraint -->

| Type        | Columns                |
| ----------- | ---------------------- |
| FOREIGN KEY | entity_id              |
| FOREIGN KEY | registry_id            |
| PRIMARY KEY | registry_entity_map_id |
| UNIQUE      | registry_id, entity_id |

<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->

No related acceptable values found.

<!-- acceptablevaluesstop -->

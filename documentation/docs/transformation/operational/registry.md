# Registry

A registry is the record of physical data objects either ingressing or egressing the system.

## Definition

<!-- definition -->

| Name        | Type                     | Nullable | Description                                                                                           |
| ----------- | ------------------------ | -------- | ----------------------------------------------------------------------------------------------------- |
| registry_id | integer                  | NO       | System generated unique identifier.                                                                   |
| name        | character varying        | NO       | Full name of the registered object.                                                                   |
| path        | character varying        | NO       | Path to the registered object.                                                                        |
| server      | character varying        | NO       | Server of the registered object (i.e., file server IP or DNS or S3 Bucket name).                      |
| size        | character varying        | NO       | Size of the registered object in KB.                                                                  |
| checksum    | character varying        | NO       | MD5 checksum of the registered object.                                                                |
| type        | character varying        | NO       | Object type (e.g., CSV, TXT, DAT etc.).                                                               |
| status      | character varying        | NO       | Status of the registered object. See acceptable values within the `constraint_registry_status` table. |
| insert_date | timestamp with time zone | NO       | UTC timestamp when the record was inserted into the table.                                            |
| update_date | timestamp with time zone | YES      | UTC timestamp when the record was updated into the table.                                             |

<!-- definitionstop -->

## Constraints

<!-- constraint -->

| Type        | Columns                      |
| ----------- | ---------------------------- |
| FOREIGN KEY | status                       |
| PRIMARY KEY | registry_id                  |
| UNIQUE      | name, path, server, checksum |

<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->

| Column | Value       | Comment            |
| ------ | ----------- | ------------------ |
| status | invalidated | Failed validation. |
| status | landed      | Landed.            |
| status | jobed       | Jobed.             |
| status | validated   | Passed validation. |

<!-- acceptablevaluesstop -->

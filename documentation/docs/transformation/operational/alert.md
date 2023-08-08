# Alert

An alert is a record of an event that occurred in the system that should be reported to the user.

## Definition

<!-- definition -->
| Name             | Type                     | Nullable | Description                                                                            |
| ---------------- | ------------------------ | -------- | -------------------------------------------------------------------------------------- |
| alert_id         | integer                  | NO       | System generated unique identifier.                                                    |
| process_audit_id | integer                  | NO       | System generated unique identifier of the process audit this alert is associated with. |
| code             | character varying        | NO       | Status of the alert. See acceptable values within the `constraint_alert_code` table.   |
| subject          | character varying        | NO       | Subject of the alert.                                                                  |
| message          | text                     | NO       | Message of the alert.                                                                  |
| insert_date      | timestamp with time zone | NO       | UTC timestamp when the record was inserted into the table.                             |
<!-- definitionstop -->

## Constraints

<!-- constraint -->
| Type        | Columns                |
| ----------- | ---------------------- |
| FOREIGN KEY | code                   |
| FOREIGN KEY | process_audit_id       |
| PRIMARY KEY | alert_id               |
| UNIQUE      | process_audit_id, code |
<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->
| Column | Value | Comment                                            |
| ------ | ----- | -------------------------------------------------- |
| code   | A01   | Source artefact has zero rows.                     |
| code   | A02   | Target Artefact loaded zero rows.                  |
| code   | A03   | Target Artefact has rejected rows.                 |
| code   | A04   | Artefact loaded less rows than recent average.     |
| code   | A05   | Artefact loaded more rows than recent average.     |
| code   | P01   | Process has failed.                                |
| code   | P02   | Process has taken less time than usual to run.     |
| code   | P03   | Process has taken more time than usual to run.     |
| code   | P04   | Process has not completed as per business SLA.     |
| code   | P05   | Process is currently running longer than expected. |
<!-- acceptablevaluesstop -->

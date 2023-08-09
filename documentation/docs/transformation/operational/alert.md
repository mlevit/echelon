# Alert

An alert is a record of an event that occurred in the system that should be reported to the user.

## Definition

<!-- definition -->

| Name        | Type                     | Nullable | Description                                                                          |
| ----------- | ------------------------ | -------- | ------------------------------------------------------------------------------------ |
| alert_id    | integer                  | NO       | System generated unique identifier.                                                  |
| run_id      | integer                  | NO       | System generated unique identifier of the run this alert is associated with.         |
| code        | character varying        | NO       | Status of the alert. See acceptable values within the `constraint_alert_code` table. |
| subject     | character varying        | NO       | Subject of the alert.                                                                |
| message     | text                     | NO       | Message of the alert.                                                                |
| insert_date | timestamp with time zone | NO       | UTC timestamp when the record was inserted into the table.                           |

<!-- definitionstop -->

## Constraints

<!-- constraint -->

| Type        | Columns      |
| ----------- | ------------ |
| FOREIGN KEY | code         |
| FOREIGN KEY | run_id       |
| PRIMARY KEY | alert_id     |
| UNIQUE      | run_id, code |

<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->

| Column | Value | Comment                                        |
| ------ | ----- | ---------------------------------------------- |
| code   | A01   | Source entity has zero rows.                   |
| code   | A02   | Target Entity loaded zero rows.                |
| code   | A03   | Target Entity has rejected rows.               |
| code   | A04   | Entity loaded less rows than recent average.   |
| code   | A05   | Entity loaded more rows than recent average.   |
| code   | P01   | Job has failed.                                |
| code   | P02   | Job has taken less time than usual to run.     |
| code   | P03   | Job has taken more time than usual to run.     |
| code   | P04   | Job has not completed as per business SLA.     |
| code   | P05   | Job is currently running longer than expected. |

<!-- acceptablevaluesstop -->

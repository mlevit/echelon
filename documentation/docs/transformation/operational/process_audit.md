# Process Audit

An executed instance of a process. A process audit record is created for each execution of a process.

## Definition

<!-- definition -->
| Name             | Type                     | Nullable | Description                                                                                               |
| ---------------- | ------------------------ | -------- | --------------------------------------------------------------------------------------------------------- |
| process_audit_id | integer                  | NO       | System generated unique identifier.                                                                       |
| process_id       | integer                  | NO       | System generated unique identifier of the process this process audit is associated with.                  |
| start            | timestamp with time zone | NO       | UTC timestamp when the process audit was started.                                                         |
| end              | timestamp with time zone | YES      | UTC timestamp when the process audit was stopped.                                                         |
| status           | character varying        | NO       | The status of the process audit. See acceptable values within the `constrain_process_audit_status` table. |
<!-- definitionstop -->

## Constraints

<!-- constraint -->
| Type        | Columns                 |
| ----------- | ----------------------- |
| FOREIGN KEY | process_id              |
| FOREIGN KEY | status                  |
| PRIMARY KEY | process_audit_id        |
| UNIQUE      | process_id, end, status |
<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->
| Column | Value     | Comment                |
| ------ | --------- | ---------------------- |
| status | completed | Completed succesfully. |
| status | failed    | Failed.                |
| status | running   | Currently running.     |
<!-- acceptablevaluesstop -->

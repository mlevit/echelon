# Log

A log is an event that occurred in the system during the execution of a process audit. Logs can be informational, warning, or error. It is encouraged to record both informational and error logs to provide a complete audit of the process.

## Definition

<!-- definition -->
| Name             | Type                     | Nullable | Description                                                                          |
| ---------------- | ------------------------ | -------- | ------------------------------------------------------------------------------------ |
| log_id           | integer                  | NO       | System generated unique identifier.                                                  |
| process_audit_id | integer                  | NO       | System generated unique identifier of the process audit this log is associated with. |
| job              | character varying        | YES      | ETL job that produced the log.                                                       |
| function         | character varying        | YES      | ETL job function that produced the log.                                              |
| priority         | character varying        | NO       | Priority of log. See acceptable values within the `constraint_log_priority` table.   |
| message          | character varying        | NO       | Message of the error.                                                                |
| code             | integer                  | YES      | Error code of the log. Either system generated or self-assigned.                     |
| insert_date      | timestamp with time zone | NO       | UTC timestamp when the record was inserted into the table.                           |
<!-- definitionstop -->

## Constraints

<!-- constraint -->
| Type        | Columns                   |
| ----------- | ------------------------- |
| FOREIGN KEY | priority                  |
| FOREIGN KEY | process_audit_id          |
| PRIMARY KEY | log_id                    |
| UNIQUE      | process_audit_id, message |
<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->
| Column   | Value | Comment                                                                                                   |
| -------- | ----- | --------------------------------------------------------------------------------------------------------- |
| priority | DEBUG | Designates fine-grained informational events that are most useful to debug an application.                |
| priority | ERROR | Designates error events that might still allow the application to continue running.                       |
| priority | FATAL | Designates very severe error events that will presumably lead the application to abort.                   |
| priority | INFO  | Designates informational messages that highlight the progress of the application at coarse-grained level. |
| priority | WARN  | Designates potentially harmful situations.                                                                |
<!-- acceptablevaluesstop -->

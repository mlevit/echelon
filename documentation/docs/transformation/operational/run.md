# Run

An executed instance of a job. A run record is created for each execution of a job.

## Definition

<!-- definition -->

| Name   | Type                     | Nullable | Description                                                                           |
| ------ | ------------------------ | -------- | ------------------------------------------------------------------------------------- |
| run_id | integer                  | NO       | System generated unique identifier.                                                   |
| job_id | integer                  | NO       | System generated unique identifier of the job this run is associated with.            |
| start  | timestamp with time zone | NO       | UTC timestamp when the run was started.                                               |
| end    | timestamp with time zone | YES      | UTC timestamp when the run was stopped.                                               |
| status | character varying        | NO       | The status of the run. See acceptable values within the `constrain_run_status` table. |

<!-- definitionstop -->

## Constraints

<!-- constraint -->

| Type        | Columns             |
| ----------- | ------------------- |
| FOREIGN KEY | job_id              |
| FOREIGN KEY | status              |
| PRIMARY KEY | run_id              |
| UNIQUE      | job_id, end, status |

<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->

| Column | Value     | Comment                |
| ------ | --------- | ---------------------- |
| status | completed | Completed succesfully. |
| status | failed    | Failed.                |
| status | running   | Currently running.     |

<!-- acceptablevaluesstop -->

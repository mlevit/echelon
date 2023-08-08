# Flow

A flow is the count of data items that pass through a process. For any given process audit, multiple flows will be recording including `source_count`, `insert_count` and more.

The collection of this data is deemed necessary for data reconciliation.

## Definition

<!-- definition -->
| Name             | Type                     | Nullable | Description                                                                           |
| ---------------- | ------------------------ | -------- | ------------------------------------------------------------------------------------- |
| flow_id          | integer                  | NO       | System generated unique identifier.                                                   |
| process_audit_id | integer                  | NO       | System generated unique identifier of the process audit this flow is associated with. |
| job              | character varying        | YES      | ETL job that produced the metric.                                                     |
| function         | character varying        | YES      | ETL job function that produced the metric.                                            |
| label            | character varying        | NO       | Label of the flow.                                                                    |
| count            | integer                  | NO       | Record count.                                                                         |
| insert_date      | timestamp with time zone | NO       | UTC timestamp when the record was inserted into the table.                            |
<!-- definitionstop -->

## Constraints

<!-- constraint -->
| Type        | Columns                 |
| ----------- | ----------------------- |
| FOREIGN KEY | label                   |
| FOREIGN KEY | process_audit_id        |
| PRIMARY KEY | flow_id                 |
| UNIQUE      | process_audit_id, label |
<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->
| Column | Value                             | Comment                                                                                                                            |
| ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| label  | end_date_count                    | Number of records updated in the target artefact as part of SCD Type 2.                                                            |
| label  | insert_count                      | Number of records inserted into the target artefact.                                                                               |
| label  | match_count                       | Number of records that were found to be identical in the source and the target artefact.                                           |
| label  | reject_count                      | Number of records that were not inserted into the target artefact because of an error.                                             |
| label  | source_count                      | Number of records present in the source artefact that were selected.                                                               |
| label  | technical_reconciliation_variance | Number of records that are not accounted for. If this value is greater than or less than zero technical reconciliation has failed. |
| label  | update_insert_count               | Number of records inserted into the target artefact as part of SCD Type 2.                                                         |
<!-- acceptablevaluesstop -->

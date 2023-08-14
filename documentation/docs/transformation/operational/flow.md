# Flow

A flow is the count of data items that pass through a job. For any given run, multiple flows will be recording including `source_count`, `insert_count` and more.

The collection of this data is deemed necessary for data reconciliation.

## Definition

<!-- definition -->
| Name        | Type                     | Nullable | Description                                                                 |
| ----------- | ------------------------ | -------- | --------------------------------------------------------------------------- |
| flow_id     | integer                  | NO       | System generated unique identifier.                                         |
| run_id      | integer                  | NO       | System generated unique identifier of the run this flow is associated with. |
| job         | character varying        | YES      | ETL job that produced the metric.                                           |
| function    | character varying        | YES      | ETL job function that produced the metric.                                  |
| label       | character varying        | NO       | Label of the flow.                                                          |
| count       | integer                  | NO       | Record count.                                                               |
| insert_date | timestamp with time zone | NO       | UTC timestamp when the record was inserted into the table.                  |
<!-- definitionstop -->

## Constraints

<!-- constraint -->
| Type        | Columns       |
| ----------- | ------------- |
| FOREIGN KEY | label         |
| FOREIGN KEY | run_id        |
| PRIMARY KEY | flow_id       |
| UNIQUE      | run_id, label |
<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->
| Column | Value                             | Comment                                                                                                                            |
| ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| label  | end_date_count                    | Number of records updated in the target entity as part of SCD Type 2.                                                              |
| label  | insert_count                      | Number of records inserted into the target entity.                                                                                 |
| label  | match_count                       | Number of records that were found to be identical in the source and the target entity.                                             |
| label  | reject_count                      | Number of records that were not inserted into the target entity because of an error.                                               |
| label  | source_count                      | Number of records present in the source entity that were selected.                                                                 |
| label  | technical_reconciliation_variance | Number of records that are not accounted for. If this value is greater than or less than zero technical reconciliation has failed. |
| label  | update_insert_count               | Number of records inserted into the target entity as part of SCD Type 2.                                                           |
<!-- acceptablevaluesstop -->

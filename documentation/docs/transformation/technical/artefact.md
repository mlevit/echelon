# Artefact

An artefact is object that contains data i.e., source file, transient table, hub, link, satellite, fact or dimension table. Artifacts are used to describe the data that is being processed.

## Definition

<!-- definition -->
| Name                 | Type                     | Nullable | Description                                                                              |
| -------------------- | ------------------------ | -------- | ---------------------------------------------------------------------------------------- |
| artefact_id          | integer                  | NO       | System generated unique identifier.                                                      |
| name                 | character varying        | NO       | Name of the artefact.                                                                    |
| description          | text                     | YES      | Description of the artefact.                                                             |
| business_description | text                     | YES      | Business-oriented description of the artefact.                                           |
| type                 | character varying        | NO       | Type of the artefact. See acceptable values within the `constraint_artefact_type` table. |
| source               | character varying        | NO       | Source system that produced the artefact.                                                |
| insert_date          | timestamp with time zone | NO       | UTC timestamp when the record was inserted into the table.                               |
| update_date          | timestamp with time zone | YES      | UTC timestamp when the record was updated into the table.                                |
| migration_insert_id  | integer                  | YES      | System generated unique identifier of the migration this record was inserted by.         |
| migration_update_id  | integer                  | YES      | System generated unique identifier of the migration this record was updated by.          |
<!-- definitionstop -->

## Constraints

<!-- constraint -->
| Type        | Columns      |
| ----------- | ------------ |
| FOREIGN KEY | type         |
| PRIMARY KEY | artefact_id  |
| UNIQUE      | name, source |
<!-- constraintstop -->

## Acceptable Values

<!-- acceptablevalues -->
| Column | Value                            | Comment                                                                                                                                                                                                   |
| ------ | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type   | accumulating_snapshot_fact_table | This type of fact table is used to show the activity of a process that has a well-defined beginning and end, e.g., the processing of an order.                                                            |
| type   | delimited_file                   |                                                                                                                                                                                                           |
| type   | denormalised_table               |                                                                                                                                                                                                           |
| type   | dimension_type_0_table           | The type 0 dimension attributes never change and are assigned to attributes that have durable values or are described as 'Original'.                                                                      |
| type   | dimension_type_1_table           | The type 1 dimension method overwrites old with new data, and therefore does not track historical data.                                                                                                   |
| type   | dimension_type_2_table           | The type 2 dimension method tracks historical data by creating multiple records for a given natural key in the dimensional tables with separate surrogate keys and/or different version numbers.          |
| type   | fixed_width_file                 | In a fixed-width text file, data is contained in columns that are of a fixed width (meaning that each column contains a certain number of character positions).                                           |
| type   | http_endpoint                    |                                                                                                                                                                                                           |
| type   | hub_table                        | Hubs contain a list of unique business keys with low propensity to change. Hubs also contain a surrogate key for each Hub item and metadata describing the origin of the business key.                    |
| type   | json_file                        | JSON is an open standard file format and data interchange format that uses human-readable text to store and transmit data objects consisting of attribute–value pairs and arrays.                         |
| type   | link_table                       | Associations or transactions between business keys (relating for instance the hubs for customer and product with each other through the purchase transaction) are modeled using link tables.              |
| type   | normalised_table                 |                                                                                                                                                                                                           |
| type   | satellite_table                  | The hubs and links form the structure of the model, but have no temporal attributes and hold no descriptive attributes. These are stored in separate tables called satellites.                            |
| type   | snapshot_fact_table              | The periodic snapshot, as the name implies, takes a "picture of the moment", where the moment could be any defined period of time, e.g. a performance summary of a salesman over the previous month.      |
| type   | staging_table                    |                                                                                                                                                                                                           |
| type   | transactional_fact_table         | A transactional table is the most basic and fundamental. The grain associated with a transactional fact table is usually specified as "one row per line in a transaction", e.g., every line on a receipt. |
| type   | xml_file                         | Extensible Markup Language is a markup language that defines a set of rules for encoding documents in a format that is both human-readable and machine-readable.                                          |
<!-- acceptablevaluesstop -->

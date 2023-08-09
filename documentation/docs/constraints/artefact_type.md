---
hide:
  - navigation
---

# Artefact Type

| value                            | comment                                                                                                                                                                                                   |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accumulating_snapshot_fact_table | This type of fact table is used to show the activity of a job that has a well-defined beginning and end, e.g., the jobing of an order.                                                                    |
| delimited_file                   |                                                                                                                                                                                                           |
| denormalised_table               |                                                                                                                                                                                                           |
| dimension_type_0_table           | The type 0 dimension attributes never change and are assigned to attributes that have durable values or are described as 'Original'.                                                                      |
| dimension_type_1_table           | The type 1 dimension method overwrites old with new data, and therefore does not track historical data.                                                                                                   |
| dimension_type_2_table           | The type 2 dimension method tracks historical data by creating multiple records for a given natural key in the dimensional tables with separate surrogate keys and/or different version numbers.          |
| fixed_width_file                 | In a fixed-width text file, data is contained in columns that are of a fixed width (meaning that each column contains a certain number of character positions).                                           |
| http_endpoint                    |                                                                                                                                                                                                           |
| hub_table                        | Hubs contain a list of unique business keys with low propensity to change. Hubs also contain a surrogate key for each Hub item and metadata describing the origin of the business key.                    |
| json_file                        | JSON is an open standard file format and data interchange format that uses human-readable text to store and transmit data objects consisting of attribute–value pairs and arrays.                         |
| link_table                       | Associations or transactions between business keys (relating for instance the hubs for customer and product with each other through the purchase transaction) are modeled using link tables.              |
| normalised_table                 |                                                                                                                                                                                                           |
| satellite_table                  | The hubs and links form the structure of the model, but have no temporal attributes and hold no descriptive attributes. These are stored in separate tables called satellites.                            |
| snapshot_fact_table              | The periodic snapshot, as the name implies, takes a "picture of the moment", where the moment could be any defined period of time, e.g. a performance summary of a salesman over the previous month.      |
| staging_table                    |                                                                                                                                                                                                           |
| transactional_fact_table         | A transactional table is the most basic and fundamental. The grain associated with a transactional fact table is usually specified as "one row per line in a transaction", e.g., every line on a receipt. |
| xml_file                         | Extensible Markup Language is a markup language that defines a set of rules for encoding documents in a format that is both human-readable and machine-readable.                                          |

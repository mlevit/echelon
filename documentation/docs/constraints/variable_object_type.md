---
hide:
  - navigation
---

# Variable Object Type

|value|comment|
|----|----|
|accumulating_snapshot_fact_table|This type of fact table is used to show the activity of a job that has a well-defined beginning and end, e.g., the jobing of an order.|
|accumulating_snapshot_fact_table_load||
|blank_mask|The information is blanked, nulled, or removed.|
|classification|An action or job of classifying something.|
|data_mask||
|data_profiling||
|data_quality_check||
|delimited_file||
|denormalised_table||
|deviation|Randomly varying numeric or date values within a predfined range (e.g., +/- 90 days for a birthday).|
|dimension_type_0_table|The type 0 dimension fields never change and are assigned to fields that have durable values or are described as 'Original'.|
|dimension_type_1_table|The type 1 dimension method overwrites old with new data, and therefore does not track historical data.|
|dimension_type_1_table_load||
|dimension_type_2_table|The type 2 dimension method tracks historical data by creating multiple records for a given natural key in the dimensional tables with separate surrogate keys and/or different version numbers.|
|dimension_type_2_table_load||
|field||
|file_load||
|fixed_width_file|In a fixed-width text file, data is contained in columns that are of a fixed width (meaning that each column contains a certain number of character positions).|
|generic_activity||
|glossary_entry||
|http_endpoint||
|http_load||
|hub_table|Hubs contain a list of unique business keys with low propensity to change. Hubs also contain a surrogate key for each Hub item and metadata describing the origin of the business key.|
|hub_table_load||
|json_file|JSON is an open standard file format and data interchange format that uses human-readable text to store and transmit data objects consisting of field–value pairs and arrays.|
|link_table|Associations or transactions between business keys (relating for instance the hubs for customer and product with each other through the purchase transaction) are modeled using link tables.|
|link_table_load||
|mask|Replace the data element with a different and consistent value.|
|normalised_table||
|partial_mask|Replace parts of the data element with a different and consistent value.|
|policy|A policy is a deliberate system of guidelines to guide decisions and achieve rational outcomes.|
|reference_data||
|reference_data_set||
|rule|A set of explicit or understood regulations or principles governing conduct or procedure within a particular area of activity.|
|satellite_table|The hubs and links form the structure of the model, but have no temporal fields and hold no descriptive fields. These are stored in separate tables called satellites.|
|satellite_table_load||
|snapshot_fact_table|The periodic snapshot, as the name implies, takes a "picture of the moment", where the moment could be any defined period of time, e.g. a performance summary of a salesman over the previous month.|
|snapshot_fact_table_load||
|staging_table||
|staging_table_load||
|subsitution|Replacing the data with synthetic or manufactured data.|
|table_load||
|term|A word or phrase used to describe a thing or to express a concept.|
|tokenise_fpe|Replace the data element with a unique value whereby the original data cannot be direvided. Tokenised values consistently produce the same value for a given input value, making them ideal for primary/foreign keys in linked tables.|
|tokenise_uuid|Replace the data element with a unique value whereby the original data cannot be direvided. Tokenised values consistently produce the same value for a given input value, making them ideal for primary/foreign keys in linked tables.|
|transactional_fact_table|A transactional table is the most basic and fundamental. The grain associated with a transactional fact table is usually specified as "one row per line in a transaction", e.g., every line on a receipt.|
|transactional_fact_table_load||
|xml_file|Extensible Markup Language is a markup language that defines a set of rules for encoding documents in a format that is both human-readable and machine-readable.|


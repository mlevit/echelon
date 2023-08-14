# Echelon

Echelon is a flexible and scalable run and governance framework. It gathers technical, operational, and business metadata and consolidates it into a central database. This setup allows Echelon to be utilized in various ways, such as creating workflows based on metadata, monitoring data quality, mapping the origins of data, and more.

All primary features of the framework are described below:

## Data Transformation

- [**Technical**](./transformation/technical/) - Technical metadata consists of information associated with data transformation rules, data storage structures, semantic layers, and interface layers.
- [**Operational**](./transformation/operational/) - Operational metadata comprises operational reporting and statistics of data pipelines.

## Additional Frameworks

### Object-based Dependencies

The principle of object-based dependencies simplifies dependency management by using physical objects instead of physical jobs that load or transform our objects. Managing complex webs of dependencies is time-consuming and often perplexing. Controlling the timing of data loads, file landings, and more can sometimes be some of the most time-intensive work.

### Reconciliation

Echelon provides a robust reconciliation framework for comparing sources and targets in a data transformation pipeline. It captures operational metadata such as row count, error count, new rows, and updated rows during runtime. There are several built-in reconciliation formulas, such as the number of discrepancies between source and target. Echelon's extensibility empowers users to create additional formulas based on their requirements.

### Lineage

Data lineage offers information about the flow of data from the source to the target. Echelon boasts a comprehensive data lineage capability at the column level. Users can track a column's journey throughout the entire pipeline.

### Classification

Data classification enables users to manage sensitive data in their pipelines. Echelon employs the following four classification types to assess the sensitivity of data:

| Classification | Description                                                                                                                              |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Public         | Data that has been made public and can be freely disclosed to anyone externally.                                                         |
| Internal       | Data that is intended only for internal purposes and should not be shared outside the organization.                                      |
| Sensitive      | Moderately sensitive data that should be shared only with authorized individuals within (and in some cases outside of) the organization. |
| Restricted     | Highly sensitive corporate or customer data that could have severe negative legal or financial consequences if exposed.                  |

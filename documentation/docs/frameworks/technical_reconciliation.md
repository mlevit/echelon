# Technical Reconciliation

Technical reconciliation validates data movement from source to target. As part of Echelon, flow data (or record movement) is captured from point-to-point. Technical reconciliation uses this data in conjunction with a formula to validate if records were all accounted for.

## Flow Labels

Storing the flow metrics in the `flow` table facilitates technical reconciliation.

In order to ensure technical reconciliation can be performed, the `label` column within the `flow` table must match the following standards:

| Description                                                                                                                                  | Label                               |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| Number of records present in the source <br />artefact that were selected.                                                                   | `source_count`                      |
| Number of records inserted into the target artefact.                                                                                         | `insert_count`                      |
| Number of records that were found to be<br />identical in the source and the target artefact.                                                | `match_count`                       |
| Number of records that were not inserted into<br />the target artefact because of an error.                                                  | `reject_count`                      |
| Number of records inserted into the target artefact<br />as part of SCD Type 2.                                                              | `update_insert_count`               |
| Number of records updated in the target artefact<br />as part of SCD Type 2.                                                                 | `end_date_count`                    |
| Number of records that are not accounted for.<br />If this value is greater than or less than zero<br />technical reconciliation has failed. | `technical_reconciliation_variance` |

## Reconciliation Formulas

The following formulas have been set up in the constant table to enable technical reconciliation through the Echelon. These formulas live in the `constant` table and are retrieved during the technical reconciliation job.

Labelling of reconciliation job depends on the target artefact `type`. The results of reconciliation are stored in the `flow` table.

### File

??? example "All"

    **Formula**

    ```sql
    {source_count} - {insert_count}
    ```

    **Labels**

    | Job                                                                  | Label used in flow table |
    | ------------------------------------------------------------------------ | ------------------------ |
    | Retrieve the number of records in the header (control file) or the file. | source_count             |
    | Count the number of records loaded into the staging table.               | insert_count             |

### Data Vault

??? example "Hub"

    **Formula**

    ```sql
    {source_count} - {insert_count} - {match_count} - {filter_count}
    ```

    **Labels**

    | Job                                                                                                                                                       | Label used in flow table |
    | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
    | Count the number of records in the staging table.                                                                                                             | source_count             |
    | Count the new records loaded into the hub (i.e., the new inserted because new business key identified). Technically a new `hash_key` has been identified.     | insert_count             |
    | Count the number of records not loaded into the hub because the business key already exists in the hub. Technically the `hash_key` already exists in the hub. | match_count              |
    | Count the number of records not loaded into hub due to the hard rule being broken.                                                                            | reject_count             |

??? example "Satellite"

    **Formula**

    ```sql
    {source_count} - {insert_count} - ({update_insert_count} + {end_date_count})/2 - {match_count}
    ```

    **Labels**

    | Job                                                                                                                                                                                                                                     | Label used in flow table |
    | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
    | Count the number of records in the staging table.                                                                                                                                                                                           | source_count             |
    | Count new records loaded into satellite ( i.e., the new is inserted because new business key identified). Technically a new `hash_key` identified.                                                                                          | insert_count             |
    | Count the number of records where the business key already exists in satellite but new descriptive information needs to be loaded. Technically `hash_key` already exists in the satellite but the new `hash_diff_key` needs to be inserted. | update_insert_count      |
    | Count the number of records where business key already exists but needs to be end dated because new descriptive information has been identified and loaded.                                                                                 | end_date_count           |
    | Count the number of records that already exist in satellite and have no update. Technically `hash_key` and `hash_diff_key` are the same.                                                                                                    | match_count              |
    | Count the number of records rejected due to the hard rule being broken.                                                                                                                                                                     | reject_count             |

??? example "Link"

    **Formula**

    ```sql
    {source_count} - {insert_count} - {match_count} - {filter_count}
    ```

    **Labels**

    | Job                                                                                                                                                                                   | Label used in flow table |
    | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
    | In source, count the number of records with a business key combination that defines the link.                                                                                             | source_count             |
    | Count the number of new records loaded into the link ( i.e., the new inserted because the new business key combination was identified). Technically a new `hash_key` has been identified. | insert_count             |
    | Count the number of records not loaded into the link because the business key combination already exists in the link. Technically the `hash_key` already exists in the link.              | match_count              |
    | Count the number of records not loaded into the link due to the hard rule being broken.                                                                                                   | reject_count             |

### Dimensional Layer

??? example "Dimension Type 1"

    **Formula**

    ```sql
    {source_count} - {insert_count} - {match_count} - {update_count}
    ```

    **Labels**

    | Job                                                                                                                                                                                                                             | Label used in flow table |
    | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
    | Count the number of records in the source query.                                                                                                                                                                                    | source_count             |
    | Count the number of new records loaded into the dimension ( i.e., the new is inserted because new business key identified). Technically a new `hash_key` identified.                                                                | insert_count             |
    | Count the number of records where the business key already exists in dimension but new descriptive information needs to be loaded. Technically `hash_key` already exists in dimension but new `hash_diff_key` needs to be inserted. | update_count             |
    | Count the number of records not loaded into the dimension because the business key combination already exists in the dimension. Technically the `hash_key` already exists in the dimension.                                         | match_count              |

??? example "Dimension Type 2"

    **Formula**

    ```sql
    {source_count} - {insert_count} - ({update_insert_count} + {end_date_count})/2 - {match_count}
    ```

    **Labels**

    | Job                                                                                                                                                                                                                                     | Label used in flow table |
    | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
    | Count the number of records in the source query.                                                                                                                                                                                            | source_count             |
    | Count new records loaded into dimension (i.e.the new is inserted because new business key identified). Technically a new `hash_key` identified.                                                                                             | insert_count             |
    | Count the number of records where the business key already exists in the dimension but new descriptive information is needed to be loaded. Technically `hash_key` already exists in dimension but new `hash_diff_key` needs to be inserted. | update_insert_count      |
    | Count the number of records where the business key already exists but needs to be end dated because new descriptive information has been identified and loaded.                                                                             | end_date_count           |
    | Count the number of records that already exist in dimension and have no update. Technically `hash_key` and `hash_diff_key` are the same.                                                                                                    | match_count              |
    | Count the number of records rejected due to business.                                                                                                                                                                                       | reject_count             |

??? example "Accumulating Snapshot Fact"

    **Formula**

    ```sql
    {source_count} - {insert_count} - {update_count}
    ```

    **Labels**

    | Job                                                                                                                                                                                                                               | Label used in flow table |
    | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
    | Count the number of records in the source query.                                                                                                                                                                                      | source_count             |
    | Count the number of records where the business key already exists in the fact but new descriptive information is needed to be loaded. Technically `hash_key` already exists in dimension but new `hash_diff_key` needs to be updated. | update_insert_count      |
    | Count the number of new records loaded into the fact (i.e., the new is inserted because new business key identified). Technically a new `hash_key` identified.                                                                        | insert_count             |

??? example "Snapshot Fact"

    **Formula**

    ```sql
    {source_count} - {insert_count} - {update_count}
    ```

    **Labels**

    | Job                                                                                                                                                                                                                               | Label used in flow table |
    | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
    | Count the number of records in the source query.                                                                                                                                                                                      | source_count             |
    | Count the number of records where the business key already exists in the fact but new descriptive information is needed to be loaded. Technically `hash_key` already exists in dimension but new `hash_diff_key` needs to be updated. | update_insert_count      |
    | Count the number of new records loaded into the fact (i.e., the new is inserted because new business key identified). Technically a new `hash_key` identified.                                                                        | insert_count             |

??? example "Transaction Fact"

    **Formula**

    ```sql
    {source_count} - {insert_count}
    ```

    **Labels**

    | Job                                                                                                                                                        | Label used in flow table |
    | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
    | Count the number of records in the source query.                                                                                                               | source_count             |
    | Count the number of new records loaded into the fact (i.e., the new is inserted because new business key identified). Technically a new `hash_key` identified. | insert_count             |

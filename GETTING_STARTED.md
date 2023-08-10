# Getting Started

This guide aims to assist you in initiating your comprehension of Echelon's elements and its requirements for metadata.

Although the initial learning curve might seem steep, as you become more accustomed to it, incorporating and upkeeping Echelon becomes notably straightforward.

## Table of Contents

- [Components](#components)
- [Metadata](#metadata)
  - [Create](#create)
  - [Load](#load)
  - [Access](#access)
- [Workflow](#workflow)
  - [Create Run](#create-run)
  - [Get Source Entities](#get-source-entities)
  - [Get Target Entities](#get-target-entities)
  - [Create Log](#create-log)
  - [Create Flow](#create-flow)
  - [Perform Technical Reconciliation](#perform-technical-reconciliation)
  - [Update Run](#update-run)

## Components

Setup the necessary Echelon components. Refer to their respective README files for instructions.

1. Command Line Interface (CLI)
2. Database
3. Web Application

## Metadata

### Create

Once you have established all the framework components, the next step involves generating your metadata.

- Begin by duplicating the files from the `/database/migrations/data` directory and placing them into a designated working directory.

#### Job

- Access the `job.json` file and initiate the creation of a singular job. This serves as your data flow, and for simplicity, consider crafting a basic task such as loading a file into a database table.

- An advisable naming convention to adhere to is as follows:

  ```
  [action]_[target entity]
  ```

  For instance:

  `load_salesforce_customer_staging_table`

- Regarding all other obligatory fields, consult Echelon's documentation for proper guidance.

  **Example**

  ```json
  "job": [
    {
      "name": "load_salesforce_customer_staging_table",
      "description": "Job to load Salesforce Customer data into a staging table",
      "type": "file_load",
      "priority": 1,
      "dependency_logic": "and"
    }
  ]
  ```

#### Entities

- Access the `entity.json` file and establish a pair of entities. These entities correspond to your source and target elements (namely, your source file and target table).

- A recommended naming approach is as follows:

  ```
  [source system]_[entity name]_[entity type]
  ```

  For instance:

  ```
  salesforce_customer_file
  ```

- For all additional mandatory fields, consult Echelon's documentation to receive proper guidance.

  **Example**

  ```json
  "entity": [
    {
      "name": "salesforce_customer_file",
      "description": "CSV file containing Salesforce Customer data",
      "business_description": null,
      "type": "delimited_file",
      "source": "Salesforce"
    },
    {
      "name": "salesforce_customer_staging_table",
      "description": "Staging table containing Salesforce Customer data",
      "business_description": null,
      "type": "staging_table",
      "source": "Salesforce"
    }
  ]
  ```

#### Relationships

- Access the `job_entity_rel.json` file and establish a solitary relationship connecting the entities formed in step 3 with the job conceived in step 1.

  > Note: In the case of a many-to-one relationship, you should create multiple entries, each featuring a distinct `source_entity_name`, but all associated with the same `target_entity_name`.

  **Example**

  ```json
  "job_entity_rel": [
    {
      "job_name": "load_salesforce_customer_staging_table",
      "sequence_number": 1,
      "source_entity_name": "salesforce_customer_file",
      "target_entity_name": "salesforce_customer_staging_table",
      "required_flag": true
    }
  ]
  ```

#### Constants

- Access the `entity_constant.json` file and generate several constants intended for both the source file and the target table.

- When it comes to the source file, it's advisable to consider

  - `data_file_path`
  - `data_file_pattern`
  - `column_delimiter`
  - `column_quote_character`
  - `header_count`

  **Example**

  ```json
  "entity_constant": [
    {
      "entity_name": "salesforce_customer_file",
      "name": "data_file_path",
      "value": "./data/salesforce"
    },
    {
      "entity_name": "salesforce_customer_file",
      "name": "data_file_pattern",
      "value": "./customer_\\d{8}.csv"
    },
    {
      "entity_name": "salesforce_customer_file",
      "name": "column_delimiter",
      "value": ","
    },
    {
      "entity_name": "salesforce_customer_file",
      "name": "header_count",
      "value": "1"
    }
  ]
  ```

- When it comes to the target table, it's advisable to consider

  - `database_name`
  - `database_port`
  - `database_server`
  - `schema_name`
  - `table_name`

  **Example**

  ```json
  "entity_constant": [
    {
      "entity_name": "salesforce_customer_staging_table",
      "name": "database_name",
      "value": "prod001"
    },
    {
      "entity_name": "salesforce_customer_staging_table",
      "name": "database_port",
      "value": "5432"
    },
    {
      "entity_name": "salesforce_customer_staging_table",
      "name": "database_server",
      "value": "127.0.0.1"
    },
    {
      "entity_name": "salesforce_customer_staging_table",
      "name": "header_count",
      "value": "staging"
    },
    {
      "entity_name": "salesforce_customer_staging_table",
      "name": "table_name",
      "value": "salesforce_customer"
    }
  ]
  ```

- A comprehensive compilation of accessible constants within Echelon can be located in the documentation at [constraints/entity_constant_name](http://127.0.0.1:8000/constraints/entity_constant_name.html).

- If desired, you can introduce additional types of constants by appending them to the `constraint.json` file under the `constraint_entity_constant_name` category and then proceeding to re-import the data.

### Load

With your metadata successfully generated, the next step involves its loading. This process is accomplished through the utilisation of the Echelon Command Line Interface (CLI).

To perform the metadata loading, execute the following command in your terminal:

```bash
echelon data:import --input [metadata directory] --insert
```

In case your metadata is already present within Echelon and you've made modifications to it, you can effectuate an update by deploying the subsequent command:

```bash
echelon data:import --input [metadata directory] --insert --update
```

### Access

When the need arises to retrieve your technical metadata or create operational metadata, there are three available methods to choose from:

- Utilising the Echelon API
- Utilising the Echelon CLI
- Employing SQL queries directly against the Echelon DB (not recommended)

## Workflow

The provided example workflow will illustrate the majority of the potential and essential interactions that your workflow will need to establish with Echelon throughout its execution.

### Create Run

Generate a run when commencing the workflow. The unique `run_id` returned will be utilised for the purpose of documenting operational metadata associated with the run.

**Request**

```
POST /job/run

{
  "name": "load_salesforce_customer_staging_table"
}
```

**Response**

```json
[
  {
    "run_id": 1,
    "job_id": 3,
    "start": "2023-08-10T08:13:47.748Z",
    "end": null,
    "status": "running"
  }
]
```

### Get Source Entities

Fetch the source entities linked to the job along with their corresponding constants.

```
GET /job/source?name=load_salesforce_customer_staging_table
```

**Response**

```json
[
  {
    "entity_id": 4,
    "name": "salesforce_customer_file",
    "description": "CSV file containing Salesforce Customer data",
    "business_description": null,
    "type": "delimited_file",
    "source": "Salesforce",
    "required_flag": true,
    "sequence_number": 1,
    "insert_date": "2023-08-10T08:04:00.105Z",
    "update_date": null
  }
]
```

#### Get Source Entity Constants

```
GET /entity/constant?name=salesforce_customer_file&jq=from_entries
```

**Response**

```json
{
  "column_delimiter": ",",
  "data_file_path": "./data/salesforce",
  "data_file_pattern": "./customer_\\d{8}.csv",
  "header_count": "1"
}
```

### Get Target Entities

Fetch the target entities linked to the job along with their corresponding constants.

```
GET /job/target?name=load_salesforce_customer_staging_table
```

**Response**

```json
[
  {
    "entity_id": 5,
    "name": "salesforce_customer_staging_table",
    "description": "Staging table containing Salesforce Customer data",
    "business_description": null,
    "type": "staging_table",
    "source": "Salesforce",
    "insert_date": "2023-08-10T08:04:00.144Z",
    "update_date": null,
    "migration_insert_id": 3,
    "migration_update_id": null
  }
]
```

#### Get Source Entity Constants

```
GET /entity/constant?name=salesforce_customer_staging_table&jq=from_entries
```

**Response**

```json
{
  "database_name": "prod001",
  "database_port": "5432",
  "database_server": "127.0.0.1",
  "header_count": "staging",
  "table_name": "salesforce_customer"
}
```

### Create Log

Retain all logs relevant to the workflow. This encompasses informational logs, warnings, and errors. Maximizing the logging is beneficial.

```
POST /job/run/log

{
  "id": "1",
  "job": "tutorial",
  "function": "load()",
  "priority": "INFO",
  "message": "Loading of salesforce_customer table has begun"
}
```

**Response**

```json
[
  {
    "log_id": 1,
    "run_id": 1,
    "job": "tutorial",
    "function": "load()",
    "priority": "INFO",
    "message": "Loading of salesforce_customer table has begun",
    "code": null,
    "insert_date": "2023-08-10T08:28:40.971Z"
  }
]
```

### Create Flow

Capture the count of records within the source file, as well as the count of records that have been inserted into the target table.

> Note: To gain a deeper understanding of the flow metrics that should be documented, refer to the [Technical Reconciliation](http://127.0.0.1:8000/frameworks/technical_reconciliation.html) guide.

#### Source Count

```
POST /job/run/flow

{
  "id": "1",
  "job": "tutorial",
  "function": "load()",
  "label": "source_count",
  "count": "100"
}
```

**Response**

```json
[
  {
    "flow_id": 1,
    "run_id": 1,
    "job": "tutorial",
    "function": "load()",
    "label": "source_count",
    "count": 100,
    "insert_date": "2023-08-10T08:30:42.617Z"
  }
]
```

#### Insert Count

```
POST /job/run/flow

{
  "id": "1",
  "job": "tutorial",
  "function": "load()",
  "label": "insert_count",
  "count": "100"
}
```

**Response**

```json
[
  {
    "flow_id": 2,
    "run_id": 1,
    "job": "tutorial",
    "function": "load()",
    "label": "insert_count",
    "count": 100,
    "insert_date": "2023-08-10T08:31:08.007Z"
  }
]
```

### Perform Technical Reconciliation

After the workflow has concluded, carry out the technical reconciliation process to guarantee the comprehensive accountability of all records.

> Note: To gain a deeper understanding of the reconciliation process, refer to the [Technical Reconciliation](http://127.0.0.1:8000/frameworks/technical_reconciliation.html) guide.

```
POST /job/run/reconciliation

{
  "id": "1"
}
```

**Response**

```json
[
  {
    "flow_id": 3,
    "run_id": 1,
    "job": "echelon cli",
    "function": "create:job:run:reconciliation",
    "label": "technical_reconciliation_variance",
    "count": 0,
    "insert_date": "2023-08-10T08:33:02.059Z"
  }
]
```

### Update Run

Upon the conclusion of the workflow, modify the run's status to either `completed` or `failed`.

```
PUT /job/run

{
  "id": "1",
  "status": "completed"
}
```

**Response**

```json
[
  {
    "run_id": 1,
    "job_id": 3,
    "start": "2023-08-10T08:13:47.748Z",
    "end": "2023-08-10T08:34:41.220Z",
    "status": "completed"
  }
]
```

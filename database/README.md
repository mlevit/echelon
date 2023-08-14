# What is the Echelon database?

At the core of Echelon lies a robust and centralised database. This repository serves as the heart of the framework, meticulously collecting and organizing a wealth of technical, operational, and business metadata. Through this database, Echelon gains the capacity to holistically manage and present crucial information that forms the backbone of various data-related activities.

## How do I deploy it?

- Install required Node modules

  ```bash
  npm install -g
  ```

- Install one of the following database modules based on your desired target database

  ```bash
  npm install pg
  npm install sqlite3
  npm install mysql
  npm install mysql2
  npm install oracledb
  npm install mssql
  ```

- Configure the selected database target within the `knexfile.js`.

- Create a `.env` file within the `database/` directory with the following variables.

  ```shell
  KNEX_HOST=
  KNEX_DATABASE=
  KNEX_USER=
  KNEX_PASSWORD=
  ```

- Run Knex migration. This will deploy all tables in your configured database.

  ```bash
  knex migrate:latest
  ```

- Insert constraint data via the Echelon CLI.

  ```bash
  echelon data:import --input migrations/data/ --insert
  ```

## How do I roll it back?

- Run Knex rollback. This will remove all tables created in your configured database.

  ```bash
  knex migrate:rollback --all
  ```

## Seed

- Sample seed data has been provided which can be loaded for demo purposes.

  ```bash
  knex seed:run
  ```

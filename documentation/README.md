# Documentation

Recognising the significance of clear guidance and accessibility, Echelon places emphasis on comprehensive documentation. This component encapsulates valuable insights, guidelines, tutorials, and best practices, ensuring that users, administrators, and developers alike can harness the framework's potential to the fullest. The documentation not only aids in getting started with Echelon but also serves as an ongoing reference, promoting efficient utilisation and encouraging the exploration of its diverse capabilities.

## Setup

Documentation located within this directory is generated using [MkDocs](https://www.mkdocs.org/).

- Install MkDocs

  ```bash
  pip3 install -r requirements.txt --user
  ```

- Preview documentation

  MkDocs comes with a built-in dev-server that lets you preview your documentation as you work on it. Make sure you're in the same directory as the `mkdocs.yml` configuration file, and then start the server by running the `mkdocs serve` command:

  ```bash
  $ mkdocs serve
  INFO    -  Building documentation...
  INFO    -  Cleaning site directory
  [I 160402 15:50:43 server:271] Serving on http://127.0.0.1:8000
  [I 160402 15:50:43 handlers:58] Start watching changes
  [I 160402 15:50:43 handlers:60] Start detecting changes
  ```

  Open `http://127.0.0.1:8000/` in your browser, and you'll see the default home page being displayed.

  The dev-server also supports auto-reloading, and will rebuild your documentation whenever anything in the configuration file, documentation directory, or theme directory changes.

- Building the static website

  Once you've made necessary changes to the documentation you will need to build the HTML website by running:

  ```bash
  mkdocs build
  ```

  This will update the contents of the [site](./site) directory.

### Populating Constaints

Constraint documentation is no longer manually maintained due to issues maintaining valid values in both the physical data tables and the documentation. The documentation is now generated using the `ConstraintsDocGenerator` utility found within the `utilities/` directory. Before building or serving Echelon documentation, the utility should be run to generate all constraints documentation.

- Create a `.env` file within the `utilities/ConstraintsDocGenerator/` directory with the following variables.

  ```shell
  KNEX_HOST=
  KNEX_DATABASE=
  KNEX_USER=
  KNEX_PASSWORD=
  ```

- Generate constraints.

  ```bash
  cd utilities/ConstraintsDocGenerator/ && npm run generate
  ```

### Populating Table Definition

Table definitions and constraints are no longer manually maintained within the `Docs` directory due to issues maintaining valid values in both the physical data tables and the documentartion. The documentation is now generated using the `TableDefinitionDocGenerator` utility found within the `utilities/` directory. Before building or serving Echelon documentation, the utility should be run to generate all constraints documentation.

_Note: The `TableDefinitionDocGenerator` utility extracts the table definitions from the Echelon database. Please ensure the Echelon database is deployed before running this utility._

- Create a `.env` file within the `utilities/TableDefinitionDocGenerator/` directory with the following variables.

  ```shell
  KNEX_HOST=
  KNEX_DATABASE=
  KNEX_USER=
  KNEX_PASSWORD=
  ```

- Generate table definitions.

  ```bash
  cd utilities/TableDefinitionDocGenerator/ && npm run generate
  ```

## Requirements

Project requirements are stored with `requirements.in`. To generate `requirements.txt`, run

```bash
pip-compile requirements.in
```

To update the requirements, run

```bash
pip-compile requirements.in --upgrade
```

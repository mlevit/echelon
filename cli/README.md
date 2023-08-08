# What is the Echelon CLI?

Echelon's Command Line Interface (CLI) and Application Programming Interface (API) together offer a gateway to its capabilities. The CLI empowers users to interact with the framework through a command-line interface, providing a streamlined and efficient way to execute tasks, fetch data, and manage metadata-related operations. Simultaneously, the API grants developers the flexibility to integrate Echelon's functionalities seamlessly into their own applications, fostering interoperability and expanding its potential use cases.

Developed as a Node.js application, the Echelon CLI is meticulously crafted utilising two key components: oclif, a powerful CLI framework, and Knex.js, a versatile SQL builder. This amalgamation of technologies enables a streamlined and user-friendly experience, allowing users to effortlessly engage with the Echelon system's capabilities.

## How do I set up Knex?

Create a `.env` file within the `src/` directory with the following variables.

```shell
KNEX_HOST=
KNEX_DATABASE=
KNEX_USER=
KNEX_PASSWORD=
```

## How do I set it up?

<!-- usage -->

```sh-session
$ npm install -g echelon
$ echelon COMMAND
running command...
$ echelon (--version|-v)
echelon/1.0.0 linux-x64 node-v20.5.0
$ echelon --help [COMMAND]
USAGE
  $ echelon COMMAND
```

<!-- usagestop -->

## What commands can I run?

<!-- commands -->

- [`echelon create:artefact:registry`](#echelon-createartefactregistry)
- [`echelon create:process:audit`](#echelon-createprocessaudit)
- [`echelon create:process:audit:alert`](#echelon-createprocessauditalert)
- [`echelon create:process:audit:flow`](#echelon-createprocessauditflow)
- [`echelon create:process:audit:log`](#echelon-createprocessauditlog)
- [`echelon create:process:audit:monitoring`](#echelon-createprocessauditmonitoring)
- [`echelon create:process:audit:reconciliation`](#echelon-createprocessauditreconciliation)
- [`echelon create:process:audit:registry`](#echelon-createprocessauditregistry)
- [`echelon create:registry`](#echelon-createregistry)
- [`echelon data:export`](#echelon-dataexport)
- [`echelon data:import`](#echelon-dataimport)
- [`echelon help [COMMAND]`](#echelon-help-command)
- [`echelon read:artefact`](#echelon-readartefact)
- [`echelon read:artefact:attribute`](#echelon-readartefactattribute)
- [`echelon read:artefact:constant`](#echelon-readartefactconstant)
- [`echelon read:artefact:lineage`](#echelon-readartefactlineage)
- [`echelon read:artefact:variable`](#echelon-readartefactvariable)
- [`echelon read:healthcheck`](#echelon-readhealthcheck)
- [`echelon read:process`](#echelon-readprocess)
- [`echelon read:process:attribute:map`](#echelon-readprocessattributemap)
- [`echelon read:process:audit`](#echelon-readprocessaudit)
- [`echelon read:process:audit:flow`](#echelon-readprocessauditflow)
- [`echelon read:process:audit:log`](#echelon-readprocessauditlog)
- [`echelon read:process:constant`](#echelon-readprocessconstant)
- [`echelon read:process:depend`](#echelon-readprocessdepend)
- [`echelon read:process:dependant`](#echelon-readprocessdependant)
- [`echelon read:process:lineage`](#echelon-readprocesslineage)
- [`echelon read:process:run`](#echelon-readprocessrun)
- [`echelon read:process:source`](#echelon-readprocesssource)
- [`echelon read:process:target`](#echelon-readprocesstarget)
- [`echelon read:process:variable`](#echelon-readprocessvariable)
- [`echelon read:query`](#echelon-readquery)
- [`echelon read:search`](#echelon-readsearch)
- [`echelon read:ui:process:audit:detail`](#echelon-readuiprocessauditdetail)
- [`echelon read:ui:process:audit:list`](#echelon-readuiprocessauditlist)
- [`echelon start:api`](#echelon-startapi)
- [`echelon update:artefact:variable`](#echelon-updateartefactvariable)
- [`echelon update:process:audit`](#echelon-updateprocessaudit)
- [`echelon update:process:variable`](#echelon-updateprocessvariable)
- [`echelon update:registry`](#echelon-updateregistry)
- [`echelon version`](#echelon-version)

## `echelon create:artefact:registry`

associate a registry object with an artefact

```
USAGE
  $ echelon create:artefact:registry --id <value> --registry_id <value>

FLAGS
  --id=<value>           (required) artefact ID
  --registry_id=<value>  (required) registry ID

DESCRIPTION
  associate a registry object with an artefact
```

## `echelon create:process:audit`

create an instance of a process (process audit)

```
USAGE
  $ echelon create:process:audit --name <value>

FLAGS
  --name=<value>  (required) process name

DESCRIPTION
  create an instance of a process (process audit)
```

## `echelon create:process:audit:alert`

raise an alert against an instance of a process (process audit)

```
USAGE
  $ echelon create:process:audit:alert --id <value> --code <value> --subject <value> --message <value>

FLAGS
  --code=<value>     (required) alert code
  --id=<value>       (required) process audit ID associated with the alert
  --message=<value>  (required) alert message
  --subject=<value>  (required) alert subject

DESCRIPTION
  raise an alert against an instance of a process (process audit)
```

## `echelon create:process:audit:flow`

store data source metrics against an instance of a process (process audit)

```
USAGE
  $ echelon create:process:audit:flow --id <value> --label <value> --count <value> [--job <value>] [--function <value>]

FLAGS
  --count=<value>     (required) record count
  --function=<value>  ETL job function that produced the metric
  --id=<value>        (required) process audit ID
  --job=<value>       ETL job that produced the metric
  --label=<value>     (required) label of the metric

DESCRIPTION
  store data source metrics against an instance of a process (process audit)
```

## `echelon create:process:audit:log`

log a message against an instance of a process (process audit)

```
USAGE
  $ echelon create:process:audit:log --id <value> --priority DEBUG|ERROR|FATAL|INFO|WARN --message <value> [--job <value>]
    [--function <value>] [--code <value>]

FLAGS
  --code=<value>       error code of log
  --function=<value>   ETL job function that produced the log
  --id=<value>         (required) process audit ID
  --job=<value>        ETL job that produced the log
  --message=<value>    (required) message of log
  --priority=<option>  (required) priority of log
                       <options: DEBUG|ERROR|FATAL|INFO|WARN>

DESCRIPTION
  log a message against an instance of a process (process audit)
```

## `echelon create:process:audit:monitoring`

proactive monitoring of an instance of a process (process audit)

```
USAGE
  $ echelon create:process:audit:monitoring --id <value> [--threshold <value>] [--sample <value>]

FLAGS
  --id=<value>         (required) process audit ID
  --sample=<value>     [default: 999] sample size for calculating average
  --threshold=<value>  [default: 0.1] acceptable threshold for monitoring rules

DESCRIPTION
  proactive monitoring of an instance of a process (process audit)
```

## `echelon create:process:audit:reconciliation`

perform technical reconciliation for an instance of a process (process audit)

```
USAGE
  $ echelon create:process:audit:reconciliation --id <value>

FLAGS
  --id=<value>  (required) process audit ID

DESCRIPTION
  perform technical reconciliation for an instance of a process (process audit)
```

## `echelon create:process:audit:registry`

associate a registry object with an instance of a process (process audit)

```
USAGE
  $ echelon create:process:audit:registry --id <value> --registry_id <value>

FLAGS
  --id=<value>           (required) process audit ID
  --registry_id=<value>  (required) registry process_audit_id

DESCRIPTION
  associate a registry object with an instance of a process (process audit)
```

## `echelon create:registry`

register an incoming or outgoing object

```
USAGE
  $ echelon create:registry --name <value> --path <value> --server <value> --size <value> --checksum <value> --type
    <value> [--status <value>]

FLAGS
  --checksum=<value>  (required) MD5 checksum of the registered object
  --name=<value>      (required) full name of the registered object
  --path=<value>      (required) path to the registered object
  --server=<value>    (required) server of the registered object (i.e., file server IP or DNS or S3 Bucket name)
  --size=<value>      (required) size of the registered object in KB
  --status=<value>    status of the registered object
  --type=<value>      (required) object type (e.g., CSV, TXT, DAT etc.)

DESCRIPTION
  register an incoming or outgoing object
```

## `echelon data:export`

export Echelon entries to file

```
USAGE
  $ echelon data:export [--table <value>] [--output <value>]

FLAGS
  --output=<value>    [default: ./export.json] output filename
  --table=<value>...  table to export (can be specified multiple times)

DESCRIPTION
  export Echelon entries to file
```

## `echelon data:import`

import Echelon entries from file

```
USAGE
  $ echelon data:import --input <value> [--insert] [--update] [--delete]

FLAGS
  --delete         (flag) delete existing entries not present in input file
  --input=<value>  (required) input filename or directory
  --insert         (flag) insert new entries
  --update         (flag) update existing entries

DESCRIPTION
  import Echelon entries from file
```

## `echelon help [COMMAND]`

Display help for echelon.

```
USAGE
  $ echelon help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for echelon.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `echelon read:artefact`

retrieve artefact(s)

```
USAGE
  $ echelon read:artefact [--name <value> | --id <value>] [--limit <value>] [--jq <value>]

FLAGS
  --id=<value>     artefact id
  --jq=<value>     jq string to parse result set
  --limit=<value>  [default: 10] limit the result set
  --name=<value>   artefact name

DESCRIPTION
  retrieve artefact(s)
```

## `echelon read:artefact:attribute`

retrieve attributes associated with an artefact

```
USAGE
  $ echelon read:artefact:attribute --name <value> [--jq <value>]

FLAGS
  --jq=<value>    jq string to parse result set
  --name=<value>  (required) artefact name

DESCRIPTION
  retrieve attributes associated with an artefact
```

## `echelon read:artefact:constant`

retrieve constants associated with an artefact

```
USAGE
  $ echelon read:artefact:constant --name <value> [--jq <value>]

FLAGS
  --jq=<value>    jq string to parse result set
  --name=<value>  (required) artefact name

DESCRIPTION
  retrieve constants associated with an artefact
```

## `echelon read:artefact:lineage`

retrieve variables associated with an artefact

```
USAGE
  $ echelon read:artefact:lineage --name <value> [--jq <value>]

FLAGS
  --jq=<value>    jq string to parse result set
  --name=<value>  (required) artefact name

DESCRIPTION
  retrieve variables associated with an artefact
```

## `echelon read:artefact:variable`

retrieve variables associated with an artefact

```
USAGE
  $ echelon read:artefact:variable --name <value> [--jq <value>]

FLAGS
  --jq=<value>    jq string to parse result set
  --name=<value>  (required) artefact name

DESCRIPTION
  retrieve variables associated with an artefact
```

## `echelon read:healthcheck`

perform a health check

```
USAGE
  $ echelon read:healthcheck [--database]

FLAGS
  --database  (flag) database check

DESCRIPTION
  perform a health check
```

## `echelon read:process`

retrieve process(es)

```
USAGE
  $ echelon read:process [--name <value> | --id <value>] [--limit <value>] [--jq <value>]

FLAGS
  --id=<value>     process id
  --jq=<value>     jq string to parse result set
  --limit=<value>  [default: 10] limit the result set
  --name=<value>   process name

DESCRIPTION
  retrieve process(es)
```

## `echelon read:process:attribute:map`

retrieve source artefacts associated with a process

```
USAGE
  $ echelon read:process:attribute:map --name <value> [--jq <value>]

FLAGS
  --jq=<value>    jq string to parse result set
  --name=<value>  (required) process name

DESCRIPTION
  retrieve source artefacts associated with a process
```

## `echelon read:process:audit`

retrieve process instances (process audit) of a process

```
USAGE
  $ echelon read:process:audit [--name <value> | --id <value>] [--start <value>] [--end <value>] [--limit <value>] [--jq
    <value>]

FLAGS
  --end=<value>    [default: 2999-12-31] date filter end
  --id=<value>     process id
  --jq=<value>     jq string to parse result set
  --limit=<value>  [default: 10] limit the result set
  --name=<value>   process name
  --start=<value>  [default: 1970-01-01] date filter start

DESCRIPTION
  retrieve process instances (process audit) of a process
```

## `echelon read:process:audit:flow`

retrieve flow metrics associated with a process instance (process audit)

```
USAGE
  $ echelon read:process:audit:flow --id <value> [--jq <value>]

FLAGS
  --id=<value>  (required) process audit ID
  --jq=<value>  jq string to parse result set

DESCRIPTION
  retrieve flow metrics associated with a process instance (process audit)
```

## `echelon read:process:audit:log`

retrieve logs associated with a process instance (process audit)

```
USAGE
  $ echelon read:process:audit:log --id <value> [--jq <value>]

FLAGS
  --id=<value>  (required) process audit ID
  --jq=<value>  jq string to parse result set

DESCRIPTION
  retrieve logs associated with a process instance (process audit)
```

## `echelon read:process:constant`

retrieve constants associated with a process

```
USAGE
  $ echelon read:process:constant --name <value> [--jq <value>]

FLAGS
  --jq=<value>    jq string to parse result set
  --name=<value>  (required) process name

DESCRIPTION
  retrieve constants associated with a process
```

## `echelon read:process:depend`

retrieve source processes this process depends on

```
USAGE
  $ echelon read:process:depend --name <value> [--jq <value>]

FLAGS
  --jq=<value>    jq string to parse result set
  --name=<value>  (required) process name

DESCRIPTION
  retrieve source processes this process depends on
```

## `echelon read:process:dependant`

retrieve target processes this process is the dependant of

```
USAGE
  $ echelon read:process:dependant --name <value> [--jq <value>]

FLAGS
  --jq=<value>    jq string to parse result set
  --name=<value>  (required) process name

DESCRIPTION
  retrieve target processes this process is the dependant of
```

## `echelon read:process:lineage`

retrieve source artefacts associated with a process

```
USAGE
  $ echelon read:process:lineage --name <value> [--jq <value>]

FLAGS
  --jq=<value>    jq string to parse result set
  --name=<value>  (required) process name

DESCRIPTION
  retrieve source artefacts associated with a process
```

## `echelon read:process:run`

retrieve processes that can be run based on their object-based dependencies

```
USAGE
  $ echelon read:process:run [--jq <value>]

FLAGS
  --jq=<value>  jq string to parse result set

DESCRIPTION
  retrieve processes that can be run based on their object-based dependencies
```

## `echelon read:process:source`

retrieve source artefacts associated with a process

```
USAGE
  $ echelon read:process:source --name <value> [--jq <value>]

FLAGS
  --jq=<value>    jq string to parse result set
  --name=<value>  (required) process name

DESCRIPTION
  retrieve source artefacts associated with a process
```

## `echelon read:process:target`

retrieve target artefacts associated with a process

```
USAGE
  $ echelon read:process:target --name <value> [--jq <value>]

FLAGS
  --jq=<value>    jq string to parse result set
  --name=<value>  (required) process name

DESCRIPTION
  retrieve target artefacts associated with a process
```

## `echelon read:process:variable`

retrieve variables associated with a process

```
USAGE
  $ echelon read:process:variable --name <value> [--jq <value>]

FLAGS
  --jq=<value>    jq string to parse result set
  --name=<value>  (required) process name

DESCRIPTION
  retrieve variables associated with a process
```

## `echelon read:query`

execute a SQL query

```
USAGE
  $ echelon read:query --sql <value> [--output] [--jq <value>]

FLAGS
  --jq=<value>   jq string to parse result set
  --output       output results
  --sql=<value>  (required) SQL query

DESCRIPTION
  execute a SQL query
```

## `echelon read:search`

retrieve process(es)

```
USAGE
  $ echelon read:search [--jq <value>]

FLAGS
  --jq=<value>  jq string to parse result set

DESCRIPTION
  retrieve process(es)
```

## `echelon read:ui:process:audit:detail`

retrieve information associated with a process instance (process audit)

```
USAGE
  $ echelon read:ui:process:audit:detail --id <value> [--jq <value>]

FLAGS
  --id=<value>  (required) process audit ID
  --jq=<value>  jq string to parse result set

DESCRIPTION
  retrieve information associated with a process instance (process audit)
```

## `echelon read:ui:process:audit:list`

retrieve process instances (process audit) of a process

```
USAGE
  $ echelon read:ui:process:audit:list [--filterStart <value>] [--filterEnd <value>] [--jq <value>]

FLAGS
  --filterEnd=<value>    [default: 2999-12-31] filter end date
  --filterStart=<value>  [default: 1970-01-01] filter start date
  --jq=<value>           jq string to parse result set

DESCRIPTION
  retrieve process instances (process audit) of a process
```

## `echelon start:api`

start a Echelon API server that wraps the Echelon CLI

```
USAGE
  $ echelon start:api [--port <value>]

FLAGS
  --port=<value>  [default: 3000] API port

DESCRIPTION
  start a Echelon API server that wraps the Echelon CLI
```

## `echelon update:artefact:variable`

update a variable value associated with an artefact

```
USAGE
  $ echelon update:artefact:variable --id <value> --type <value> --name <value> --value <value>

FLAGS
  --id=<value>     (required) artefact ID
  --name=<value>   (required) variable name
  --type=<value>   (required) artefact type
  --value=<value>  (required) variable value

DESCRIPTION
  update a variable value associated with an artefact
```

## `echelon update:process:audit`

update an instance of a process (process audit)

```
USAGE
  $ echelon update:process:audit --id <value> --status completed|failed

FLAGS
  --id=<value>       (required) process audit ID
  --status=<option>  (required) process audit status
                     <options: completed|failed>

DESCRIPTION
  update an instance of a process (process audit)
```

## `echelon update:process:variable`

update a variable value associated with a process

```
USAGE
  $ echelon update:process:variable --id <value> --type <value> --name <value> --value <value>

FLAGS
  --id=<value>     (required) process audit ID
  --name=<value>   (required) variable name
  --type=<value>   (required) process type
  --value=<value>  (required) variable value

DESCRIPTION
  update a variable value associated with a process
```

## `echelon update:registry`

update a registry object

```
USAGE
  $ echelon update:registry --id <value> [--status <value>]

FLAGS
  --id=<value>      (required) registry ID
  --status=<value>  status of the registered object

DESCRIPTION
  update a registry object
```

## `echelon version`

```
USAGE
  $ echelon version
```

_See code: [@oclif/plugin-version](https://github.com/oclif/plugin-version/blob/v1.0.4/src/commands/version.ts)_

<!-- commandsstop -->

## Debug

To debug your Echelon CLI, use the following commands:

```bash
env DEBUG=\* echelon COMMAND
```

## How do I regenerate the CLI README file?

This readme file is generated by oclif by running

```bash
npx oclif-dev readme
```

## How do I regenerate the index.html file?

`index.html` is generated by [docgen](https://github.com/thedevsaddam/docgen) in association with Postman by running

```bash
docgen build -i api.postman_collection.json -o index -v -s
```

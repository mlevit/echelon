const { Command, Flags } = require("@oclif/core");
const fs = require("fs");
const knex = require("../../knex.js");
const md5File = require("md5-file");
const path = require("path");
const progress = require("cli-progress");

var requestJSON = { direction: "export", tables: [] };
var responseJSON = { tables: [], errors: [] };

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    var tables = flags.table;
    const inputJson = JSON.parse(flags.inputJson);
    const output = flags.output;
    const api = flags.api;

    requestJSON["tables"] = tables;
    requestJSON["output"] = output;

    // Start migration by inserting record into echelon_migration table
    const migrationId = await this.startMigration(requestJSON);

    // Read Echelon catalogue schema
    const schema = this.getSchema();

    // Define progress bar const
    var progressBar = null;

    if (!api) {
      // Create a progress bar
      progressBar = new progress.SingleBar(
        {
          format: "| export | {bar} {percentage}% | {value}/{total} tables |",
          hideCursor: true,
        },
        progress.Presets.shades_classic
      );
    }

    if (inputJson) {
      tables = Object.keys(inputJson);
    } else {
      if (!tables) {
        tables = Object.values(schema).map((table) => table["name"]);
      }
    }

    if (!api) {
      progressBar.start(tables.length, 0);
    }

    try {
      var outputJSON = {};
      var errorJSON = [];
      for (var table of tables) {
        try {
          let ids = inputJson ? inputJson[table] : null;
          outputJSON[table] = await this.getTableRecords(table, ids);
        } catch (error) {
          errorJSON.push({ error: error, string: error.toString() });
        } finally {
          responseJSON["tables"].push({
            name: table,
            count: outputJSON[table] ? outputJSON[table].length : 0,
            errors: errorJSON,
          });
          if (!api) {
            progressBar.increment();
          }
        }
      }

      if (api) {
        this.log(outputJSON);
        return outputJSON;
      } else {
        // Write output to file
        fs.writeFileSync(output, JSON.stringify(outputJSON, null, 2));

        // Get output file metadata
        responseJSON["output"] = {
          name: output,
          size: fs.statSync(output).size,
          checksum: md5File.sync(output),
        };
      }
    } catch (error) {
      responseJSON["errors"].push({ error: error, string: error.toString() });
    } finally {
      if (!api) {
        progressBar.stop();
      }
      await this.stopMigration(migrationId, responseJSON);
    }
  }

  getSchema() {
    return JSON.parse(
      // eslint-disable-next-line no-undef
      fs.readFileSync(path.join(__dirname, "./schema.json"), "utf8")
    );
  }

  getTableProperty(tableName, propertyName) {
    for (var table of this.getSchema()) {
      if (table["name"] === tableName) {
        return table[propertyName];
      }
    }
  }

  async getTableRecords(table, ids) {
    switch (table) {
      case "field":
        return await this.getFieldRecords(ids);
      case "job_constant":
        return await this.getJobConstantRecords(ids);
      case "entity_constant":
        return await this.getEntityConstantRecords(ids);
      case "job_entity_rel":
        return await this.getJobEntityRelRecords(ids);
      case "job_field_map":
        return await this.getJobFieldMapRecords(ids);
      default:
        return await this.getOtherTableRecords(table, ids);
    }
  }

  async getOtherTableRecords(table, ids) {
    const orderKeys = this.getTableProperty(table, "unique_key");
    var tableColumnsResult = await knex
      .select("column_name")
      .from("information_schema.columns")
      .where("table_name", table)
      .whereNotIn("column_name", [
        `${table}_id`,
        "insert_date",
        "update_date",
        "migration_insert_id",
        "migration_update_id",
      ]);

    if (tableColumnsResult.length != 0) {
      var columns = tableColumnsResult.map((column) => column.column_name);

      return await knex
        .select(columns)
        .from(table)
        .whereIn(`${table}_id`, ids)
        .modify(function (qb) {
          if (ids) {
            qb.whereIn(`${table}_id`, ids);
          }
        })
        .orderBy(orderKeys);
    } else {
      this.error(`Table '${table}' does not exist.`);
    }
  }

  async getFieldRecords(ids) {
    return await knex
      .select(
        "entity.name as entity_name",
        "field.physical_name",
        "field.data_type",
        "field.length",
        "field.precision",
        "field.scale",
        "field.sequence_number",
        "field.group_number",
        "field.business_description",
        "field.business_name",
        "field.business_alias",
        "field.acronym_name",
        "field.classification",
        "field.required_flag",
        "field.computed_flag",
        "field.sequence_flag",
        "field.hash_key_flag",
        "field.hash_diff_flag",
        "field.record_source_flag",
        "field.business_date_flag"
      )
      .from("field")
      .join("entity", "field.entity_id", "entity.entity_id")
      .modify(function (qb) {
        if (ids) {
          qb.whereIn("field_id", ids);
        }
      });
  }

  async getJobConstantRecords(ids) {
    return await knex
      .select("job.name as job_name", "job_constant.name", "job_constant.value")
      .from("job_constant")
      .join("job", "job_constant.job_id", "job.job_id")
      .modify(function (qb) {
        if (ids) {
          qb.whereIn("job_constant_id", ids);
        }
      });
  }

  async getEntityConstantRecords(ids) {
    return await knex
      .select(
        "entity.name as entity_name",
        "entity_constant.name",
        "entity_constant.value"
      )
      .from("entity_constant")
      .join("entity", "entity_constant.entity_id", "entity.entity_id")
      .modify(function (qb) {
        if (ids) {
          qb.whereIn("entity_constant_id", ids);
        }
      });
  }

  async getJobEntityRelRecords(ids) {
    return await knex
      .select(
        "job.name as job_name",
        "sequence_number",
        "source.name as source_entity_name",
        "target.name as target_entity_name",
        "job_entity_rel.required_flag"
      )
      .from("job_entity_rel")
      .join("job", "job_entity_rel.job_id", "job.job_id")
      .join(
        "entity as source",
        "job_entity_rel.source_entity_id",
        "source.entity_id"
      )
      .join(
        "entity as target",
        "job_entity_rel.target_entity_id",
        "target.entity_id"
      )
      .modify(function (qb) {
        if (ids) {
          qb.whereIn("job_entity_rel_id", ids);
        }
      });
  }

  async getJobFieldMapRecords(ids) {
    return await knex
      .select(
        "job.name as job_name",
        "source_entity.name as source_entity_name",
        "source_field.physical_name as source_field_physical_name",
        "target_entity.name as target_entity_name",
        "target_field.physical_name as target_field_physical_name",
        "job_field_map.hard_rule"
      )
      .from("job_field_map")
      .join("job", "job_field_map.job_id", "job.job_id")
      .join(
        "field as source_field",
        "job_field_map.source_field_id",
        "source_field.field_id"
      )
      .join(
        "entity as source_entity",
        "source_field.entity_id",
        "source_entity.entity_id"
      )
      .join(
        "field as target_field",
        "job_field_map.target_field_id",
        "target_field.field_id"
      )
      .join(
        "entity as target_entity",
        "target_field.entity_id",
        "target_entity.entity_id"
      )
      .modify(function (qb) {
        if (ids) {
          qb.whereIn("job_field_map.job_field_map_id", ids);
        }
      });
  }

  async startMigration(requestJSON) {
    var migrationIdResult = await knex("echelon_migration")
      .insert({ request: requestJSON })
      .returning("echelon_migration_id");
    return migrationIdResult[0]["echelon_migration_id"];
  }

  async stopMigration(migrationId, responseJSON) {
    await knex("echelon_migration")
      .update({
        response: JSON.stringify(responseJSON),
      })
      .where("echelon_migration_id", migrationId);
  }
}

CustomCommand.description = "export Echelon entries";

CustomCommand.flags = {
  table: Flags.string({
    description: "table to export (can be specified multiple times)",
    exclusive: ["inputJson", "api"],
    multiple: true,
  }),
  output: Flags.string({
    description: "output filename",
    default: "./export.json",
    exclusive: ["inputJson", "api"],
  }),
  inputJson: Flags.string({
    description: "JSON of tables and IDs to export e.g., {table: [id, id]}",
    exclusive: ["table", "output"],
    dependsOn: ["api"],
    hidden: true,
  }),
  api: Flags.boolean({
    description: "(flag) is API result expected",
    exclusive: ["output"],
    dependsOn: ["inputJson"],
    hidden: true,
  }),
};

module.exports = CustomCommand;

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
    const output = flags.output;

    requestJSON["tables"] = tables;
    requestJSON["output"] = output;

    // Start migration by inserting record into echelon_migration table
    const migrationId = await this.startMigration(requestJSON);

    // Read Echelon catalogue schema
    const schema = this.getSchema();

    // Create a progress bar
    const progressBar = new progress.SingleBar(
      {
        format: "| export | {bar} {percentage}% | {value}/{total} tables |",
        hideCursor: true,
      },
      progress.Presets.shades_classic
    );

    if (!tables) {
      tables = Object.values(schema).map((table) => table["name"]);
    }

    progressBar.start(tables.length, 0);

    try {
      var outputJSON = {};
      var errorJSON = [];
      for (var table of tables) {
        try {
          outputJSON[table] = await this.getTableRecords(table);
        } catch (error) {
          errorJSON.push({ error: error, string: error.toString() });
        } finally {
          responseJSON["tables"].push({
            name: table,
            count: outputJSON[table] ? outputJSON[table].length : 0,
            errors: errorJSON,
          });
          progressBar.increment();
        }
      }

      // Write output to file
      fs.writeFileSync(output, JSON.stringify(outputJSON, null, 2));

      // Get output file metadata
      responseJSON["output"] = {
        name: output,
        size: fs.statSync(output).size,
        checksum: md5File.sync(output),
      };
    } catch (error) {
      responseJSON["errors"].push({ error: error, string: error.toString() });
    } finally {
      progressBar.stop();
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

  async getTableRecords(table) {
    switch (table) {
      case "field":
        return await this.getFieldRecords();
      case "job_constant":
        return await this.getJobConstantRecords();
      case "entity_constant":
        return await this.getEntityConstantRecords();
      case "job_entity_rel":
        return await this.getJobEntityRelRecords();
      case "job_field_map":
        return await this.getJobFieldMapRecords();
      default:
        return await this.getOtherTableRecords(table);
    }
  }

  async getOtherTableRecords(table) {
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
      return await knex.select(columns).from(table).orderBy(orderKeys);
    } else {
      this.error(`Table '${table}' does not exist.`);
    }
  }

  async getFieldRecords() {
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
      .join("entity", "field.entity_id", "entity.entity_id");
  }

  async getJobConstantRecords() {
    return await knex
      .select("job.name as job_name", "job_constant.name", "job_constant.value")
      .from("job_constant")
      .join("job", "job_constant.job_id", "job.job_id");
  }

  async getEntityConstantRecords() {
    return await knex
      .select(
        "entity.name as entity_name",
        "entity_constant.name",
        "entity_constant.value"
      )
      .from("entity_constant")
      .join("entity", "entity_constant.entity_id", "entity.entity_id");
  }

  async getJobEntityRelRecords() {
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
      );
  }

  async getJobFieldMapRecords() {
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
      );
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

CustomCommand.description = "export Echelon entries to file";

CustomCommand.flags = {
  table: Flags.string({
    description: "table to export (can be specified multiple times)",
    multiple: true,
  }),
  output: Flags.string({
    description: "output filename",
    default: "./export.json",
  }),
};

module.exports = CustomCommand;

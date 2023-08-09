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
      case "attribute":
        return await this.getAttributeRecords();
      case "job_constant":
        return await this.getJobConstantRecords();
      case "artefact_constant":
        return await this.getArtefactConstantRecords();
      case "job_artefact_rel":
        return await this.getJobArtefactRelRecords();
      case "job_attribute_map":
        return await this.getJobAttributeMapRecords();
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

  async getAttributeRecords() {
    return await knex
      .select(
        "artefact.name as artefact_name",
        "attribute.physical_name",
        "attribute.data_type",
        "attribute.length",
        "attribute.precision",
        "attribute.scale",
        "attribute.sequence_number",
        "attribute.group_number",
        "attribute.business_description",
        "attribute.business_name",
        "attribute.business_alias",
        "attribute.acronym_name",
        "attribute.classification",
        "attribute.required_flag",
        "attribute.computed_flag",
        "attribute.sequence_flag",
        "attribute.hash_key_flag",
        "attribute.hash_diff_flag",
        "attribute.record_source_flag",
        "attribute.business_date_flag"
      )
      .from("attribute")
      .join("artefact", "attribute.artefact_id", "artefact.artefact_id");
  }

  async getJobConstantRecords() {
    return await knex
      .select("job.name as job_name", "job_constant.name", "job_constant.value")
      .from("job_constant")
      .join("job", "job_constant.job_id", "job.job_id");
  }

  async getArtefactConstantRecords() {
    return await knex
      .select(
        "artefact.name as artefact_name",
        "artefact_constant.name",
        "artefact_constant.value"
      )
      .from("artefact_constant")
      .join(
        "artefact",
        "artefact_constant.artefact_id",
        "artefact.artefact_id"
      );
  }

  async getJobArtefactRelRecords() {
    return await knex
      .select(
        "job.name as job_name",
        "sequence_number",
        "source.name as source_artefact_name",
        "target.name as target_artefact_name",
        "job_artefact_rel.required_flag"
      )
      .from("job_artefact_rel")
      .join("job", "job_artefact_rel.job_id", "job.job_id")
      .join(
        "artefact as source",
        "job_artefact_rel.source_artefact_id",
        "source.artefact_id"
      )
      .join(
        "artefact as target",
        "job_artefact_rel.target_artefact_id",
        "target.artefact_id"
      );
  }

  async getJobAttributeMapRecords() {
    return await knex
      .select(
        "job.name as job_name",
        "source_artefact.name as source_artefact_name",
        "source_attribute.physical_name as source_attribute_physical_name",
        "target_artefact.name as target_artefact_name",
        "target_attribute.physical_name as target_attribute_physical_name",
        "job_attribute_map.hard_rule"
      )
      .from("job_attribute_map")
      .join("job", "job_attribute_map.job_id", "job.job_id")
      .join(
        "attribute as source_attribute",
        "job_attribute_map.source_attribute_id",
        "source_attribute.attribute_id"
      )
      .join(
        "artefact as source_artefact",
        "source_attribute.artefact_id",
        "source_artefact.artefact_id"
      )
      .join(
        "attribute as target_attribute",
        "job_attribute_map.target_attribute_id",
        "target_attribute.attribute_id"
      )
      .join(
        "artefact as target_artefact",
        "target_attribute.artefact_id",
        "target_artefact.artefact_id"
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

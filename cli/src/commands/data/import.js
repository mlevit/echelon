const { Command, Flags } = require("@oclif/core");
const fs = require("fs");
const knex = require("../../knex.js");
const md5File = require("md5-file");
const merge = require("deepmerge");
const path = require("path");
const progress = require("cli-progress");

var requestJson = { direction: "import", tables: [] };
var responseJson = { tables: [], errors: [] };

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const input = flags.input || flags.inputJson;
    const insertFlag = flags.insert;
    const updateFlag = flags.update;
    const deleteFlag = flags.delete;
    const api = flags.api;

    const inputOrder = [
      "constraint_alert_code",
      "constraint_entity_constant_name",
      "constraint_entity_type",
      "constraint_field_classification",
      "constraint_data_mask_type",
      "constraint_data_quality_rule_criticality",
      "constraint_data_quality_rule_dimension",
      "constraint_flow_label",
      "constraint_glossary_entry_object_rel_object_type",
      "constraint_glossary_entry_rel_status",
      "constraint_glossary_entry_rel_type",
      "constraint_glossary_entry_status",
      "constraint_glossary_entry_type",
      "constraint_log_priority",
      "constraint_run_status",
      "constraint_job_constant_name",
      "constraint_job_dependency_logic",
      "constraint_job_type",
      "constraint_reference_data_rel_status",
      "constraint_reference_data_rel_type",
      "constraint_reference_data_status",
      "constraint_reference_data_type",
      "constraint_registry_status",
      "constraint_stakeholder_object_rel_object_type",
      "constraint_stakeholder_role",
      "constraint_technical_reconciliation_formula",
      "constraint_variable_name",
      "constraint_variable_object_type",
      "job",
      "job_constant",
      "entity",
      "entity_constant",
      "field",
      "job_entity_rel",
      "job_field_map",
    ];

    // Create request JSON
    requestJson["input"] = [];

    if (!api) {
      // Get all files to be jobed and record them in the request JSON
      if (fs.lstatSync(input).isDirectory()) {
        for (var file of fs.readdirSync(input)) {
          if (file.toLowerCase().includes(".json")) {
            requestJson["input"].push({
              name: path.join(input, file),
              size: fs.statSync(path.join(input, file)).size,
              checksum: md5File.sync(path.join(input, file)),
            });
          }
        }
      } else {
        requestJson["input"].push({
          name: input,
          size: fs.statSync(input).size,
          checksum: md5File.sync(input),
        });
      }
    }

    requestJson["insert"] = insertFlag;
    requestJson["update"] = updateFlag;
    requestJson["delete"] = deleteFlag;

    // Get the migration id
    const migrationId = await this.startMigration(requestJson);

    // Create a progress bar
    const progressBar = null;
    if (!api) {
      progressBar = new progress.SingleBar(
        {
          format: "| {table} | {bar} {percentage}% |",
          hideCursor: true,
        },
        progress.Presets.shades_classic
      );
    }

    const inputJson = this.getInputJson(input, api);
    const padEndLength = this.getLongestTableLength(inputJson);
    for (var table of inputOrder) {
      // eslint-disable-next-line no-prototype-builtins
      if (inputJson.hasOwnProperty(table) === false) {
        continue;
      }

      try {
        if (!api) {
          progressBar.start(inputJson[table].length, 0);
          progressBar.update(0, { table: table.padEnd(padEndLength) });
        }

        var insertArray = [];
        var updateArray = [];
        var deleteArray = [];
        var errorArray = [];
        var uniqueKeys = this.getTableProperty(table, "unique_key");

        if (deleteFlag) {
          var recordsToDelete = await this.getAllTableRecords(table);
        }

        for (var record of inputJson[table]) {
          var recordId = [];
          var updateWhere = {};
          var originalRecord = await this.getValidRecord(
            table,
            Object.assign({}, record)
          );
          var insertRecord = Object.assign({}, originalRecord);
          var updateRecord = Object.assign({}, originalRecord);

          // Create a record ID to identify the record
          // Create a WHERE clause to identify the record for the UPDATE
          // Remove the unique keys from the record for the UPDATE
          for (var key of uniqueKeys) {
            recordId.push(originalRecord[key]);
            updateWhere[key] = originalRecord[key];
            delete updateRecord[key];
          }

          // Create a new record if it doesn't exist
          var insertResult = [];
          if (insertFlag) {
            try {
              insertRecord["migration_insert_id"] = migrationId;
              insertResult = await knex(table)
                .insert(insertRecord)
                .returning("*")
                .onConflict(uniqueKeys)
                .ignore();
              if (insertResult.length === 1) {
                insertArray.push(recordId);
              }
            } catch (error) {
              errorArray.push({
                entry: recordId,
                error: error,
                string: error.toString(),
              });
            }
          }

          // Update an existing record if it exists and it was not inserted
          if (updateFlag && (insertResult.length === 0 || !insertFlag)) {
            // Check if record exists and is different
            try {
              var isDifferent =
                (await knex(table).select("*").where(originalRecord)).length ===
                0
                  ? true
                  : false;
            } catch (error) {
              errorArray.push({
                entry: recordId,
                error: error,
                string: error.toString(),
              });
            }

            // Update record if different
            if (isDifferent) {
              try {
                updateRecord["migration_update_id"] = migrationId;
                await knex(table).where(updateWhere).update(updateRecord);
                updateArray.push(recordId);
              } catch (error) {
                errorArray.push({
                  entry: recordId,
                  error: error,
                  string: error.toString(),
                });
              }
            }
          }

          // rudimentary delete which loops through all records and compares their
          // JSON string equivalents
          if (deleteFlag && (insertResult.length === 0 || !insertFlag)) {
            var originalRecordJson = JSON.stringify(originalRecord);
            for (var index in recordsToDelete) {
              if (
                originalRecordJson === JSON.stringify(recordsToDelete[index])
              ) {
                recordsToDelete.splice(index, 1);
              }
            }
          }
          if (!api) {
            progressBar.increment();
          }
        }

        if (deleteFlag && recordsToDelete.length > 0) {
          for (var recordToDelete of recordsToDelete) {
            try {
              await knex(table).where(recordToDelete).del();
              deleteArray.push(recordToDelete);
            } catch (error) {
              errorArray.push({
                entry: recordToDelete,
                error: error,
                string: error.toString(),
              });
            }
          }
        }

        requestJson["tables"].push(table);
        responseJson["tables"].push({
          name: table,
          inserts: insertArray,
          updates: updateArray,
          deletes: deleteArray,
          errors: errorArray,
        });
      } catch (error) {
        responseJson["errors"].push({
          error: error,
          string: error.toString(),
        });
      } finally {
        if (!api) {
          progressBar.stop();
        }
      }
    }
    await this.stopMigration(migrationId, responseJson);
  }

  getLongestTableLength(inputJson) {
    return Object.keys(inputJson).sort(function (a, b) {
      return b.length - a.length;
    })[0].length;
  }

  getInputJson(input, api) {
    if (api) {
      return JSON.parse(input);
    } else {
      if (fs.lstatSync(input).isDirectory()) {
        var inputJson = {};
        for (var file of fs.readdirSync(input)) {
          if (file.toLowerCase().includes(".json")) {
            inputJson = merge(
              JSON.parse(fs.readFileSync(path.join(input, file)), "utf8"),
              inputJson
            );
          }
        }
        return inputJson;
      } else {
        return JSON.parse(fs.readFileSync(input, "utf8"));
      }
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

  async getValidRecord(table, record) {
    switch (table) {
      case "field":
        return await this.getFieldRecord(record);
      case "job_constant":
        return await this.getJobConstantRecord(record);
      case "entity_constant":
        return await this.getEntityConstantRecord(record);
      case "job_entity_rel":
        return await this.getJobEntityRelRecord(record);
      case "job_field_map":
        return await this.getJobFieldMapRecord(record);
      default:
        return record;
    }
  }

  async getAllTableRecords(table) {
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

  async getFieldRecord(record) {
    var entity_id_result = await knex
      .select("entity_id")
      .from("entity")
      .where("name", record["entity_name"]);

    record["entity_id"] = entity_id_result[0]["entity_id"];
    delete record["entity_name"];
    return record;
  }

  async getJobConstantRecord(record) {
    var job_id_result = await knex
      .select("job_id")
      .from("job")
      .where("name", record["job_name"]);

    if (job_id_result.length > 0) {
      record["job_id"] = job_id_result[0]["job_id"];
      delete record["job_name"];
      return record;
    }
  }

  async getEntityConstantRecord(record) {
    var entity_id_result = await knex
      .select("entity_id")
      .from("entity")
      .where("name", record["entity_name"]);

    if (entity_id_result.length > 0) {
      record["entity_id"] = entity_id_result[0]["entity_id"];
      delete record["entity_name"];
      return record;
    }
  }

  async getJobEntityRelRecord(record) {
    var job_id_result = await knex
      .select("job_id")
      .from("job")
      .where("name", record["job_name"]);

    var source_entity_id_result = await knex
      .select("entity_id")
      .from("entity")
      .where("name", record["source_entity_name"]);

    var target_entity_id_result = await knex
      .select("entity_id")
      .from("entity")
      .where("name", record["target_entity_name"]);

    record["job_id"] = job_id_result[0]["job_id"];
    record["source_entity_id"] = source_entity_id_result[0]["entity_id"];
    record["target_entity_id"] = target_entity_id_result[0]["entity_id"];

    delete record["job_name"];
    delete record["source_entity_name"];
    delete record["target_entity_name"];

    return record;
  }

  async getJobFieldMapRecord(record) {
    var job_id_result = await knex
      .select("job_id")
      .from("job")
      .where("name", record["job_name"]);

    var source_field_id_result = await knex
      .select("field.field_id")
      .from("entity")
      .join("field", "entity.entity_id", "field.entity_id")
      .where("entity.name", record["source_entity_name"])
      .where("field.physical_name", record["source_field_physical_name"]);

    var target_field_id_result = await knex
      .select("field.field_id")
      .from("entity")
      .join("field", "entity.entity_id", "field.entity_id")
      .where("entity.name", record["target_entity_name"])
      .where("field.physical_name", record["target_field_physical_name"]);

    record["job_id"] = job_id_result[0]["job_id"];
    record["source_field_id"] = source_field_id_result[0]["field_id"];
    record["target_field_id"] = target_field_id_result[0]["field_id"];

    delete record["job_name"];
    delete record["source_entity_name"];
    delete record["source_field_physical_name"];
    delete record["target_entity_name"];
    delete record["target_field_physical_name"];

    return record;
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

CustomCommand.description = "import Echelon entries from file";

CustomCommand.flags = {
  input: Flags.string({
    description: "input filename or directory",
    exactlyOne: ["input", "inputJson"],
  }),
  insert: Flags.boolean({
    description: "(flag) insert new entries",
    default: false,
  }),
  update: Flags.boolean({
    description: "(flag) update existing entries",
    default: false,
  }),
  delete: Flags.boolean({
    description: "(flag) delete existing entries not present in input file",
    default: false,
  }),
  inputJson: Flags.string({
    description: "JSON of tables and IDs to export e.g., {table: [id, id]}",
    exclusive: ["input"],
    dependsOn: ["api"],
    hidden: true,
  }),
  api: Flags.boolean({
    description: "(flag) is API result expected",
    exclusive: ["input"],
    dependsOn: ["inputJson"],
    hidden: true,
  }),
};

module.exports = CustomCommand;

#!/usr/bin/env node

const fs = require("fs");
const knex = require("./knex.js");
const path = require("path");
const table = require("markdown-table");
const yargs = require("yargs");

const options = yargs
  .usage("Usage: $0 <command>")
  .command(
    "generate",
    "Generates database table definitions.",
    () => {},
    (argv) => {
      generate(argv);
    }
  )
  .example("$0 generate", "Generates database table definitions.")
  .help("h")
  .alias("h", "help").argv;

async function generate(argv) {
  console.log("[INFO] Generating database table definitions");

  const transformationMarkdownDir = "../../docs/transformation";

  // https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js
  const getAllFiles = function (dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
      } else {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    });

    return arrayOfFiles;
  };

  // https://github.com/oclif/oclif/blob/main/src/commands/readme.ts#L71
  const replaceTag = function (readme, tag, body) {
    if (readme.includes(`<!-- ${tag} -->`)) {
      if (readme.includes(`<!-- ${tag}stop -->`)) {
        readme = readme.replace(
          new RegExp(`<!-- ${tag} -->(.|\n)*<!-- ${tag}stop -->`, "m"),
          `<!-- ${tag} -->`
        );
      }
    }
    return readme.replace(
      `<!-- ${tag} -->`,
      `<!-- ${tag} -->\n${body}\n<!-- ${tag}stop -->`
    );
  };

  try {
    var metadataFiles = getAllFiles(transformationMarkdownDir);

    for (markdownFileName of metadataFiles) {
      const markdownFileNameSplit = markdownFileName.split("/");
      let tableName = markdownFileNameSplit[
        markdownFileNameSplit.length - 1
      ].replace(".md", "");

      if (tableName != "index" && tableName != "types") {
        var definitionTable = [["Name", "Type", "Nullable", "Description"]];
        var constraintTable = [["Type", "Columns"]];
        var acceptableValuesTable =
          tableName == "process_constant" ||
          tableName == "artefact_constant" ||
          tableName == "variable"
            ? (acceptableValuesTable = [["Column", "Values"]])
            : (acceptableValuesTable = [["Column", "Value", "Comment"]]);

        // Different database engines have different ways of storing column descriptions.
        // This switch allows us to specify the correct column description format for each engine.
        var definitionResult = "";
        switch (knex.client.config.client) {
          // mssql code untested
          // https://stackoverflow.com/a/44409874/12212179
          case "mssql":
            definitionResult = await knex
              .select(
                "co.column_name as name",
                "co.data_type as type",
                "co.is_nullable as nullable",
                "pr.value as description"
              )
              .from("information_schema.columns as co")
              .innerJoin("sys.columns as sc", function () {
                this.on(
                  "sc.object_id",
                  "object_id(co.table_schema + '.' + co.table_name)"
                );
                this.andOn("sc.name", "co.column_name");
              })
              .leftJoin("sys.extended_properties as pr", function () {
                this.on("pr.major_id", "sc.object_id");
                this.andOn("pr.minor_id", "sc.column_id");
                this.andOn("pr.name", "MS_Description");
              })
              .where("co.table_name", tableName)
              .orderBy("co.ordinal_position");
            break;
          case "mysql":
            definitionResult = await knex
              .select(
                "co.column_name as name",
                "co.data_type as type",
                "co.is_nullable as nullable",
                "co.column_comment as description"
              )
              .from("information_schema.columns as co")
              .where("co.table_name", tableName)
              .orderBy("co.ordinal_position");
            break;
          case "pg":
            definitionResult = await knex
              .select(
                "co.column_name as name",
                "co.data_type as type",
                "co.is_nullable as nullable"
              )
              .select(
                knex.raw(
                  "col_description((co.table_schema || '.' || co.table_name)::regclass::oid, co.ordinal_position) as description"
                )
              )
              .from("information_schema.columns as co")
              .where("co.table_name", tableName)
              .orderBy("co.ordinal_position");
            break;
        }

        for (definition of definitionResult) {
          definitionTable.push([
            definition.name,
            definition.type,
            definition.nullable,
            definition.description,
          ]);

          // Retrieve table acceptable values
          var acceptableValuesTableName = `constraint_${tableName}_${definition.name}`;

          var acceptableValuesTableExistsResult = await knex
            .select("*")
            .from("information_schema.tables")
            .where("table_name", acceptableValuesTableName);

          if (acceptableValuesTableExistsResult.length == 1) {
            let acceptableValuesResult = await knex
              .select("*")
              .from(acceptableValuesTableName)
              .orderBy(2);

            if (
              tableName != "process_constant" &&
              tableName != "artefact_constant" &&
              tableName != "variable"
            ) {
              for (acceptableValue of acceptableValuesResult) {
                acceptableValuesTable.push([
                  definition.name,
                  acceptableValue.value,
                  acceptableValue.comment,
                ]);
              }
            } else {
              acceptableValuesTable.push([
                definition.name,
                `See full list of values [here](../../constraints/${tableName}_${definition.name}.md).`,
              ]);
            }
          }
        }

        // Retrieve table constraints
        let constraintResult = await knex
          .select(
            "tco.constraint_name as name",
            "tco.constraint_type as type",
            knex.raw(
              "string_agg(kcu.column_name, ', ' order by kcu.ordinal_position) as columns"
            )
          )
          .from("information_schema.table_constraints as tco")
          .join("information_schema.key_column_usage as kcu", function () {
            this.on("kcu.constraint_name", "tco.constraint_name");
            this.andOn("kcu.constraint_schema", "tco.constraint_schema");
            this.andOn("kcu.constraint_name", "tco.constraint_name");
          })
          .where("kcu.table_name", tableName)
          .groupBy("tco.constraint_name", "tco.constraint_type")
          .orderBy("tco.constraint_type");

        for (constraint of constraintResult) {
          constraintTable.push([constraint.type, constraint.columns]);
        }
      }

      var markdownFileBody = fs.readFileSync(markdownFileName, {
        encoding: "utf8",
        flag: "r",
      });

      // Insert table defintion
      markdownFileBody = replaceTag(
        markdownFileBody,
        "definition",
        table(definitionTable)
      );

      // Insert table constraints
      markdownFileBody = replaceTag(
        markdownFileBody,
        "constraint",
        constraintTable.length > 1
          ? (constraintTable = table(constraintTable))
          : (constraintTable = "No related constraints found.")
      );

      // Insert acceptable values
      markdownFileBody = replaceTag(
        markdownFileBody,
        "acceptablevalues",
        acceptableValuesTable.length > 1
          ? (acceptableValuesTable = table(acceptableValuesTable))
          : (acceptableValuesTable = "No related acceptable values found.")
      );

      fs.writeFileSync(markdownFileName, markdownFileBody, {
        encoding: "utf8",
        flag: "w",
      });
    }
  } catch (err) {
    if (typeof err === "object") {
      if (err.message) {
        console.log("[ERROR] " + err.message);
      }
      if (err.stack) {
        console.log("[STACK] " + err.stack);
      }
    }
  }

  console.log("[INFO] Done");
}

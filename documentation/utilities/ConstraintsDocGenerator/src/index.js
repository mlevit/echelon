#!/usr/bin/env node

const fs = require("fs");
const fs_extra = require("fs-extra");
const hjson = require("hjson");
const jsonToMarkdown2 = require("json-to-markdown-table2");
const knex = require("./knex.js");
const titlecase = require("titlecase");
const yargs = require("yargs");

const options = yargs
  .usage("Usage: $0 <command>")
  .command(
    "generate",
    "Generates constraint markdown files.",
    () => {},
    (argv) => {
      generate(argv);
    }
  )
  .example("$0 generate", "Generates constraint markdown files.")
  .help("h")
  .alias("h", "help").argv;

async function generate(argv) {
  console.log("[INFO] Generating constraint markdown files");

  const constraintTables = [
    "constraint_job_type",
    "constraint_entity_type",
    "constraint_job_constant_name",
    "constraint_entity_constant_name",
    "constraint_variable_name",
    "constraint_variable_object_type",
  ];
  const constraintsMarkdownDir = "../../docs/constraints";

  try {
    await Promise.allSettled([fs_extra.emptyDirSync(constraintsMarkdownDir)]);

    for (const table of constraintTables) {
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
      var columns = tableColumnsResult.map((column) => column.column_name);

      const constraints = await knex(table).select(columns);

      let fileMdHeader =
        "---\nhide:\n  - navigation\n---\n\n" +
        `# ${titlecase(
          table.replace("constraint_", "").replace(/_/g, " ")
        )}\n\n`;

      var mdFileBody = "";

      if (table === "constraint_variable_name") {
        // Group records for variable name table
        var groupedJsonPayload = {};
        for (row of constraints) {
          if (row["object_type"] in groupedJsonPayload) {
            groupedJsonPayload[row["object_type"]].push(row);
          } else {
            groupedJsonPayload[row["object_type"]] = [row];
          }
        }

        // Sort grouped dictionary
        const orderedGroupedJsonPayload = Object.keys(groupedJsonPayload)
          .sort()
          .reduce((obj, key) => {
            obj[key] = groupedJsonPayload[key];
            return obj;
          }, {});

        // Generate markdown
        for (const [key, value] of Object.entries(orderedGroupedJsonPayload)) {
          let subheader = "## " + key + "\n\n";
          mdFileBody +=
            subheader +
            jsonToMarkdown2(
              value.sort((a, b) => a.value.localeCompare(b.value))
            ) +
            "\n\n";
        }
      } else {
        mdFileBody =
          jsonToMarkdown2(
            constraints.sort((a, b) => a.value.localeCompare(b.value))
          ) + "\n\n";
      }

      const markdown = jsonToMarkdown2(constraints, {
        header: true,
        headerStyle: "header",
        align: "c",
        format: {
          name: (name) => titlecase(name),
          object_type: (object_type) => titlecase(object_type),
        },
      });

      const markdownFile = `${constraintsMarkdownDir}/${table.replace(
        "constraint_",
        ""
      )}.md`;
      // await fs_extra.writeFile(markdownFile, markdown);

      fs.writeFileSync(markdownFile, fileMdHeader + mdFileBody);
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

const { Command, Flags } = require("@oclif/core");
const cors = require("cors");
const express = require("express");
const expressWinston = require("express-winston");
const path = require("path");
const winston = require("winston");

class CustomCommand extends Command {
  getParameters(req) {
    var data = {};
    var parameters = ["--api"];

    switch (req.method) {
      case "GET":
        data = req.query;
        break;
      case "POST":
        data = req.body;
        break;
      case "PUT":
        data = req.body;
        break;
    }

    for (var key in data) {
      parameters.push("--" + key);
      if (data[key]) {
        parameters.push(data[key]);
      }
    }

    return parameters;
  }

  async run() {
    const { flags } = await this.parse(CustomCommand);
    const port = flags.port;

    const methodDict = { GET: "read", POST: "create", PUT: "update" };
    const routeTranslationDict = {
      "job/run": "job/run/index",
      entity: "entity/index",
      job: "job/index",
    };

    try {
      var app = express();
      app.use(express.json());
      app.use(cors());
      app.use(
        expressWinston.logger({
          transports: [new winston.transports.Console()],
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json()
          ),
          meta: true,
          msg: "HTTP {{req.method}} {{req.url}}",
          expressFormat: true,
          colorize: false,
          // eslint-disable-next-line no-unused-vars
          ignoreRoute: function (req, res) {
            return false;
          },
        })
      );

      app.get("/", async (req, res) => {
        // eslint-disable-next-line no-undef
        res.sendFile(path.join(__dirname, "./index.html"));
      });

      // eslint-disable-next-line no-unused-vars
      app.get("/service-worker.js", async (req, res) => {});

      app.get("/healthcheck", async (req, res) => {
        // Import command from class path
        const commandClass = require("../../read/healthcheck.js");

        // Convert query paramters to array
        let parameters = this.getParameters(req);

        // Execute command
        var result = await commandClass.run(parameters);

        // Send response
        for (var key in result) {
          if (result[key] === "FAIL") {
            res.status(500).json(result);
            return;
          }
        }
        res.status(200).json(result);
      });

      app.all("/export", async (req, res) => {
        // Import command from class path
        const commandClass = require("../../data/export.js");

        // Convert query paramters to array
        let parameters = this.getParameters(req);

        try {
          // Execute command
          var result = await commandClass.run(parameters);

          // Send response
          for (var key in result) {
            if (result[key] === "FAIL") {
              res.status(500).json(result);
              return;
            }
          }
          res.status(200).json(result);
        } catch (error) {
          if (error.code === "MODULE_NOT_FOUND") {
            // 404 error
            res.status(404).json(["Not found"]);
          } else if (error.toString().includes("Missing required flag")) {
            // Flag error
            res
              .status(400)
              .json([
                `Missing required flag: ${error.flag.name} (${error.flag.description})`,
              ]);
          } else if (error.toString().includes("Unexpected arguments")) {
            // Unexpected arguments error
            res.status(400).json([
              `Unexpected arguments: ${error.args
                .filter((n) => n)
                .toString()
                .replaceAll("--", "")}`,
            ]);
          } else {
            res.status(400).json([error.toString().replace(/[eE]rror:\s/, "")]);
          }
        }
      });

      app.all("/import", async (req, res) => {
        // Import command from class path
        const commandClass = require("../../data/import.js");

        // Convert query paramters to array
        let parameters = this.getParameters(req);

        try {
          // Execute command
          var result = await commandClass.run(parameters);

          // Send response
          for (var key in result) {
            if (result[key] === "FAIL") {
              res.status(500).json(result);
              return;
            }
          }
          res.status(200).json(result);
        } catch (error) {
          if (error.code === "MODULE_NOT_FOUND") {
            // 404 error
            res.status(404).json(["Not found"]);
          } else if (error.toString().includes("Missing required flag")) {
            // Flag error
            res
              .status(400)
              .json([
                `Missing required flag: ${error.flag.name} (${error.flag.description})`,
              ]);
          } else if (error.toString().includes("Unexpected arguments")) {
            // Unexpected arguments error
            res.status(400).json([
              `Unexpected arguments: ${error.args
                .filter((n) => n)
                .toString()
                .replaceAll("--", "")}`,
            ]);
          } else {
            res.status(400).json([error.toString().replace(/[eE]rror:\s/, "")]);
          }
        }
      });

      app.all("/*", async (req, res) => {
        try {
          // Generate class path from route
          var classPath = req.path.replace(/\/$/gm, "").slice(1);

          // For root paths, translate to oclif index.js path
          if (classPath in routeTranslationDict) {
            classPath = routeTranslationDict[classPath];
          }

          // Import command from class path
          const commandClass = require(`../../${
            methodDict[req.method]
          }/${classPath}.js`);

          // Convert query paramters to array
          let parameters = this.getParameters(req);

          // Execute command
          res.status(200).json(await commandClass.run(parameters));
        } catch (error) {
          if (error.code === "MODULE_NOT_FOUND") {
            // 404 error
            res.status(404).json(["Not found"]);
          } else if (error.toString().includes("Missing required flag")) {
            // Flag error
            res
              .status(400)
              .json([
                `Missing required flag: ${error.flag.name} (${error.flag.description})`,
              ]);
          } else if (error.toString().includes("Unexpected arguments")) {
            // Unexpected arguments error
            res.status(400).json([
              `Unexpected arguments: ${error.args
                .filter((n) => n)
                .toString()
                .replaceAll("--", "")}`,
            ]);
          } else {
            res.status(400).json([error.toString().replace(/[eE]rror:\s/, "")]);
          }
        }
      });

      // Added to prevent oclif command from timing out after 10 seconds
      await new Promise((resolve) => {
        app.listen(port, () => {
          console.log(`Echelon server running at http://localhost:${port}`);
        });
      });
    } catch (error) {
      return this.log(error.toString(), "error", flags);
    }
  }
}

CustomCommand.description =
  "start a Echelon API server that wraps the Echelon CLI";

CustomCommand.flags = {
  port: Flags.string({
    description: "API port",
    default: "3000",
  }),
};

module.exports = CustomCommand;

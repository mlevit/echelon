const { Command, Flags } = require("@oclif/core");
const knex = require("../../../../knex.js");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const runId = flags.id;
    const api = flags.api;

    var runBeforeResult = await knex
      .select("*")
      .from("flow")
      .where("run_id", runId)
      .andWhere("label", "technical_reconciliation_variance");

    if (runBeforeResult.length == 0) {
      try {
        var formulaResult = await knex
          .select("constraint_technical_reconciliation_formula.formula")
          .from("run")
          .join("job", "run.job_id", "job.job_id")
          .join(
            "constraint_technical_reconciliation_formula",
            "job.type",
            "constraint_technical_reconciliation_formula.value"
          )
          .where("run_id", runId);
      } catch (error) {
        this.error(error);
      }

      if (formulaResult.length > 0) {
        var formula = formulaResult[0]["formula"];

        // Get run flow metrics
        try {
          var flowResult = await knex
            .select("label", "count")
            .from("flow")
            .where("run_id", runId);
        } catch (error) {
          this.error(error);
        }

        // Replace placeholders with counts
        for (var flowRow of flowResult) {
          formula = formula.replace(`{${flowRow["label"]}}`, flowRow["count"]);
        }

        // Insert technical reconciliation variance
        try {
          var reconciliationResult = await knex
            .insert({
              run_id: runId,
              job: "echelon cli",
              function: "create:job:run:reconciliation",
              label: "technical_reconciliation_variance",
              count: eval(formula),
            })
            .returning("*")
            .into("flow");

          if (api) {
            return reconciliationResult;
          } else {
            this.log(JSON.stringify(reconciliationResult, null, 2));
          }
        } catch (error) {
          this.error(error);
        }
      } else {
        this.error(
          `Technical reconciliation formula not found for run ${runId}.`
        );
      }
    } else {
      this.error(`Technical reconciliation already run for run ${runId}.`);
    }
  }
}

CustomCommand.description =
  "perform technical reconciliation for an instance of a job (run)";

CustomCommand.flags = {
  id: Flags.string({
    description: "run ID",
    required: true,
  }),
  api: Flags.boolean({
    description: "(flag) is API result expected",
    hidden: true,
  }),
};

module.exports = CustomCommand;

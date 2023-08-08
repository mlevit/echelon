const { Command, Flags } = require("@oclif/core");
const knex = require("../../../../knex.js");

class CustomCommand extends Command {
  async run() {
    const { flags } = await this.parse(CustomCommand);
    const processAuditId = flags.id;
    const api = flags.api;

    var runBeforeResult = await knex
      .select("*")
      .from("flow")
      .where("process_audit_id", processAuditId)
      .andWhere("label", "technical_reconciliation_variance");

    if (runBeforeResult.length == 0) {
      try {
        var formulaResult = await knex
          .select("constraint_technical_reconciliation_formula.formula")
          .from("process_audit")
          .join("process", "process_audit.process_id", "process.process_id")
          .join(
            "constraint_technical_reconciliation_formula",
            "process.type",
            "constraint_technical_reconciliation_formula.value"
          )
          .where("process_audit_id", processAuditId);
      } catch (error) {
        this.error(error);
      }

      if (formulaResult.length > 0) {
        var formula = formulaResult[0]["formula"];

        // Get process audit flow metrics
        try {
          var flowResult = await knex
            .select("label", "count")
            .from("flow")
            .where("process_audit_id", processAuditId);
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
              process_audit_id: processAuditId,
              job: "echelon cli",
              function: "create:process:audit:reconciliation",
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
          `Technical reconciliation formula not found for process audit ${processAuditId}.`
        );
      }
    } else {
      this.error(
        `Technical reconciliation already run for process audit ${processAuditId}.`
      );
    }
  }
}

CustomCommand.description =
  "perform technical reconciliation for an instance of a process (process audit)";

CustomCommand.flags = {
  id: Flags.string({
    description: "process audit ID",
    required: true,
  }),
  api: Flags.boolean({
    description: "(flag) is API result expected",
    hidden: true,
  }),
};

module.exports = CustomCommand;

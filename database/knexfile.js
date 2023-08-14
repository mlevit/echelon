require("dotenv").config({ path: __dirname + "/.env" });

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.KNEX_HOST,
      database: process.env.KNEX_DATABASE,
      user: process.env.KNEX_USER,
      password: process.env.KNEX_PASSWORD,
    },
    pool: { min: 0, max: 20 },
    migrations: {
      tableName: "knex_migration",
      directory: [
        "./migrations/table/audit",
        "./migrations/table/constraint",
        "./migrations/table/technical",
        "./migrations/table/operational",
      ],
      sortDirsSeparately: true,
    },
  },
};

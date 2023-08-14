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
    pool: { min: 0, max: 5, idleTimeoutMillis: 250 },
  },
};

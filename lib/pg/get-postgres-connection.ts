import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import { Logger } from "@lib/logger";

const logger = new Logger("get-postgres-connection");

export async function getPostgresConnection() {
  logger.log("connecting to", process.env.POSTGRES_HOST);
  const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: "year-week-day",
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: 5432,
    ssl: true,
    clientMinMessages: "notice",
  });

  await sequelize.authenticate();
  console.log("Connected to database");
  return sequelize;
}

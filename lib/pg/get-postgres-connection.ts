import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import { Logger } from "@lib/logger";
import * as fs from "node:fs";
import { findUp } from "find-up";
import { User } from "@lib/db/user-model.ts";
import { Event } from "@lib/db/event-model.ts";

const logger = new Logger("get-postgres-connection");

let sequelize: Sequelize;

export async function getPostgresConnection() {
  if (sequelize) {
    return sequelize;
  }
  logger.log("connecting to", process.env.POSTGRES_HOST);

  sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: "year_week_day",
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: 5432,
    clientMinMessages: "notice",
    ssl: {
      rejectUnauthorized: true,
      ca: fs
        .readFileSync(await findUp(process.env.POSTGRES_GLOBAL_BUNDLE))
        .toString(),
    },
    models: [User, Event],
  });

  await sequelize.authenticate();
  logger.log("Connected to database");

  // User.init(
  //   {
  //     id: {
  //       type: DataTypes.UUID,
  //       defaultValue: Sequelize.UUIDV4, // Automatically generates a UUIDv4 value
  //       primaryKey: true,
  //     },
  //   },
  //   { sequelize },
  // );

  return sequelize;
}

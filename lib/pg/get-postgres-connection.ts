import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import { Logger } from "@lib/logger";
import { User } from "@lib/db/user-model.ts";
import { Event } from "@lib/db/event-model.ts";
import { globalBundle } from "@lib/pg/global-bundle.ts";

const logger = new Logger("get-postgres-connection");

let sequelize: Sequelize;

export async function getPostgresConnection() {
  if (sequelize) {
    return sequelize;
  }
  logger.log("connecting to", process.env.POSTGRES_HOST);

  // const globalBundle = fs.readFileSync(await findUp('global-bundle.pem')).toString()
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
      ca: globalBundle,
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

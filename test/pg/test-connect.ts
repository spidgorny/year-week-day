import { runTest } from "@/test/bootstrap";
import { Logger } from "@lib/logger";
import { getPostgresConnection } from "@lib/pg/get-postgres-connection";

const logger = new Logger("test-connect");

void runTest(async () => {
  const sequelize = await getPostgresConnection();
  await sequelize.sync();
  logger.log(
    "tables",
    await sequelize.query(
      "SELECT tablename\n" +
        "FROM pg_catalog.pg_tables\n" +
        "WHERE schemaname NOT IN ('pg_catalog', 'information_schema');",
    ),
  );
  await sequelize.close();
});

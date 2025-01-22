import { runTest } from "@/test/bootstrap";
import { Logger } from "@lib/logger";
import { getPostgresConnection } from "@lib/pg/get-postgres-connection";

const logger = new Logger("test-connect");

void runTest(async () => {
  const sequelize = await getPostgresConnection();
  logger.log(sequelize);
  await sequelize.close();
});

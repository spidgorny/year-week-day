import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { findUp } from "find-up";
import chalk from "chalk";
import { Logger } from "@lib/logger.ts";

const logger = new Logger("bootstrap");

export async function runTest(code: () => any) {
  logger.log("Running", process.uptime());
  try {
    const envFile = await findUp(".env");
    logger.log("envFile", envFile);
    const myEnv = dotenv.config({ path: `${envFile}`, override: true });
    dotenvExpand.expand(myEnv);
    const output = await code();
    if (output) {
      logger.log({ output });
    }
  } catch (e) {
    logger.error(chalk.red("ERROR IN TEST"), e);
    console.error(e);
  }
  logger.log("Done", process.uptime());
  setTimeout(() => process.exit(), 1000);
}

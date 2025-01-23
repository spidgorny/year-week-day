import { runTest } from "@/test/bootstrap";
import { Logger } from "@lib/logger";
import { getPostgresConnection } from "@lib/pg/get-postgres-connection";
import { User } from "@lib/db/user-model.ts";
import { Event } from "@lib/db/event-model.ts";

const logger = new Logger("test-seed");

void runTest(async () => {
  const sequelize = await getPostgresConnection();
  let [slawa] = await User.findOrCreate({
    where: {
      id: "98a9f0a6-7819-467d-9932-3ebc6692780b",
    },
    defaults: {
      name: "slawa",
      email: "spidgorny@gmail.com",
    },
  });
  logger.log(slawa.dataValues);

  let events = await Event.findAll({
    where: {
      $idUser$: slawa.id,
    },
  });
  if (!events.length) {
    const [event] = await Event.create({
      idUser: slawa.id,
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-02-13"),
      name: "unknown event #1254",
    });
    let events = await Event.findAll({
      where: {
        $idUser$: slawa.id,
      },
    });
  }
  logger.log(events.map((x) => x.dataValues));
  await sequelize.close();
});

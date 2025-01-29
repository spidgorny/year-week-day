import {getPostgresConnection} from "@lib/pg/get-postgres-connection.ts";
import {User} from "@lib/db/user-model.ts";
import {Event} from "@lib/db/event-model.ts";

export class Repository {
  protected constructor(protected userId: string) {}

  static async init(userId: string) {
    await getPostgresConnection();
    return new Repository(userId);
  }

  async getUser() {
    return await User.findByPk(this.userId);
  }

  async fetchEvents() {
    return await Event.findAll({
      where: {
        $idUser$: this.userId,
      },
    });
  }

  async findEventById(id: string) {
    return await Event.findByPk(id);

  }
}

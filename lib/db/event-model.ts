import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  sql,
} from "@sequelize/core";
import {
  Attribute,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";

@Table({ modelName: "Events" })
export class Event extends Model<
  InferAttributes<Event>,
  InferCreationAttributes<Event>
> {
  @Attribute({ type: DataTypes.UUID, defaultValue: sql.uuidV4 })
  @PrimaryKey
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.UUID)
  @NotNull
  declare idUser: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.DATEONLY)
  @NotNull
  declare startDate: Date;

  @Attribute(DataTypes.DATEONLY)
  @NotNull
  declare endDate: Date;
}

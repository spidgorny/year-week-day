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
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";

@Table({ modelName: "Users" })
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @Attribute({ type: DataTypes.UUID, defaultValue: sql.uuidV4 })
  @PrimaryKey
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  declare name: string;

  @Attribute(DataTypes.STRING)
  declare email: string;
}

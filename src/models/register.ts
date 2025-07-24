import { DataTypes, Model, Sequelize } from 'sequelize';
import { IRegister } from './interfaces/iRegister';

export class Register extends Model<IRegister> implements IRegister {
  public id!: string;
  public firstname!: string;
  public active!: boolean;
}

export const initRegisterModel = (sequelize: Sequelize) => {
  Register.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Register',
      tableName: 'register',
      timestamps: false 
    }
  );
};

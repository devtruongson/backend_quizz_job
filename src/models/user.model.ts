import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '~/configs/db.config';

export interface UserAttributes {
    id: number;
    email: string;
    password: string;
    role: 'user' | 'admin';
}

export interface UserCreationAttributes
    extends Optional<UserAttributes, 'id' | 'role'> {}

export default class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    public id!: number;
    public email!: string;
    public password!: string;
    public role!: 'user' | 'admin';
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            allowNull: false,
            defaultValue: 'user',
        },
    },
    {
        tableName: 'users',
        sequelize,
    },
);

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '~/configs/db.config';
import User from './user.model';

export interface UserExamAttributes {
    id: number;
    userId: number;
    list?: string;
}

export interface UserExamCreationAttributes
    extends Optional<UserExamAttributes, 'id' | 'list'> {}

export default class UserExam
    extends Model<UserExamAttributes, UserExamCreationAttributes>
    implements UserExamAttributes
{
    public id!: number;
    public userId!: number;
    public list?: string;
}

UserExam.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        list: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
    },
    {
        tableName: 'user_exam',
        sequelize,
    },
);

User.hasMany(UserExam, { foreignKey: 'userId' });
UserExam.belongsTo(User, { foreignKey: 'userId' });

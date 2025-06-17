import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '~/configs/db.config';
import User from './user.model';
import Vocabulaire from './vocabulaire.model';

export interface UserVocabulaireAttributes {
    id: number;
    userId: number;
    vocabulaireId: number;
    status: 'start' | 'doing' | 'completed';
    percentComplete?: number;
    vocabulaireQuestionListId?: string;
}

export interface UserVocabulaireCreationAttributes
    extends Optional<UserVocabulaireAttributes, 'id' | 'percentComplete' | 'vocabulaireQuestionListId'> {}

export default class UserVocabulaire
    extends Model<UserVocabulaireAttributes, UserVocabulaireCreationAttributes>
    implements UserVocabulaireAttributes
{
    public id!: number;
    public userId!: number;
    public vocabulaireId!: number;
    public status!: 'start' | 'doing' | 'completed';
    public percentComplete?: number;
    public vocabulaireQuestionListId?: string;
}

UserVocabulaire.init(
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
        vocabulaireId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('start', 'doing', 'completed'),
            allowNull: false,
            defaultValue: 'start',
        },
        percentComplete: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        vocabulaireQuestionListId: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
    },
    {
        tableName: 'user_vocabulaire',
        sequelize,
    },
);

User.hasMany(UserVocabulaire, { foreignKey: 'userId' });
UserVocabulaire.belongsTo(User, { foreignKey: 'userId' });
Vocabulaire.hasMany(UserVocabulaire, { foreignKey: 'vocabulaireId' });
UserVocabulaire.belongsTo(Vocabulaire, { foreignKey: 'vocabulaireId' });

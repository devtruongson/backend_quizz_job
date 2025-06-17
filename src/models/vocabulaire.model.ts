import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '~/configs/db.config';
import Topic from './topic.model';

export interface VocabulaireAttributes {
    id: number;
    topicId: number;
}

export type VocabulaireCreationAttributes = Optional<VocabulaireAttributes, 'id'>;

export default class Vocabulaire
    extends Model<VocabulaireAttributes, VocabulaireCreationAttributes>
    implements VocabulaireAttributes
{
    id!: number;
    topicId!: number;
}

Vocabulaire.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        topicId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        tableName: 'vocabulaire',
        sequelize,
    },
);

Topic.hasMany(Vocabulaire, { foreignKey: 'topicId' });
Vocabulaire.belongsTo(Topic, { foreignKey: 'topicId' });

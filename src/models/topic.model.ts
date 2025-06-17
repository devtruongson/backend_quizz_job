import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '~/configs/db.config';

export interface TopicAttributes {
    id: number;
    title: string;
    description?: string;
}

export type TopicCreationAttributes = Optional<TopicAttributes, 'id' | 'description'>;

export default class Topic extends Model<TopicAttributes, TopicCreationAttributes> implements TopicAttributes {
    id!: number;
    title!: string;
    description?: string;
}

Topic.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'topics',
        sequelize,
    },
);

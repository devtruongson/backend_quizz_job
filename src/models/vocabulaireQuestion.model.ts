import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '~/configs/db.config';
import Vocabulaire from './vocabulaire.model';

export interface VocabulaireQuestionAttributes {
    id: number;
    audio_vi?: string;
    audio_en?: string;
    image?: string;
    title_vi?: string;
    title_en?: string;
    description_vi?: string;
    description_en?: string;
    vocabulaireId: number;
}

export type VocabulaireQuestionCreationAttributes = Optional<VocabulaireQuestionAttributes, 'id'>;

export default class VocabulaireQuestion
    extends Model<VocabulaireQuestionAttributes, VocabulaireQuestionCreationAttributes>
    implements VocabulaireQuestionAttributes
{
    public id!: number;
    public audio_vi?: string;
    public audio_en?: string;
    public image?: string;
    public title_vi?: string;
    public title_en?: string;
    public description_vi?: string;
    public description_en?: string;
    public vocabulaireId!: number;
}

VocabulaireQuestion.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        audio_vi: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        audio_en: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        title_vi: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        title_en: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description_vi: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        description_en: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        vocabulaireId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        tableName: 'vocabulaire_questions',
        sequelize,
    },
);

Vocabulaire.hasMany(VocabulaireQuestion, { foreignKey: 'vocabulaireId' });
VocabulaireQuestion.belongsTo(Vocabulaire, { foreignKey: 'vocabulaireId' });

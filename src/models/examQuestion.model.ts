import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '~/configs/db.config';
import VocabulaireQuestion from './vocabulaireQuestion.model';

export interface ExamQuestionAttributes {
    id: number;
    vocabulaireQuestionId: number;
    answer?: string;
    isCorrect?: boolean;
}

export type ExamQuestionCreationAttributes = Optional<ExamQuestionAttributes, 'id' | 'answer' | 'isCorrect'>;

export default class ExamQuestion
    extends Model<ExamQuestionAttributes, ExamQuestionCreationAttributes>
    implements ExamQuestionAttributes
{
    id!: number;
    vocabulaireQuestionId!: number;
    answer?: string;
    isCorrect?: boolean;
}

ExamQuestion.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        vocabulaireQuestionId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isCorrect: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    },
    {
        tableName: 'exam_question',
        sequelize,
    },
);

VocabulaireQuestion.hasMany(ExamQuestion, { foreignKey: 'vocabulaireQuestionId' });
ExamQuestion.belongsTo(VocabulaireQuestion, { foreignKey: 'vocabulaireQuestionId' });

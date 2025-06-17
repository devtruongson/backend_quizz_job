import User from './user.model';
import Topic from './topic.model';
import Vocabulaire from './vocabulaire.model';
import VocabulaireQuestion from './vocabulaireQuestion.model';
import UserVocabulaire from './userVocabulaire.model';
import UserExam from './userExam.model';
import ExamQuestion from './examQuestion.model';

export default function initModels() {
    // Models are imported to ensure associations are created
    return {
        User,
        Topic,
        Vocabulaire,
        VocabulaireQuestion,
        UserVocabulaire,
        UserExam,
        ExamQuestion,
    };
}

export {
    User,
    Topic,
    Vocabulaire,
    VocabulaireQuestion,
    UserVocabulaire,
    UserExam,
    ExamQuestion,
};

import ExamQuestion from './examQuestion.model';
import Topic from './topic.model';
import User from './user.model';
import UserExam from './userExam.model';
import UserVocabulaire from './userVocabulaire.model';
import Vocabulaire from './vocabulaire.model';
import VocabulaireQuestion from './vocabulaireQuestion.model';

export default function initModels() {
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

export { ExamQuestion, Topic, User, UserExam, UserVocabulaire, Vocabulaire, VocabulaireQuestion };


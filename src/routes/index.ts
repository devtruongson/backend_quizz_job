import { Router } from 'express';
import userRoute from './user.route';
import topicRoute from './topic.route';
import vocabulaireRoute from './vocabulaire.route';
import vocabulaireQuestionRoute from './vocabulaireQuestion.route';
import userVocabulaireRoute from './userVocabulaire.route';
import userExamRoute from './userExam.route';
import examQuestionRoute from './examQuestion.route';

const router = Router();

router.use('/users', userRoute);
router.use('/topics', topicRoute);
router.use('/vocabulaires', vocabulaireRoute);
router.use('/vocabulaire-questions', vocabulaireQuestionRoute);
router.use('/user-vocabulaires', userVocabulaireRoute);
router.use('/user-exams', userExamRoute);
router.use('/exam-questions', examQuestionRoute);

export default router;

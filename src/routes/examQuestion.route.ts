import { Router } from 'express';
import {
    createExamQuestion,
    getExamQuestions,
    getExamQuestionById,
    updateExamQuestion,
    deleteExamQuestion,
} from '~/controllers/examQuestion.controller';

const router = Router();

router.post('/', createExamQuestion);
router.get('/', getExamQuestions);
router.get('/:id', getExamQuestionById);
router.put('/:id', updateExamQuestion);
router.delete('/:id', deleteExamQuestion);

export default router;

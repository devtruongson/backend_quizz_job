import { Router } from 'express';
import {
    createVocabulaireQuestion,
    getVocabulaireQuestions,
    getVocabulaireQuestionById,
    updateVocabulaireQuestion,
    deleteVocabulaireQuestion,
} from '~/controllers/vocabulaireQuestion.controller';

const router = Router();

router.post('/', createVocabulaireQuestion);
router.get('/', getVocabulaireQuestions);
router.get('/:id', getVocabulaireQuestionById);
router.put('/:id', updateVocabulaireQuestion);
router.delete('/:id', deleteVocabulaireQuestion);

export default router;

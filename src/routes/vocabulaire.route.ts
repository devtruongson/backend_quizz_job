import { Router } from 'express';
import {
    createVocabulaire,
    getVocabulaires,
    getVocabulaireById,
    updateVocabulaire,
    deleteVocabulaire,
} from '~/controllers/vocabulaire.controller';

const router = Router();

router.post('/', createVocabulaire);
router.get('/', getVocabulaires);
router.get('/:id', getVocabulaireById);
router.put('/:id', updateVocabulaire);
router.delete('/:id', deleteVocabulaire);

export default router;

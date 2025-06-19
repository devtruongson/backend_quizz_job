import { Router } from 'express';
import {
    createUserVocabulaire,
    getUserVocabulaires,
    getUserVocabulaireById,
    updateUserVocabulaire,
    deleteUserVocabulaire,
} from '~/controllers/userVocabulaire.controller';

const router = Router();

router.post('/', createUserVocabulaire as any);
router.get('/', getUserVocabulaires);
router.get('/:id', getUserVocabulaireById);
router.put('/:id', updateUserVocabulaire);
router.delete('/:id', deleteUserVocabulaire);

export default router;

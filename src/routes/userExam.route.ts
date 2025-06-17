import { Router } from 'express';
import {
    createUserExam,
    getUserExams,
    getUserExamById,
    updateUserExam,
    deleteUserExam,
} from '~/controllers/userExam.controller';

const router = Router();

router.post('/', createUserExam);
router.get('/', getUserExams);
router.get('/:id', getUserExamById);
router.put('/:id', updateUserExam);
router.delete('/:id', deleteUserExam);

export default router;

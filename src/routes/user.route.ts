/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    loginUser,
    registerUser,
    updateUser,
} from '~/controllers/user.controller';

const router = Router();

router.post('/', createUser as any);
router.get('/', getUsers);
router.post('/login', loginUser as any);
router.post('/register', registerUser as any);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;

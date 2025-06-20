import { Request, Response } from 'express';
import UserExam from '~/models/userExam.model';
import User from '~/models/user.model';

export async function createUserExam(req: Request, res: Response) {
    try {
        const { userId, list } = req.body;
        
        // Validate required fields
        if (!userId) {
            return res.status(400).json({ 
                error: 'userId is required' 
            });
        }

        // Check if user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(400).json({ 
                error: 'User not found with the provided userId' 
            });
        }

        const item = await UserExam.create(req.body);
        const result = await UserExam.findByPk(item.id, { include: { all: true, nested: true } });
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user exam' });
    }
}

export async function getUserExams(_req: Request, res: Response) {
    try {
        const items = await UserExam.findAll({ include: { all: true, nested: true } });
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user exams' });
    }
}

export async function getUserExamById(req: Request, res: Response) {
    try {
        const item = await UserExam.findByPk(req.params.id, { include: { all: true, nested: true } });
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ error: 'User exam not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user exam' });
    }
}

export async function updateUserExam(req: Request, res: Response) {
    try {
        const [updated] = await UserExam.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const item = await UserExam.findByPk(req.params.id, { include: { all: true, nested: true } });
            res.json(item);
        } else {
            res.status(404).json({ error: 'User exam not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user exam' });
    }
}

export async function deleteUserExam(req: Request, res: Response) {
    try {
        const deleted = await UserExam.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'User exam not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete user exam' });
    }
}

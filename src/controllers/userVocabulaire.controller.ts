import { Request, Response } from 'express';
import UserVocabulaire from '~/models/userVocabulaire.model';
import User from '~/models/user.model';
import Vocabulaire from '~/models/vocabulaire.model';

export async function createUserVocabulaire(req: Request, res: Response) {
    try {
        const { userId, vocabulaireId, status, percentComplete, vocabulaireQuestionListId } = req.body;
        
        // Validate required fields
        if (!userId || !vocabulaireId) {
            return res.status(400).json({ 
                error: 'userId and vocabulaireId are required' 
            });
        }

        // Check if user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(400).json({ 
                error: 'User not found with the provided userId' 
            });
        }

        // Check if vocabulaire exists
        const vocabulaire = await Vocabulaire.findByPk(vocabulaireId);
        if (!vocabulaire) {
            return res.status(400).json({ 
                error: 'Vocabulaire not found with the provided vocabulaireId' 
            });
        }

        // Validate status
        if (status && !['start', 'doing', 'completed'].includes(status)) {
            return res.status(400).json({ 
                error: 'Status must be one of: start, doing, completed' 
            });
        }

        const item = await UserVocabulaire.create(req.body);
        const result = await UserVocabulaire.findByPk(item.id, { include: { all: true, nested: true } });
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user vocabulaire' });
    }
}

export async function getUserVocabulaires(req: Request, res: Response) {
    try {
        const { userId } = req.query;
        console.log("userId", userId);
        
        let condition :any = {}

        if(userId) {
            condition = {
                where: {
                    userId: userId
                }
            }
        }
        
        const items = await UserVocabulaire.findAll({ 
            ...condition,
            include: { all: true, nested: true } 
        });
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user vocabulaires' });
    }
}

export async function getUserVocabulaireById(req: Request, res: Response) {
    try {
        const item = await UserVocabulaire.findByPk(req.params.id, { include: { all: true, nested: true } });
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ error: 'User vocabulaire not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user vocabulaire' });
    }
}

export async function updateUserVocabulaire(req: Request, res: Response) {
    try {
        const [updated] = await UserVocabulaire.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const item = await UserVocabulaire.findByPk(req.params.id, { include: { all: true, nested: true } });
            res.json(item);
        } else {
            res.status(404).json({ error: 'User vocabulaire not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user vocabulaire' });
    }
}

export async function deleteUserVocabulaire(req: Request, res: Response) {
    try {
        const deleted = await UserVocabulaire.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'User vocabulaire not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete user vocabulaire' });
    }
}

import { Request, Response } from 'express';
import UserVocabulaire from '~/models/userVocabulaire.model';

export async function createUserVocabulaire(req: Request, res: Response) {
    try {
        const item = await UserVocabulaire.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user vocabulaire' });
    }
}

export async function getUserVocabulaires(_req: Request, res: Response) {
    try {
        const items = await UserVocabulaire.findAll();
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user vocabulaires' });
    }
}

export async function getUserVocabulaireById(req: Request, res: Response) {
    try {
        const item = await UserVocabulaire.findByPk(req.params.id);
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
            const item = await UserVocabulaire.findByPk(req.params.id);
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

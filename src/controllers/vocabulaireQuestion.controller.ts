import { Request, Response } from 'express';
import VocabulaireQuestion from '~/models/vocabulaireQuestion.model';

export async function createVocabulaireQuestion(req: Request, res: Response) {
    try {
        const item = await VocabulaireQuestion.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create vocabulaire question' });
    }
}

export async function getVocabulaireQuestions(_req: Request, res: Response) {
    try {
        const items = await VocabulaireQuestion.findAll();
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch vocabulaire questions' });
    }
}

export async function getVocabulaireQuestionById(req: Request, res: Response) {
    try {
        const item = await VocabulaireQuestion.findByPk(req.params.id);
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ error: 'Vocabulaire question not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch vocabulaire question' });
    }
}

export async function updateVocabulaireQuestion(req: Request, res: Response) {
    try {
        const [updated] = await VocabulaireQuestion.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const item = await VocabulaireQuestion.findByPk(req.params.id);
            res.json(item);
        } else {
            res.status(404).json({ error: 'Vocabulaire question not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update vocabulaire question' });
    }
}

export async function deleteVocabulaireQuestion(req: Request, res: Response) {
    try {
        const deleted = await VocabulaireQuestion.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Vocabulaire question not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete vocabulaire question' });
    }
}

import { Request, Response } from 'express';
import VocabulaireQuestion from '~/models/vocabulaireQuestion.model';
import Vocabulaire from '~/models/vocabulaire.model';

export async function createVocabulaireQuestion(req: Request, res: Response) {
    try {
        const { vocabulaireId, title_vi, title_en } = req.body;
        
        // Validate required fields
        if (!vocabulaireId) {
            return res.status(400).json({ 
                error: 'vocabulaireId is required' 
            });
        }

        // Check if vocabulaire exists
        const vocabulaire = await Vocabulaire.findByPk(vocabulaireId);
        if (!vocabulaire) {
            return res.status(400).json({ 
                error: 'Vocabulaire not found with the provided vocabulaireId' 
            });
        }

        // Validate that at least one title is provided
        if (!title_vi && !title_en) {
            return res.status(400).json({ 
                error: 'At least one of title_vi or title_en is required' 
            });
        }

        const item = await VocabulaireQuestion.create(req.body);
        const result = await VocabulaireQuestion.findByPk(item.id, { include: { all: true, nested: true } });
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create vocabulaire question' });
    }
}

export async function getVocabulaireQuestions(_req: Request, res: Response) {
    try {
        const items = await VocabulaireQuestion.findAll({ include: { all: true, nested: true } });
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch vocabulaire questions' });
    }
}

export async function getVocabulaireQuestionById(req: Request, res: Response) {
    try {
        const item = await VocabulaireQuestion.findByPk(req.params.id, { include: { all: true, nested: true } });
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
            const item = await VocabulaireQuestion.findByPk(req.params.id, { include: { all: true, nested: true } });
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

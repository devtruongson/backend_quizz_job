import { Request, Response } from 'express';
import Vocabulaire from '~/models/vocabulaire.model';
import Topic from '~/models/topic.model';

export async function createVocabulaire(req: Request, res: Response) {
    try {
        const { topicId } = req.body;
        
        // Validate required fields
        if (!topicId) {
            return res.status(400).json({ 
                error: 'topicId is required' 
            });
        }

        // Check if topic exists
        const topic = await Topic.findByPk(topicId);
        if (!topic) {
            return res.status(400).json({ 
                error: 'Topic not found with the provided topicId' 
            });
        }

        const vocabulaire = await Vocabulaire.create(req.body);
        const result = await Vocabulaire.findByPk(vocabulaire.id, { include: { all: true, nested: true } });
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create vocabulaire' });
    }
}

export async function getVocabulaires(_req: Request, res: Response) {
    try {
        const data = await Vocabulaire.findAll({ include: { all: true, nested: true } });
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch vocabulaires' });
    }
}

export async function getVocabulaireById(req: Request, res: Response) {
    try {
        const vocabulaire = await Vocabulaire.findByPk(req.params.id, { include: { all: true, nested: true } });
        if (vocabulaire) {
            res.json(vocabulaire);
        } else {
            res.status(404).json({ error: 'Vocabulaire not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch vocabulaire' });
    }
}

export async function updateVocabulaire(req: Request, res: Response) {
    try {
        const [updated] = await Vocabulaire.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const vocabulaire = await Vocabulaire.findByPk(req.params.id, { include: { all: true, nested: true } });
            res.json(vocabulaire);
        } else {
            res.status(404).json({ error: 'Vocabulaire not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update vocabulaire' });
    }
}

export async function deleteVocabulaire(req: Request, res: Response) {
    try {
        const deleted = await Vocabulaire.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Vocabulaire not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete vocabulaire' });
    }
}

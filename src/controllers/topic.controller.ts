import { Request, Response } from 'express';
import Topic from '~/models/topic.model';

export async function createTopic(req: Request, res: Response) {
    try {
        const topic = await Topic.create(req.body);
        const result = await Topic.findByPk(topic.id, { include: { all: true, nested: true } });
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create topic' });
    }
}

export async function getTopics(_req: Request, res: Response) {
    try {
        const topics = await Topic.findAll({ include: { all: true, nested: true } });
        res.json(topics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch topics' });
    }
}

export async function getTopicById(req: Request, res: Response) {
    try {
        const topic = await Topic.findByPk(req.params.id, { include: { all: true, nested: true } });
        if (topic) {
            res.json(topic);
        } else {
            res.status(404).json({ error: 'Topic not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch topic' });
    }
}

export async function updateTopic(req: Request, res: Response) {
    try {
        const [updated] = await Topic.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const topic = await Topic.findByPk(req.params.id, { include: { all: true, nested: true } });
            res.json(topic);
        } else {
            res.status(404).json({ error: 'Topic not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update topic' });
    }
}

export async function deleteTopic(req: Request, res: Response) {
    try {
        const deleted = await Topic.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Topic not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete topic' });
    }
}

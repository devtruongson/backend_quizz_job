import { Request, Response } from 'express';
import ExamQuestion from '~/models/examQuestion.model';
import VocabulaireQuestion from '~/models/vocabulaireQuestion.model';

export async function createExamQuestion(req: Request, res: Response) {
    try {
        const { vocabulaireQuestionId, answer, isCorrect } = req.body;
        
        // Validate required fields
        if (!vocabulaireQuestionId) {
            return res.status(400).json({ 
                error: 'vocabulaireQuestionId is required' 
            });
        }

        // Check if vocabulaire question exists
        const vocabulaireQuestion = await VocabulaireQuestion.findByPk(vocabulaireQuestionId);
        if (!vocabulaireQuestion) {
            return res.status(400).json({ 
                error: 'Vocabulaire question not found with the provided vocabulaireQuestionId' 
            });
        }

        // Validate answer
        if (!answer) {
            return res.status(400).json({ 
                error: 'answer is required' 
            });
        }

        const item = await ExamQuestion.create(req.body);
        const result = await ExamQuestion.findByPk(item.id, { include: { all: true, nested: true } });
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create exam question' });
    }
}

export async function getExamQuestions(_req: Request, res: Response) {
    try {
        const items = await ExamQuestion.findAll({ include: { all: true, nested: true } });
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch exam questions' });
    }
}

export async function getExamQuestionById(req: Request, res: Response) {
    try {
        const item = await ExamQuestion.findByPk(req.params.id, { include: { all: true, nested: true } });
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ error: 'Exam question not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch exam question' });
    }
}

export async function updateExamQuestion(req: Request, res: Response) {
    try {
        const [updated] = await ExamQuestion.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const item = await ExamQuestion.findByPk(req.params.id, { include: { all: true, nested: true } });
            res.json(item);
        } else {
            res.status(404).json({ error: 'Exam question not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update exam question' });
    }
}

export async function deleteExamQuestion(req: Request, res: Response) {
    try {
        const deleted = await ExamQuestion.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Exam question not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete exam question' });
    }
}

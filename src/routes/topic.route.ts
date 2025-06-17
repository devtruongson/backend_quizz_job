import { Router } from 'express';
import { createTopic, getTopics, getTopicById, updateTopic, deleteTopic } from '~/controllers/topic.controller';

const router = Router();

router.post('/', createTopic);
router.get('/', getTopics);
router.get('/:id', getTopicById);
router.put('/:id', updateTopic);
router.delete('/:id', deleteTopic);

export default router;

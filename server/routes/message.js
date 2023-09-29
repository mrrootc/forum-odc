import express from 'express';
import { createMessage, readAllMessage, readMessageById, updateMessage, deleteMessage } from '../controllers/message.js';
import protect from '../middlewares/protect.js';

const router = express.Router();

router.post('/',protect, createMessage);
router.get('/', readAllMessage);
router.get('/:id', readMessageById);
router.put('/id',protect, updateMessage);
router.delete('/:id',protect, deleteMessage);

export default router;


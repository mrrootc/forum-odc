import express from 'express';
import { createMessage, readAllMessage, readMessageById, updateMessage, deleteMessage } from '../controllers/message.js';

const router = express.Router()

router.post('/', createMessage)
router.get('/', readAllMessage)
router.get('/:id', readMessageById)
router.put('/id', updateMessage)
router.delete('/:id', deleteMessage)

export default router
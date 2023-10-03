import express from 'express';
import { createMessage, readAllMessage, updateMessage, deleteMessage, getMessageByIdCat } from '../controllers/message.js';
import protect from '../middlewares/protect.js';

const router = express.Router();

router.post('/create',protect, createMessage);
router.get('/', readAllMessage);
router.get('/:idcat', getMessageByIdCat);
router.put('/id',protect, updateMessage);
router.delete('/:id',protect, deleteMessage);

export default router;


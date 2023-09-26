import express from 'express';
import { createSubject, deleteSuject } from '../controllers/subject.js';
import protect from '../middlewares/protect.js';

const router = express.Router();

router.post('/',protect, createSubject);
router.delete('/:id',protect, deleteSuject);

export default router;
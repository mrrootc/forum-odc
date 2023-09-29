import express from 'express';
import { createSubject, deleteSuject, getAllSubjects } from '../controllers/subject.js';
import protect from '../middlewares/protect.js';

const router = express.Router();

router.post('/',protect, createSubject);
router.get('/', getAllSubjects)
router.delete('/:id',protect, deleteSuject);

export default router;
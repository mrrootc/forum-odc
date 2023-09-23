import express from 'express';
import { createSubject, deleteSuject } from '../controllers/subject.js';

const router = express.Router()

router.post('/', createSubject)
router.delete('/:id', deleteSuject)

export default router
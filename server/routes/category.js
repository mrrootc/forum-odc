import express  from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, getCategoryBySubjectId } from "../controllers/category.js";
import protect from "../middlewares/protect.js";


const router = express.Router();

router.post('/', protect, createCategory);
router.get('/:id', protect, getCategoryById);
router.get('/subject/:id',protect, getCategoryBySubjectId);
router.delete('/:id',protect, deleteCategory);
router.get('/', protect, getAllCategories)

export default router;

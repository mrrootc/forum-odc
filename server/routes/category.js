import express  from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById } from "../controllers/category";
import protect from "../middlewares/protect";


const router = express.Router();

router.post('/', protect, createCategory);
router.get('/:id', protect, getCategoryById);
router.get('/all',protect, getAllCategories);
router.delete('/:id',protect, deleteCategory);

export default router;

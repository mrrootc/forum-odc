import  express  from "express";
import { deleteUser, getAllUsers, login, register, updateUser, validation } from "../controllers/auth.js";
import protect from '../middlewares/protect.js'
const router = express.Router()

router.post('/signin', login);
router.post('/signup', register);
router.get('/',protect, getAllUsers);
router.put('/:id',protect, updateUser);
router.delete('/:id',protect, deleteUser);
router.patch('/validation', validation);

export default router;
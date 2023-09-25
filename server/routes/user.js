import  express  from "express";
import { deleteUser, getAllUsers, login, register, updateUser, validation } from "../controllers/auth.js";

const router = express.Router()

router.post('/signin', login)
router.post('/signup', register)
router.get('/', getAllUsers)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.post('/validation', validation)

export default router
import { Router } from "express";
import { createMockUser, getUser, loginUser } from "../controllers/userController";

const router = Router();

router.get('/:idToken', getUser);
router.post('/createMockUser', createMockUser);
router.get('/login/:idToken', loginUser)

export default router;
import { Router } from "express";
import { createRegister, deleteRegister, getAllRegisters, getRegister, updateRegister } from "../controllers/registerController";

const router = Router();

router.get('/', getAllRegisters);
router.get('/:id', getRegister);
router.put('/update', updateRegister);
router.post('/create', createRegister);
router.delete('/delete/:id', deleteRegister);

export default router;
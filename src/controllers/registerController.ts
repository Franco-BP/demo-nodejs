import { NextFunction, Request, Response } from "express"
import { IRegister } from "../models/interfaces/iRegister";
import { Register } from "../models/register";
import { createRegisterSchema, registerIdSchema, updateRegisterSchema } from "../lib/validations/registerSchema";

export const createRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validation = createRegisterSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({ message: validation.error })
            return;
        }

        const newRegister: Register = await Register.create({ firstname: validation.data.firstname, active: true });

        res.status(201).json({ message: "Successfull POST", register: newRegister });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export const getRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validation = registerIdSchema.safeParse(req.params.id);
        if (!validation.success) {
            res.status(400).json({ message: validation.error })
            return;
        }
        const searchId = validation.data;

        const register = await Register.findByPk(searchId);
        if (!register) {
            res.status(400).json({ message: "No Register found with that id." })
            return;
        };

        res.status(200).json({ message: "Successfull GET", register });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export const getAllRegisters = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const registers = await Register.findAll({ where: { active: true } });
        if (!registers || registers.length === 0) {
            res.status(400).json({ message: "None existing Registers." })
            return;
        };

        res.status(200).json({ message: "Successfull GET", registers });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export const updateRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validation = updateRegisterSchema.safeParse(req.params.id);
        if (!validation.success) {
            res.status(400).json({ message: validation.error })
            return;
        }
        
        const newRegister: IRegister = {...validation.data, active: validation.data.active || true};

        if (!newRegister || !newRegister.id) res.status(400).json({ message: "Missing body" });

        const register = await Register.findByPk(newRegister.id);
        if (!register) {
            res.status(400).json({ message: "No Register found with that id." })
            return;
        };

        register.firstname = newRegister.firstname;
        register.active = newRegister.active;
        await register.save();

        res.status(200).json({ message: "Successfull PUT", register });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export const deleteRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validation = registerIdSchema.safeParse(req.params.id);
        if (!validation.success) {
            res.status(400).json({ message: validation.error })
            return;
        }
        const searchId = validation.data;

        const register = await Register.findByPk(searchId);
        if (!register) {
            res.status(400).json({ message: "No Register found with that id." })
            return;
        };

        register.active = false;
        await register.save();

        res.status(200).json({ message: "Successfull DELETE" });
    } catch (err) {
        console.error(err);
        next(err);
    }
}
import { NextFunction, Request, Response } from "express"
import { IRegister, Registers } from "../models/register";

export const createRegister = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const id = Registers.length + 1;

        const newRegister: IRegister = { id: id.toString(), name, active: true };

        Registers.push(newRegister);

        res.status(201).json({ message: "Successfull POST", register: newRegister });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export const getRegister = (req: Request, res: Response, next: NextFunction) => {
    try {
        const searchId = req.params.id;

        const register = Registers.find((element: IRegister) => element.id == searchId);
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

export const getAllRegisters = (req: Request, res: Response, next: NextFunction) => {
    try {
        const registers = Registers;
        if (!registers) {
            res.status(500).json({ message: "Not an existing Registers array." })
            return;
        };

        res.status(200).json({ message: "Successfull GET", registers });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export const updateRegister = (req: Request, res: Response, next: NextFunction) => {
    try {
        const newRegister: IRegister = req.body;
        if (!newRegister) res.status(400).json({ message: "Missing body" });

        const index = Registers.findIndex((element: IRegister) => element.id === newRegister.id)
        if (index === -1) {
            res.status(400).json({ message: "No Register found with that id." })
            return;
        };

        Registers[index] = newRegister;

        res.status(200).json({ message: "Successfull PUT", register: newRegister });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export const deleteRegister = (req: Request, res: Response, next: NextFunction) => {
    try {
        const searchId = req.params.id;
        if (!searchId) {
            res.status(400).json({ message: "Missing id" })
            return;
        };

        const index = Registers.findIndex((element: IRegister) => element.id === searchId)
        if (index === -1) {
            res.status(400).json({ message: "No Register found with that id." })
            return;
        };

        Registers[index].active = false;

        res.status(200).json({ message: "Successfull DELETE", register: Registers[index] });
    } catch (err) {
        console.error(err);
        next(err);
    }
}
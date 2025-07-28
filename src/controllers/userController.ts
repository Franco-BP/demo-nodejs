import { NextFunction, Request, Response } from "express"
import admin from "../auth/admin";
import { getDecodedToken } from "../middlewares/validateUser";

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const decodedToken = await getDecodedToken(req);

        if (!decodedToken) {
            res.status(400).json({ error: 'Token missing' });
            return
        }

        res.status(200).json({
            message: 'Login successful',
            token: decodedToken
        });
    } catch (err) {
        console.error(err);
        next({ error: 'Invalid or expired token', status: 401 });
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const decodedToken = await getDecodedToken(req);

        if (!decodedToken) {
            res.status(400).json({ error: 'Token missing' });
            return
        }

        const user = await admin.auth().getUser(decodedToken.uid);

        res.status(200).json({
            message: 'Successfull GET',
            user: user
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}
import { NextFunction, Request, Response } from "express"
import admin from "../auth/admin";
import { getDecodedToken } from "../middlewares/validateUser";
import { createUserSchema } from "../lib/validations/userSchema";

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // This should be used when receiveng proper requests with the idToken attached.
        const idealDecodedToken = await getDecodedToken(req);

        // This is mocked to request it as a param
        const decodedToken = await admin.auth().verifyIdToken(req.params.idToken);

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
        // This should be used when receiveng proper requests with the idToken attached.
        const idealDecodedToken = await getDecodedToken(req);
        
        console.log("req.params.idToken");
        console.log(req.params.idToken);

        // This is mocked to request it as a param
        const decodedToken = await admin.auth().verifyIdToken(req.params.idToken);


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

export const createMockUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get isAdmin value from the request.
        const validation = createUserSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400).json({ message: validation.error })
            return;
        }

        const newUser = await admin.auth().createUser({
            email: 'test@example.com',
            password: 'test1234'
        });

        await admin.auth().setCustomUserClaims(newUser.uid, {
            isAdmin: validation.data.isAdmin,
        });

        const response = await fetch(
            'http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=fake-api-key',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: 'test@example.com',
                    password: 'test1234',
                    returnSecureToken: true,
                }),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Login failed: ${error.error.message}`);
        }

        const data = await response.json();
        const idToken = data.idToken;

        console.log('NEW ID Token:', idToken);

        res.status(200).json({
            message: 'Successfull Creation',
            idToken
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}
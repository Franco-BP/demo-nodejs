import { Request } from "express"
import admin from "../auth/admin";

// This function returns null if the token is missing or invalid.
export const getDecodedToken = async (req: Request) => {
    const idToken: string | undefined = req.body?.token;
    if (!idToken) return null;

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
}
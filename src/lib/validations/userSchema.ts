import z from "zod";

export const createUserSchema = z.object({
    isAdmin: z.boolean()
});
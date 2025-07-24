import z from "zod";

export const createRegisterSchema = z.object({
    firstname: z.string().min(4,"El nombre debe tener mínimo 4 caracteres.").max(30, "El nombre debe tener máximo 30 caracteres.")
});

export const updateRegisterSchema = z.object({
    id: z.string().length(36, "El id no es válido."),
    firstname: z.string().min(4,"El nombre debe tener mínimo 4 caracteres.").max(30, "El nombre debe tener máximo 30 caracteres."),
    active: z.boolean().optional()
});

export const registerIdSchema = z.string().length(36, "El id no es válido.");
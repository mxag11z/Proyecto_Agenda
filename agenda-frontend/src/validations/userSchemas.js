
//Hacemos validaciones usando zod, definimos esquemas para reutilizacion de validaciones
import { z } from "zod";

export const emailSchema = z
  .string()
  .email("Correo electrónico inválido");

export const passwordSchema = z
  .string()
  .min(6, "Debe tener al menos 6 caracteres")
  .max(32, "Máximo 32 caracteres");

export const registerSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellido: z.string().min(1, "El apellido es obligatorio"),
  email: emailSchema,
  password: passwordSchema,
});


export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const changePasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

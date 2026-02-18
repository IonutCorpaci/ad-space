import {z} from "zod";

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email обязателен"
    })
        .min(1, "Email обязателен")
        .email("Введите корректный email")
        .toLowerCase(),

    password: z.string()
        .min(8, "Минимум 8 символов")
})

export const registerSchema = z.object({
    name: z.string({
        required_error: "Имя обязательно"
    }),
    email: z.string({
        required_error: "Email обязателен"
    })
        .min(1, "Email обязателен")
        .email("Введите корректный email")
        .toLowerCase(),

    password: z.string()
        .min(8, "Минимум 8 символов")
        .regex(/[0-9]/, "Должна быть хотя бы одна цифра")
        .regex(/[a-z]/, "Должна быть хотя бы одна строчная буква")
        .regex(/[A-Z]/, "Должна быть хотя бы одна заглавная буква")
})
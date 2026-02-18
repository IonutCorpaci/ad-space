import {z} from "zod";

export const createEditSchema = z.object({
    title: z.string()
        .min(3, "Название должно иметь не меньше чем 3 букв")
        .max(50, "Название должно иметь не больше чем 50 букв"),

    description: z.string()
        .min(20, "Описание должно иметь не меньше чем 50 символов")
        .max(500, "Описание должно иметь не больше чем 500 символов"),

    category: z.string({
        required_error: "Выберите категорию"
    })
        .min(1, "Выберите категорию"),

    city: z.string({
        required_error: "Выберите город"
    })
        .min(1, "Выберите город"),


    price: z.string({
        required_error: "Введите цену"
    })
        .min(1, "Введите цену")
        .regex(/^[1-9]\d*$/, "Введите корректную цену (только цифры, без нуля в начале)")
        .transform((val) => parseInt(val, 10))
        .refine((val) => val > 0, "Цена должна быть больше 0"),

    images: z.array(z.any())
        .min(1, "Добавьте хотя бы одно фото")
        .max(5, "Максимум 5 фотографий"),
})
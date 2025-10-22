import * as yup from "yup";
export const leadSchema = yup.object({
  name: yup.string().required("Имя обязательно для заполнения").min(2).max(50)
    .matches(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, "Имя может содержать только буквы"),
  email: yup.string().required("Email обязателен для заполнения").email("Введите корректный email адрес"),
  phone: yup
    .string()
    .required("Телефон обязателен для заполнения")
    .min(4, "Телефон должен содержать минимум 4 цифры")
    .transform((v) => v.replace(/\D/g, "")),
});
export type LeadForm = yup.InferType<typeof leadSchema>;


import type { SettingsFormField } from "@/types/settingsTypes";
import type { User } from "@/types/usersTypes";

export const settingsFormFieldsCreator = (user: User): SettingsFormField[] => [
  {
    value: user?.user_name,
    name: "user_name",
    label: "Имя:",
    placeholder: "Введите имя",
    type: "text",
  },
  {
    value: user?.email,
    name: "email",
    label: "E-mail:",
    placeholder: "Введите почту",
    type: "email",
  },
  {
    value: user?.user_password,
    name: "user_password",
    label: "Пароль:",
    placeholder: "Введите пароль",
    type: "password",
  },
  {
    value: user?.daily_limit,
    name: "daily_limit",
    label: "Количество упражнений:",
    placeholder: "Выберите количество упражнений",
    type: "dailyLimit",
  },
];

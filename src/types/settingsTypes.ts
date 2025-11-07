export type SettingsFormField = {
  value?: string | number;
  name: string;
  label: string;
  placeholder: string;
  type: "text" | "email" | "password" | "dailyLimit";
};

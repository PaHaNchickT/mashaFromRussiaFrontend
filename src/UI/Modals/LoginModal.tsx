import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import { useState } from "react";
import z from "zod";

import { LOCAL_STORAGE_FIELD_NAME } from "@/constants/commonConstants";
import { useGetUsersQuery } from "@/store/slices/usersApi";

import { Modal } from "./Modal";
import Button from "../Buttons/Button";
import type { SimpleFormFields } from "../Forms/SimpleForm";
import { SimpleForm } from "../Forms/SimpleForm";

// TODO: Временное решение, пока нет авторизации

const schema = z.object({
  name: z.string().min(1, "Введите имя"),
});

const fields: SimpleFormFields[] = [
  {
    name: "name",
    label: "Имя",
    placeholder: "введите имя",
    type: "text",
  },
];

export const LoginModal = () => {
  const router = useRouter();
  const { data: users, isSuccess } = useGetUsersQuery(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setError] = useState(false);

  const handlerClick = (data: { name: string }) => {
    setError(false);
    if (!isSuccess || !window) return;

    const isUserExists = users.data.find(
      (item) => item.user_name === data.name
    );

    if (isUserExists) {
      localStorage.setItem(
        LOCAL_STORAGE_FIELD_NAME,
        JSON.stringify({
          id: isUserExists.user_id,
          name: isUserExists.user_name,
          dailyLimit: isUserExists.daily_limit,
        })
      );

      NProgress.start();
      router.push("home");
    } else {
      setError(true);
    }
  };

  const handlerOnClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        size="alternate"
        onClick={() => setIsModalOpen(true)}
        className="w-[211px]"
      >
        Уже есть аккаунт
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={handlerOnClose}
        wrapperPaddings="p-[50px]"
        wrapperGap="gap-[30px]"
      >
        <div className="flex flex-col gap-[5px]">
          <SimpleForm
            fields={fields}
            schema={schema}
            onSubmit={(data) =>
              handlerClick(data as unknown as { name: string })
            }
            submitLabel="Войти"
            formGap="gap-[25px]"
            inputsGap="gap-[17px]"
          />
          {isError && (
            <span className="text-red-500 text-sm self-center leading-[normal]">
              Пользователя с таким именем не существует
            </span>
          )}
        </div>
      </Modal>
    </>
  );
};

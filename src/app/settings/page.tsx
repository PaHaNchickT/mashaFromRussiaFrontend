"use client";

import { useEffect, useState } from "react";

import { SettingsContent } from "@/components/Settings/SettingsContent";
import { LOCAL_STORAGE_FIELD_NAME } from "@/constants/commonConstants";
import { Heading1 } from "@/UI/Text/Heading1";
import { Heading3 } from "@/UI/Text/Heading3";

// TODO: Временное решение, пока нет авторизации
const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem(LOCAL_STORAGE_FIELD_NAME);
    if (!userData) return;

    setUserId(JSON.parse(userData).id);
    setIsLoading(false);
  }, []);

  // TODO: Loader
  return (
    <section className="h-full w-full flex flex-col grow gap-[83px]">
      <Heading1 color="primary">Настройки.</Heading1>
      {isLoading ? (
        <p>Loading...</p>
      ) : userId ? (
        <SettingsContent userId={userId} />
      ) : (
        <div className="grow flex justify-center items-center">
          <Heading3>Упс, что-то пошло не так.</Heading3>
        </div>
      )}
    </section>
  );
};

export default SettingsPage;

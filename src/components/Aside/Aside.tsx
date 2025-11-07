"use client";

import { useEffect, useState } from "react";

import { HomeIcon } from "@/UI/Icons/HomeIcon";
import { OptionsIcon } from "@/UI/Icons/OptionsIcon";
import { PracticeIcon } from "@/UI/Icons/PracticeIcon";
import { VocabularyIcon } from "@/UI/Icons/VocabularyIcon";

import { AsideItem } from "./AsideItem";

export const Aside = () => {
  // TODO: Временное решение, пока нет авторизации
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled] = useState(false);

  useEffect(() => {
    // const userData = localStorage.getItem(LOCAL_STORAGE_FIELD_NAME);

    // if (!userData) setIsDisabled(true);
    setIsLoading(false);
  }, []);

  return (
    <aside className="font-anonymous box-border w-[108px] px-[41px] pt-[76px] pb-[59px] bg-[#D9D9D9] flex flex-col items-center justify-between relative">
      {isLoading ? (
        <div></div>
      ) : (
        <nav className="flex flex-col justify-between items-center text-base gap-[5px] w-[25px]">
          <AsideItem href="/home" innerText="Главная" isDisabled={isDisabled}>
            <HomeIcon />
          </AsideItem>
          <AsideItem
            href="/vocabulary"
            innerText="Контент"
            isDisabled={isDisabled}
          >
            <VocabularyIcon />
          </AsideItem>
          <AsideItem
            href="/practice"
            innerText="Практика"
            isDisabled={isDisabled}
          >
            <PracticeIcon />
          </AsideItem>
          <AsideItem
            href="/settings"
            innerText="Настройки"
            isDisabled={isDisabled}
          >
            <OptionsIcon />
          </AsideItem>
        </nav>
      )}
      <span className="transform rotate-270 inline-block absolute bottom-[198px] w-[240px] font-bold text-[25px]">
        Masha From Russia
      </span>
    </aside>
  );
};

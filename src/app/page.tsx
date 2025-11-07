"use client";

import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import { useEffect, useState } from "react";

import { WelcomePage } from "@/components/OnBoard/WelcomePage";
import { LOCAL_STORAGE_FIELD_NAME } from "@/constants/commonConstants";
import { useGetUsersQuery } from "@/store/slices/usersApi";

const HomePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // TODO: временное решение для авторизации
  const {
    data: users,
    isLoading: isUsersLoading,
    isSuccess,
  } = useGetUsersQuery(undefined);

  useEffect(() => {
    if (!isUsersLoading && window && isSuccess) {
      const userData = localStorage.getItem(LOCAL_STORAGE_FIELD_NAME);

      if (!userData) {
        setIsLoading(false);
        return;
      }

      const { id, dailyLimit, name } = JSON.parse(userData);
      const isUserExists = users.data.find(
        (item) => item.user_id === id && item.user_name === name
      );

      // temporary for localStorage clearing
      const isActualVar = id && name && dailyLimit;
      if (!id || !name || !dailyLimit) {
        console.warn("local storage is broken");
        localStorage.removeItem(LOCAL_STORAGE_FIELD_NAME);
      }

      if (isUserExists && isActualVar) {
        NProgress.start();
        router.push("home");
      } else {
        setIsLoading(false);
      }
    }
  }, [isUsersLoading, isSuccess]);
  // конец временного решения

  // TODO: Loader
  return (
    <section className="h-full w-full flex flex-col">
      {isLoading ? <p>Loading...</p> : <WelcomePage />}
    </section>
  );
};

export default HomePage;

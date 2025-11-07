"use client";

import { LOCAL_STORAGE_FIELD_NAME } from "@/constants/commonConstants";

export const prepareHeaders = async (headers: Headers) => {
  // Задел на будущее

  // let userId: string | undefined;

  // if (isServer) {
  //   // ---- SERVER (Next.js) ----
  //   // импортируем динамически, чтобы не тащить модуль на клиент
  //   const { cookies } = await import("next/headers");
  //   const cookieStore = cookies();
  //   userId = cookieStore.get("user-id")?.value;
  // } else {
  //   // ---- BROWSER ----
  //   const match = document.cookie.match(/(?:^|;\s*)user-id=([^;]*)/);
  //   userId = match?.[1];
  // }

  // if (userId) {
  //   headers.set("x-user-id", userId);
  // }

  // return headers;

  const userData = localStorage.getItem(LOCAL_STORAGE_FIELD_NAME);

  if (userData) {
    headers.set("x-user-id", JSON.parse(userData).id);
    headers.set("x-daily-limit", JSON.parse(userData).dailyLimit);
  }

  return headers;
};

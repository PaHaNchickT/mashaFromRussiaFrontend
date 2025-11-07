"use client";

import { useEffect, useState } from "react";

import { HomePageContent } from "@/components/Home/HomePageContent";
import { LOCAL_STORAGE_FIELD_NAME } from "@/constants/commonConstants";
import { useGetStatsQuery } from "@/store/slices/statsApi";
import { Heading3 } from "@/UI/Text/Heading3";

const HomePage = () => {
  const { data, isSuccess, isLoading } = useGetStatsQuery(undefined);
  const [name, setName] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem(LOCAL_STORAGE_FIELD_NAME);
    if (!userData) return;

    setName(JSON.parse(userData).name);
  }, []);

  // TODO: Loader
  return (
    <section className="h-full w-full flex flex-col">
      {isLoading ? (
        <p>Loading...</p>
      ) : isSuccess && name ? (
        <HomePageContent data={data} name={name} />
      ) : (
        <Heading3 className="text-center">Упс, что-то пошло не так.</Heading3>
      )}
    </section>
  );
};

export default HomePage;

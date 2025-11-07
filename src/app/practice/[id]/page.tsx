"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { useEffect } from "react";

import { PraxisItemContent } from "@/components/PraxisItem/PraxisItemContent";
import { useGetPraxisByIdQuery } from "@/store/slices/praxisApi";
import type { ErrorResponse } from "@/types/commonTypes";
import { Heading1 } from "@/UI/Text/Heading1";
import { Heading3 } from "@/UI/Text/Heading3";

const PraxisItemPage = () => {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isSuccess, error } = useGetPraxisByIdQuery(id);

  useEffect(() => {
    if (!error) return;

    const errorStatus = (error as ErrorResponse).status;

    if (errorStatus === 404) {
      notFound();
    } else {
      console.error(error);
    }
  }, [error]);

  // TODO: Loader
  return (
    <section className="h-full w-full flex flex-col self-start grow">
      {isLoading ? (
        <p>Loading...</p>
      ) : isSuccess ? (
        <>
          <Heading1 color="primary">{`${data.title}.`}</Heading1>
          <PraxisItemContent praxisData={data} />
        </>
      ) : (
        <div className="grow flex justify-center items-center">
          <Heading3>Упс, что-то пошло не так.</Heading3>
        </div>
      )}
    </section>
  );
};

export default PraxisItemPage;

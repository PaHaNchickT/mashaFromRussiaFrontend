"use client";

import { PraxisContent } from "@/components/Praxis/PraxisContent";
import { useGetPraxisQuery } from "@/store/slices/praxisApi";
import { Heading1 } from "@/UI/Text/Heading1";
import { Heading3 } from "@/UI/Text/Heading3";

const PraxisPage = () => {
  const { data, isSuccess, isLoading } = useGetPraxisQuery({
    limit: 999999,
    offset: 0,
  });

  // TODO: Loader
  return (
    <section className="h-full w-full flex flex-col self-start grow gap-[21px]">
      <Heading1 color="primary">Практика.</Heading1>
      {isLoading ? (
        <p>Loading...</p>
      ) : isSuccess ? (
        <PraxisContent praxisResponse={data} />
      ) : (
        <div className="grow flex justify-center items-center">
          <Heading3>Упс, что-то пошло не так.</Heading3>
        </div>
      )}
    </section>
  );
};

export default PraxisPage;

import { useEffect, useState } from "react";

import { useGetWordsPraxisQuery } from "@/store/slices/wordsApi";
import type { Praxis } from "@/types/praxisTypes";
import { Heading3 } from "@/UI/Text/Heading3";

import { PraxisVoc01Backets } from "./PraxisVoc01Backets/PraxisVoc01Backets";
import { SpeechContext } from "../Common/SpeechContext";

type PraxisItemContentProps = {
  praxisData: Praxis;
};

export const PraxisItemContent = ({ praxisData }: PraxisItemContentProps) => {
  const praxisId = praxisData.praxis_id;

  const { data, isLoading, isSuccess, error } = useGetWordsPraxisQuery({
    rules: praxisData.rules,
  });
  const [mounted, setMounted] = useState(true);

  const handlerRemounter = () => {
    setMounted(false);
    setTimeout(() => {
      setMounted(true);
    }, 500);
  };

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  // TODO: Loader
  return (
    <SpeechContext>
      {({ isSpeaking, speak }) => (
        <div className="flex flex-col justify-center grow items-center relative">
          {isLoading || !mounted ? (
            <p>Loading...</p>
          ) : isSuccess ? (
            (praxisId === "cards_en" || praxisId === "cards_ru") && (
              <PraxisVoc01Backets
                praxisData={praxisData}
                wordsData={data}
                handlerRemounter={handlerRemounter}
                isSpeaking={isSpeaking}
                speak={speak}
              />
            )
          ) : (
            <Heading3>Упс, что-то пошло не так.</Heading3>
          )}
        </div>
      )}
    </SpeechContext>
  );
};

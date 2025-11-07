import { useEffect, useState } from "react";

import { PraxisQuizCard } from "@/components/PraxisItem/PraxisVoc01Backets/PraxisQuizCard";
import { WordCard } from "@/components/Vocabulary/WordCard";
import { useUpdateWordMutation } from "@/store/slices/wordsApi";
import type { SpeakFn } from "@/types/commonTypes";
import type { Praxis } from "@/types/praxisTypes";
import type { Word, WordsResponse } from "@/types/wordsTypes";
import { FlipCard } from "@/UI/Common/FlipCard";
import { Heading3 } from "@/UI/Text/Heading3";

import { PraxisFinalWindow } from "../PraxisFinalWindow";
import { PraxisStartWindow } from "../PraxisStartWindow";

type PraxisVoc01BacketsProps = {
  praxisData: Praxis;
  wordsData: WordsResponse;
  handlerRemounter: () => void;
  isSpeaking: boolean;
  speak: SpeakFn;
};

export const PraxisVoc01Backets = ({
  praxisData,
  wordsData,
  handlerRemounter,
  isSpeaking,
  speak,
}: PraxisVoc01BacketsProps) => {
  const [updateUser] = useUpdateWordMutation();

  const { data } = wordsData;
  const [snapshot, setSnapshot] = useState<Word[] | null>(null);
  const [currentWord, setCurrentWord] = useState(0);
  const [currentState, setCurrentState] = useState<"start" | "praxis" | "end">(
    "start"
  );
  const [wordsKnown, setWordsKnown] = useState(0);
  const [wordsUnknown, setWordsUnknown] = useState(0);

  // Snapshot creating
  useEffect(() => {
    if (!snapshot) setSnapshot(data);
  }, [data]);

  // Click handlers
  const handleDefaultClick = () => {
    if (!snapshot) return;

    if (currentWord < snapshot.length - 1) {
      setCurrentWord((prevVal) => (prevVal += 1));
    } else {
      setCurrentState("end");
    }
  };

  const handleKnowClick = () => {
    if (snapshot) {
      const wordData = snapshot[currentWord];

      handleDefaultClick();
      setWordsKnown((prevVal) => (prevVal += 1));

      updateUser({
        id: wordData.word_id,
        data: { ease_factor: -1 },
      });
    }
  };

  const handleIdkClick = () => {
    if (snapshot) {
      const wordData = snapshot[currentWord];

      handleDefaultClick();
      setWordsUnknown((prevVal) => (prevVal += 1));

      let ease_factor = -2;

      if (wordData.ease_factor >= 0 && wordData.ease_factor < 4) {
        ease_factor = wordData.ease_factor + 1;
      }

      updateUser({ id: wordData.word_id, data: { ease_factor } });
    }
  };

  return (
    <>
      {snapshot && snapshot.length ? (
        <>
          {currentState === "start" && (
            <PraxisStartWindow onClick={() => setCurrentState("praxis")} />
          )}
          {currentState === "praxis" && (
            <FlipCard
              frontContent={
                <PraxisQuizCard
                  currentWord={currentWord}
                  dataLength={snapshot.length}
                  praxisData={praxisData}
                  wordData={snapshot[currentWord]}
                  handleKnowClick={handleKnowClick}
                  handleIdkClick={handleIdkClick}
                  isSpeaking={isSpeaking}
                  speak={speak}
                />
              }
              backContent={
                <div className="bg-[#FDE8F9] w-full h-full pl-[50px] pr-[60px] pt-[101px] pb-[50px]">
                  <WordCard
                    wordData={snapshot[currentWord]}
                    isSpeaking={isSpeaking}
                    speak={speak}
                  />
                </div>
              }
              className="w-[638px] h-[552px]"
            />
          )}
          {currentState === "end" && (
            <PraxisFinalWindow
              retry={handlerRemounter}
              stats={{
                total: snapshot.length,
                known: wordsKnown,
                unknown: wordsUnknown,
              }}
            />
          )}
        </>
      ) : (
        <Heading3>Нет слов для тренировки.</Heading3>
      )}
    </>
  );
};

import type { SpeakFn } from "@/types/commonTypes";
import type { Praxis } from "@/types/praxisTypes";
import type { Word } from "@/types/wordsTypes";
import Button from "@/UI/Buttons/Button";
import { SpeechButton } from "@/UI/Buttons/SpeechButton";
import { Heading2 } from "@/UI/Text/Heading2";
import { Heading3 } from "@/UI/Text/Heading3";

import { PraxisProgressBar } from "../PraxisProgressBar";

type PraxisQuizCardProps = {
  currentWord: number;
  dataLength: number;
  praxisData: Praxis;
  wordData: Word;
  handleKnowClick: () => void;
  handleIdkClick: () => void;
  isSpeaking: boolean;
  speak: SpeakFn;
};

export const PraxisQuizCard = ({
  currentWord,
  dataLength,
  praxisData,
  wordData,
  handleKnowClick,
  handleIdkClick,
  isSpeaking,
  speak,
}: PraxisQuizCardProps) => (
  <div className="flex flex-col w-full h-full pb-[60px] pt-[72px]">
    <PraxisProgressBar currentWord={currentWord} dataLength={dataLength} />
    <div className="h-full flex flex-col gap-[15px]">
      <div className="grow flex flex-col items-center justify-center gap-[2px]">
        <Heading2 color="primary" isBold>
          {praxisData.praxis_id === "cards_en"
            ? wordData.word
            : wordData.translation}
        </Heading2>
        {praxisData.praxis_id === "cards_en" && (
          <div className="flex items-center gap-[5px]">
            <Heading3 className="leading-[30px]">
              {wordData.transcription}{" "}
            </Heading3>
            <SpeechButton
              disabled={isSpeaking}
              onClick={() => speak(wordData.word.toLowerCase())}
              width={30}
              height={30}
            />
          </div>
        )}
      </div>
      <div className="flex gap-[12px] self-center">
        <Button size="primary" onClick={handleKnowClick} className="w-[100px]">
          Знаю
        </Button>
        <Button size="secondary" onClick={handleIdkClick} className="w-[100px]">
          Не знаю
        </Button>
      </div>
    </div>
  </div>
);

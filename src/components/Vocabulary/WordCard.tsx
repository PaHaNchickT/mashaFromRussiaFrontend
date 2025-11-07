import type { SpeakFn } from "@/types/commonTypes";
import type { Word } from "@/types/wordsTypes";
import { SpeechButton } from "@/UI/Buttons/SpeechButton";
import { Heading2 } from "@/UI/Text/Heading2";
import { Heading3 } from "@/UI/Text/Heading3";

import Button from "../../UI/Buttons/Button";

interface WordCardProps {
  wordData: Word;
  setIsEdit?: (val: boolean) => void;
  isSpeaking: boolean;
  speak: SpeakFn;
}

export const WordCard = ({
  wordData,
  setIsEdit,
  isSpeaking,
  speak,
}: WordCardProps) => (
  <div className="flex flex-col gap-[25px]">
    <div className="flex flex-col gap-[8px]">
      <div className="flex flex-col gap-[3px]">
        <div className="flex items-end gap-[1px]">
          <Heading2 color="primary" isBold className="leading-[40px]">
            {wordData.word}
          </Heading2>
          <span>{wordData.transcription}</span>
          <div className="pb-[5px] flex items-end">
            <SpeechButton
              disabled={isSpeaking}
              onClick={() => speak(wordData.word.toLowerCase())}
            />
          </div>
        </div>
        <Heading3 className="font-bold">{wordData.translation}</Heading3>
      </div>
      <div className="flex flex-col gap-[15px]">
        <div>
          <p className="font-bold text-[17px]">СИНОНИМЫ</p>
          <p>{wordData.synonyms}</p>
        </div>
        <div>
          <p className="font-bold text-[17px]">ПРИМЕР</p>
          <p className="italic">{`"${wordData.context}"`}</p>
        </div>
        <div>
          <p className="font-bold text-[17px]">ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ</p>
          <p className="italic">{wordData.association}</p>
        </div>
      </div>
    </div>
    {setIsEdit && (
      <Button size="primary" onClick={() => setIsEdit(true)}>
        Отредактировать
      </Button>
    )}
  </div>
);

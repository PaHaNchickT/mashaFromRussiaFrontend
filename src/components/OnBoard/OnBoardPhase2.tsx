import { ImportWordsModal } from "@/UI/Modals/ImportWordsModal";
import { NewWordModal } from "@/UI/Modals/NewWordModal";
import { Heading3 } from "@/UI/Text/Heading3";

type OnBoardPhase2Props = {
  setPhase: (value: number) => void;
};

export const OnBoardPhase2 = ({ setPhase }: OnBoardPhase2Props) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <Heading3>Добавь слова</Heading3>
      <div className="flex gap-[15px]">
        <ImportWordsModal
          label="Файлом"
          onSubmit={() => setPhase(3)}
          buttonSize="default"
        />
        <NewWordModal
          label="Вручную"
          onSubmit={() => setPhase(3)}
          buttonSize="default"
        />
      </div>
    </div>
  );
};

import { WordSingleStat } from "@/components/Home/WordSingleStat";
import Button from "@/UI/Buttons/Button";
import { Heading2 } from "@/UI/Text/Heading2";

type PraxisFinalWindowProps = {
  retry: () => void;
  stats: {
    total: number;
    known: number;
    unknown: number;
  };
};

export const PraxisFinalWindow = ({ retry, stats }: PraxisFinalWindowProps) => {
  const statsData = [
    { title: "Всего слов", count: stats.total },
    { title: "Знаю", count: stats.known },
    { title: "Не знаю", count: stats.unknown },
  ];

  return (
    <div className="w-[635px] h-[552px] px-[60px] pt-[148px] gap-[40px] flex flex-col items-center rounded-[22px] shadow-[0_16px_40px_rgba(16,24,40,0.18)]">
      <Heading2 color="primary" isBold isCenterAlign>
        Тренировка окончена
      </Heading2>
      <div className="flex flex-col items-center gap-[50px]">
        <div className="flex gap-[35px]">
          {statsData.map((item, index) => (
            <WordSingleStat key={index} data={item} minWidth="0" />
          ))}
        </div>
        <Button size="primary" onClick={retry} className="w-[116px]">
          Повторить
        </Button>
      </div>
    </div>
  );
};

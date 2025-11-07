import { WordSingleStat } from "@/components/Home/WordSingleStat";
import type { Stats } from "@/types/statsTypes";
import { LinkButton } from "@/UI/Buttons/LinkButton";
import { Heading1 } from "@/UI/Text/Heading1";
import { pluralizator } from "@/utils/pluralizator";

type HomePageContentProps = {
  data: Stats;
  name: string;
};

export const HomePageContent = ({ data, name }: HomePageContentProps) => {
  const dataArray = [
    {
      title: "Всего слов",
      count: data.wordsCount <= 99 ? data.wordsCount : "99+",
    },
    {
      title: "На изучении",
      count: data.inProcess <= 99 ? data.inProcess : "99+",
    },
    { title: "Выучено!", count: data.learned <= 99 ? data.learned : "99+" },
    { title: "Новых", count: data.new <= 99 ? data.new : "99+" },
    {
      title: "Сложные",
      count: data.hardLearned <= 99 ? data.hardLearned : "99+",
    },
  ];

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex flex-col gap-[52px]">
        <Heading1>
          <span className="text-[#EF18C4]">{`${name},`}</span> здарова!
          <br />
          Сегодня у тебя
          <span className="text-[#EF18C4]">{` ${data.inProcess + data.new} `}</span>
          {pluralizator("слово", data.inProcess + data.new)}
          <br />
          на тренировку
        </Heading1>
        <div className="flex gap-[25px]">
          {dataArray.map((item) => (
            <WordSingleStat
              data={item}
              key={item.title}
              minWidth="min-w-[97px]"
            />
          ))}
        </div>
      </div>
      <LinkButton href="practice" size="default">
        Погнали!
      </LinkButton>
    </div>
  );
};

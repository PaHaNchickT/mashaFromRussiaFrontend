import Button from "@/UI/Buttons/Button";
import { Heading2 } from "@/UI/Text/Heading2";

type PraxisStartWindowProps = {
  onClick: () => void;
};

export const PraxisStartWindow = ({ onClick }: PraxisStartWindowProps) => (
  <div className="w-[635px] h-[552px] flex flex-col justify-center items-center gap-[24px] rounded-[22px] shadow-[0_16px_40px_rgba(16,24,40,0.18)]">
    <Heading2 color="primary" isBold>
      Начинаем тренить?
    </Heading2>
    <Button onClick={onClick}>Погнали!</Button>
  </div>
);

"use client";

import { useState } from "react";

import { OnBoardPhase1 } from "@/components/OnBoard/OnBoardPhase1";
import { OnBoardPhase2 } from "@/components/OnBoard/OnBoardPhase2";
import { OnBoardPhase3 } from "@/components/OnBoard/OnBoardPhase3";
import { WelcomeTitle } from "@/components/OnBoard/WelcomeTitle";
import { StateDots } from "@/UI/State/StateDots";
import { Heading3 } from "@/UI/Text/Heading3";

const OnBoardPage = () => {
  const [phase, setPhase] = useState(1);
  const [redirecting, setRedirecting] = useState(false);

  return (
    <section className="h-full w-full flex flex-col">
      {redirecting ? (
        <Heading3 className="text-center">Сохраняем, минуточку...</Heading3>
      ) : (
        <div className="flex flex-col gap-[45px]">
          <WelcomeTitle />
          <div className="flex flex-col gap-[20px]">
            <StateDots dotsCount={3} activeIndex={phase - 1} />
            {phase === 1 && <OnBoardPhase1 setPhase={setPhase} />}
            {phase === 2 && <OnBoardPhase2 setPhase={setPhase} />}
            {phase === 3 && <OnBoardPhase3 setRedirecting={setRedirecting} />}
          </div>
        </div>
      )}
    </section>
  );
};

export default OnBoardPage;

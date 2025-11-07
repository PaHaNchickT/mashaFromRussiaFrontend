import { LinkButton } from "@/UI/Buttons/LinkButton";
import { LoginModal } from "@/UI/Modals/LoginModal";

import { WelcomeTitle } from "./WelcomeTitle";

export const WelcomePage = () => (
  <div className="flex flex-col gap-[40px]">
    <WelcomeTitle />
    <div className="flex gap-[15px]">
      <LinkButton href="practice" size="default">
        Погнали!
      </LinkButton>
      <LoginModal />
    </div>
  </div>
);

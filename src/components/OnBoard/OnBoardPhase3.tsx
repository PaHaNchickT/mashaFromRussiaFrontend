import { useRouter } from "next/navigation";
import NProgress from "nprogress";

import { LOCAL_STORAGE_FIELD_NAME } from "@/constants/commonConstants";
import { useUpdateUserMutation } from "@/store/slices/usersApi";
import { DailyLimitInput } from "@/UI/Inputs/DailyLimitInput";
import { Heading3 } from "@/UI/Text/Heading3";

type OnBoardPhase3Props = {
  setRedirecting: (value: boolean) => void;
};

export const OnBoardPhase3 = ({ setRedirecting }: OnBoardPhase3Props) => {
  const router = useRouter();

  const [updateUser] = useUpdateUserMutation();

  const onSubmit = (count: number) => {
    const userData = localStorage.getItem(LOCAL_STORAGE_FIELD_NAME);
    if (!userData) return;

    updateUser({
      id: JSON.parse(userData).id,
      data: { daily_limit: count },
    })
      .then(() => {
        setRedirecting(true);
        NProgress.start();
        router.push("home");
      })
      // TODO: error handling
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex flex-col gap-[5px]">
      <Heading3>Сколько слов тебе кофмортно тренить?</Heading3>
      <DailyLimitInput onSubmit={onSubmit} />
    </div>
  );
};

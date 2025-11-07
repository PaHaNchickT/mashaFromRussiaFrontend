import { LOCAL_STORAGE_FIELD_NAME } from "@/constants/commonConstants";
import { useCreateUserMutation } from "@/store/slices/usersApi";
import { SingleInputForm } from "@/UI/Forms/SingleInputForm";

type OnBoardPhase1Props = {
  setPhase: (value: number) => void;
};

export const OnBoardPhase1 = ({ setPhase }: OnBoardPhase1Props) => {
  const [createUser, { isLoading }] = useCreateUserMutation();

  const onSubmit = async (data: { name: string }) => {
    createUser({
      user_name: data.name,
      email: `${Math.random().toString(36)}@mail.ru`,
      user_password: "12345678",
    })
      .unwrap()
      .then((resp) => {
        localStorage.setItem(
          LOCAL_STORAGE_FIELD_NAME,
          JSON.stringify({
            id: resp.user_id,
            name: resp.user_name,
            dailyLimit: resp.daily_limit,
          })
        );
        setPhase(2);
      })
      // TODO: error handler
      .catch((err) => console.error(err, "jopa"));
  };

  // TODO: Loader
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <SingleInputForm
          label="Как тебя зовут?"
          placeholder="введите имя"
          name="name"
          onSubmit={(data) => onSubmit(data as { name: string })}
          classNameLabel="text-[30px]"
          classNameInput="text-[30px] placeholder:text-[30px] w-[250px]"
        />
      )}
    </>
  );
};

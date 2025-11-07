import { useEffect } from "react";

import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/store/slices/usersApi";
import { EditableField } from "@/UI/Common/EditableField";
import { settingsFormFieldsCreator } from "@/utils/settingsFormFieldsCreator";

type SettingsContentProps = {
  userId: string;
};

export const SettingsContent = ({ userId }: SettingsContentProps) => {
  const {
    data: user,
    isLoading,
    isSuccess,
    error,
  } = useGetSingleUserQuery(userId);

  const [updateUser] = useUpdateUserMutation();

  const onSubmit = async (data: Record<string, unknown>) => {
    return updateUser({ id: userId, data })
      .unwrap()
      .then((resp) => resp)
      .catch((error) => error);
  };

  // TODO: error handler
  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  // TODO: Loader
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isSuccess ? (
        <div className="text-[30px] w-[661px] flex flex-col gap-[16px]">
          {settingsFormFieldsCreator(user).map((item) => (
            <EditableField
              key={item.name}
              name={item.name}
              label={item.label}
              placeholder={item.placeholder}
              defaultValue={item.value}
              inputType={item.type}
              classNameInput="placeholder:text-[30px] grow"
              classNameWrapper="w-full"
              onSubmit={onSubmit}
              isIconAbsolute
            />
          ))}
        </div>
      ) : (
        <p>error</p>
      )}
    </>
  );
};

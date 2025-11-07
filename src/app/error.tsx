"use client";

import { useEffect } from "react";

import { LinkButton } from "@/UI/Buttons/LinkButton";
import { Heading3 } from "@/UI/Text/Heading3";

type ErrorProps = {
  error: Error & { digest?: string };
};

const Error = ({ error }: ErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center text-center gap-[21px]">
      <Heading3>Упс, что-то пошло не так.</Heading3>
      <LinkButton href="/" size="default" className="w-[250px]">
        Вернуться на главную
      </LinkButton>
    </div>
  );
};

export default Error;

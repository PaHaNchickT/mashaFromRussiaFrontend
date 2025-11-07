import { LinkButton } from "@/UI/Buttons/LinkButton";
import { Heading3 } from "@/UI/Text/Heading3";

const NotFound = () => (
  <div className="flex flex-col items-center justify-center text-center gap-[21px]">
    <Heading3>Упс, такой страницы не существует.</Heading3>
    <LinkButton href="/" size="default" className="w-[250px]">
      Вернуться на главную
    </LinkButton>
  </div>
);

export default NotFound;

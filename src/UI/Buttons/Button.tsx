import cn from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const SIZE_CLASSES = {
  default: "bg-[#EF18C4] hover:bg-[#f78be1] text-xl font-bold",
  primary: "bg-[#EF18C4] hover:bg-[#f78be1] text-base font-normal",
  secondary: "bg-black hover:bg-[#808080] text-base font-normal",
  alternate: "bg-black hover:bg-[#808080] text-xl font-bold",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  size?: "default" | "primary" | "secondary" | "alternate";
  className?: string;
};

const Button = ({
  children,
  size = "primary",
  className = "w-[160px]",
  ...props
}: ButtonProps) => {
  const baseClasses = `
    font-anonymous h-[45px] rounded-[12px]
    flex items-center justify-center
    cursor-pointer text-white
    disabled:cursor-not-allowed disabled:bg-[#dddddd] disabled:text-black
  `;

  return (
    <button
      className={cn(baseClasses, SIZE_CLASSES[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

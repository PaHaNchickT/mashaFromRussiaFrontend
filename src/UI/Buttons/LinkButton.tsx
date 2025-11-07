"use client";

import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";

import Button from "./Button";

type LinkButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href: string;
  children: ReactNode;
  size?: "default" | "primary" | "secondary" | "alternate";
  className?: string;
};

export const LinkButton = ({
  href,
  children,
  size = "primary",
  className = "w-[160px]",
  onClick,
  ...props
}: LinkButtonProps) => {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    NProgress.start();
    router.push(href);

    if (onClick) onClick(event);
  };

  return (
    <Button onClick={handleClick} size={size} className={className} {...props}>
      {children}
    </Button>
  );
};

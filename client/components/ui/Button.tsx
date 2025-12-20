"use client";

import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";

interface ButtonProps {
  children: string | ReactNode;
  isLoadingChildren?: ReactNode;
  tag: "button" | "a";
  type?: "button" | "submit";
  href?: string;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function Button({
  children,
  isLoadingChildren,
  tag = "button",
  type = "button",
  href,
  onClick,
  className = "",
  isLoading,
  disabled,
}: ButtonProps) {
  const ButtonTag = tag;

  const baseClassName =
    "text-white bg-blue-600 border border-transparent hover:bg-blue-700 cursor-pointer focus:ring-0 focus:ring-brand-medium shadow-md font-medium rounded-md text-sm px-4 py-2.5 leading-5 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed w-full";

  const mergedClassName = twMerge(baseClassName, className);

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <ButtonTag
      {...(tag === "a" ? { href } : { type, onClick: handleClick })}
      className={mergedClassName}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <>
          <div className="flex gap-2 items-center justify-center">
            {isLoadingChildren}
          </div>
        </>
      ) : (
        children
      )}
    </ButtonTag>
  );
}

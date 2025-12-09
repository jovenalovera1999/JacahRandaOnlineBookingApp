"use client";

interface ButtonProps {
  children: string;
  tag?: "button" | "a";
  type?: "button" | "submit";
  href?: string;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
}

export default function Button({
  children,
  tag = "button",
  type = "button",
  href,
  onClick,
  className,
  isLoading,
}: ButtonProps) {
  const ButtonTag = tag;

  return (
    <ButtonTag
      {...(tag === "a" ? { href } : { type })}
      onClick={onClick}
      className={`text-white bg-blue-600 border border-transparent hover:bg-blue-700 cursor-pointer focus:ring-4 focus:ring-brand-medium shadow-md font-medium rounded-md text-sm px-4 py-2.5 leading-5 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : children}
    </ButtonTag>
  );
}

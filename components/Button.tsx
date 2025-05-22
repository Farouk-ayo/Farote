"use client";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={clsx(
        "w-full py-2 px-4 rounded-md text-white font-medium flex items-center justify-center gap-2 transition-opacity cursor-pointer",
        "focus:outline-none",
        {
          "opacity-50 cursor-not-allowed": disabled || isLoading,
          "hover:opacity-90": !disabled && !isLoading,
        },
        className
      )}
    >
      {isLoading ? (
        <span className="relative w-4 h-4">
          <span className="absolute inline-block w-full h-full rounded-full border-2 border-white opacity-50 animate-ping" />
          <span className="absolute inline-block w-full h-full rounded-full border-2 border-white" />
        </span>
      ) : (
        children
      )}
    </button>
  );
}

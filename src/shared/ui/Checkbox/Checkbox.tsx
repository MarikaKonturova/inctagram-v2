import React, { InputHTMLAttributes, forwardRef } from "react";
import cls from "./Checkbox.module.scss";
import clsx from "clsx";

interface PropsType extends InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = forwardRef<HTMLInputElement, PropsType>(
  ({ className, ...props }, ref) => (
    <input
      type="checkbox"
      ref={ref}
      className={clsx(cls.checkbox, className)}
      {...props}
    />
  )
);

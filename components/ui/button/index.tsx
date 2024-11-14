import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from './button.module.css'
import { mergeClassnames } from "~/utils";

export const Button = ({ children, ...buttonProps }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  const { className, ...restButtonProps } = buttonProps
  return <button
    className={mergeClassnames(styles.button, className)}
    {...restButtonProps}
  >
    {children}
  </button>
}
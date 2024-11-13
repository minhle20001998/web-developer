import { HTMLAttributes, PropsWithChildren } from "react"
import styles from './container.module.css'
export const Container = ({children,...htmlProps}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  return <div className={styles.container} {...htmlProps}>{children}</div>
}
import { PropsWithChildren } from "react"
import styles from './autocomplete.module.css'
export interface AutocompletePopoverProps<T> {
  show: boolean
  listItems?: T[]
  currentItemIndex?: number
  renderListItem?: (item: T, isActive: boolean) => React.ReactNode
}

export const AutocompletePopover = <T,>({ show, listItems, currentItemIndex, renderListItem }: PropsWithChildren<AutocompletePopoverProps<T>>) => {
  // If show prop is falsy then render empty component
  if (!show) {
    return <></>
  }

  return <div className={styles['suggestion-list']}>
    {listItems?.map((item, index) => {
      return renderListItem?.(item, currentItemIndex === index)
    })}
  </div>
}
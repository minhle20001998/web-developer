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
  return <div data-testid="autocomplete-popover" className={styles['suggestion-list']} role="list">
    {listItems?.map((item, index) => {
      return <div
        key={index}
        role="listitem"
        className={currentItemIndex === index ? 'selected' : ''}
      >
        {renderListItem?.(item, currentItemIndex === index)}
      </div>
    })}
  </div>
}
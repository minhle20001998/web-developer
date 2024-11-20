import { ChangeEvent, InputHTMLAttributes, KeyboardEvent, MutableRefObject, useRef, useState } from "react";
import { AutocompletePopover } from "./autocomplete-popover";
import styles from './autocomplete.module.css'

interface AutocompleteProps<T> extends InputHTMLAttributes<HTMLInputElement> {
  showSuggestion?: boolean
  listItems?: T[]
  inputRef?: MutableRefObject<HTMLInputElement | null>
  renderListItem?: (item: T, isActive: boolean) => React.ReactNode
  onListItemPress?: (item: T) => void
}

export const Autocomplete = <T,>({
  inputRef,
  value: propValue,
  showSuggestion = false,
  listItems,
  renderListItem,
  onChange,
  onListItemPress,
  ...inputProps
}: AutocompleteProps<T>) => {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [currentItemIndex, setCurrentItemIndex] = useState<number | undefined>(undefined)


  // Handle increasing current index
  const moveDown = () => {
    if (listItems) {
      // Update the current item index to move down (increment)
      setCurrentItemIndex((prevIndex) => {
        // If a previous index exists -> increase it by 1, but not exceed the last item index
        if (prevIndex !== undefined) {
          return Math.min(prevIndex + 1, listItems.length - 1)
        }
        // If no previous index, set the index to the first item
        else {
          return 0
        }
      }
      );
    }
  }

  // Handle decreasing current index
  const moveUp = () => {
    if (listItems) {
      // Update the current item index to move up (decrement)
      setCurrentItemIndex((prevIndex) => {
        // If a previous index exists -> decrease it by 1, but not go below the first item index
        if (prevIndex !== undefined) {
          return Math.max(prevIndex - 1, 0)
        }
        // If no previous index, set the index to the last item
        else {
          return listItems.length - 1
        }
      }
      );
    }
  }

  // Handle input keyboard interaction
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {

    if (e.key === 'ArrowDown') {
      // Prevent default caret moving behavior
      e.preventDefault()
      // If suggestions are not visible, open the suggestion list
      if (show === false) {
        openSuggestion()
      }
      // Move the selection down
      moveDown()
    }
    else if (e.key === 'ArrowUp') {
      // Prevent default caret moving behavior
      e.preventDefault()
      // Move the selection up
      moveUp()
    }
    else if (e.key === 'Enter') {
      if (currentItemIndex !== undefined) {
        // Prevent default form submission behavior when an item is being selected
        e.preventDefault()
        // If there is a selected item, trigger the callback for item selection
        if (listItems?.[currentItemIndex]) {
          onListItemPress?.(listItems?.[currentItemIndex])
        }
      }
      // Close the suggestion list
      closeSuggestion()
    }
  }

  // Open suggestion popover
  const openSuggestion = () => {
    setShow(true);
  }

  // Close popover after delay time & reset current index
  const closeSuggestion = () => {
    setCurrentItemIndex(undefined)
    /**
     * Set timeout to make the setShow function run last
     * and allow other functions to cancel the setShow
     *  */
    const timeout = setTimeout(() => {
      setShow(false);
    }, 10)
    closeTimeoutRef.current = timeout
  }

  // Handle input change when user typing
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    // Set local state to new value
    setValue(value);
    // Trigger prop callback
    onChange?.(event)
  };

  // Cancel the closing suggestion popover
  const cancelCloseSuggestion = () => {
    /**
     * Set timeout to make the clearTimeout run last but before closing suggestion
     * and allow close timout to be initialize
     */
    setTimeout(() => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    }, 0)
  };

  return <div className={styles.autocomplete}>
    <input
      ref={inputRef}
      className={`${styles.input} ${show ? styles.open : ''}`}
      onFocus={openSuggestion}
      onBlur={closeSuggestion}
      value={propValue ?? value}
      onChange={onInputChange}
      onKeyDown={handleKeyDown}
      {...inputProps}
    >
    </input>
    <AutocompletePopover
      show={show && showSuggestion}
      listItems={listItems}
      renderListItem={renderListItem}
      currentItemIndex={currentItemIndex}
      onMouseDown={cancelCloseSuggestion}
      onMouseUp={closeSuggestion}
    />
  </div>
}
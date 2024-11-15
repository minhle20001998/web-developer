/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete } from "~/components/ui"
import { Button } from "~/components/ui/button"
import style from './search-input.module.css'
import { SearchIcon } from "~/components/ui/icons/search.icon"
import { FormEvent, useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { CrossIcon } from "~/components/ui/icons/cross.icon"
import { useFetchSuggestion } from "~/hooks/fetch/use-fetch-suggestion.hook"

export const SearchInput = () => {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const { data: suggestion } = useFetchSuggestion(searchValue.trim())
  const inputRef = useRef<HTMLInputElement | null>(null)
  // Update search value state based on query url
  useEffect(() => {
    const searchQuery = router.query?.search
    if (typeof searchQuery === 'string' && searchQuery !== '') {
      setSearchValue(searchQuery)
    }
  }, [router.query?.search])

  // Change Search Query URL by the given value
  const handleChangeQueryURL = (value: string) => {
    router.push({
      pathname: location.pathname,
      search: new URLSearchParams({ search: value }).toString()
    })
    inputRef.current?.blur()
  }

  /**
   * Change Search Query URL when user hit enter on input
   * Prevent reload behavioral by default of browser
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleChangeQueryURL(searchValue)
  }

  // Change Search Query URL when user click on suggesstion item
  const handleSuggestionClick = (suggestion: string) => {
    handleChangeQueryURL(suggestion)
  }

  /**
   * Reset search value when user clicks clear button
   * and Change Search Query URL to empty
   * and Focus back at input
   */
  const handleClearButtonClick = () => {
    setSearchValue('')
    router.push({
      pathname: location.pathname,
      search: new URLSearchParams({ search: '' }).toString()
    })
    inputRef.current?.focus()
  }

  /**
   * Render list of item in autocomplete popover
   */
  const renderListItem = useCallback((item: string, isActive: boolean) => {
    // Initialize an empty array to store the rendered parts of the item
    const results = []
    // Split the item string into an array of words based on the "stemmedQueryTerm" pattern
    // The pattern is case-insensitive (due to 'gi' flag).
    const words = item.split(new RegExp(`(${suggestion?.stemmedQueryTerm})`, 'gi'))
    for (const word of words) {
      // If the word matches the "stemmedQueryTerm" (case-insensitive),
      // wrap it in a <b> element for bold styling and push it to the results array
      if (word.toLowerCase() === suggestion?.stemmedQueryTerm) {
        results.push(<b key={word}>{word}</b>)
      } else {
        // Otherwise, wrap the word in a <span> and add it to the results array
        results.push(<span key={word}>{word}</span>)
      }
    }

    return <p
      data-testid={`list-item-${item}`}
      key={item}
      onClick={() => handleSuggestionClick(item)}
      className={`${style['suggestion-list-item']} ${isActive ? style.focused : ''}`}
    >
      {results}
    </p>
  }, [suggestion?.stemmedQueryTerm])


  return <form onSubmit={handleSubmit}>
    <div className={style['search-input-container']}>
      <Autocomplete
        data-testid="autocomplete-input"
        inputRef={inputRef}
        showSuggestion={searchValue.length >= 3}
        value={searchValue}
        onChange={(e) => { setSearchValue(e.target.value) }}
        listItems={suggestion?.suggestions}
        renderListItem={renderListItem}
        onListItemPress={handleChangeQueryURL}
      />
      <div className={style['buttons-container']}>
        {searchValue.length >= 1
          ? <button
            data-testid="clear-button"
            type="button"
            onClick={handleClearButtonClick}
            className={style['clear-button']}
          >
            <CrossIcon />
          </button>
          : <></>
        }
        <Button
          data-testid="search-button"
          type="submit"
          className={style['search-button']}
        >
          <SearchIcon />
          <span>Search</span>
        </Button>
      </div>
    </div>
  </form>
}
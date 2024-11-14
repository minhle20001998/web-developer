/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, PropsWithChildren, useContext } from "react";
import { useFetchResult } from "~/hooks/fetch/use-fetch-results.hook";
import { SearchResult } from "~/types";

// Create a context to hold the search result data
const SearchResultContext = createContext<SearchResult | undefined>(undefined)

export const SearchResultProvider = ({ children }: PropsWithChildren) => {
  // Fetch search result data using a custom hook
  const { data: searchResult, isError } = useFetchResult()

  // If there is an error, display an error message and stop rendering children
  if(isError) {
    return <>Error</>
  }

  return <SearchResultContext.Provider value={searchResult}>
    {children}
  </SearchResultContext.Provider>
}

export const useSearchResult = () => {
  return useContext(SearchResultContext)
}
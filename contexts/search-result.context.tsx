/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { SearchResult } from "~/types";

const SearchResultContext = createContext<SearchResult>({
  Page: 0,
  PageSize: 0,
  ResultItems: [],
  TotalNumberOfResults: 0
})

export const SearchResultProvider = ({searchResult, children}: PropsWithChildren<{searchResult: SearchResult}>) => {

  const value = useMemo(() => {
    return searchResult
  }, [])

  return <SearchResultContext.Provider value={value}>
    {children}
  </SearchResultContext.Provider>
}

export const useSearchResult = () => {
  return useContext(SearchResultContext)
}
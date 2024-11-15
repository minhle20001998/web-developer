import { useEffect, useState } from "react"
import { suggestionHttpClient } from "~/configs/axios"
import { Suggestion } from "~/types"
import useDebounce from "../utils/use-debounce.hook"

export const useFetchSuggestion = (query: string) => {
  const [data, setData] = useState<Suggestion | undefined>(undefined)
  const [isError, setIsError] = useState(false)

  // Delay the input to prevent spamming
  const debouncedQuery = useDebounce(query, 500)

  // useEffect hook to monitor changes to the debounce search query and trigger data fetching
  useEffect(() => {
    // Check if the search query has a length of 3 or more characters
    if (debouncedQuery.length >= 3) {
      // Call fetchSuggestion to retrieve data based on the search query
      fetchSuggestion()
    } else {
      // If the search query is too short, clear the current data
      setData(undefined)
    }
  }, [debouncedQuery])

  // Function to fetch suggestion
  const fetchSuggestion = () => {
    suggestionHttpClient.get<Suggestion>('')
      .then(({ data }) => {
        // If the request is successful, update the data state with the fetched results
        setData(data)
      })
      .catch((e) => {
        // If there's an error, set the isError state to true
        setIsError(true)
        console.error(e)
      })
  }

  return {
    data,
    isError
  }
}
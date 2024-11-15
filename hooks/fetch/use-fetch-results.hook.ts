import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { resultsHttpClient } from "~/configs/axios"
import { SearchResult } from "~/types"

export const useFetchResult = () => {
  const [data, setData] = useState<SearchResult | undefined>(undefined)
  const [isError, setIsError] = useState(false)
  const { query } = useRouter()

  // useEffect hook to monitor changes to the search query and trigger data fetching
  useEffect(() => {
    // Check if the search query exists, is a string, and has a length of 3 or more characters
    if (typeof query?.search === 'string' && query?.search !== '') {
      // Call fetchResult to retrieve data based on the search query
      fetchResult()
    } else {
      // If the search query is invalid or too short, clear the current data
      setData(undefined)
    }
  }, [query?.search])

  // Function to fetch search results
  const fetchResult = () => {
    resultsHttpClient.get<SearchResult>('')
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
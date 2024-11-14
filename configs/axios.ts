import axios from "axios"

export const resultsHttpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RESULTS_API
})

export const suggestionHttpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SUGGESTION_API
})
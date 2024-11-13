import axios from "axios"
import { mockSearchAPI } from "~/constants"

export const httpClient = axios.create({
  baseURL: mockSearchAPI
})
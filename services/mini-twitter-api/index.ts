import axios from "axios"

export const miniTwitterApi = axios.create({
  baseURL: import.meta.env.VITE_MINI_TWITTER_API_URL,
})

import axios from "axios";

const API_BASE_URL = "https://tmsph-sdi-challenges.pages.dev/";
export const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

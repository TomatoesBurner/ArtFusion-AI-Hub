import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ||  'http://localhost:3001',
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;

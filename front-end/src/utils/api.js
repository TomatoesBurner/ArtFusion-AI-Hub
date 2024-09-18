// src/utils/api.js

// Importing axios for making HTTP requests
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// API call for user signup
export const signup = async (userData) => {
  try {
    // Making a POST request to the /register route of the backend
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data; // Returning the response data (which includes the token and user info)
  } catch (error) {
    console.error("Error signing up:", error);
    throw error; // Throwing the error for further handling in the component
  }
};

// API call for user login
export const login = async (credentials) => {
  try {
    // Making a POST request to the /login route of the backend
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data; // Returning the response data (token)
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

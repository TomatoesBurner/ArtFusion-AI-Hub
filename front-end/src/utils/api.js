import axios from "axios";

// Set up the base URL from environment variables
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Create an Axios instance with default settings
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic error handling function
const handleError = (error) => {
  if (error.response) {
    // Server responded with a status code outside the 2xx range
    console.error("Error response data:", error.response.data);
    return error.response.data; // Return the specific error response
  } else if (error.request) {
    // Request was made but no response was received
    console.error("No response received:", error.request);
    return { message: "No response from server" };
  } else {
    // Something happened while setting up the request
    console.error("Error setting up request:", error.message);
    return { message: error.message };
  }
};

// API call for user signup
export const signup = async (userData) => {
  try {
    const response = await apiClient.post("/users/signup", userData);
    return response.data; // Return the response data
  } catch (error) {
    const errorMessage = handleError(error);
    throw new Error(errorMessage); // Throw a more specific error
  }
};

// API call for user login
export const login = async (credentials) => {
  try {
    const response = await apiClient.post("/users/login", credentials);
    return response.data; // Return the response data (token)
  } catch (error) {
    const errorMessage = handleError(error);
    throw new Error(errorMessage);
  }
};

// API call for password reset request
export const forgetPassword = async (email) => {
  try {
    const response = await apiClient.post("/users/forgetPassword", { email });
    return response.data; // Return the response data
  } catch (error) {
    const errorMessage = handleError(error);
    throw new Error(errorMessage);
  }
};

// API call for resetting password
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await apiClient.post(`/resetPassword/${token}`, { password: newPassword });
    return response.data; // Return the response data
  } catch (error) {
    const errorMessage = handleError(error);
    throw new Error(errorMessage);
  }
};

// API call for user logout
export const logout = async () => {
  try {
    const response = await apiClient.post("/users/logout");
    return response.data; // Return the response data
  } catch (error) {
    const errorMessage = handleError(error);
    throw new Error(errorMessage);
  }
};

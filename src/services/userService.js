import axios from "axios";

const API_URL = "https://reqres.in/api"; // Correct base URL

export const getUsers = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/users?page=${page}`); // Correct endpoint
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch users.");
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData); // Correct endpoint
    return response.data;
  } catch (error) {
    throw new Error("Failed to create user");
  }
};

export const updateUser = async (userId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, updatedData); // Correct endpoint
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user");
  }
};

export const getUserDetails = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`); // Correct endpoint
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user details");
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/users/${userId}`); // Correct endpoint
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password,
    }); // Correct endpoint
    return response.data;
  } catch (error) {
    throw new Error("Failed to create user");
  }
};

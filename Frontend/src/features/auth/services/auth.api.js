import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/auth`;

// LOGIN
export const login = async ({ email, password }) => {
  const response = await axios.post(`${API}/login`, {
    email,
    password,
  });
  return response.data;
};

// REGISTER
export const register = async ({ username, email, password }) => {
  const response = await axios.post(`${API}/register`, {
    username,
    email,
    password,
  });
  return response.data;
};

// GET CURRENT USER
export const getMe = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.get(`${API}/get-me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// LOGOUT
export const logout = async () => {
  localStorage.removeItem("token");
};
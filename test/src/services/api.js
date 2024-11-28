import axios from 'axios';

// Base URL for Django API
const API_URL = 'http://127.0.0.1:8000/api/accounts/';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}login/`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

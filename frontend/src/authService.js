// src/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:1337/api';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/local`, {
    identifier: email,
    password: password,
  });
  if (response.data.jwt) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

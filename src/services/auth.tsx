import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Adjust the URL as necessary

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data, { withCredentials: true });
    
    if (response.data.access_token) {
        document.cookie = `access_token=${response.data.access_token}; path=/`;
      }
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data, { withCredentials: true });
    
    if (response.data.access_token) {
        console.log('response.data.access_token:', response.data.access_token);
        document.cookie = `access_token=${response.data.access_token}; path=/`;
      }
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};
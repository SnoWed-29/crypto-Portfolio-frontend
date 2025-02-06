import axios from 'axios';

const API_URL = 'http://localhost:3000/api/portfolios';

export const createPortfolio = async (name: string, balance: number, userId: number) => {
  try {
    const response = await axios.post(API_URL, { name, balance, userId });
    return response.data;
  } catch (error) {
    console.error('Error creating portfolio:', error);
    throw error;
  }
};

export const getPortfolios = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    throw error;
  }
};

export const getPortfolioById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolio by ID:', error);
    throw error;
  }
};

export const updatePortfolio = async (id: number, name: string, balance: number) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { name, balance });
    return response.data;
  } catch (error) {
    console.error('Error updating portfolio:', error);
    throw error;
  }
};

export const deletePortfolio = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    throw error;
  }
};
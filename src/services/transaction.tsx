import axios from "axios";

const  API_URL = 'http://localhost:3000/api/transactions'

export const createTransaction = async (coin: string, quantity: number, coinPrice: number, date: any,totalAmount: number, portfolioId: number) => {
    try {
        const response = await axios.post(API_URL, { coin, quantity, coinPrice, date, totalAmount, portfolioId });
        return response.data;
    } catch (error) {
        console.error('Error creating transaction:', error);
        throw error;
    }
}
export const getAllTransaction = async () => {
    try{    
        const response = await axios.get(API_URL);
        return response.data;
    }catch(error){
        console.log('Error fetching transactions:', error);
        throw error;
    }
}
export const getTransactionByPorfolioId = async (portfolioId: number) => {
    try{
        const response = await axios.get(`${API_URL}/${portfolioId}/portfolio`);
        return response.data;
    }catch(error){
        console.log('Error fetching transactions by portfolio ID:', error);
        throw error;
    }
}
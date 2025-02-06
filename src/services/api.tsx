import axios from "axios";

const API_URL = '/api';
// const API_URL = 'https://sandbox-api.coinmarketcap.com';
const apiKey = import.meta.env.VITE_API_KEY; // Ensure this matches your environment variable
// const apiKey = "b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c"; // Ensure this matches your environment variable

interface Crypto {
  id: number;
  name: string;
  slug: string;
  quote: {
    USD: {
      price: number;
    };
  };
}

export interface CryptoData {
  id: number;
  name: string;
  slug: string;
  price: number;
}

export const fetchCryptoData = async (): Promise<CryptoData[]> => {
  try {
    const response = await axios.get(`${API_URL}/v1/cryptocurrency/listings/latest`, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
      },
    });
    const filteredData: CryptoData[] = response.data.data.map((crypto: Crypto) => ({
      id: crypto.id,
      name: crypto.name,
      slug: crypto.slug,
      price: crypto.quote.USD.price,
    }));
    
    return filteredData;
  } catch (ex) {
    console.error('Error fetching data:', ex);
    throw ex;
  }
};
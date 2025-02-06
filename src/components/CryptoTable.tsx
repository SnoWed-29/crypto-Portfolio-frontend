import React, { useEffect, useState } from 'react';
import { fetchCryptoData } from '../services/api';

interface CryptoData {
  id:number,
  name: string;
  slug: string; 
  price: number;
}

const CryptoTable: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getCryptoData = async () => {
      try {
        const data = await fetchCryptoData();
        setCryptoData(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    getCryptoData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching cryptocurrency data: {error.message}</div>;

  return (
    <div className="w-full space-y-6 rounded mx-auto">
      <h2 className="text-2xl font-bold">Assets</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th></th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Slug</th>
            <th className="py-2 px-4 border-b">Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((crypto) => (
            <tr key={crypto.slug}>
              <th>
                <img
                  src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
                  alt={crypto.name}
                  className="w-8 h-8"
                />
              </th>
              <td className="py-2 px-4 border-b">{crypto.name}</td>
              <td className="py-2 px-4 border-b">{crypto.slug}</td>
              <td className="py-2 px-4 border-b">${crypto.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
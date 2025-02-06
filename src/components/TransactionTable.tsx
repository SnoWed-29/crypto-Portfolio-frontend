import { useEffect, useState } from 'react';
import { getTransactionByPorfolioId } from '../services/transaction';
import { format } from 'date-fns';
import { fetchCryptoData } from '../services/api';

function TransactionTable({ portfolioId }: { portfolioId: number }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [currentPrices, setCurrentPrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const data = await getTransactionByPorfolioId(portfolioId);
        console.log(data);
        setTransactions(Array.isArray(data) ? data : []);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    getTransaction();
  }, [portfolioId]);

  useEffect(() => {
    const getCurrentPrices = async () => {
      try {
        const data = await fetchCryptoData();
        const prices = data.reduce((acc, crypto) => {
          acc[crypto.slug] = crypto.price;
          return acc;
        }, {} as { [key: string]: number });
        setCurrentPrices(prices);
      } catch (error) {
        console.error('Error fetching current prices:', error);
      }
    };

    getCurrentPrices();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching transactions: {error.message}</div>;

  return (
    <div className="w-full space-y-6 rounded mx-auto">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 text-left px-4 border-b">Coin</th>
            <th className="py-2 text-left px-4 border-b">Purchase Price</th>
            <th className="py-2 text-left px-4 border-b">Current Price</th>
            <th className="py-2 text-left px-4 border-b">Quantity</th>
            <th className="py-2 text-left px-4 border-b">Total</th>
            <th className="py-2 text-left px-4 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{transaction.coin}</td>
              <td className="py-2 px-4 border-b">{transaction.coinPrice}</td>
              <td className="py-2 px-4 border-b">{currentPrices[transaction.coin] ? `$${currentPrices[transaction.coin].toFixed(2)}` : 'Loading...'}</td>
              <td className="py-2 px-4 border-b">{transaction.quantity}</td>
              <td className="py-2 px-4 border-b">{transaction.totalAmount}</td>
              <td className="py-2 px-4 border-b">{format(new Date(transaction.date), 'MM/dd/yyyy')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
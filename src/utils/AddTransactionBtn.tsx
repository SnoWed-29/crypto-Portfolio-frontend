import { useEffect, useState } from 'react';
import {fetchCryptoData} from '../services/api';
import { createTransaction } from '../services/transaction';
import { getPortfolioById, updatePortfolio } from '../services/portfolio';

interface CryptoData {
  name: string;
  price: number;
  slug: string;
}

function AddedTransactionBtn({ portfolioId }: { portfolioId: number }) {
  const [open, setOpen] = useState(false);
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);

  const [coin, setCoin] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getCryptoData = async () => {
      try {
        const data = await fetchCryptoData();
        setCryptoData(data);
      } catch (error) {
        console.log(error);
      } 
    };

    getCryptoData();
  }, []);
  const handleTotal = () => {
    setTotal((Number(quantity) * Number(price)));
  };

  useEffect(() => {
    const selectedCrypto = cryptoData.find((crypto) => crypto.slug === coin);
    if (selectedCrypto) {
      setPrice(selectedCrypto.price);
    }
  }, [coin, cryptoData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from refreshing the page
  
    try {
      // Create transaction
      await createTransaction(coin, quantity, price, date, total, portfolioId);
      
      // Fetch updated portfolio data
      const portfolio = await getPortfolioById(portfolioId);
  
      // Ensure portfolio data exists before updating
      if (!portfolio || portfolio.balance === undefined) {
        throw new Error("Failed to fetch portfolio data.");
      }
  
      // Update portfolio balance
      await updatePortfolio(portfolioId, portfolio.name, portfolio.balance + total);
      
      console.log("Transaction added and portfolio updated successfully.");
    } catch (error) {
      console.error("Error processing transaction:", error);
    }
  };
  return (
    <div>
      <button
        className="px-4 py-2 font-bold text-white bg-gray-800 rounded hover:bg-blue-700"
        onClick={() => setOpen(true)}
      >
        Add Transaction
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="w-2/6 p-6 bg-gray-800 text-white rounded shadow-lg ">
            <div className="flex justify-between w-full">
            <h2 className="mb-4 text-xl font-bold">Add Transaction</h2>
            <button className='text-xl text-red-500 font-bold cursor-pointer' onClick={() => setOpen(false)}>x</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Coin</label>
                <select 
                  value={coin} 
                  onChange={(e) => setCoin(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {cryptoData.map((crypto) => (
                    <option key={crypto.slug} defaultValue={crypto.slug} value={crypto.slug}>{crypto.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4 grid grid-cols-3 gap-2">
                <div className="flex flex-col col-span-2">
                    <label className="block mb-2 text-sm font-bold text-gray-50" htmlFor="portfolioName">
                      Quantity
                    </label>
                    <input
                      className="w-full px-3 py-2 leading-tight text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="portfolioName"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      type="number"
                      placeholder="Enter coin's quantity"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="block mb-2 text-sm font-bold text-gray-50" htmlFor="portfolioName">
                      Price Per Coin
                    </label>
                    <input
                      className="w-full flex text-center py-2 leading-tight text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="portfolioName"
                      value={price}
                      type="number"
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="1083.90978$"
                      disabled
                    />
                </div>
              </div>
              <div className="mb-4 ">
                <div className="flex flex-col col-span-2">
                    <label className="block mb-2 text-sm font-bold text-gray-50" htmlFor="portfolioName">
                      Purchase Date
                    </label>
                    <input
                      className="w-full px-3 py-2 leading-tight text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="portfolioName"
                      onChange={(e) => setDate(e.target.value)}
                      type="date"
                      placeholder="Enter coin's quantity"
                      value={date}
                    />
                </div>
              </div>
              <div className="flex flex-col w-full mb-4 p-1">

                <h1 className='text-xl text-white'>Total price : </h1>
                <div className="bg-gray-600 w-full p-4 rounded flex justify-end">
                  <span className='text-4xl'>{total}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-red-700"
                  type="button"
                  onClick={handleTotal}
                >
                  Calculate Total
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddedTransactionBtn;
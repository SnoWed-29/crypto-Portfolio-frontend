import { useParams } from 'react-router-dom';
// import CryptoTable from '../components/CryptoTable'
import DashboardItems from '../components/DashboardItems'
import Sidebar from '../components/Sidebar'
import AddedTransactionBtn from '../utils/AddTransactionBtn'
import { useEffect, useState } from 'react';
import { getPortfolioById } from '../services/portfolio';
import TransactionTable from '../components/TransactionTable';

function Porfolio() {

    const { id } = useParams<{ id: string }>();
    const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  
    useEffect(() => {
      const fetchPortfolio = async () => {
        try {
          const data = await getPortfolioById(id!);
          setPortfolio(data);
        } catch (error) {
          console.error('Error fetching portfolio:', error);
        }
      };
  
      fetchPortfolio();
    }, [id]);
  
    if (!portfolio) {
      return <div>Loading...</div>;
    }
  return (
    <div className='flex w-full h-screen'>
        <Sidebar />
    <div className="flex-grow p-8 bg-gray-100 overflow-y-auto">
        <div className="w-full p-8 space-y-6 bg-white rounded shadow-md mx-auto ">
          <div className="flex justify-between w-full border-b border-b-gray-800 py-4">
            <span className='text-2xl text-gray-800 font-bold'>{portfolio.balance}$</span>
            <div className="flex flex-col space-y-1">
            <h1 className="text-2xl ">{portfolio.name} </h1>
                <AddedTransactionBtn portfolioId={portfolio.id} />
            </div>

          </div>
          <div className="flex w-full">
            <DashboardItems />
          </div>          
          <div className="flex w-full ">
            {/* <CryptoTable /> */}
            <TransactionTable portfolioId={portfolio.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Porfolio
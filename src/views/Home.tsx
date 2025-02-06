import { useState, useEffect, useContext } from 'react';
import Sidebar from "../components/Sidebar";
import PortfolioCard from "../components/PortfolioCard";
import AddPortfolioBtn from "../utils/AddPortfolioBtn";
import { getPortfolios } from "../services/portfolio";
import { Portfolio } from '../types/index';
import { UserContext } from '../context/UserContext';

const Home = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const portfolios = await getPortfolios();
        setPortfolios(portfolios);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPortfolios();
  }, []);

  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <div className="flex-grow p-8 bg-gray-100 overflow-y-auto">
        <div className="w-full p-8 space-y-6 bg-white rounded shadow-md mx-auto">
          <div className="flex justify-between w-full">
            <h1 className="text-2xl ">{user?.user.name}</h1>
            <AddPortfolioBtn />
          </div>
          <div className="flex w-full flex-wrap">
            {portfolios.map((portfolio) => (
              <PortfolioCard key={portfolio.id} portfolio={portfolio} link={portfolio.id}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
import React from 'react';
import { Portfolio } from '../types/index';

interface PortfolioCardProps {
  portfolio: Portfolio;
  link: number
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ portfolio, link }) => {
  return (
    <a href={`/portfolio/${link}`} className="p-4 m-2 bg-white rounded shadow-md w-60">
      <h2 className="text-xl font-bold">{portfolio.name}</h2>
      <p className="text-gray-700">Balance: ${portfolio.balance}</p>
    </a>
  );
};

export default PortfolioCard;
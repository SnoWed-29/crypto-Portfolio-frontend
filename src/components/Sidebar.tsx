import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartLine, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

const Sidebar = () => {
  return (
    <div className="left-0 top-0 h-full w-64 bg-gray-800 text-white flex flex-col justify-between">
      <div className="flex flex-col items-center mt-8">
        <FontAwesomeIcon icon={faChartLine} size="3x" />
        <h1 className="mt-4 text-xl font-bold">Crypto Portfolio</h1>
      </div>
      <nav className="flex flex-col items-center mt-8 space-y-4">
        <a href="#" className="flex items-center space-x-2 hover:text-gray-400">
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:text-gray-400">
          <FontAwesomeIcon icon={faChartLine} />
          <span>Portfolio</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:text-gray-400">
          <FontAwesomeIcon icon={faUser} />
          <span>Profile</span>
        </a>
      </nav>
      <div className="flex flex-col items-center mb-8">
        <p className="mb-2">John Doe</p>
        <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 rounded hover:bg-red-700">
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
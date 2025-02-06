import { useState } from 'react';
import { createPortfolio } from '../services/portfolio';
import Notification from '../utils/Notification';

function AddPortfolioBtn() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [notification, setNotification] = useState({ message: '', color: '', visible: false });

  const handleSubmit = async () => {
    try {
      await createPortfolio(name, 0, 1);
      setNotification({ message: 'Portfolio Created', color: 'bg-green-500', visible: true });
      setOpen(false);
    } catch (error) {
      console.log(error);
      setNotification({ message: 'Error creating portfolio', color: 'bg-red-500', visible: true });
    } finally {
      setTimeout(() => {
        setNotification({ ...notification, visible: false });
      }, 3000); 
    }
  };

  return (
    <div>
      <button
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={() => setOpen(true)}
      >
        Add Portfolio
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/4 bg-opacity-50">
          <div className="w-1/3 p-6 bg-white rounded shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Add Portfolio</h2>
            <form>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="portfolioName">
                  Portfolio Name
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="portfolioName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter portfolio name"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                  type="button"
                  onClick={handleSubmit}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {notification.visible && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
        Portfolio Created
      </div>
      )}
    </div>
  );
}

export default AddPortfolioBtn;
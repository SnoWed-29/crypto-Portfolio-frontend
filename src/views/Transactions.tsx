
import Sidebar from '../components/Sidebar'

function Transactions() {
  return (
    <div className="flex w-full h-screen">
        <Sidebar />
        <div className="flex-grow p-8 bg-gray-100 overflow-y-auto">
            <div className="flex w-full justify-center">
                <h1 className='text-3xl my-3 text-gray-800'>Transaction History</h1>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">     
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Current Price</th>
                        <th className="px-6 py-3">Amount</th>
                        <th className="px-6 py-3">purchase price</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="pl-3">
                                    <div className="text-base font-semibold">Bitcoin</div>
                                    <div className="font-normal text-gray-500">29/01/2023</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">9017$</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    9
                                </div>
                            </td>
                            <td className="px-6 py-4"><a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">8000$</a></td>
                        </tr>
                    </tbody>
                </table>
            </div> 
        </div>
    </div>
  )
}

export default Transactions
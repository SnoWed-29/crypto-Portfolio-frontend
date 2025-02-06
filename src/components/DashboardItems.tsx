import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function DashboardItems() {
  return (
    <div className='w-full grid grid-cols-4 gap-4'>
        <div className="shadow-xl p-4 rounded-md h-fit bg-gray-800 text-white">
            <div className="flex p3 my-1">
                <h1 className='text-xl p-2'> Bitcoin  </h1>
            </div>
            <div className="flex">
                <span>Porfolio Balance : <span className='text-green-500'>500$</span></span>
            </div>
        </div>
        <div className=" shadow-xl p-4 rounded-md h-fit bg-gray-800 text-white">
            <div className="flex p3 my-1">
                <h1 className='text-xl p-2'>All Time Profite  </h1>
            </div>
            <div className="flex">
                <span>Porfolio Balance : <span className='text-green-500'>59800$</span></span>
            </div>
        </div>
        <div className=" shadow-xl p-4 rounded-md h-fit bg-gray-800 text-white">
            <div className="flex p3 my-1">
                <h1 className='text-xl p-2'>Best Performer </h1>
            </div>
            <div className="flex">
                <span>Porfolio Balance : <span className='text-green-500'>500$</span></span>
            </div>
        </div>
        <div className=" shadow-xl p-4 rounded-md h-fit bg-gray-800 text-white">
            <div className="flex p3 my-1">
                <h1 className='text-xl p-2'>Worst Performer </h1>
            </div>
            <div className="flex space-x-3">
                <span>Porfolio Balance : <span className='text-green-500'>500$</span></span>
                <span className='text-green-500'>14%<FontAwesomeIcon icon={faCaretUp}  /></span>
            </div>
        </div>
    </div>
  )
}

export default DashboardItems
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <div className="flex-grow p-8 bg-gray-100 border-2 border-red-500  overflow-y-auto">
        <div className="w-full  p-8  space-y-6 bg-white rounded shadow-md mx-auto h-[1400px]">
          <h2 className="text-2xl font-bold text-center">Home</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
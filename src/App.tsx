import './App.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserProvider, UserContext } from './context/UserContext';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Porfolio from './views/Porfolio';
import Transactions from './views/Transactions';

const AppContent = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  const isLoggedIn = !!user;

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
      <Route path="/portfolio/:id" element={isLoggedIn ? <Porfolio /> : <Navigate to="/login" />} />
      <Route path="/transactions" element={isLoggedIn ? <Transactions /> : <Navigate to="/login" />} />
      <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
    </Routes>
  );
};

const App = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default App;
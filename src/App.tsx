import './App.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('access_token');
    console.log('Token from Cookies:', token); 
    setIsLoggedIn(!!token);
    setLoading(false);
  }, []);

  console.log('isLoggedIn:', isLoggedIn); 

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
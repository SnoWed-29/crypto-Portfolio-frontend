import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  name: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<User>('http://localhost:3000/api/me', {
          withCredentials: true, // Ensure cookies are sent
        });

        console.log("Fetched user from API:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    await axios.post('http://localhost:3000/api/logout', {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {!loading && children}
    </UserContext.Provider>
  );
};
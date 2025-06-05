import { createContext, useState, useContext } from 'react';
import * as api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const login = async (email, password) => {
    const response = await api.login(email, password);
    if (!response || !response.data) {
      throw new Error('Invalid response from server in AuthContext');
    }
    const userData = response.data.user;
    setUser(userData);
    return response;
  };

  const register = async (name, lastName, email, password) => {
    await api.register(name, lastName, email, password);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
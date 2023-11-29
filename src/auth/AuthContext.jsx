import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    // Este efecto actualiza el localStorage cada vez que el token cambie.
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = (userData, token) => {
    setToken(token); // Actualiza el token tanto en el estado como en el localStorage.
    setUser(userData); // Actualiza el usuario en el estado.
  };

  const logout = () => {
    setToken(null); // Limpia el token del estado y del localStorage.
    setUser(null); // Limpia el usuario del estado.
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


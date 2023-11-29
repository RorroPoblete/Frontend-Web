import React, { createContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);


    function logout() {
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

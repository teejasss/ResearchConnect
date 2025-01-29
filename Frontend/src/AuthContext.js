import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Function to get a cookie value by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  console.log(document.cookie);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Function to set a cookie
const setCookie = (name, value, days, email, userid, firstname, lastname) => {
    const date = new Date();
    console.log(name, value, days, email, userid, firstname, lastname);
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // expire in "days"
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; Secure`;
    document.cookie = `email=${email}; expires=${date.toUTCString()}; path=/; Secure`;
    document.cookie = `user_id=${userid}; expires=${date.toUTCString()}; path=/; Secure`;
    document.cookie = `first_name=${firstname}; expires=${date.toUTCString()}; path=/; Secure`;
    document.cookie = `last_name=${lastname}; expires=${date.toUTCString()}; path=/; Secure`;
  };
  
  const deleteCookie = () => {
    console.log("cookie deleted");
    // document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    // Remove any additional cookies for the user
    document.cookie = `email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    document.cookie = `user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    document.cookie = `first_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    document.cookie = `last_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  };
  

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Read the cookie value on component mount
  useEffect(() => {
    const loggedIn = getCookie('isLoggedIn');
    console.log(loggedIn);
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
    else{
      deleteCookie();
    }
  }, []);

  const login = (email, userid, firstname, lastname) => {
    setIsLoggedIn(true);
    console.log(email, userid, firstname, lastname);
    setCookie('isLoggedIn', 'true', 7, email, userid, firstname, lastname); // Set cookie for 7 days
  };

  const logout = () => {
    setIsLoggedIn(false);
    deleteCookie('isLoggedIn'); // Delete cookie on logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, getCookie }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { useState } from 'react';
import { useContext } from 'react/cjs/react.development';

export const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  userInfo: '',
  login: (token) => {},
  logout: () => {},
});
AuthContext.displayName = 'AuthContext';

export default function AuthProvider({ children }) {
  // state, useEffect
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState({});

  // infered value - apskaiciuojama priklausoma reikme
  // const isLoggedIn = token ? true : false;
  // !'' === true
  // !!'' === false
  // !'123' === false
  // !!'123' === true
  const isLoggedIn = !!token;

  function loginHandler(token, userData) {
    setToken(token);
    setUserInfo(userData);
    // console.log('loginHandler() has set the token');
  }
  function logoutHandler() {
    // console.log('logoutHandler() ivyko');
    setToken('');
    setUserInfo({});
  }

  const ctx = {
    token: token,
    isLoggedIn: isLoggedIn,
    userInfo,
    login: loginHandler,
    logout: logoutHandler,
  };
  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
}

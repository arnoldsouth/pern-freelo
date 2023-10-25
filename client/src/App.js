import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/dashboard/Dashboard';
import Landing from './components/Landing';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const checkAuthenticated = async () => {
    try {
      const res = await fetch('http://localhost:5000/authentication/verify', {
        method: 'POST',
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          {/* <Route path="/" element={<Landing />} /> */}

          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Dashboard setAuth={setAuth} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard setAuth={setAuth} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login setAuth={setAuth} />
              )
            }
          />

          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Register setAuth={setAuth} />
              )
            }
          />

          <Route path="/" element={<Landing />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default App;

import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Header from './components/Header';
import Note from './components/Note';
import CreateNote from './components/CreateNote';
import { TokenProvider } from './TokenContext';
import { TokenContext } from './TokenContext';
import CreateAccount from './components/CreateAccount';

function App() {

  const isAuthenticated = !!localStorage.getItem('token'); 

  // Check if the user is authenticated

  return (
    <TokenProvider>
    <Router>
      <Routes>
      
        <Route path="/" element={isAuthenticated ? <Navigate to="/notes" /> : <><Header /><Login /></>} />
        <Route path="/login" element={<><Header /><Login /></>} />
        <Route path="/notes" element={isAuthenticated ? <><Header /><Home /></> : <Navigate to="/login" />} />
        <Route path="/create-account" element={isAuthenticated ? <Navigate to="/notes" /> : <><Header /><CreateAccount /></>} />
        <Route path="/notes/:id" element={isAuthenticated ? <><Header /><Note /></> : <Navigate to="/login" />} />
        <Route path="/create" element={isAuthenticated ? <><Header /><CreateNote /></> : <Navigate to="/login" />} />

      </Routes>
    </Router>
    </TokenProvider>
  );
}

export default App;

// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DetailCardPage from './pages/DetailCardPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { SectionProvider } from './context/SectionContext';
import './App.css';

function App() {
  return (
    <Router>
    <SectionProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<DetailCardPage />} />
      </Routes>
      <Footer />
      </SectionProvider>
    </Router>
  );
}

export default App;

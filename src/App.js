import React from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Pizza from './components/Pizza';
import CardModal from './components/CardModal';
import SideBar from './components/SideBar';
import MapPage from './components/MapPage';
import NotificationBell from './components/NotificationBell';
import Header from './components/Header';



function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <Router>
        <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pizza" element={<Pizza />} />
          <Route path="/CardModal" element={<CardModal />} />
          <Route path="/SideBar" element={<SideBar />} />
          <Route path="/MapPage" element={<MapPage />} />
          <Route path="/Header" element={<Header />} />
          <Route path="/NotificationBell" element={<NotificationBell />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App; 
'use client';
import React, { useState, useEffect } from "react";
import CalendarView from "./components/CalendarView";
import LoginScreen from "./components/LoginScreen";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { parse } from 'cookie';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const cookies = parse(document.cookie);
    const authToken = cookies.authToken;

    if (authToken) handleLogin()
  }, []);

  return (
    <main className="bg-white body-font">
      <Header />
      {isLoggedIn ? <CalendarView /> : <LoginScreen onLogin={handleLogin} />}
      <Footer />
    </main>
  );
};

export default Home;

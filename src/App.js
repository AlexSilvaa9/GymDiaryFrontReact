import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import Metrics from "./components/Metrics/Metrics";
import Register from "./components/Register";
import Login from "./components/Login";
import styled from "styled-components";
import "./App.css";
import Profile from "./components/Profile/Profile";

// Contenedor principal para el diseño
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Asegura que el contenedor ocupe toda la altura de la vista */
`;

const MainContent = styled.div`
  flex: 1; /* Asegura que el contenido principal ocupe el espacio disponible */
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Navbar />
        <MainContent>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />

            {/* Otras rutas pueden ser añadidas aquí */}
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;

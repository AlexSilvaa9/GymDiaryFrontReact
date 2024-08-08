import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import Metrics from "./components/Metrics/Metrics";
import Register from "./components/Register";
import Login from "./components/Login";
import styled, { ThemeProvider } from "styled-components";
import "./App.css";
import Profile from "./components/Profile/Profile";
import Nutrition from "./components/Nutrition/Nutrition";
import Exercise from "./components/Exercise/Exercise";
import colors from "./styles/colors"; // Asegúrate de que la ruta sea correcta

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
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para el modo de tema
  const theme = colors(isDarkMode ? 'dark' : 'light'); // Determina los colores según el tema

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode); // Alterna entre modo oscuro y claro
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Navbar toggleTheme={toggleTheme} />
          <MainContent>
            <Routes>
              {/* Redirige la raíz ("/") y "/ReactApp" a "/landingPage" */}
              <Route path="/" element={<Navigate to="/landingPage" replace />} />
              <Route path="/ReactApp" element={<Navigate to="/landingPage" replace />} />
              <Route path="/landingPage" element={<LandingPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/metrics" element={<Metrics />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/exercise" element={<Exercise />} />
            </Routes>
          </MainContent>
          <Footer />
        </AppContainer>
      </ThemeProvider>
    </Router>
  );
}

export default App;

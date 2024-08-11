import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import Metrics from "./components/Metrics/Metrics";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile/Profile";
import Nutrition from "./components/Nutrition/Nutrition";
import Exercise from "./components/Exercise/Exercise";
import styled, { ThemeProvider } from "styled-components";
import colors from "./styles/colors";
import GlobalStyle from "./styles/GlobalStyle";

// Contenedor principal para el diseño
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 6rem; /* Ajusta este valor según la altura de tu footer */
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = colors(isDarkMode ? "dark" : "light");

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppContainer>
          <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          <MainContent>
            <Routes>
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

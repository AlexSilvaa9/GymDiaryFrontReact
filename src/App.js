import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import Metrics from './components/Metrics/Metrics';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile/Profile';
import Nutrition from './components/Nutrition/Nutrition';
import Exercise from './components/Exercise/ExerciseManager';
import styled, { ThemeProvider } from 'styled-components';
import colors from './styles/colors';
import GlobalStyle from './styles/GlobalStyle';
import { AuthProvider } from './components/contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Privacy from './components/PrivacyPolicy';
import Goals from './components/Goals/Goals';
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 4rem;
  @media (max-width: 768px) {
    padding-bottom: 10rem;
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

function App() {
  const savedTheme = localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState(savedTheme === "dark");

  const theme = colors(isDarkMode ? "dark" : "light");

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <AuthProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AppContainer>
            <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <MainContent>
              <Routes>
                <Route path="/" element={<Navigate to="/landingPage" replace />} />
                <Route path="/landingPage" element={<LandingPage isDarkMode={isDarkMode} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/privacy-policy" element={<Privacy/>} />
                <Route path="/home" element={<ProtectedRoute element={<Home isDarkMode={isDarkMode}/>} />} />
                <Route path="/nutrition" element={<ProtectedRoute element={<Nutrition />} />} />
                <Route path="/exercise" element={<ProtectedRoute element={<Exercise />} />} />
                <Route path="/metrics" element={<ProtectedRoute element={<Metrics />} />} />
                <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
                <Route path="/goals" element={<ProtectedRoute element={<Goals />} />} />
              </Routes>
            </MainContent>
            <Footer />
          </AppContainer>
        </ThemeProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage"; // Importa la nueva Landing Page
import Metrics from "./components/Metrics/Metrics"; // Importa la nueva página de métricas
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path='/metrics' element={<Metrics />} />
        {/* Otras rutas pueden ser añadidas aquí */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

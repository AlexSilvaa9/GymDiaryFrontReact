// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import ColorPicker from "./components/ColorPicker";
import "./App.css";

function App() {
  const [palette, setPalette] = useState({
    primary: "#B0B0B0", // Gris pastel por defecto
    secondary: "#E0E0E0",
    accent: "#707070",
    background: "#F5F5F5",
    text: "#333333",
  });

  const handlePaletteChange = (newPalette) => {
    setPalette(newPalette);
  };

  return (
    <Router>
      <div className="App" style={{ backgroundColor: palette.background, color: palette.text }}>
        <Navbar />
        <ColorPicker onPaletteChange={handlePaletteChange} />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Otras rutas pueden ser añadidas aquí */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

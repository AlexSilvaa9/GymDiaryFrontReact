// src/components/ColorPicker.js
import React, { useState } from "react";
import styled from "styled-components";
import colorPalettes from "../styles/colorPalettes"; // Importa las paletas de colores

const PickerContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
`;

const PaletteButton = styled.button`
  width: 80px;
  height: 80px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  background-color: ${(props) => props.palette.primary};
  box-shadow: ${(props) => (props.selected ? "0 4px 8px rgba(0, 0, 0, 0.3)" : "none")};

  &:hover {
    transform: scale(1.05);
  }
`;

const ColorPicker = ({ onPaletteChange }) => {
  const [selectedPalette, setSelectedPalette] = useState("");

  const handleClick = (palette) => {
    setSelectedPalette(palette);
    onPaletteChange(colorPalettes[palette]);
  };

  return (
    <PickerContainer>
      {Object.entries(colorPalettes).map(([name, palette]) => (
        <PaletteButton
          key={name}
          palette={palette}
          selected={selectedPalette === name}
          onClick={() => handleClick(name)}
        />
      ))}
    </PickerContainer>
  );
};

export default ColorPicker;

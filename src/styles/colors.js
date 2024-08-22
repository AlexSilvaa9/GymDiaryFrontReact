import { CardTitle } from "react-bootstrap";

const lightColors = {
  primary: "#A8D5BA", // Verde pastel
  secondary: "#B9E3C6", // Verde más claro
  background: "#F3F9F4", // Fondo blanco con matiz verde claro
  tertiary: "#D9EAD3", // Verde pastel suave
  text: "#4A4A4A", // Gris oscuro
  secondaryText: "#6B6B6B", // Gris más claro
  cardBackground:"#A0937D",
  cardTitle:"#FFDA76",
  cardText:"#F5EDED",
  cardInput:"#E7D4B5",
  routineBackground:"#B6C7AA",
  calendarBackground:"#A0937D",
  calendarText:"#F5EDED"
};

const darkColors = {
  background: "radial-gradient(at center top, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0))",
  text: "#E0E0E0", /* Texto claro y legible */
  secondaryText: "#B0B0B0", /* Texto secundario más tenue */
  primary: "#2C2C2C", /* Fondo de elementos activos más claro que el original */
  secondary: "radial-gradient(at left top, rgb(192, 38, 211), rgb(6, 182, 212), rgb(103, 232, 249))", /* Color vibrante para acentos (similar a morado claro) */
  tertiary: "#3FA2F6", /* Color de acento adicional (teal claro) */
  cardBackground:"#2C2C2C",
  cardText:"#E0E0E0",
  cardTitle:"#3FA2F6",  
  cardInput:"#3C3D37",
  routineBackground:"#3C3D37",
  calendarBackground:"#2C2C2C",
  calendarText:"#E0E0E0"


};

const colors = (mode) => mode === 'dark' ? darkColors : lightColors;

export default colors;

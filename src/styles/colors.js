const lightColors = {
  primary: "#A8D5BA", // Verde pastel
  secondary: "#B9E3C6", // Verde más claro
  background: "#F3F9F4", // Fondo blanco con matiz verde claro
  tertiary: "#D9EAD3", // Verde pastel suave
  text: "#4A4A4A", // Gris oscuro
  secondaryText: "#6B6B6B", // Gris más claro
};

const darkColors = {
  background: "radial-gradient(at center top, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0))",
  text: "#E0E0E0", /* Texto claro y legible */
  secondaryText: "#B0B0B0", /* Texto secundario más tenue */
  primary: "#2C2C2C", /* Fondo de elementos activos más claro que el original */
  secondary: "radial-gradient(at left top, rgb(192, 38, 211), rgb(6, 182, 212), rgb(103, 232, 249))", /* Color vibrante para acentos (similar a morado claro) */
  tertiary: "#3FA2F6", /* Color de acento adicional (teal claro) */
};

const colors = (mode) => mode === 'dark' ? darkColors : lightColors;

export default colors;

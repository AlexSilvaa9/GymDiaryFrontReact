const lightColors = {
    primary: "#A8D5BA", // Verde pastel
    secondary: "#B9E3C6", // Verde más claro
    background: "#F3F9F4", // Fondo blanco con matiz verde claro
    tertiary: "#D9EAD3", // Verde pastel suave
    text: "#4A4A4A", // Gris oscuro
    secondaryText: "#6B6B6B", // Gris más claro
  };

const darkColors = {
    background: "#121212", /* Fondo muy oscuro */
    text: "#E0E0E0", /* Texto claro y legible */
    secondaryText: "#B0B0B0", /* Texto secundario más tenue */
    primary: "#1F1F1F", /* Fondo de elementos activos */
    secondary: "#BB86FC", /* Color vibrante para acentos (similar a morado claro) */
    tertiary: "#3FA2F6", /* Color de acento adicional (teal claro) */
};
const colors = (mode) => mode === 'dark' ? darkColors : lightColors;

export default colors;

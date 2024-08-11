// src/styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: ${({ theme }) => theme.background};
    font-size: 16px;
    line-height: 1.6;
    position: relative;
  }

  .App {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
  }

  h1, h2, h3, p, a {
    margin: 0;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }

  @media (min-width: 1200px) {
    body {
      font-size: 18px;
    }
  }
`;

export default GlobalStyle;

// src/components/Navbar.js
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import colors from "../styles/colors"; // Importa las variables de color

const Nav = styled.nav`
  background: ${colors.primary}; /* Morado pastel */
  color: ${colors.background}; /* Fondo claro pastel */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.background}; /* Fondo claro pastel */
`;

const NavLinks = styled.div`
  a {
    color: ${colors.background}; /* Fondo claro pastel */
    margin: 0 1rem;
    text-decoration: none;
    font-size: 1rem;
    &:hover {
      color: ${colors.secondary}; /* Morado más claro */
      text-decoration: underline;
    }
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Logo>FitTrack</Logo>
      <NavLinks>
        <Link to="/">Home</Link>
        <Link to="/nutrition">Nutrition</Link>
        <Link to="/exercise">Exercise</Link>
        <Link to="/weight">Weight</Link>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;

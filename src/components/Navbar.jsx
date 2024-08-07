// src/components/Navbar.js
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import colors from "../styles/colors"; // Importa las nuevas variables de color

const Nav = styled.nav`
  background: ${colors.primary}; 
  color: ${colors.text}; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: relative; /* Para que la barra de progreso se posicione absolutamente dentro de Nav */
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.text}; 
`;

const NavLinks = styled.div`
  position: relative; /* Para que la barra de progreso se posicione en relación con los enlaces */
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${colors.text}; 
  margin: 0 1rem;
  text-decoration: none;
  font-size: 1rem;
  position: relative;
  padding: 0.5rem;
  display: inline-block;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.terciary}; 
  }
`;

const ProgressBar = styled.div`
  height: 6px; 
  background: ${colors.terciary}; 
  position: absolute;
  bottom: 0;
  left: ${({ left }) => left}; /* Posición horizontal basada en el enlace hoverado */
  width: ${({ width }) => width}; /* Ancho dinámico */
  transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
  z-index: 10; /* Asegura que esté por encima de los otros elementos */
`;

const Navbar = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const linkRefs = useRef({});

  useEffect(() => {
    const handleResize = () => {
      setHoveredLink((prev) => prev);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = (name) => {
    setHoveredLink(name);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  return (
    <Nav>
      <Logo>FitTrack</Logo>
      <NavLinks>
        <NavLink
          to="/home"
          onMouseEnter={() => handleMouseEnter('home')}
          onMouseLeave={handleMouseLeave}
          ref={(el) => linkRefs.current['home'] = el}
        >
          Home
        </NavLink>
        <NavLink
          to="/nutrition"
          onMouseEnter={() => handleMouseEnter('nutrition')}
          onMouseLeave={handleMouseLeave}
          ref={(el) => linkRefs.current['nutrition'] = el}
        >
          Nutrition
        </NavLink>
        <NavLink
          to="/exercise"
          onMouseEnter={() => handleMouseEnter('exercise')}
          onMouseLeave={handleMouseLeave}
          ref={(el) => linkRefs.current['exercise'] = el}
        >
          Exercise
        </NavLink>
        <NavLink
          to="/metrics"
          onMouseEnter={() => handleMouseEnter('metrics')}
          onMouseLeave={handleMouseLeave}
          ref={(el) => linkRefs.current['metrics'] = el}
        >
          Metrics
        </NavLink>
        <NavLink
          to="/profile"
          onMouseEnter={() => handleMouseEnter('profile')}
          onMouseLeave={handleMouseLeave}
          ref={(el) => linkRefs.current['profile'] = el}
        >
          Profile
        </NavLink>
        <ProgressBar
          width={
            hoveredLink && linkRefs.current[hoveredLink]
              ? `${linkRefs.current[hoveredLink].offsetWidth}px`
              : '0px'
          }
          left={
            hoveredLink && linkRefs.current[hoveredLink]
              ? `${linkRefs.current[hoveredLink].offsetLeft}px`
              : '0px'
          }
        />
      </NavLinks>
    </Nav>
  );
};

export default Navbar;

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

const Nav = styled.nav`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem; /* Ajusta el padding para definir la altura */
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const NavLinks = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.primary};
    overflow: hidden;
    max-height: ${({ isOpen }) => (isOpen ? '300px' : '0')};
    transition: max-height 0.3s ease-in-out;
    z-index: 9;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  margin: 0 1rem;
  text-decoration: none;
  font-size: 1rem;
  position: relative;
  padding: 0.5rem;
  display: inline-block;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.terciary};
  }

  @media (max-width: 768px) {
    margin: 1rem 0;
    width: 100%;
    text-align: center;
  }
`;

const ProgressBar = styled.div`
  height: 6px;
  background: ${({ theme }) => theme.terciary};
  position: absolute;
  bottom: 0;
  left: ${({ left }) => left};
  width: ${({ width }) => width};
  transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
  z-index: 10;
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Bar = styled.div`
  width: 25px;
  height: 3px;
  background-color: ${({ theme }) => theme.text};
  margin: 4px 0;
  transition: 0.4s;
`;

const ThemeToggle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: auto;

  svg {
    fill: ${({ theme }) => theme.text};
    width: 24px;
    height: 24px;
    transition: fill 0.3s ease;
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const linkRefs = useRef({});

  useEffect(() => {
    const handleResize = () => {
      setHoveredLink((prev) => prev);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseEnter = (name) => {
    setHoveredLink(name);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav>
      <Logo>FitTrack</Logo>
      <Hamburger onClick={toggleMenu}>
        <Bar />
        <Bar />
        <Bar />
      </Hamburger>
      <NavLinks isOpen={isOpen}>
        <NavLink
          to="/home"
          onMouseEnter={() => handleMouseEnter('home')}
          onMouseLeave={handleMouseLeave}
          ref={(el) => (linkRefs.current['home'] = el)}
        >
          Home
        </NavLink>
        <NavLink
          to="/nutrition"
          onMouseEnter={() => handleMouseEnter('nutrition')}
          onMouseLeave={handleMouseLeave}
          ref={(el) => (linkRefs.current['nutrition'] = el)}
        >
          Nutrition
        </NavLink>
        <NavLink
          to="/exercise"
          onMouseEnter={() => handleMouseEnter('exercise')}
          onMouseLeave={handleMouseLeave}
          ref={(el) => (linkRefs.current['exercise'] = el)}
        >
          Exercise
        </NavLink>
        <NavLink
          to="/metrics"
          onMouseEnter={() => handleMouseEnter('metrics')}
          onMouseLeave={handleMouseLeave}
          ref={(el) => (linkRefs.current['metrics'] = el)}
        >
          Metrics
        </NavLink>
        <NavLink
          to="/profile"
          onMouseEnter={() => handleMouseEnter('profile')}
          onMouseLeave={handleMouseLeave}
          ref={(el) => (linkRefs.current['profile'] = el)}
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
      <ThemeToggle onClick={toggleTheme}>
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </ThemeToggle>
    </Nav>
  );
};

export default Navbar;

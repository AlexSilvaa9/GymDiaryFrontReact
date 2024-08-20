import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { AuthContext } from './contexts/AuthContext';

const Nav = styled.nav`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
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
    max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')}; /* Ajusta el max-height según el contenido */
    transition: max-height 0.3s ease-in-out;
    z-index: 9;
    width: 100%;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  margin: 0 1rem;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem;
  display: inline-block;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.tertiary};
  }

  &.active {
    color: ${({ theme }) => theme.tertiary};
  }

  @media (max-width: 768px) {
    margin: 1rem 0;
    width: 100%;
    text-align: center;
  }
`;

const ProgressBar = styled.div`
  height: 6px;
  background: ${({ theme }) => theme.tertiary};
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
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [progressBarProps, setProgressBarProps] = useState({ width: '0px', left: '0px' });
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
    console.log('Menu isOpen:', !isOpen);
  };

  const handleMouseEnter = (e) => {
    const { offsetLeft, offsetWidth } = e.target;
    setProgressBarProps({ left: `${offsetLeft}px`, width: `${offsetWidth}px` });
  };

  const handleMouseLeave = () => {
    setProgressBarProps({ width: '0px', left: '0px' });
  };

  useEffect(() => {
    const activeLink = document.querySelector(`a[href='${location.pathname}']`);
    if (activeLink) {
      const { offsetLeft, offsetWidth } = activeLink;
      setProgressBarProps({ left: `${offsetLeft}px`, width: `${offsetWidth}px` });
    }
  }, [location]);

  return (
    <Nav>
      <Logo>GymDiary</Logo>
      <Hamburger onClick={toggleMenu}>
        <Bar />
        <Bar />
        <Bar />
      </Hamburger>
      <NavLinks isOpen={isOpen}>
        {user ? (
          <>
            <NavLink 
              to="/home" 
              className={location.pathname === '/home' ? 'active' : ''} 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
            >
              Home
            </NavLink>
            <NavLink 
              to="/nutrition" 
              className={location.pathname === '/nutrition' ? 'active' : ''} 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
            >
              Nutrition
            </NavLink>
            <NavLink 
              to="/exercise" 
              className={location.pathname === '/exercise' ? 'active' : ''} 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
            >
              Exercise
            </NavLink>
            <NavLink 
              to="/metrics" 
              className={location.pathname === '/metrics' ? 'active' : ''} 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
            >
              Metrics
            </NavLink>
            <NavLink 
              to="/profile" 
              className={location.pathname === '/profile' ? 'active' : ''} 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
            >
              Profile
            </NavLink>
          </>
        ) : (
          <NavLink 
            to="/login" 
            className={location.pathname === '/login' ? 'active' : ''} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
          >
            Account
          </NavLink>
        )}
        <ProgressBar width={progressBarProps.width} left={progressBarProps.left} />
      </NavLinks>
      <ThemeToggle onClick={toggleTheme}>
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </ThemeToggle>
    </Nav>
  );
};

export default Navbar;

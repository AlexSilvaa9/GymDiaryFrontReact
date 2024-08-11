import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';

// Contenedor del Footer
const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  padding: 1rem 2rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  z-index: 1000;
  box-sizing: border-box; /* Asegura que el padding no cause desbordamiento */
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Contenido del Footer
const FooterContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center; /* Centra los bloques horizontalmente */
  align-items: center;
  margin: 0 auto; /* Centra el contenido dentro del contenedor */
  max-width: 1200px; /* Limita el ancho máximo del contenido */
  width: 100%; /* Asegura que el contenido no exceda el ancho del contenedor */
  box-sizing: border-box; /* Incluye el padding y border en el ancho total */
  
  @media (max-width: 768px) {
    flex-direction: column; /* Apila los bloques verticalmente en pantallas pequeñas */
  }
`;

// Bloque del Footer
const FooterBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 4rem; /* Espaciado horizontal entre bloques */
  
  @media (max-width: 768px) {
    margin: 0.5rem 0; /* Ajusta el espaciado en pantallas más pequeñas */
  }
`;

// Enlaces sociales
const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

// Enlace social
const SocialLink = styled.a`
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.tertiary}; /* Color al pasar el cursor */
  }
`;

// Texto del Footer
const FooterText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;

  a {
    color: inherit;
    text-decoration: none;
    margin: 0 0.5rem;
  }

  a:hover {
    color: ${({ theme }) => theme.tertiary}; /* Color al pasar el cursor */
  }
`;

// Componente Footer
const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterBlock>
          <FooterText>© 2024 FitTrack. All rights reserved.</FooterText>
        </FooterBlock>
        <FooterBlock>
          <SocialLinks>
            <SocialLink href="https://github.com" target="_blank" aria-label="GitHub">
              <FaGithub />
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" aria-label="Twitter">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="https://instagram.com" target="_blank" aria-label="Instagram">
              <FaInstagram />
            </SocialLink>
          </SocialLinks>
        </FooterBlock>
        <FooterBlock>
          <FooterText>
            <a href="/privacy-policy">Privacy Policy</a> | 
            <a href="/contact"> Contact</a>
          </FooterText>
        </FooterBlock>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

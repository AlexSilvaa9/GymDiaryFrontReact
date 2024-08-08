import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa'; // Importa íconos de redes sociales

const FooterContainer = styled.footer`
  background: ${colors.primary}; /* Color de fondo del footer */
  color: ${colors.text}; /* Color del texto */
  padding: 1rem 0; /* Reducido el padding para ocupar menos espacio vertical */
  width: 100%;
  position: relative;
  bottom: 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: row; /* Alinea los bloques principales en una fila */
  justify-content: space-between; /* Espacia los bloques principales horizontalmente */
  align-items: center; /* Centra los bloques verticalmente */
  text-align: center;
`;

const FooterBlock = styled.div`
  display: flex;
  flex-direction: column; /* Alinea los elementos internos en una columna */
  align-items: center; /* Centra los elementos internos horizontalmente */
`;

const SocialLinks = styled.div`
  display: flex; /* Usa flexbox para alinear los íconos en una fila */
  gap: 1rem; /* Espacio entre íconos */
  margin: 0; /* Elimina margen adicional para mantener el tamaño compacto */
`;

const SocialLink = styled.a`
  color: ${colors.text};
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.secondary}; /* Cambia el color al pasar el ratón */
  }
`;

const FooterText = styled.p`
  margin: 0;
  color: ${colors.text}; /* Asegura que el texto esté en el color correcto */
  font-size: 0.875rem; /* Tamaño de fuente reducido para un pie de página compacto */
`;

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
            <a href="/privacy-policy" style={{ color: colors.text, textDecoration: 'none' }}>Privacy Policy</a> | 
            <a href="/contact" style={{ color: colors.text, textDecoration: 'none' }}> Contact</a>
          </FooterText>
        </FooterBlock>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

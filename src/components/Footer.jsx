import React from "react";
import styled from "styled-components";
import colors from "../styles/colors";

const FooterContainer = styled.footer`
  background: ${colors.primary}; /* Morado pastel */
  color: ${colors.background}; /* Fondo claro pastel */
  text-align: center;
  padding: 1rem 0;
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2024 FitTrack. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
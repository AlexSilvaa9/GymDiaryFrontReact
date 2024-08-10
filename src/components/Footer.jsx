import React from "react";
import styled  from "styled-components";
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';


const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.primary}; /* Color de fondo del footer */
  color: ${({ theme }) => theme.text}; /* Color del texto */
  padding: 1rem 2rem;
  position: relative;
  width: 100%;
  bottom: 0;
  @media (max-width: 768px) {
    padding: 1rem;
    text-align: center;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FooterBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.terciary};
  }
`;

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
    color: ${({ theme }) => theme.terciary};
  }
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
            <a href="/privacy-policy">Privacy Policy</a> | 
            <a href="/contact"> Contact</a>
          </FooterText>
        </FooterBlock>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

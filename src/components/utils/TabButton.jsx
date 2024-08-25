import styled from 'styled-components';



// Styled Components
const TabButton = styled.button`
  color: ${({ active, theme }) => (active ? theme.tertiary : theme.text)};
  border: ${({ active, theme }) => (active ? `3px solid ${theme.tertiary}` : 'none')};
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  background: ${({ active, theme }) => active ? 'transparent' : theme.secondary};
  background-size: 400% 400%;
  background-position: 0% 0%;
  transition: 
    background-position 1s ease-out, 
    background-color 1s ease-out, 
    border 0.5s ease-out,
    color 0.5s ease-out;
   margin: 0.5rem; /* Agrega un margen general */

  &:hover {
    background-position: 100% 100%;
    background-color: ${({ active, theme }) => (active ? 'transparent' : theme.tertiary)};
    border: ${({ active, theme }) => (active ? `3px solid ${theme.tertiary}` : `3px solid ${theme.secondary}`)};
    color: ${({ active, theme }) => (active ? theme.tertiary : theme.text)};
  }

 @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    margin: 0.25rem; /* Reduce el margen en pantallas más pequeñas */
  }
`;



export default TabButton;
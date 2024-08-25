import styled from 'styled-components';

// Styled Components
const Button = styled.button`
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  background: ${({ theme }) => theme.secondary}; /* Gradiente radial inicial */
  background-size: 400% 400%; /* Aumenta el tamaño del gradiente para un movimiento más dramático */
  background-position: 0% 0%;
  transition: background-position 1s ease-out, background-color 1s ease-out;
  margin-top: 1rem;
  padding: 1.25rem 1.75rem;
  &:hover {
    background-position: 100% 100%; /* Cambia la posición del gradiente */
    background-color: ${({ theme }) => theme.tertiary}; /* Color sólido final */
  }
@media (max-width: 768px) {
    padding: 1rem 1.5rem;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1.25rem;
    font-size: 0.75rem;
  }
`;

export default Button;

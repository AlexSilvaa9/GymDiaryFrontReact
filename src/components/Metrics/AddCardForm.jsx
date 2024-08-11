// src/components/AddCardForm.js
import React, { useState } from 'react';
import styled from 'styled-components';

// Estilos para el contenedor del formulario
const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center; /* Centrar el texto en el formulario */
`;

// Estilos para los grupos de inputs
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Espacio entre los campos de input */
  width: 100%;
`;

// Estilos para los inputs
const Input = styled.input`
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 0.75rem;
  width: 100%;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
  }

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
  }
`;

// Estilos para el botón de envío
const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
    transform: scale(1.02);
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }
`;

// Estilos para el título del formulario
const FormTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  font-weight: bold;
`;

const AddCardForm = ({ setCards }) => {
  const [newCard, setNewCard] = useState({
    weight: '',
    bodyFat: '',
    muscle: '',
    period: 'all',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCard(prevCard => ({ ...prevCard, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCards(prevCards => [
      ...prevCards,
      { ...newCard, date: new Date().toISOString().split('T')[0] }
    ]);
    setNewCard({ weight: '', bodyFat: '', muscle: '', period: 'all' });
  };

  return (
    <FormContainer>
      <FormTitle>Add New Card</FormTitle>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            type="text"
            name="weight"
            placeholder="Weight (e.g., 70 kg)"
            value={newCard.weight}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="bodyFat"
            placeholder="Body Fat (e.g., 15%)"
            value={newCard.bodyFat}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="muscle"
            placeholder="Muscle Mass (e.g., 60 kg)"
            value={newCard.muscle}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <Button type="submit">Add Card</Button>
      </form>
    </FormContainer>
  );
};

export default AddCardForm;

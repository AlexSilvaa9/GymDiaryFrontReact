import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  text-align: center;
`;

// Estilos para los grupos de inputs
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

const AddCardForm = ({ fetchMetrics }) => {
  const [newMetric, setNewMetric] = useState({
    weight: '',
    bodyFat: '',
    height: '',
    bmi: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMetric(prevMetric => ({ ...prevMetric, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users/me/metrics', newMetric, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchMetrics(); // Refresca las métricas después de agregar una nueva
      setNewMetric({ weight: '', bodyFat: '', height: '', bmi: '', date: '' });
    } catch (error) {
      console.error('Error adding metric:', error.response?.data || error.message);
    }
  };
  
  return (
    <FormContainer>
      <FormTitle>Add New Metric</FormTitle>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            type="text"
            name="weight"
            placeholder="Weight (e.g., 70 kg)"
            value={newMetric.weight}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="bodyFat"
            placeholder="Body Fat (e.g., 15%)"
            value={newMetric.bodyFat}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="height"
            placeholder="Height (e.g., 175 cm)"
            value={newMetric.height}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="bmi"
            placeholder="BMI (e.g., 22.5)"
            value={newMetric.bmi}
            onChange={handleChange}
            required
          />
          <Input
            type="date"
            name="date"
            value={newMetric.date}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <Button type="submit">Add Metric</Button>
      </form>
    </FormContainer>
  );
};

export default AddCardForm;

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

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

// Estilos para los grupos de inputs
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 1rem 0;
`;

// Estilos para los inputs
const Input = styled.input`
  background: ${({ theme }) => theme.cardInput};
  color: ${({ theme }) => theme.cardText};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 0.75rem;
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: ${({ theme }) => theme.cardText};
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
  padding: 0.75rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 1rem;
  width: 100%;
  box-sizing: border-box;

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

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

// Estilos para el mensaje de advertencia
const WarningMessage = styled.p`
  color: ${({ theme }) => theme.danger};
  margin-top: 1rem;
  font-size: 1rem;
`;

const API_URL = process.env.REACT_APP_SERVER_NAME; // Usa REACT_APP_ como prefijo

const AddCardForm = ({ fetchMetrics }) => {
  const [newMetric, setNewMetric] = useState({
    weight: '',
    bodyFat: '',
    muscleMass: '',
    bodyWater: '',
    date: ''
  });

  const [warning, setWarning] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMetric(prevMetric => ({ ...prevMetric, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { weight, bodyFat, muscleMass, bodyWater, date } = newMetric;

    // Verificar si la fecha está vacía
    if (!date) {
      setWarning('La fecha es obligatoria.');
      return;
    }

    setWarning('');

    // Establecer valores predeterminados para los campos vacíos
    const metricToSubmit = {
      weight: weight.trim() === '' ? '0' : weight,
      bodyFat: bodyFat.trim() === '' ? '0' : bodyFat,
      muscleMass: muscleMass.trim() === '' ? '0' : muscleMass,
      bodyWater: bodyWater.trim() === '' ? '0' : bodyWater,
      date: date
    };

    try {
      let response= await axios.post(`${API_URL}/users/me/metrics`, metricToSubmit, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchMetrics(); // Refresca las métricas después de agregar una nueva
      setNewMetric({ weight: '', bodyFat: '', muscleMass: '', bodyWater: '', date: '' });
      if(response.status === 200) {
        alert('Metric added successfully');
      }
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
          />
          <Input
            type="text"
            name="bodyFat"
            placeholder="Body Fat (e.g., 15%)"
            value={newMetric.bodyFat}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="muscleMass"
            placeholder="Muscle Mass (e.g., 40%)"
            value={newMetric.muscleMass}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="bodyWater"
            placeholder="Body Water (e.g., 60%)"
            value={newMetric.bodyWater}
            onChange={handleChange}
          />
          <Input
            type="date"
            name="date"
            value={newMetric.date}
            onChange={handleChange}
          />
        </InputGroup>
        {warning && <WarningMessage>{warning}</WarningMessage>}
        <Button type="submit">Add Metric</Button>
      </form>
    </FormContainer>
  );
};

export default AddCardForm;

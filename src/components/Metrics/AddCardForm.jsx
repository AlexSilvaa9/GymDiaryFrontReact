import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Estilos para el contenedor del formulario
const FormContainer = styled.div`
  width: 100%;
  max-width: 600px; /* Establece un ancho máximo fijo para el formulario */
  margin: 0 auto;
  padding: 2rem;
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  /* Ajustes para pantallas más pequeñas */
  @media (max-width: 768px) {
    max-width: 90%; /* Ajusta el ancho máximo en pantallas más pequeñas */
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
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 0.75rem;
  width: 100%; /* Asegura que los inputs ocupen el 100% del ancho disponible */
  box-sizing: border-box; /* Incluye padding y borde en el ancho total */
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
  padding: 0.75rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 1rem;
  width: 100%; /* Asegura que el botón ocupe el 100% del ancho disponible */
  box-sizing: border-box; /* Incluye padding y borde en el ancho total */

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

  /* Ajusta el tamaño del texto en pantallas más pequeñas */
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const API_URL = process.env.REACT_APP_SERVER_NAME; // Usa REACT_APP_ como prefijo

const AddCardForm = ({ fetchMetrics }) => {
  const [newMetric, setNewMetric] = useState({
    weight: '',
    bodyFat: '',
    muscleMass: '',   // Nuevo campo
    bodyWater: '',    // Nuevo campo
    date: ''          // Campo de fecha
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMetric(prevMetric => ({ ...prevMetric, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/users/me/metrics`, newMetric, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchMetrics(); // Refresca las métricas después de agregar una nueva
      setNewMetric({ weight: '', bodyFat: '', muscleMass: '', bodyWater: '', date: '' });
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
            name="muscleMass"  // Nuevo input
            placeholder="Muscle Mass (e.g., 40%)"
            value={newMetric.muscleMass}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="bodyWater"  // Nuevo input
            placeholder="Body Water (e.g., 60%)"
            value={newMetric.bodyWater}
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

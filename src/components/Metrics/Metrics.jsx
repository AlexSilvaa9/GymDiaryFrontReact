import React, { useState, useEffect } from 'react';
import CardCarousel from './CardCarousel'; // Asegúrate de que la ruta sea correcta
import styled from 'styled-components';
import AddCardForm from './AddCardForm'; // Asegúrate de que la ruta sea correcta
import axios from 'axios';

// Estilos para los componentes
const Container = styled.div`
  padding: 2rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const TabButton = styled.button`
  background: ${({ active, theme }) => (active ? theme.primary : theme.secondary)};
  color: ${({ active, theme }) => (active ? theme.text : theme.secondaryText)};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.tertiary};
  }
`;

const Metrics = () => {
  const [activeTab, setActiveTab] = useState('viewCards');
  const [metrics, setMetrics] = useState([]);

  // Función para obtener métricas desde el backend
  const fetchMetrics = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users/me/metrics', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMetrics(response.data);
    } catch (error) {
      console.error('Error fetching metrics:', error.response?.data || error.message);
    }
  };
  

  useEffect(() => {
    if (activeTab === 'viewCards') {
      fetchMetrics();
    }
  }, [activeTab]);

  return (
    <Container>
      <TabContainer>
        <TabButton
          active={activeTab === 'viewCards'}
          onClick={() => setActiveTab('viewCards')}
        >
          View Metrics
        </TabButton>
        <TabButton
          active={activeTab === 'addCard'}
          onClick={() => setActiveTab('addCard')}
        >
          Add Metric
        </TabButton>
      </TabContainer>

      {activeTab === 'viewCards' ? (
        <CardCarousel cards={metrics} setCards={setMetrics} />
      ) : (
        <AddCardForm fetchMetrics={fetchMetrics} />
      )}
    </Container>
  );
};

export default Metrics;

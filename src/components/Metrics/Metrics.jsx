import React, { useState, useEffect } from 'react';
import CardCarousel from './CardCarousel'; // Asegúrate de que la ruta sea correcta
import styled from 'styled-components';
import AddCardForm from './AddCardForm'; // Asegúrate de que la ruta sea correcta
import axios from 'axios';
import Loading from '../Loading'; // Asegúrate de que la ruta del componente Loading es correcta

// Estilos para los componentes
const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Asegura que el contenedor ocupe toda la altura de la ventana */
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const Container = styled.div`
  flex: 1; /* Permite que el contenedor crezca para ocupar todo el espacio disponible */
  padding: 2rem;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;
const TabButton = styled.button`
  background: ${({ active, theme }) => (active ? 'transparent' : theme.primary)};
  color: ${({ active, theme }) => (active ? theme.tertiary : theme.text)};
  border: 3px solid ${({ active, theme }) => (active ? theme.tertiary : theme.primary)};
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0 0.5rem; /* Agrega un margen general */

  &:hover {
    background: ${({ active, theme }) => (active ? theme.tertiary : theme.secondary)};
    color: ${({ active, theme }) => (active ? theme.text : theme.text)};
    border: 3px solid ${({ active, theme }) => (active ? theme.tertiary : theme.tertiary)};
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    margin: 0 0.25rem; /* Reduce el margen en pantallas más pequeñas */
  }

`;
const NoMetricsMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.secondaryText};
  font-size: 1.2rem;
  margin-top: 2rem;
`;

const API_URL = process.env.REACT_APP_SERVER_NAME; // Usa REACT_APP_ como prefijo

const Metrics = () => {
  const [activeTab, setActiveTab] = useState('viewCards');
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(false); // Estado de carga

  // Función para obtener métricas desde el backend
  const fetchMetrics = async () => {
    setLoading(true); // Mostrar el loading al iniciar la carga
    try {
      const response = await axios.get(`${API_URL}/users/me/metrics`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMetrics(response.data);
    } catch (error) {
      console.error('Error fetching metrics:', error.response?.data || error.message);
    } finally {
      setLoading(false); // Ocultar el loading después de la carga
    }
  };

  useEffect(() => {
    if (activeTab === 'viewCards') {
      fetchMetrics();
    }
  }, [activeTab]);

  return (
    <AppWrapper>
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

        {loading ? ( // Mostrar loading mientras se cargan los datos
          <Loading />
        ) : activeTab === 'viewCards' ? (
          metrics.length === 0 ? (
            <NoMetricsMessage>You don't have any metrics yet.</NoMetricsMessage>
          ) : (
            <CardCarousel cards={metrics} setCards={setMetrics} />
          )
        ) : (
          <AddCardForm fetchMetrics={fetchMetrics} />
        )}
      </Container>
    </AppWrapper>
  );
};

export default Metrics;

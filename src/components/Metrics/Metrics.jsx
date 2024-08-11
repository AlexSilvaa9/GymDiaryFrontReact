// src/pages/Metrics.js
import React, { useState } from 'react';
import CardCarousel from './CardCarousel';
import styled from 'styled-components';
import AddCardForm from './AddCardForm';

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
  const [cards, setCards] = useState([
    { date: '2024-07-01', weight: '70 kg', bodyFat: '15%', muscle: '60 kg', period: 'lastMonth' },
    { date: '2024-06-15', weight: '72 kg', bodyFat: '16%', muscle: '62 kg', period: 'lastMonth' },
    { date: '2023-12-10', weight: '68 kg', bodyFat: '14%', muscle: '58 kg', period: 'lastYear' },
  ]);

  return (
    <Container>
      <TabContainer>
        <TabButton
          active={activeTab === 'viewCards'}
          onClick={() => setActiveTab('viewCards')}
        >
          View Cards
        </TabButton>
        <TabButton
          active={activeTab === 'addCard'}
          onClick={() => setActiveTab('addCard')}
        >
          Add Card
        </TabButton>
      </TabContainer>

      {activeTab === 'viewCards' ? (
        <CardCarousel cards={cards} setCards={setCards} />
      ) : (
        <AddCardForm setCards={setCards} />
      )}
    </Container>
  );
};

export default Metrics;

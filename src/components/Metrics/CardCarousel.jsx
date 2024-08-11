// src/components/CardCarousel.js
import React, { useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import Card from './Card'; // Asegúrate de tener un componente Card
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Estilos para los componentes
const CarouselContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Filters = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FilterButton = styled.button`
  background: ${({ active, theme }) => (active ? theme.primary : theme.secondary)};
  color: ${({ active, theme }) => (active ? theme.text : theme.secondaryText)};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.tertiary};
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
  padding: 1rem;
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const CardCarousel = ({ cards, setCards }) => {
  const [filter, setFilter] = useState('all');
  const [newCard, setNewCard] = useState({
    date: '',
    weight: '',
    bodyFat: '',
    muscle: '',
    period: 'all',
  });

  const filteredCards = cards.filter(card =>
    filter === 'all' || card.period === filter
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCard(prevCard => ({ ...prevCard, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCards(prevCards => [...prevCards, { ...newCard, date: new Date().toISOString().split('T')[0] }]);
    setNewCard({ date: '', weight: '', bodyFat: '', muscle: '', period: 'all' });
  };

  return (
    <div>
      <Filters>
        <FilterButton
          active={filter === 'all'}
          onClick={() => setFilter('all')}
        >
          All
        </FilterButton>
        <FilterButton
          active={filter === 'lastMonth'}
          onClick={() => setFilter('lastMonth')}
        >
          Last Month
        </FilterButton>
        <FilterButton
          active={filter === 'lastYear'}
          onClick={() => setFilter('lastYear')}
        >
          Last Year
        </FilterButton>
      </Filters>

      <CarouselContainer>
        <Slider {...settings}>
          {filteredCards.map((card, index) => (
            <Card
              key={index}
              date={card.date}
              weight={card.weight}
              bodyFat={card.bodyFat}
              muscle={card.muscle}
            />
          ))}
        </Slider>
      </CarouselContainer>
    </div>
  );
};

export default CardCarousel;

// src/components/CardCarousel.js
import React, { useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import Card from './Card'; // Importa el componente Card
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Estilos para el carrusel
const CarouselContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0; /* Elimina el padding alrededor del carrusel */
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

// Configuración del carrusel
const SliderWrapper = styled.div`
  .slick-slide {
    display: flex;
    justify-content: center;
    margin: 0 0.5rem; /* Ajusta la separación entre las tarjetas */
  }

  .slick-track {
    display: flex;
    align-items: center;
  }

  .slick-slide > div {
    margin: 0; /* Elimina el margen adicional en los slides */
  }
`;

const CardCarousel = ({ cards, setCards }) => {
  const [filter, setFilter] = useState('all');

  const getFilteredCards = () => {
    const today = new Date();

    return cards.filter(card => {
      const cardDate = new Date(card.date);

      if (filter === 'lastMonth') {
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        return cardDate >= lastMonth && cardDate <= today;
      }

      if (filter === 'lastYear') {
        const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        return cardDate >= lastYear && cardDate <= today;
      }

      return true; // 'all' or unrecognized filter
    });
  };

  const filteredCards = getFilteredCards();

  const settings = {
    dots: true,
    infinite: false, // Desactivar el carrusel infinito
    speed: 500,
    slidesToShow: filteredCards.length > 1 ? 3 : filteredCards.length, // Mostrar todas las tarjetas si hay una sola
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: filteredCards.length > 1 ? 3 : filteredCards.length,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: filteredCards.length > 1 ? 2 : filteredCards.length,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: filteredCards.length > 1 ? 1 : filteredCards.length,
          slidesToScroll: 1,
        },
      },
    ],
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
        <SliderWrapper>
          <Slider {...settings}>
            {filteredCards.map((card, index) => (
              <Card
                key={index}
                date={card.date}
                weight={card.weight}
                bodyFat={card.bodyFat}
                muscleMass={card.muscleMass}
                bodyWater={card.bodyWater}
              />
            ))}
          </Slider>
        </SliderWrapper>
      </CarouselContainer>
    </div>
  );
};

export default CardCarousel;

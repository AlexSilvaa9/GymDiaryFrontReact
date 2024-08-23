import React, { useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import Card from './Card';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'; // Asegúrate de tener axios instalado

// Estilos para el carrusel
const CarouselContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
`;

const Filters = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FilterButton = styled.button`
  background: ${({ active, theme }) => (active ? theme.secondary : theme.primary)};
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

const SliderWrapper = styled.div`
  .slick-slide {
    display: flex;
    justify-content: center;
    margin: 0 0.5rem; /* Ajusta el margen entre las cartas */
  }

  .slick-track {
    display: flex;
    align-items: center;
  }

  .slick-slide > div {
    margin: 0;
    width: 100%; /* Asegúrate de que las cartas ocupen todo el espacio disponible */
  }

  .slick-list {
    margin: 0 -0.5rem; /* Ajusta el margen para evitar el recorte */
  }
`;

const CardsList = styled.div`
  display: none; /* Oculta por defecto el listado de tarjetas */

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const LoadMoreButton = styled.button`
  display: none; /* Oculta el botón por defecto */

  @media (max-width: 600px) {
    display: block; /* Muestra el botón solo en pantallas pequeñas */
    margin: 1rem auto;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s ease;

    &:hover {
      background: ${({ theme }) => theme.secondary};
    }
  }
`;

// Estilos para las gráficas
const ChartContainer = styled.div`
  margin-top: 2rem;
  width: 100%; /* Ajuste al 100% del contenedor */
  max-width: 1200px;
  margin: 0 auto;
`;

// Aplica los colores del tema a las líneas del gráfico
const LineChartStyled = styled(LineChart)`
  .recharts-cartesian-grid line {
    stroke: ${({ theme }) => theme.secondaryText}; // Líneas de la cuadrícula
  }
  .recharts-xAxis .recharts-cartesian-axis-line {
    stroke: ${({ theme }) => theme.secondaryText}; // Línea del eje X
  }
  .recharts-yAxis .recharts-cartesian-axis-line {
    stroke: ${({ theme }) => theme.secondaryText}; // Línea del eje Y
  }
`;

const API_URL = process.env.REACT_APP_SERVER_NAME;

const CardCarousel = ({ cards, setCards }) => {
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(4); // Número inicial de tarjetas visibles

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

  const handleDelete = async (date) => {
    try {
      const response = await fetch(`${API_URL}/users/me/metrics`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ date }),
      });

      if (response.ok) {
        // Actualiza el estado para eliminar la métrica localmente si la eliminación en el servidor fue exitosa
        setCards(prevCards => prevCards.filter(card => card.date !== date));
      } else {
        console.error('Error deleting metric:', await response.text());
      }
    } catch (error) {
      console.error('Error deleting metric:', error);
    }
  };

  const filteredCards = getFilteredCards();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: filteredCards.length > 1 ? 3 : filteredCards.length,
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

  const chartData = filteredCards.map(card => ({
    date: new Date(card.date).toLocaleDateString(),
    weight: card.weight,
    bodyFat: card.bodyFat,
    muscleMass: card.muscleMass,
    bodyWater: card.bodyWater,
  }));

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };

  return (
    <div>
      <Filters>
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
          All
        </FilterButton>
        <FilterButton active={filter === 'lastMonth'} onClick={() => setFilter('lastMonth')}>
          Last Month
        </FilterButton>
        <FilterButton active={filter === 'lastYear'} onClick={() => setFilter('lastYear')}>
          Last Year
        </FilterButton>
      </Filters>

      <CarouselContainer>
        <SliderWrapper>
          <Slider {...settings}>
            {filteredCards.slice(0, visibleCount).map((card, index) => (
              <Card
                key={index}
                date={card.date}
                weight={card.weight}
                bodyFat={card.bodyFat}
                muscleMass={card.muscleMass}
                bodyWater={card.bodyWater}
                onDelete={handleDelete}
              />
            ))}
          </Slider>
        </SliderWrapper>
        <CardsList>
          {filteredCards.slice(0, visibleCount).map((card, index) => (
            <Card
              key={index}
              date={card.date}
              weight={card.weight}
              bodyFat={card.bodyFat}
              muscleMass={card.muscleMass}
              bodyWater={card.bodyWater}
              onDelete={handleDelete}
            />
          ))}
        </CardsList>
        <LoadMoreButton show={filteredCards.length > visibleCount} onClick={handleLoadMore}>
          Load More
        </LoadMoreButton>
      </CarouselContainer>

      <ChartContainer>
        <ResponsiveContainer width="100%" height={400}>
          <LineChartStyled data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="weight" stroke="#A8D5BA" /> {/* Verde pastel */}
            <Line type="monotone" dataKey="bodyFat" stroke="#B9E3C6" /> {/* Verde más claro */}
            <Line type="monotone" dataKey="muscleMass" stroke="#D9EAD3" /> {/* Verde pastel suave */}
            <Line type="monotone" dataKey="bodyWater" stroke="#FFDA76" /> {/* Amarillo pálido */}
          </LineChartStyled>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default CardCarousel;

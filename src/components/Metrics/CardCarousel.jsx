import React, { useState, useContext } from 'react';
import Slider from 'react-slick';
import styled, { ThemeContext } from 'styled-components';
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

  @media (max-width: 600px) {
    display: none; /* Oculta el carrusel en pantallas pequeñas */
  }
`;

const CardsList = styled.div`
  display: none; /* Oculta por defecto el listado de tarjetas */

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin: 0;
    padding: 0;
  }
`;

const LoadMoreButton = styled.button`
  display: ${({ show }) => (show ? 'block' : 'none')};
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

  @media (min-width: 601px) {
    display: none; /* Oculta el botón en pantallas grandes */
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
  const theme = useContext(ThemeContext); // Accede al tema

  const getFilteredCards = () => {
    const today = new Date();

    let filtered = cards.filter(card => {
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

    // Ordenar las tarjetas por fecha en orden descendente
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
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
  const cardsToShow = filteredCards.slice(0, visibleCount);

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

  const hasMoreToLoad = filteredCards.length > visibleCount;

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
        {/* Mostrar solo el carrusel en pantallas grandes */}
        <SliderWrapper>
          <Slider {...settings}>
            {cardsToShow.map((card, index) => (
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

        {/* Mostrar solo la lista en pantallas pequeñas */}
        <CardsList>
          {cardsToShow.map((card, index) => (
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

        <LoadMoreButton show={hasMoreToLoad} onClick={handleLoadMore}>
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
            <Line type="monotone" dataKey="weight" stroke={theme.text} /> {/* Color de peso */}
            <Line type="monotone" dataKey="bodyFat" stroke='#FFDA76' /> {/* Color de grasa corporal */}
            <Line type="monotone" dataKey="muscleMass" stroke="#C7253E" /> {/* Color de masa muscular */}
            <Line type="monotone" dataKey="bodyWater" stroke="#3FA2F6" /> {/* Color de agua corporal */}
          </LineChartStyled>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default CardCarousel;

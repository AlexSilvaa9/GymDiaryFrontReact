import React, { useState, useContext } from 'react';
import Slider from 'react-slick';
import styled, { ThemeContext } from 'styled-components';
import Card from './Card';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import FilterButton from '../utils/TabButton' ;
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



const SliderWrapper = styled.div`
  .slick-slide {
    display: flex;
    justify-content: center;
    margin: 0 0.5rem;
  }

  .slick-track {
    display: flex;
    align-items: center;
  }

  .slick-slide > div {
    margin: 0;
    width: 100%;
  }

  .slick-list {
    margin: 0 -0.5rem;
  }
`;

const CardsList = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin: 0;
    padding: 0;
  }
`;

const ChartContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const LineChartStyled = styled(LineChart)`
  .recharts-cartesian-grid line {
    stroke: ${({ theme }) => theme.secondaryText};
  }
  .recharts-xAxis .recharts-cartesian-axis-line {
    stroke: ${({ theme }) => theme.secondaryText};
  }
  .recharts-yAxis .recharts-cartesian-axis-line {
    stroke: ${({ theme }) => theme.secondaryText};
  }
`;

const API_URL = process.env.REACT_APP_SERVER_NAME;

const CardCarousel = ({ cards, setCards }) => {
  const [filter, setFilter] = useState('all');
  const theme = useContext(ThemeContext);

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

      return true;
    });

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
        setCards(prevCards => prevCards.filter(card => card.date !== date));
      } else {
        console.error('Error deleting metric:', await response.text());
      }
    } catch (error) {
      console.error('Error deleting metric:', error);
    }
  };

  const filteredCards = getFilteredCards();
  const chartData = filteredCards.map(card => ({
    date: new Date(card.date).toLocaleDateString(),
    weight: card.weight,
    bodyFat: card.bodyFat,
    muscleMass: card.muscleMass,
    bodyWater: card.bodyWater,
  }));

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: filteredCards.length > 1 ? 3 : 1, // Ajustar según el número de tarjetas
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: filteredCards.length > 1 ? 3 : 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: filteredCards.length > 1 ? 2 : 1,
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
            {filteredCards.map((card, index) => (
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
          {filteredCards.map((card, index) => (
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
      </CarouselContainer>

      <ChartContainer>
        <ResponsiveContainer width="100%" height={400}>
          <LineChartStyled data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="weight" stroke={theme.text} />
            <Line type="monotone" dataKey="bodyFat" stroke='#FFDA76' />
            <Line type="monotone" dataKey="muscleMass" stroke="#C7253E" />
            <Line type="monotone" dataKey="bodyWater" stroke="#3FA2F6" />
          </LineChartStyled>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default CardCarousel;

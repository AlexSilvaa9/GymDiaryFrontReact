import React from 'react';
import styled from 'styled-components';

// Styled Components
const MealsList = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 2rem;
`;

const MealCard = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.cardText};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  & > h3 {
    margin: 0;
    color: ${({ theme }) => theme.cardTitle};
  }

  & > p {
    margin: 0.25rem 0;
    color: ${({ theme }) => theme.cardText};
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.secondary};
  }
`;

const StatsSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 2rem;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.cardText};
`;

const CardTitle = styled.h2`
  color: ${({ theme }) => theme.cardTitle};
`;

const MealsView = ({ meals, stats, handleDeleteMeal, selectedDate }) => (
  <>
    <StatsSection>
      <CardTitle>Resume for {new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}</CardTitle>
      <p>Total Calories: {stats.totalCalories} kcal</p>
      <p>Total Protein: {stats.totalProtein} g</p>
      <p>Total Carbs: {stats.totalCarbs} g</p>
      <p>Total Fats: {stats.totalFats} g</p>
    </StatsSection>

    <MealsList>
      {meals.length > 0 ? (
        meals.map((meal, index) => (
          <MealCard key={index}>
            <DeleteButton onClick={() => handleDeleteMeal(meal)}>×</DeleteButton>
            <h3>{meal.name}</h3>
            <p>Calories: {meal.calories}</p>
            <p>Protein: {meal.macros.protein}g</p>
            <p>Carbs: {meal.macros.carbs}g</p>
            <p>Fats: {meal.macros.fats}g</p>
          </MealCard>
        ))
      ) : (
        <MealCard>No meals recorded for this day.</MealCard>
      )}
    </MealsList>
  </>
);

export default MealsView;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Loading from '../Loading';
import MealForm from './AddMeal';
import MealsView from './ViewMeals';
import TabButton from '../utils/TabButton';
import CalendarWrapper from '../utils/CalendarWrapper';
// Styled Components
const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const Container = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
`;

const Tabs = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
  justify-content: space-between;
`;





const API_URL = process.env.REACT_APP_SERVER_NAME;

const Nutrition = () => {
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('0');
  const [protein, setProtein] = useState('0');
  const [carbs, setCarbs] = useState('0');
  const [fats, setFats] = useState('0');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('viewMeals');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const adjustedDate = new Date(selectedDate);
        adjustedDate.setDate(adjustedDate.getDate() + 1);

        const response = await fetch(`${API_URL}/users/me/meals?date=${adjustedDate.toISOString().split('T')[0]}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMeals(data);
        } else {
          console.error('Failed to fetch meals');
        }
      } catch (error) {
        console.error('Error fetching meals:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchMeals();
    }
  }, [selectedDate, token]);

  const handleAddMeal = async () => {
    if (mealName && calories && protein && carbs && fats) {
      const adjustedDate = new Date(selectedDate);
      adjustedDate.setDate(adjustedDate.getDate() + 1);

      const newMeal = {
        date: adjustedDate.toISOString().split('T')[0],
        name: mealName,
        calories: parseInt(calories, 10),
        macros: {
          protein: parseFloat(protein),
          carbs: parseFloat(carbs),
          fats: parseFloat(fats),
        },
      };

      try {
        const response = await fetch(`${API_URL}/users/me/meals`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newMeal),
        });

        if (response.ok) {
          setMealName('');
          setCalories('0');
          setProtein('0');
          setCarbs('0');
          setFats('0');
          setMeals((prevMeals) => [...prevMeals, newMeal]);
          alert('Meal added successfully');
        } else {
          console.error('Failed to add meal');
        }
      } catch (error) {
        console.error('Error adding meal:', error);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleDeleteMeal = async (mealToDelete) => {
    const adjustedDate = new Date(selectedDate);
    adjustedDate.setDate(adjustedDate.getDate() + 1);

    try {
      const response = await fetch(`${API_URL}/users/me/meals`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: adjustedDate.toISOString().split('T')[0],
          name: mealToDelete.name,
        }),
      });

      if (response.ok) {
        setMeals((prevMeals) => prevMeals.filter(meal => meal.name !== mealToDelete.name));
      } else {
        console.error('Failed to delete meal');
      }
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  const calculateStats = () => {
    return meals.reduce(
      (acc, meal) => {
        acc.totalCalories += meal.calories;
        acc.totalProtein += meal.macros.protein;
        acc.totalCarbs += meal.macros.carbs;
        acc.totalFats += meal.macros.fats;
        return acc;
      },
      { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFats: 0 }
    );
  };

  const stats = calculateStats();

  return (
    <AppWrapper>
      <Container>
        <Title>Meal Tracker</Title>

        <CalendarWrapper>
          <Calendar
            onChange={(date) => setSelectedDate(date)}
            value={selectedDate}
            tileClassName={({ date }) =>
              meals.some((meal) => meal.date === new Date(date.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0])
                ? 'has-meal'
                : null
            }
          />
        </CalendarWrapper>

        <Tabs>
          <TabButton active={view === 'viewMeals'} onClick={() => setView('viewMeals')}>
            View Meals
          </TabButton>
          <TabButton active={view === 'addMeal'} onClick={() => setView('addMeal')}>
            Add Meal
          </TabButton>
        </Tabs>

        {loading ? (
          <Loading />
        ) : (
          <>
            {view === 'addMeal' && (
              <MealForm
                mealName={mealName}
                setMealName={setMealName}
                calories={calories}
                setCalories={setCalories}
                protein={protein}
                setProtein={setProtein}
                carbs={carbs}
                setCarbs={setCarbs}
                fats={fats}
                setFats={setFats}
                handleAddMeal={handleAddMeal}
              />
            )}

            {view === 'viewMeals' && (
              <MealsView
                meals={meals}
                stats={stats}
                handleDeleteMeal={handleDeleteMeal}
                selectedDate={selectedDate}
              />
            )}
          </>
        )}
      </Container>
    </AppWrapper>
  );
};

export default Nutrition;

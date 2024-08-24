import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Loading from '../Loading'; // Importa el componente Loading

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

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
`;

const Input = styled.input`
  background-color: ${({ theme }) => theme.cardInput};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 5px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => theme.secondaryText};
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
  margin-top: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const CalendarWrapper = styled.div`
  margin: 1rem 0;

  .react-calendar {
    border: none;
    background: ${({ theme }) => theme.calendarBackground};
    color: ${({ theme }) => theme.calendarText};
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .react-calendar__tile {
    border-radius: 4px;
    padding: 0.5rem;
    font-size: 0.9rem;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .react-calendar__tile--active {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
  }

  .react-calendar__tile--active:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
  }

  .react-calendar__tile--hasActive {
    background: ${({ theme }) => theme.secondary};
  }

  .react-calendar__tile--hasActive:hover {
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.text};
  }

  .react-calendar__tile:hover {
    background: ${({ theme }) => theme.tertiary};
    color: ${({ theme }) => theme.secondaryText};
  }

  .react-calendar__month-view__days__day {
    color: ${({ theme }) => theme.calendarText};
  }

  .react-calendar__navigation__label {
    color: ${({ theme }) => theme.calendarText};
  }

  .react-calendar__navigation__arrow {
    fill: ${({ theme }) => theme.calendarText};
  }
`;

const MealsList = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 2rem;
`;

const MealCard = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
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

const Tabs = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
  justify-content: space-between;
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
  font-size: 1.15rem;

  &:hover {
    background: ${({ active, theme }) => (active ? theme.tertiary : theme.secondary)};
    color: ${({ active, theme }) => (active ? theme.text : theme.text)};
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

const API_URL = process.env.REACT_APP_SERVER_NAME;

const Nutrition = () => {
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
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
          setCalories('');
          setProtein('');
          setCarbs('');
          setFats('');
          setMeals((prevMeals) => [...prevMeals, newMeal]);
        } else {
          console.error('Failed to add meal');
        }
      } catch (error) {
        console.error('Error adding meal:', error);
      }
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
              <Form>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Meal Name"
                    value={mealName}
                    onChange={(e) => setMealName(e.target.value)}
                    required
                  />
                  <Input
                    type="number"
                    placeholder="Calories"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    required
                  />
                  <Input
                    type="number"
                    placeholder="Protein (g)"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                    required
                  />
                  <Input
                    type="number"
                    placeholder="Carbs (g)"
                    value={carbs}
                    onChange={(e) => setCarbs(e.target.value)}
                    required
                  />
                  <Input
                    type="number"
                    placeholder="Fats (g)"
                    value={fats}
                    onChange={(e) => setFats(e.target.value)}
                    required
                  />
                </InputGroup>
                <Button onClick={handleAddMeal}>Add Meal</Button>
              </Form>
            )}

            {view === 'viewMeals' && (
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
            )}
          </>
        )}
      </Container>
    </AppWrapper>
  );
};

export default Nutrition;
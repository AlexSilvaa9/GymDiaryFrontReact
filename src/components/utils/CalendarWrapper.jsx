import styled from 'styled-components';
const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  width: 100%;
  max-width: 100%; // Asegúrate de que el calendario no se expanda más allá del contenedor
  overflow: hidden; // Oculta cualquier contenido desbordado

  .react-calendar {
    border: none;
    background: ${({ theme }) => theme.calendarBackground}; /* Fondo del calendario */
    color: ${({ theme }) => theme.calendarText}; /* Texto del calendario */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    max-width: 100%; // Ajusta el ancho máximo del calendario
  }

  .react-calendar__tile {
    border-radius: 4px;
    padding: 0.5rem;
    font-size: 0.9rem;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .react-calendar__tile--active {
    background: ${({ theme }) => theme.tertiary}; /* Fondo para la fecha activa */
    color: ${({ theme }) => theme.text}; /* Texto para la fecha activa */
  }

  .react-calendar__tile--active:hover {
    background: ${({ theme }) => theme.tertiary}; /* Fondo para la fecha activa al hacer hover */
    color: ${({ theme }) => theme.text}; /* Texto para la fecha activa al hacer hover */
  }

  .react-calendar__tile--hasActive {
    background: ${({ theme }) => theme.secondary}; /* Fondo para las fechas con eventos */
  }

  .react-calendar__tile--hasActive:hover {
    background: ${({ theme }) => theme.secondary}; /* Fondo para las fechas con eventos al hacer hover */
    color: ${({ theme }) => theme.text}; /* Texto para las fechas con eventos al hacer hover */
  }

  .react-calendar__tile:hover {
    background: ${({ theme }) => theme.hoverBackground}; /* Fondo para los días al hacer hover */
    color: ${({ theme }) => theme.hoverText}; /* Texto para los días al hacer hover */
  }

  .react-calendar__month-view__days__day {
    color: ${({ theme }) => theme.calendarText}; /* Texto de los días del mes */
  }

  .react-calendar__navigation__label {
    color: ${({ theme }) => theme.calendarText}; /* Texto de los encabezados de mes/año */
  }

  .react-calendar__navigation__arrow {
    fill: ${({ theme }) => theme.calendarText}; /* Flechas de navegación */
  }
`;
export default CalendarWrapper;
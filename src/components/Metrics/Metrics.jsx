import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarWrapper = styled.div`
    margin: 1rem 0;
`;

const MetricsForm = styled.div`
    width: 100%;
    max-width: 600px;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
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

const Metrics = () => {
    const [metrics, setMetrics] = useState({
        weight: '70 kg',
        bodyFat: '15%',
        muscle: '60 kg',
    });
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [log, setLog] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMetrics(prevMetrics => ({ ...prevMetrics, [name]: value }));
    };

    const handleSaveMetrics = () => {
        const today = selectedDate.toISOString().split('T')[0];
        setLog(prevLog => [
            ...prevLog,
            { date: today, ...metrics }
        ]);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <MetricsForm>
            <InputGroup>
                <Input
                    type="text"
                    name="weight"
                    placeholder="Weight (e.g., 70 kg)"
                    value={metrics.weight}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    name="bodyFat"
                    placeholder="Body Fat (e.g., 15%)"
                    value={metrics.bodyFat}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    name="muscle"
                    placeholder="Muscle Mass (e.g., 60 kg)"
                    value={metrics.muscle}
                    onChange={handleChange}
                />
            </InputGroup>
            <Button onClick={handleSaveMetrics}>Save Metrics</Button>
            <CalendarWrapper>
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                />
            </CalendarWrapper>
        </MetricsForm>
    );
};

export default Metrics;

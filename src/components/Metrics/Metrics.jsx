import React from 'react';
import styled from 'styled-components';
import BiometricScanner from '../animations/BiometricScanner'; // Ajusta la ruta si es necesario

// Estilo para el contenedor de las métricas
const MetricsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center; /* Centra verticalmente los elementos en el contenedor */
    padding: 2rem; /* Añade algo de espacio alrededor */
    width: 100%; /* Ajusta al tamaño del contenedor padre */
    box-sizing: border-box; /* Incluye el padding en el tamaño total */
`;

// Estilo para el contenedor del BiometricScanner
const ScannerContainer = styled.div`
    width: 300px; /* Ajusta el tamaño fijo */
    height: 300px; /* Ajusta el tamaño fijo */
    position: relative; /* Asegura que el contenedor esté en una capa separada */
    overflow: hidden; /* Evita el desbordamiento */
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0; /* Ajusta el color de fondo si es necesario */
    border-radius: 10px; /* Añade bordes redondeados si es deseado */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Añade una sombra */
`;

// Estilo para el componente BiometricScanner
const StyledBiometricScanner = styled(BiometricScanner)`
    width: 100%; /* Ajusta al tamaño del contenedor */
    height: 100%; /* Ajusta al tamaño del contenedor */
    object-fit: contain; /* Mantiene la proporción de la imagen */
`;

const Metrics = () => {
    return (
        <MetricsContainer>
            {/* Left side: BiometricScanner */}
            <ScannerContainer>
                <StyledBiometricScanner />
            </ScannerContainer>

            {/* Right side: Metrics data */}
            <div>
                <p>Weight: 70 kg</p>
                <p>Body Fat: 15%</p>
                <p>Muscle: 60 kg</p>
                {/* Add more metrics data as needed */}
            </div>
        </MetricsContainer>
    );
};

export default Metrics;

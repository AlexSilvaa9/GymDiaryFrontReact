import React from 'react';
import styled from 'styled-components';
import BiometricScanner from '../animations/BiometricScanner'; // Ajusta la ruta si es necesario

// Colores actualizados para el modo oscuro
const colors = {
    background: "#1e1e1e", // Fondo oscuro
    text: "#e0e0e0", // Texto claro
    secondaryText: "#c0c0c0", // Texto secundario
    primary: "#ffffff", // Color principal (blanco)
    secondary: "#3f3f3f", // Color secundario (gris oscuro)
    terciary: "#0a74da" // Color terciario
};

// Contenedor principal para las métricas
const MetricsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    width: 100%;
    min-height: 70vh; /* Asegura suficiente altura */
    background: ${colors.background}; /* Fondo oscuro */

    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
    position: relative; /* Permite colocar elementos adicionales */
`;

// Contenedor para la primera parte con línea divisoria
const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    margin-bottom: 2rem; /* Espacio entre la primera y la segunda parte */
`;

// Estilo para la animación biométrica
const ScannerContainer = styled.div`
    width: 45%; /* Ancho reducido para dejar espacio para la línea divisoria */
    height: 300px;
    background: ${colors.secondary}; /* Fondo de la animación */
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    margin-right: 2rem; /* Espacio entre el escáner y la línea divisoria */
`;

const StyledBiometricScanner = styled(BiometricScanner)`
    width: 100%;
    height: 100%;
    object-fit: cover; /* Mantiene la proporción de la imagen */
`;

// Línea divisoria
const Divider = styled.div`
    width: 2px;
    height: 300px; /* Altura igual a la del escáner */
    background: ${colors.secondaryText}; /* Color de la línea divisoria */
    margin: 0 2rem; /* Espacio a ambos lados de la línea divisoria */
`;

// Contenedor para los datos de métricas
const MetricsData = styled.div`
    width: 45%; /* Ancho reducido para dejar espacio para la línea divisoria */
    color: ${colors.text};
    text-align: center;
    font-family: 'Roboto', sans-serif;
    padding: 1rem;
`;

// Título y subtítulo de la sección
const SectionTitle = styled.h2`
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: ${colors.primary};
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
`;

const SectionSubtitle = styled.h3`
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: ${colors.secondaryText};
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
`;

// Contenedor para cada métrica individual
const MetricItem = styled.div`
    background: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    padding: 1rem;
    margin: 0.5rem 0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    transition: background 0.3s ease, transform 0.3s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: scale(1.05);
    }
`;

const MetricTitle = styled.h4`
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: ${colors.primary};
`;

const MetricValue = styled.p`
    font-size: 1rem;
    color: ${colors.secondaryText};
`;

// Contenedor para gráficos y recomendaciones
const AdditionalInfo = styled.div`
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
`;

const InfoCard = styled.div`
    background: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    padding: 1rem;
    width: 100%;
    max-width: 400px;
    margin-bottom: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    text-align: center;
`;

const InfoTitle = styled.h4`
    font-size: 1.2rem;
    color: ${colors.primary};
    margin-bottom: 0.5rem;
`;

const InfoText = styled.p`
    font-size: 1rem;
    color: ${colors.secondaryText};
`;

// Componente de métricas
const Metrics = () => {
    return (
        <MetricsContainer>
            <SectionTitle>Your Biometric Data</SectionTitle>
            <SectionSubtitle>Track and monitor your health metrics</SectionSubtitle>
            
            {/* Contenedor principal con línea divisoria */}
            <ContentWrapper>
                {/* Animación biométrica */}
                <ScannerContainer>
                    <StyledBiometricScanner />
                </ScannerContainer>

                {/* Línea divisoria */}
                <Divider />

                {/* Datos de métricas */}
                <MetricsData>
                    <MetricItem>
                        <MetricTitle>Weight</MetricTitle>
                        <MetricValue>70 kg</MetricValue>
                    </MetricItem>
                    <MetricItem>
                        <MetricTitle>Body Fat</MetricTitle>
                        <MetricValue>15%</MetricValue>
                    </MetricItem>
                    <MetricItem>
                        <MetricTitle>Muscle</MetricTitle>
                        <MetricValue>60 kg</MetricValue>
                    </MetricItem>
                    {/* Add more metrics data as needed */}
                </MetricsData>
            </ContentWrapper>

            {/* Información adicional y recomendaciones */}
            <AdditionalInfo>
                <InfoCard>
                    <InfoTitle>Stay Hydrated</InfoTitle>
                    <InfoText>Drinking water helps with muscle recovery and overall health.</InfoText>
                </InfoCard>
                <InfoCard>
                    <InfoTitle>Exercise Regularly</InfoTitle>
                    <InfoText>Regular exercise improves cardiovascular health and overall fitness.</InfoText>
                </InfoCard>
                <InfoCard>
                    <InfoTitle>Balanced Diet</InfoTitle>
                    <InfoText>A balanced diet provides the necessary nutrients for energy and recovery.</InfoText>
                </InfoCard>
            </AdditionalInfo>
        </MetricsContainer>
    );
};

export default Metrics;

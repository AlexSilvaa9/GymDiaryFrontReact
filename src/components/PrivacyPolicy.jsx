import React from 'react';
import styled from 'styled-components';

// Estilos para el aviso de exclusión de responsabilidad
const DisclaimerWrapper = styled.div`
  padding: 2rem;
  background: ${({ theme }) => theme.background};
  border: 1px solid #e2e6ea;
  border-radius: 5px;
  margin: 1rem 0;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  heihgt: 100%;
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    margin: 0.5rem 0;
  }
`;

const Disclaimer = () => {
  return (
    <DisclaimerWrapper>
      <h2>Disclaimer</h2>
     
      <p><strong>No Warranty</strong></p>
      <p>This software is provided "as is" and without any warranty of any kind, express or implied. GymDiary makes no representations or warranties regarding the accuracy, reliability, or completeness of the software. Use of this software is entirely at your own risk.</p>
      <p><strong>Free Software</strong></p>
      <p>This software is distributed as free software, which means that it is available for use, modification, and distribution by anyone. We make no guarantees regarding its suitability for any particular purpose. By using this software, you acknowledge that it is provided without any support or updates.</p>
      <p><strong>Demo Version</strong></p>
      <p>Please note that this is a demo version of the software. It is intended for demonstration purposes only and may not include all features or functionalities of the final version. We are not responsible for any issues or damages arising from the use of this demo version.</p>
      <p><strong>Limitation of Liability</strong></p>
      <p>In no event shall GymDiary be liable for any damages, including but not limited to, indirect, incidental, special, or consequential damages, or loss of profits or data, arising from or related to your use of this software.</p>
     
    </DisclaimerWrapper>
  );
};

export default Disclaimer;

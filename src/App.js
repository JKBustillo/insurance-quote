import React, { useState } from 'react';
import Header from './components/Header';
import styled from '@emotion/styled';
import Form from './components/Form';
import Resumen from './components/Resumen';
import Resultado from './components/Resultado';

const Contenedor = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const ContenedorForm = styled.div`
  background-color: #FFFFFF;
  padding: 3rem;
`;

function App() {
  const [resumen, setResumen] = useState({
    cotizacion: 0,
    datos: {
      marca: '',
      year: '',
      plan: ''
    }
  });

  const { cotizacion, datos } = resumen;

  return (
    <Contenedor>
      <Header titulo="Cotizador de seguros" />

      <ContenedorForm>
        <Form setResumen={setResumen} />
        <Resumen datos={datos} />
        <Resultado cotizacion={cotizacion} />
      </ContenedorForm>
    </Contenedor>
  );
}

export default App;

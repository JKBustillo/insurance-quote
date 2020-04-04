import React, { useState } from 'react';
import styled from '@emotion/styled';
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from '../helper';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1em;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Boton = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #FFFFFF;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;

    &:hover {
        cursor: pointer;
        background-color: #26C6DA;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
`;

const Form = ({ setResumen, setCargando }) => {
    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: '',
    });
    const [error, setError] = useState(false);

    const { marca, year, plan } = datos;

    const getInfo = e => {
        setDatos({...datos, [e.target.name]: e.target.value });
    };

    // Cuando se haga submit
    const cotizarSeguro = e => {
        e.preventDefault();

        if (marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
            setError(true);
            return;
        }

        setError(false);

        // Valor base
        let resultado = 2000;

        // Obtiene los años de diferencia con el actual
        const diferencia = obtenerDiferenciaYear(year);

        // Resta 3% por cada año de antigüedad
        resultado -= ((diferencia * 3) * resultado) / 100;

        // Calcula el aumento según la marca
        resultado = resultado * calcularMarca(marca);

        // Calcula el aumento del plan
        resultado = parseFloat(resultado*obtenerPlan(plan)).toFixed(2);

        setCargando(true);

        setTimeout(() => {
            setCargando(false);
            // Pasar resultado al App.js
            setResumen({
                cotizacion: resultado,
                datos
            });
        }, 1000);
    };

    return (
        <form onSubmit={cotizarSeguro}>
            { error ? <Error>Todos los campos son obligatorios.</Error> : null }

            <Campo>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={getInfo}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={getInfo}
                >
                <option value="">-- Seleccione --</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Plan</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={getInfo}
                /> Básico

                <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={getInfo}
                /> Completo
            </Campo>
            <Boton type="submit">Cotizar</Boton>
        </form>
    );
}
 
export default Form;
import React from 'react';
import './Style.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Container1 from "./Container1";

function Container2({setCurrentContainer}) {

    const handleClick = () => {
        setCurrentContainer(3);
    }

    const handleClick2 = () => {
        setCurrentContainer(1);
    }


return (
            <section className="container2">
                <h2>Apresentando o Direito</h2>
                <img src="https://img.icons8.com/ios-filled/64/null/scales--v1.png"/>
                <button className="send-button-blue">Novos Direitos</button>
                <button className="send-button-green" onClick={handleClick}>Gerar Petição</button>
                <button className="btn btn-warning" onClick={handleClick2}>Voltar</button>
            </section>
    );
}

export default Container2;
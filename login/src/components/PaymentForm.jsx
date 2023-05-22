import React, { useState } from 'react';
import chip from './img/chip-de-cartao-de-credito.png';
import './Styles/Cartao.css';
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const PaymentForm = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [expiry, setExpiry] = useState('');

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const [cvv, setCvv] = useState('');
    const [flipped, setFlipped] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let plano = Cookies.get('plano')
        let [year, month] = expiry.split('/')
        console.log(name, number,month, year , cvv, plano)
        fetch(`https://gateway-d6c99606-f18c-11ed-a05b-0242ac120003.up.railway.app/api/pay/subscribe?sign=${plano}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization'),
            },
            body: JSON.stringify({ nome: name, numero: number, anoValidade: year, mesValidade: month, cvv: cvv }),
        }).then(response => response.json())
            .then(data => {
                    console.log(data)
                    if (data.code === 200) {
                        console.log('Pagamento realizado com sucesso!')
                        console.log(data)
                        // Tem que voltar um data.assinatura ou na consulta do perfil deve haver uma consulta que apareça o tal plano,
                        // assim como deve ter uma verificação no auth onde irá ver se há ou não um plano cadastrado, para assim
                        // redirecionar para a página de compra separada, e se houver irá para a home.

                        navigate('/auth')
                    } else {
                        console.log('Erro ao realizar pagamento!')
                        console.log(data)
                    }
                }
            ).catch((error) => {
            console.error('Error:', error);
        });
    }

    const handleNameChange = (event) => {
        setName(event.target.value.replace(/[^a-zA-Z\s]/g, ''));
    };

    const handleNumberChange = (event) => {
        setNumber(event.target.value.replace(/[^\d]/g, '').replace(/(\d{4})/g, '$1 ').trim());
    };

    const handleExpiryChange = (event) => {
        const value = event.target.value.replace(/[^\d]/g, '');
        setExpiry(value.length > 2 ? value.slice(0, 2) + '/' + value.slice(2) : value);
    };

    const handleCvvChange = (event) => {
        setCvv(event.target.value.replace(/[^\d]/g, ''));
    };

    const handleCvvFocus = () => {
        setFlipped(true);
    };

    const handleCvvBlur = () => {
        setFlipped(false);
    };

    return (
        <body className={"body-card"}>
        <div className="container-card">
            <div className={`credit-card ${flipped ? 'flipped' : ''}`} id="credit-card">
                <div className="front">
                    <div id="chip"><img src={chip} alt="chip de cartão de crédito"></img></div>
                    <div id="card-number">{number.length > 0 ? number : '0000 0000 0000 0000'}</div>
                    <div id="card-name">{name.length > 0 ? name : 'nome'}</div>
                    <div id="card-expiry">{expiry.length > 0 ? expiry : 'MM/AA'}</div>
                </div>


                <div className="back">
                    <div id="stripe"></div>
                    <div id="back-cvv">{cvv.length > 0 ? cvv : '000'}</div>
                </div>
            </div>

            <form id="payment-form" className={"unique-form"}>
                <label htmlFor="name">Nome do titular</label>
                <input
                    type="text"
                    id="name"
                    maxLength="21"
                    value={name}
                    onChange={handleNameChange}
                    required
                />

                <label htmlFor="number">Número do cartão</label>
                <input
                    type="text"
                    id="number"
                    maxLength="19"
                    value={number}
                    onChange={handleNumberChange}
                    required
                />

                <label htmlFor="expiry">Data de validade</label>
                <input
                    type="text"
                    id="expiry"
                    maxLength="5"
                    value={expiry}
                    onChange={handleExpiryChange}
                />

                <label htmlFor="cvv">CVV</label>
                <input
                    type="text"
                    id="cvv"
                    maxLength="3"
                    value={cvv}
                    onChange={handleCvvChange}
                    onFocus={handleCvvFocus}
                    onBlur={handleCvvBlur}
                    required
                />

                <button type="submit" onClick={handleSubmit} className={"unique-button"}>Submit</button>
            </form>
        </div>
        </body>
    );
};

export default PaymentForm;





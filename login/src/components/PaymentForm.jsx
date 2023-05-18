import React, { useState } from 'react';
import logo from './img/chip-de-cartao-de-credito.png';
import './Styles/Cartao.css';
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const PaymentForm = () => {
    const [name, setName] = useState('Seu Nome');
    const [number, setNumber] = useState('XXXX-XXXX-XXXX-XXXX');
    const [expiry, setExpiry] = useState('XX/XX');

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const [cvv, setCvv] = useState('XXX');
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


    return (
        <body className={"body-card"}>
        <div className="container-card">
            <form id="payment-form" className={"unique-form"}>
                <label htmlFor="name">Nome do titular</label>
                <input
                    type="text"
                    id="name"
                    maxLength="21"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="number">Número do cartão</label>
                <input
                    type="text"
                    id="number"
                    maxLength="16"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                />

                <label htmlFor="expiry">Data de validade</label>
                <input
                    type="text"
                    id="expiry"
                    maxLength="7"
                    value={expiry}
                    onChange={(e) =>  setExpiry(e.target.value)}
                />

                <label htmlFor="cvv">CVV</label>
                <input
                    type="text"
                    id="cvv"
                    maxLength="3"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    onFocus={() => setFlipped(true)}
                    onBlur={() => setFlipped(false)}
                    required
                />

                <button type="submit" onClick={handleSubmit} className={"unique-button"}>Submit</button>
            </form>
        </div>
        </body>
    );
};

export default PaymentForm;

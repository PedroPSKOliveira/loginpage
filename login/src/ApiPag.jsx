import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";
import './components/Styles/Cartao.css';
import chip from "./components/img/chip-de-cartao-de-credito.png";

export default function ApiPag() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [flipped, setFlipped] = useState(false);


    const onSubmit = data => {
        let [year, month] = data.expDate.split('-')
        let plano = Cookies.get('plano')
        console.log(data.cardName, data.cardNumber, year, month, data.cvv, plano)

        fetch(`https://gateway-d6c99606-f18c-11ed-a05b-0242ac120003.up.railway.app/api/pay/subscribe?sign=${plano}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Cookies.get('Authorization'),
                },
                body: JSON.stringify({ nome: data.cardName, numero: data.cardNumber, anoValidade: year, mesValidade: month, cvv: data.cvv }),
            }
        ).then(response => response.json())
            .then(data => {
                    console.log(data)
                    if (data.code === 200) {
                        console.log('Pagamento realizado com sucesso!')
                        console.log(data)
                        // Tem que voltar um data.assinatura ou na consulta do perfil deve haver uma consulta que apareça o tal plano,
                        // assim como deve ter uma verificação no auth onde irá ver se há ou não um plano cadastrado, para assim
                        // redirecionar para a página de compra separada, e se houver irá para a home.

                        navigate('/auth')
                    } else if (data.code === 401){
                        console.log('O usuário já possui um plano ativo!')
                        console.log(data)
                        navigate('/auth')
                    }else {
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
            <form onSubmit={handleSubmit(onSubmit)} className={"unique-form"}>
                <h2>Formulário de Pagamento</h2>

                <label htmlFor="name">Nome no Cartão</label>
                <input id="cardName" {...register("cardName", { required: true })} />
                {errors.cardName && <span>Este campo é obrigatório</span>}<br/>

                <label htmlFor="number">Número do Cartão</label>
                <input id="cardNumber" {...register("cardNumber", { required: true, minLength: 16, maxLength: 16 })} />
                {errors.cardNumber && <span>Insira um número de cartão válido</span>}<br/>

                <label htmlFor="expDate">Data de Expiração</label>
                <input id="expDate" type="month" {...register("expDate", { required: true })} />
                {errors.expDate && <span>Este campo é obrigatório</span>}<br/>

                <label htmlFor="cvv">CVV</label>
                <input id="cvv" {...register("cvv", { required: true, minLength: 3, maxLength: 3 })} />
                {errors.cvv && <span>Insira um CVV válido</span>}

                <input type="submit" className={"unique-button"} />
            </form>
        </body>
    );
}
import React, {useEffect, useState} from "react";
import "./Styles/Card.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTimesCircle, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


const PricingCard = ({ plano, setPlanoSelecionado, planoAtual, isSemestral }) => {
    const isCurrentPlan = plano.value === planoAtual;

    return (
        <div className="block">
            {isSemestral && <div className="ribbon">{plano.desc}</div>}
            {isCurrentPlan && <div className="ribbon-red">Você já possui este plano</div>}
            <div className="header">
                <p className="title">{plano.titulo}</p>
                <div className="price-container">
                    <span>R$</span><span className="price">{plano.preco}</span>
                </div>
                <p className="final-value">{plano.total}</p>
            </div>
            <div>

                <ul className="lists">
                    <li className="list">
                        <FontAwesomeIcon icon={faCircleCheck} className="card-icon" style={{color: "#3c12d4"}} />
                        <span><strong>{plano.interacoes}</strong> interações</span>
                    </li>
                    <li className="list">
                            <span className="icon">
                                <FontAwesomeIcon  className="card-icon" icon={plano.arquivo ? faCircleCheck : faTimesCircle} style={{ color: plano.arquivo ? "#3c12d4" : "#3c12d4", }} />
                            </span>
                        <span>Importação de<strong> arquivo</strong></span>
                    </li>
                    <li className="list">
                            <span className="icon">
                                <FontAwesomeIcon  className="card-icon" icon={plano.audio ? faCircleCheck : faTimesCircle} style={{ color: plano.audio ? "#3c12d4" : "#3c12d4", }} />
                            </span>
                        <span>Envio de<strong> áudio </strong></span>
                    </li>
                </ul>
                <div className="button-container">
                    <a className="button" onClick={(e) => {e.preventDefault(); setPlanoSelecionado(plano);}}>Adquirir Plano</a>
                </div>
            </div>
        </div>
    );
}


const Container5 = () => {

    const [planoAtual, setPlanoAtual] = useState(Cookies.get("Assinatura"));
    const [isSemestral, setIsSemestral] = useState(false);
    const [planoSelecionado, setPlanoSelecionado] = useState(null);
    const navigate = useNavigate();
    console.log(planoAtual);

    const planosMensais = [
        { preco: '79,90', titulo: 'STARTER', value: 'BASIC', interacoes: 60, arquivo: false, audio: false, isCurrentPlan: planoAtual === 'STARTER', numero: 1 },
        { preco: '199,75', titulo: 'MASTER', value: 'PREMIUM', interacoes: 150, arquivo: true, audio: false, isCurrentPlan: planoAtual === 'MASTER', numero: 3 },
        { preco: '399,50', titulo: 'ULTIMATE', value: 'ENTERPRISE', interacoes: 300, arquivo: true, audio: true, isCurrentPlan: planoAtual === 'ULTIMATE', numero: 5 },
        // Adicione mais planos mensais aqui
    ];

    const planosSemestrais = [
        { preco: '67,90', total:'Total R$407,40', desc:'15% DE DESCONTO', titulo: 'STARTER+', value: 'SEMESTRAL_BASIC', interacoes: 360, arquivo: false, audio: false, isCurrentPlan: planoAtual === 'SEMESTRAL_STARTER', numero: 2 },
        { preco: '169,75', total:'Total R$1.018,50', desc:'15% DE DESCONTO', titulo: 'MASTER+', value: 'SEMESTRAL_PREMIUM',interacoes: 900, arquivo: true, audio: false, isCurrentPlan: planoAtual === 'SEMESTRAL_MASTER', numero: 4 },
        { preco: '339,50', total:'Total R$2037.00', desc:'15% DE DESCONTO', titulo: 'ENTERPRISE+', value: 'SEMESTRAL_ENTERPRISE', interacoes: 1800, arquivo: true, audio: true, isCurrentPlan: planoAtual === 'SEMESTRAL_ENTERPRISE', numero: 6 },
        // Adicione mais planos semestrais aqui
    ];

    const planosAtuais = isSemestral ? planosSemestrais : planosMensais;

    useEffect(() => {
        if (planoSelecionado) {
            // Encontrar o plano atual em todos os planos
            const planoAtualObj = [...planosMensais, ...planosSemestrais].find(plano => plano.value === planoAtual);

            // Verificar se a operação de compra é permitida
            if (
                // Para plano atual semestral, só permitimos o upgrade se o plano selecionado também for semestral e seu número for maior que o plano atual.
                (planoAtualObj.numero % 2 === 0 && planoSelecionado.numero % 2 === 0 && planoSelecionado.numero > planoAtualObj.numero) ||
                // Para plano atual mensal, permitimos o upgrade para qualquer plano (mensal ou semestral) cujo número seja maior que o plano atual.
                (planoAtualObj.numero % 2 !== 0 && planoSelecionado.numero > planoAtualObj.numero)
            ) {

                if (planoSelecionado.value !== planoAtual) {
                    console.log('Plano selecionado: '+planoSelecionado.value)
                    Cookies.set("AssinaturaNova", planoSelecionado.value);
                    console.log('Plano atual: '+planoAtual)

                    // Se o plano selecionado tiver um atributo 'numero', defina o Cookie e navegue para 'ApiUpdatePag'
                    if (planoSelecionado.numero) {
                        navigate('/upgrade');
                    } else {
                        navigate('/pagamento');
                    }

                } else {
                    toast.error('Você já possui este plano')
                }
            } else {
                toast.error('Não é possível realizar esta operação');
            }
        }
    }, [planoSelecionado]);



    const cancelPlan = () => {
        navigate('/cancel')
    }


    return (
        <section className="container5">
            <button
                onClick={() => setIsSemestral(!isSemestral)}
                className={`toggle-button ${isSemestral ? 'toggle-button-semestral' : ''}`}
                id="toggleButton"
            >
                <div className={`button-slider ${isSemestral ? 'button-slider-semestral' : ''}`}></div>
                <span className={`monthly ${isSemestral ? '' : 'selected'}`}>Mensal</span>
                <span className={`semiannual ${isSemestral ? 'selected' : ''}`}>Semestral</span>
            </button>
            <div className="block-container">
                {planosAtuais.map((plano) => (
                    <PricingCard key={plano.value} plano={plano} setPlanoSelecionado={setPlanoSelecionado} planoAtual={planoAtual} isSemestral={isSemestral} />
                ))}
            </div>
            <div>
                <button className="button" onClick={cancelPlan}>Cancelar Plano</button>
            </div>
        </section>
    );
};


export default Container5;
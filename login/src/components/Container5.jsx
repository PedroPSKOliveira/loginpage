import React, {useEffect, useState} from "react";
import "./Styles/Card.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
const Container5 = () => {

    const [isSemestral, setIsSemestral] = useState(false);
    const [planoSelecionado, setPlanoSelecionado] = useState(null);
    const navigate = useNavigate();

    const planosMensais = [
        { preco: '79,90', titulo: 'STARTER', value: 'STARTER', interacoes: 60, arquivo: false, audio: false },
        { preco: '199,75', titulo: 'MASTER', value: 'MASTER', interacoes: 150, arquivo: true, audio: false },
        { preco: '399,50', titulo: 'ULTIMATE', value: 'ULTIMATE', interacoes: 300, arquivo: true, audio: true },
        // Adicione mais planos mensais aqui
    ];

    const planosSemestrais = [
        { preco: '67,90', total:'Total R$407,40', desc:'15% DE DESCONTO', titulo: 'STARTER+', value: 'SEMESTRAL_STARTER', interacoes: 60, arquivo: false, audio: false },
        { preco: '169,75', total:'Total R$1.018,50', desc:'15% DE DESCONTO', titulo: 'MASTER+', value: 'SEMESTRAL_MASTER',interacoes: 150, arquivo: true, audio: false },
        { preco: '339,50', total:'Total R$2037.00', desc:'15% DE DESCONTO', titulo: 'ULTIMATE+', value: 'SEMESTRAL_ULTIMATE', interacoes: 300, arquivo: true, audio: true },
        // Adicione mais planos semestrais aqui
    ];

    const planosAtuais = isSemestral ? planosSemestrais : planosMensais;

    useEffect(() => {
        if (planoSelecionado) {
            // Agora você pode acessar as informações do plano selecionado aqui
            console.log(planoSelecionado.titulo)
            Cookies.set('plano', planoSelecionado.value);
            Cookies.set('planoc', planoSelecionado.titulo);

            navigate('/pagamento');
        }
    }, [planoSelecionado]);
    const PricingCard = ({ plano, setPlanoSelecionado }) => {
        return (
            <div className="block">
                <div className="ribbon">{plano.desc}</div>
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

    return (
        <section className="container">
            <button onClick={() => setIsSemestral(!isSemestral)} className="toggle-button" id="toggleButton">
                <div className="button-slider"></div>
                {isSemestral ? <span className="semiannual">Semestral</span> : <span className="monthly selected">Mensal</span>}
            </button>
            <div className="block-container">
                {planosAtuais.map((plano, index) => (
                    <PricingCard key={index} plano={plano} setPlanoSelecionado={setPlanoSelecionado} />
                ))}
            </div>
        </section>
    );
};


export default Container5;
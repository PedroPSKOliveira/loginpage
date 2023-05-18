import React, {useEffect, useState} from "react";
import "./Styles/Card.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMicrophoneLines, faTimes} from "@fortawesome/free-solid-svg-icons";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
const Container5 = () => {


    const [isSemestral, setIsSemestral] = useState(false);
    const [planoSelecionado, setPlanoSelecionado] = useState(null);
    const navigate = useNavigate();

    const planosMensais = [
        { preco: 'R$79.90', titulo: 'BASIC', value: 'BASIC', interacoes: 60, arquivo: false, audio: false },
        { preco: 'R$199.75', titulo: 'PREMIUM', value: 'PREMIUM', interacoes: 150, arquivo: true, audio: false },
        { preco: 'R$399.50', titulo: 'ENTERPRISE', value: 'ENTERPRISE', interacoes: 300, arquivo: true, audio: true },
        // Adicione mais planos mensais aqui
    ];

    const planosSemestrais = [
        { preco: 'R$407.40', titulo: 'BASIC+', value: 'SEMESTRAL_BASIC', interacoes: 360, arquivo: false, audio: false },
        { preco: 'R$1018.50', titulo: 'PREMIUM+', value: 'SEMESTRAL_PREMIUM',interacoes: 900, arquivo: true, audio: false },
        { preco: 'R$2037.00', titulo: 'ENTERPRISE+', value: 'SEMESTRAL_ENTERPRISE', interacoes: 1800, arquivo: true, audio: true },
        // Adicione mais planos semestrais aqui
    ];

    const planosAtuais = isSemestral ? planosSemestrais : planosMensais;

    useEffect(() => {
        if (planoSelecionado) {
            // Agora você pode acessar as informações do plano selecionado aqui
            console.log(planoSelecionado.titulo)
            Cookies.set('plano', planoSelecionado.value);
            Cookies.set('planoc', planoSelecionado.titulo);

            navigate('/pay');
        }
    }, [planoSelecionado]);

    return (
        <section className="container">
            <button onClick={() => setIsSemestral(!isSemestral)} className="btn btn-outline-dark">
                {isSemestral ? 'Ver Planos Mensais' : 'Ver Planos Semestrais'}
            </button>
            <div className="block-container">
                {planosAtuais.map((plano, index) => (
                    <div className="block" key={index}>
                        <div className="plan">
                            <div className="inner">
                                <span className="pricing">
                                    <span>{plano.preco}</span>
                                </span>
                                <p className="title">{plano.titulo}</p>
                                <p className="info">This plan is for those who have a team already and running a large
                                    business.</p>
                                <ul className="features">
                                    <li>
                                        <span className="icon">
                                            <FontAwesomeIcon icon={faCheck} style={{ color: "#0ff90b", }} />
                                        </span>
                                        <span><strong>{plano.interacoes}</strong> interações</span>
                                    </li>
                                    <li>
                                        <span className="icon">
                                            <FontAwesomeIcon icon={plano.arquivo ? faCheck : faTimes} style={{ color: plano.arquivo ? "#0ff90b" : "#ff0000", }} />
                                        </span>
                                        <span>Envio de<strong> arquivo</strong></span>
                                    </li>
                                    <li>
                                        <span className="icon">
                                            <FontAwesomeIcon icon={plano.audio ? faCheck : faTimes} style={{ color: plano.audio ? "#0ff90b" : "#ff0000", }} />
                                        </span>
                                        <span>Envio de<strong> áudio de maneira livre</strong></span>
                                    </li>
                                </ul>
                                <div className="action">
                                    <a className="button" onClick={(e) => {e.preventDefault(); setPlanoSelecionado(plano);}}>Adquirir Plano</a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};


export default Container5;
import React, { useState, useRef, useEffect } from 'react';
import './Styles/Att.css';
import Header from "./Header";
import Cookies from "js-cookie";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";




const AttForm = ({id, title, fields, buttonText, buttonClass, nome, oab, password}) => {
    const [state, setState] = useState({});
    const [showPassword, setShowPassword] = useState(false);


    useEffect(() => {
        const stateInitialValues = fields.reduce(
            (values, field) => ({ ...values, [field.name]: field.initialValue }),
            {}
        );
        setState(stateInitialValues);
    }, [nome, oab, password]);

    const handleInputChange = (e, fieldName) => {
        setState({ ...state, [fieldName]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (

        <div className="att-container">
            <form className="form" onSubmit={handleSubmit}>
                <p className="att-title">{title}</p>

                {fields.map((field, index) => (
                    <label key={index}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <input
                                required
                                type={field.type === 'password' && !showPassword ? 'password' : 'text'}
                                className="input"
                                value={state[field.name]}
                                readOnly={field.name.includes("old")}
                                onChange={(e) => handleInputChange(e, field.name)}
                            />
                            {field.type === 'password' && (
                                <i
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{marginLeft: '5px', cursor: 'pointer'}}
                                >
                                    {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                </i>
                            )}
                        </div>
                        <span>{field.label}</span>
                    </label>
                ))}

                <button className={`submit ${buttonClass}`}>{buttonText}</button>

            </form>
        </div>
    );
};

const PaymentUpdate = () => {
    return (
        <div className="att-container">
            <AttForm
                id={1}
                title="Adicione Novo Cartão"
                buttonText="Adicionar Cartão"
                buttonClass="button-name"
                fields={[
                    { name: "ownerName", label: "Nome do titular", type: "text", initialValue: "" },
                    { name: "cardNumber", label: "Número do cartão", type: "text", initialValue: "" },
                    { name: "expDate", label: "Data de validade", type: "text", initialValue: "" },
                    { name: "securityCode", label: "CVV", type: "text", initialValue: "" },

                ]}
            />
        </div>
    );
};

const Att = () => {
    const [showPayments, setShowPayments] = useState(false);
    const [nome, setNome] = useState('');
    const [oab, setOab] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    useEffect(() => {
        fetch(`https://gateway-d6c99606-f18c-11ed-a05b-0242ac120003.up.railway.app/api/pay/find`,
            {
                method: 'GET',
                headers: {
                    "Authorization": Cookies.get("Authorization"),
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
            return res.json();
        }).then((res) => {
                console.log(res);
                setNome(res.data.nome);
                setOab('12345-BA');
                setPassword('123456');
                console.log(nome, oab, password);
            }
        ).catch((err) => {
            console.log(err);
        })
    }, []);

    const userDataFields = [
        { name: "oldName", type: "text", initialValue: `${nome}` },
        { name: "newName", label: "Novo Nome", type: "text", initialValue: "" },
    ];
    const oabDataFields = [
        { name: "oldOab", type: "text", initialValue: `${oab}` },
        { name: "newOab", label: "Nova OAB", type: "text", initialValue: "" },
    ];
    const passwordDataFields = [
        { name: "newPassword", label: "Nova Senha", type: "password", initialValue: "" },
        { name: "confirmPassword", label: "Confirmar Nova Senha", type: "password", initialValue: "" },
    ];
    const deleteAccountFields = [
        { name: "deleteAccountPassword", label: "Confirmar Senha", type: "password", initialValue: "" },
    ];

    //linha de navegação
    const dataLinkRef = useRef(null);
    const paymentLinkRef = useRef(null);

    const [highlighterWidth, setHighlighterWidth] = useState('0px');
    const [highlighterLeft, setHighlighterLeft] = useState('0px');

    const showDataUpdate = () => {
        setShowPayments(false);
        const linkRect = dataLinkRef.current.getBoundingClientRect();
        setHighlighterWidth('130px');
        setHighlighterLeft(`${linkRect.left - 12}px`);
    }

    const showPaymentUpdate = () => {
        setShowPayments(true);
        const linkRect = paymentLinkRef.current.getBoundingClientRect();
        setHighlighterWidth('180px');
        setHighlighterLeft(`${linkRect.left - 5}px`);
    }


    useEffect(() => {
        showDataUpdate();
    }, []);

    return (
        <>
            <Header />
            <div className="att-navigation">
                <a ref={dataLinkRef} className={showPayments ? "nav-link" : "nav-link active"} onClick={showDataUpdate}>Atualizar Dados</a>
                <a ref={paymentLinkRef} className={showPayments ? "nav-link active" : "nav-link"} onClick={showPaymentUpdate}>Atualizar Pagamentos</a>
                <div className="highlighter" style={{ width: highlighterWidth, left: highlighterLeft }}></div>
            </div>

            {!showPayments ? (
                <>
                    <AttForm
                        id={1}
                        title="Dados do usuário"
                        buttonText="Atualizar Nome"
                        buttonClass="button-name"
                        fields={userDataFields}
                        nome={nome}
                    />

                    <AttForm
                        id={2}
                        title="Dados da OAB"
                        buttonText="Atualizar OAB"
                        buttonClass="button-oab"
                        fields={oabDataFields}
                        oab={oab}
                    />

                    <AttForm
                        id={3}
                        title="Senha"
                        buttonText="Atualizar Senha"
                        buttonClass="button-senha"
                        fields={passwordDataFields}
                        password={password}
                    />

                    <AttForm
                        id={4}
                        title="Deletar conta"
                        buttonText="Deletar Conta"
                        buttonClass="button-delete"
                        fields={deleteAccountFields}
                    />
                </>
            ) : (
                <PaymentUpdate />
            )}
        </>
    );
};

export default Att;

import React, {useEffect, useState} from 'react';
import './Styles/Header.css';
import logo from './img/logo3.png';
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faEnvelope, faCreditCard, faUser} from '@fortawesome/free-solid-svg-icons';
import {toast} from "react-toastify";
const Header = ({openModal}) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPainelOpen, setIsPainelOpen] = useState(false);
    const [isContatoOpen, setIsContatoOpen] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cartao, setCartao] = useState('');
    const [plano, setPlano] = useState('');
    const [interacoes, setInteracoes] = useState();
    const [dig, setDig] = useState();
    const navigate = useNavigate();

    const [modalIsOpen, setModalIsOpen] = useState(false);


    useEffect(() => {
        const fetchData = () => {
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
                    setEmail(res.data.email);
                    setCartao('*** - '+res.data.card_number);
                    setPlano(res.data.signature);
                    Cookies.set("userPlan", res.data.signature);
                    setInteracoes(res.data.interactions);
                    setDig(res.data.card_number);
                }
            ).catch((err) => {
                console.log(err);
                toast.error('Erro ao carregar dados do usuário, tente novamente.')
                navigate('/');
            })
        };

        const timeoutId = setTimeout(fetchData, 1000);

        // Clean up function
        return () => clearTimeout(timeoutId);
    }, []);



    const openUpdateDataModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const menuClasses = () => {
        return isMenuOpen ? "nav-list open" : "nav-list";
    };

    const togglePainelDropdown = (e) => {
        e.preventDefault();
        setIsPainelOpen(!isPainelOpen);
        console.log("Dropdown clicked");
    };

    const toggleContatoDropdown = (e) => {
        e.preventDefault();
        setIsContatoOpen(!isContatoOpen);
    };

    const setIndo = (  ) => {
        setNome('Pedro');
        setEmail('ped@ped')
        setCartao('1234--1234');
    }

    const handleNavMobileClick = (e) => {
        e.preventDefault();
        handleMenuToggle();
    };

    const s = () => {
        navigate('/atualizar');
    }

    const p = () => {
        navigate('/plan');
    }
    const q = () => {
        navigate('/home');
    }

    const handleLogout = () => {
        Cookies.remove("Authorization");
        Cookies.remove("Assinatura");
        Cookies.remove("userPlan");
        fetch(`https://gateway-d6c99606-f18c-11ed-a05b-0242ac120003.up.railway.app/api/auth/logout`,{
            method: 'GET',
            headers: {
                "token": Cookies.get("refresh_token"),
            }
        }).then((res) => {
            return res.json();
        }).then((res) => {
            console.log(res);
            navigate('/');
            Cookies.remove("refresh_token");

        }).catch((err) => {
            console.log(err);
            toast.error(err.message)
        })
    }

    const handeNavigate = () => {
        navigate('/home');
    }

    return (

        <section className="navigation">
            <div className="nav-container">
                <div className="brand">
                    <a onClick={handeNavigate}>
                    <img src={logo} alt="Smart Petição Logo" ></img>
                    </a>
                </div>
                <nav>
                    <div className="nav-mobile" onClick={handleNavMobileClick}>
                        <a id="navbar-toggle" href="#!">
                            <span></span>
                        </a>
                    </div>
                    <ul className={menuClasses()}>
                        <li>
                            <a href="" onClick={q}>Início</a>
                        </li>
                        <li>
                            <span className={`vertical-line${isMenuOpen ? " menu-open" : ""}`}></span>
                        </li>
                        <li>
                            <a href="#!" onClick={togglePainelDropdown}>
                                Usuário
                            </a>
                            <ul className={`dropdown-content${isPainelOpen ? " show" : ""}`}>
                                <li>
                                    <a href="#!" style={{width: "300px", display: "inline-block"}}><FontAwesomeIcon  icon={faUser} size="lg" style={{ cursor: 'pointer' }} /> {nome}</a>
                                </li>
                                <li>
                                    <a href="#!" style={{width: "300px", display: "inline-block"}}><FontAwesomeIcon  icon={faEnvelope} size="lg" style={{ cursor: 'pointer' }} /> {email}</a>
                                </li>
                                <li>
                                    <a href="#!" style={{width: "300px", display: "inline-block"}}><FontAwesomeIcon  icon={faCreditCard} size="lg" style={{ cursor: 'pointer' }} /> {cartao}</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <span className={`vertical-line${isMenuOpen ? " menu-open" : ""}`}></span>
                        </li>

                        <li>
                            <a href="" onClick={s}>Atualizar dados</a>
                        </li>
                        <li>
                            <span className={`vertical-line${isMenuOpen ? " menu-open" : ""}`}></span>
                        </li>
                        <li>
                            <a href="" onClick={p}>Seu Plano</a>
                        </li>
                        <li>
                            <span className={`vertical-line${isMenuOpen ? " menu-open" : ""}`}></span>
                        </li>
                        <li>
                            <a href="#!" onClick={handleLogout} ><FontAwesomeIcon  icon={faArrowRight} size="lg" style={{ cursor: 'pointer' }}/> Logout</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
};

export default Header;
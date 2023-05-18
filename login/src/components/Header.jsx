import React, {useEffect, useState} from 'react';
import './Styles/Header.css';
import logo from './img/logo3.png';
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const LOGOUT_API = "https://gateway-d6c99606-f18c-11ed-a05b-0242ac120003.up.railway.app/api/auth/logout";
const REFRESH_TOKEN = Cookies.get("refresh_token");



const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPainelOpen, setIsPainelOpen] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [plano, setPlano] = useState('');
    const [interacoes, setInteracoes] = useState();
    const [dig, setDig] = useState();
    const navigate = useNavigate();


    useEffect(() => {
        fetch('https://gateway-d6c99606-f18c-11ed-a05b-0242ac120003.up.railway.app/api/pay/find',
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
                if (res.code === 200) {
                    setNome(res.data.nome);
                    setEmail(res.data.email);
                    setPlano(res.data.signature);
                    setInteracoes(res.data.interactions);
                    setDig(res.data.card_number);
                } else {
                    navigate('/');
                }
            }
        ).catch((err) => {
            console.log(err);
        })
    }, []);






    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const menuClasses = () => {
        return isMenuOpen ? "nav-list open" : "nav-list";
    };



    const togglePainelDropdown = (e) => {
        e.preventDefault();
        setIsPainelOpen(!isPainelOpen);
    };



    const handleNavMobileClick = () => {
        if (window.innerWidth <= 800) {
            handleMenuToggle();
        }
    };

    const s = () => {
        navigate('/atualizar');
    }


    const fetchLogout = async () => {
        Cookies.remove("Authorization");
        try {
            const response = await fetch(LOGOUT_API, {
                method: 'GET',
                headers: {
                    "Token": REFRESH_TOKEN,
                },
            });
            const data = await response.json();
            Cookies.remove("refresh_token");
            Cookies.remove("plano");
            Cookies.remove("peticao");
            Cookies.remove("planoc");
            Cookies.remove("user_id");
            Cookies.remove("Assinatura");
            Cookies.remove("id");
            navigate('/');
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    return (

        <section className="navigation">
            <div className="nav-container">
                <div className="brand">
                    <img src={logo} alt="Ai Collaboration Logo"></img>
                </div>
                <nav>
                    <div className="nav-mobile" onClick={handleNavMobileClick}>
                        <a id="navbar-toggle" href="#!">
                            <span></span>
                        </a>
                    </div>
                    <ul className={menuClasses()}>
                        <li>
                            <a href="#!" onClick={togglePainelDropdown}>
                                Usuário
                            </a>
                            <ul className={`navbar-dropdown${isPainelOpen ? " show" : ""}`}>
                                <li>
                                    <a href="#!" style={{width: "300px", display: "inline-block"}}>{nome}</a>
                                </li>
                                <li>
                                    <a href="#!" style={{width: "300px", display: "inline-block"}}>{email}</a>
                                </li>
                                <hr />
                                <li>
                                    <a href="#!" style={{width: "300px", display: "inline-block"}}>Plano: {plano}</a>
                                </li>
                                <li>
                                    <a href="#!" style={{width: "300px", display: "inline-block"}}>Cartão: ****-{dig}</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <span className="vertical-line"></span>
                        </li>

                        <li>
                            <a href="#!" onClick={s}>Atualizar dados</a>
                        </li>
                        <li>
                            <span className="vertical-line"></span>
                        </li>

                        <li>
                            <a href="#!">Ajuda</a>
                        </li>
                        <li>
                            <span className="vertical-line"></span>
                        </li>
                        <li>
                            <a href="#!" onClick={fetchLogout}>Logout</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
};

export default Header;
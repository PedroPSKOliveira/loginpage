import {useRef, useState, useEffect, memo} from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import './App.css'
import GoogleLogin from "./components/GoogleLogin";
import GoogleRegister from "./components/GoogleRegister";


const googlelogin = <GoogleLogin/>;
const googleregister = <GoogleRegister/>;

const Login = () => {

    const [name, setName] = useState(""); // Estado para o nome do usuário
    const [email, setEmail] = useState(""); // Estado para o campo de email do usuário
    const [password, setPassword] = useState(""); // Estado para o campo de senha do usuário
    const navigate = useNavigate(); // Hook do React Router para navegar para diferentes rotas
    const [oab, setOab] = useState(""); // Estado para a identificação da OAB do usuário

    console.log("nome: "+name+" email: "+email+" senha: "+password+" oab: "+oab);


    const loginContainer = useRef(null);

    //Função para executar a animação de mover o formulário de login e cadastro
    const moveOverlay = () => {
        if (loginContainer.current) {
            loginContainer.current.classList.toggle("move");
        }
    };



    //Login



    const handleLogin = async (e) => {
        e.preventDefault(); // Prevenir comportamento padrão do formulário

        if (!validateLogin()) { // Validar os campos de entrada
            return; // Retorna se os campos de entrada não são válidos
        }

        try {
            const response = await fetch(
                "https://gateway-d6c99606-f18c-11ed-a05b-0242ac120003.up.railway.app/api/auth/login", // Endpoint da API para fazer login
                {
                    method: "POST", // Método da solicitação
                    headers: {
                        "Accept": "application/json", // Tipo de resposta esperada
                        "Content-Type": "application/json" // Tipo de dados enviados
                    },
                    body: JSON.stringify({ email: email, senha: password }) // Dados enviados na solicitação
                }
            ).then((response) => response.json()
            ).then((data) => {
                Cookies.set("refresh_token", data.data, { expires: 30, maxAge: true }); // Configurar um cookie com o token de atualização
                if (data.code === 200){
                    console.log(data)
                    toast.success(data.message); // Exibir uma mensagem de sucesso ao usuário
                    navigate("/auth"); // Navegar para a página de autenticação
                }else {
                    toast.error(data.status)
                    toast.error(data.message)
                    console.log(data.status)
                    console.log(data.message)
                }

            }
            ).catch((error) => {
                console.error("Error:", error);
            }
            );

            const data = await response.json(); // Transformar a resposta em um objeto JavaScript


        } catch (error) {
            console.error(error);
        }
    };

    const validateLogin = () => {
        let isValid = true;

        if (email.trim() === "") { // Verificar se o campo de email está vazio
            toast.warning("Insira um email!"); // Exibir uma mensagem de aviso ao usuário
            isValid = false;
        }

        if (password.trim() === "") { // Verificar se o campo de senha está vazio
            toast.warning("Insira uma senha!"); // Exibir uma mensagem de aviso ao usuário
            isValid = false;
        }

        return isValid; // Retorna verdadeiro se os campos de entrada são válidos
    };





    //Cadastro


    const handleCadastro = (e) => {
        e.preventDefault(); // Prevenir comportamento padrão do formulário

        if (!validateCadastro()) { // Validar os campos de entrada
            return; // Retorna se os campos de entrada não são válidos
        }

        fetch("https://gateway-d6c99606-f18c-11ed-a05b-0242ac120003.up.railway.app/api/account/create", {
            method: "POST", // Método da solicitação
            headers: {
                "Accept": "application/json", // Tipo de resposta esperada
                "Content-Type": "application/json" // Tipo de dados enviados
            },
            body: JSON.stringify({
                nome: name,
                email: email,
                senha: password,
            }) // Dados enviados na solicitação
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 400) {
                    toast.error(data.message);
                } else if (data.status === 500) {
                    toast.error(data.message);
                } else if (data.status === 200) {
                    toast.success("Cadastrado com sucesso");
                }
            })
            .catch(error => console.error(error));
    };

    const validateCadastro = () => {
        let isValid = true;
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (name.trim() === "") { // Verificar se o campo de nome está vazio
            toast.warning("Insira um nome!"); // Exibir uma mensagem de aviso ao usuário
            isValid = false;
        }

        if (email.trim() === "") { // Verificar se o campo de email está vazio
            toast.warning("Insira um email!"); // Exibir uma mensagem de aviso ao usuário
            isValid = false;
        } else if (!re.test(String(email).toLowerCase())) { // Verificar se o email é válido
            toast.warning("Insira um email válido!"); // Exibir uma mensagem de aviso ao usuário
            isValid = false;
        }

        if (password.trim() === "") { // Verificar se o campo de senha está vazio
            toast.warning("Insira uma senha!"); // Exibir uma mensagem de aviso ao usuário
            isValid = false;
        }


        return isValid; // Retorna verdadeiro se os campos de entrada são válidos
    };


    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }


    return (
        <main>
            <div className="login-container" id="login-container" ref={loginContainer}>
                <div className="form-container">
                    <form className="form form-login" onSubmit={handleLogin}>
                        <h2 className="form-title">AI Collaboration</h2>
                        {googlelogin}
                        <p className="form-textt">ou entre com seu email</p>
                        <div className="form-input-container">
                            <input type="email" className="form-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <input type="password" className="form-input" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <a href="#" className="form-link">
                            Esqueci minha senha
                        </a>
                        <button type="submit" className="form-button" id="open-login">
                            Entrar
                        </button>
                        <p className="mobile-text">
                            Não tem conta?
                            <a href="#" onClick={moveOverlay} id="open-register-mobile">
                                Registre-se
                            </a>
                        </p>
                    </form>
                    <form className="form form-register" onSubmit={handleCadastro}>
                        <h2 className="form-title">Criar Conta</h2>
                        <div className="form-social">
                            {googleregister }
                        </div>
                        <p className="form-textt">ou cadastre seu email</p>
                        <div className="form-input-container">
                            <input type="text" className="form-input" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)}/>
                            <input type="email" className="form-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <input type="password" className="form-input" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <button type="submit" className="form-button" id="open-register">
                            Cadastrar
                        </button>
                        <p className="mobile-text">
                            Já tem conta?
                            <a href="#" onClick={moveOverlay} id="open-login-mobile">
                                Login
                            </a>
                        </p>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <h2 className="form-title form-title-light">Já tem conta?</h2>
                        <p className="form-textt">
                            Para se manter conectado<br />
                            Faça seu login com email e senha
                        </p>
                        <button className="form-button form-button-light" id="open-login" onClick={moveOverlay}>
                            Entrar
                        </button>
                    </div>
                    <div className="overlay">
                        <h2 className="form-title form-title-light">
                            Olá, É Novo Aqui?!
                        </h2>
                        <p className="form-textt">
                            Cadastre-se e comece a usar a nossa plataforma on-line
                        </p>
                        <button className="form-button form-button-light" id="open-register" onClick={moveOverlay}>
                            Cadastrar
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;
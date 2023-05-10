import {useRef, useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import './App.css'


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
                "https://alleged-doll-production.up.railway.app/api/v1/auth/login", // Endpoint da API para fazer login
                {
                    method: "POST", // Método da solicitação
                    headers: {
                        "Accept": "application/json", // Tipo de resposta esperada
                        "Content-Type": "application/json" // Tipo de dados enviados
                    },
                    body: JSON.stringify({ email: email, senha: password }) // Dados enviados na solicitação
                }
            );

            const data = await response.json(); // Transformar a resposta em um objeto JavaScript

            if (response.ok) { // Verificar se a resposta foi bem-sucedida
                Cookies.set("refresh_token", data, { expires: 30, maxAge: true }); // Configurar um cookie com o token de atualização
                toast.success(data.message); // Exibir uma mensagem de sucesso ao usuário
                navigate("/auth"); // Navegar para a página de autenticação
            } else {
                toast.error(data.message); // Exibir uma mensagem de erro ao usuário
            }
        } catch (error) {
            toast.error(`Login falhou ${error.message}`); // Exibir uma mensagem de erro ao usuário
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

        fetch("https://ai-collab-account-service-production-instance1.up.railway.app/api/account/create", {
            method: "POST", // Método da solicitação
            headers: {
                "Accept": "application/json", // Tipo de resposta esperada
                "Content-Type": "application/json" // Tipo de dados enviados
            },
            body: JSON.stringify({
                nome: name,
                email: email,
                senha: password,
                oab: oab
            }) // Dados enviados na solicitação
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.code === 400) {
                    toast.error(data.message);
                } else if (data.code === 500) {
                    toast.error(data.message);
                } else if (data.code === 200) {
                    toast.success("Cadastrado com sucesso");
                }
            })
            .catch(error => console.error(error));
    };

    const validateCadastro = () => {
        let isValid = true;

        if (name.trim() === "") { // Verificar se o campo de nome está vazio
            toast.warning("Insira um nome!"); // Exibir uma mensagem de aviso ao usuário
            isValid = false;
        }

        if (email.trim() === "") { // Verificar se o campo de email está vazio
            toast.warning("Insira um email!"); // Exibir uma mensagem de aviso ao usuário
            isValid = false;
        }

        if (password.trim() === "") { // Verificar se o campo de senha está vazio
            toast.warning("Insira uma senha!"); // Exibir uma mensagem de aviso ao usuário
            isValid = false;
        }

        if (oab.trim() === "") { // Verificar se o campo de OAB está vazio
            toast.warning("Insira a identificação da OAB!"); // Exibir uma mensagem de aviso ao usuário
            isValid = false;
        }

        return isValid; // Retorna verdadeiro se os campos de entrada são válidos
    };


    //Google


    const GoogleLogin = () => {

        const handleCredentialResponse = (response) => {
            console.log('Encoded JWT ID token: ' + response.credential);
            const google_account = jwt_decode(response.credential);
            console.log(google_account);
        }

        useEffect(() => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);

            script.onload = () => {
                window.google.accounts.id.initialize({
                    client_id:
                        '182918162904-q8e4ga3257980c41pkg6tp3kpnj5rgji.apps.googleusercontent.com',
                    callback: handleCredentialResponse,
                });

                window.google.accounts.id.renderButton(document.getElementById('buttonDiv'), {
                    theme: 'outline',
                    size: 'large',
                    type: 'icon',
                    shape: 'pill'
                });

                window.google.accounts.id.prompt();
            };

            return () => {
                document.body.removeChild(script);
            };
        }, []);
            return <div id="buttonDiv"></div>;
    }

    const GoogleRegister = () => {

        const handleCredentialResponse = (response) => {
            console.log('Encoded JWT ID token: ' + response.credential);
            const google_account = jwt_decode(response.credential);
            console.log(google_account);
        }

        useEffect(() => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);

            script.onload = () => {
                window.google.accounts.id.initialize({
                    client_id:
                        '182918162904-q8e4ga3257980c41pkg6tp3kpnj5rgji.apps.googleusercontent.com',
                    callback: handleCredentialResponse,
                });

                window.google.accounts.id.renderButton(document.getElementById('buttonDivR'), {
                    theme: 'outline',
                    size: 'large',
                    type: 'icon',
                    shape: 'pill'
                });

                window.google.accounts.id.prompt();
            };

            return () => {
                document.body.removeChild(script);
            };
        }, []);
        return <div id="buttonDivR"></div>;
    }


    return (
        <main>
            <div className="login-container" id="login-container" ref={loginContainer}>
                <div className="form-container">
                    <form className="form form-login" onSubmit={handleLogin}>
                        <h2 className="form-title">AI Collaboration</h2>
                        <div className="form-social">
                            <GoogleLogin />
                        </div>
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
                                    <GoogleRegister />
                        </div>
                        <p className="form-textt">ou cadastre seu email</p>
                        <div className="form-input-container">
                            <input type="text" className="form-input" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)}/>
                            <input type="email" className="form-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <input type="password" className="form-input" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <input type="text" className={"form-input"} placeholder={"OAB"} value={oab} onChange={(e) => setOab(e.target.value)}/>
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
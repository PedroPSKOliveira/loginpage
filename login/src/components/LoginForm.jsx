import Cookies from "js-cookie";
import {toast} from "react-toastify";
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import GoogleLogin from "./GoogleLogin";

const googlelogin = <GoogleLogin/>;

const LoginForm = () => {

    const [email, setEmail] = useState(""); // Estado para o campo de email do usuário
    const [password, setPassword] = useState(""); // Estado para o campo de senha do usuário
    const navigate = useNavigate(); // Hook do React Router para navegar para diferentes rotas

    const [ze, setZe] = useState(""); // Estado para a identificação da OAB do usuário

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
                    body: JSON.stringify({email: email, senha: password}) // Dados enviados na solicitação
                }
            ).then((response) => response.json()
            ).then((data) => {
                    Cookies.set("refresh_token", data.data, {expires: 30, maxAge: true}); // Configurar um cookie com o token de atualização
                    if (data.code === 200) {
                        console.log(data)
                        toast.success(data.message); // Exibir uma mensagem de sucesso ao usuário
                        navigate("/auth"); // Navegar para a página de autenticação
                    } else {
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
    }

    const loginContainer = useRef(null);


    const moveOverlay = () => {
        if (loginContainer.current) {
            loginContainer.current.classList.toggle("move");
        }
    };

        return (
            <form className="form form-login" onSubmit={handleLogin}>
                <h2 className="form-title">AI Collaboration</h2>
                {googlelogin}
                <p className="form-textt">ou entre com seu email</p>
                <div className="form-input-container">
                    <input type="email" className="form-input" placeholder="Email" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" className="form-input" placeholder="Senha" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
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
        )

}

export default LoginForm;
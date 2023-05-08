import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cadastro = () => {
    const [name, setName] = useState(""); // Estado para o nome do usuário
    const [email, setEmail] = useState(""); // Estado para o email do usuário
    const [password, setPassword] = useState(""); // Estado para a senha do usuário
    const [oab, setOab] = useState(""); // Estado para a identificação da OAB do usuário

    const navigate = useNavigate(); // Hook do React Router para navegar para diferentes rotas

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenir comportamento padrão do formulário

        if (!validate()) { // Validar os campos de entrada
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

    const validate = () => {
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

    return (
        <div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h1>Cadastro</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Nome completo<span className="errmsg">*</span></label>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)} // Atualizar o estado do nome do usuário quando o campo é alterado
                                        className="form-control"
                                        placeholder="Seu nome"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Email<span className="errmsg">*</span></label>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} // Atualizar o estado do email do usuário quando o campo é alterado
                                        type="email"
                                        className="form-control"
                                        placeholder="Seu e-mail"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Senha<span className="errmsg">*</span></label>
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} // Atualizar o estado da senha do usuário quando o campo é alterado
                                        type="password"
                                        className="form-control"
                                        placeholder="Sua senha"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>OAB<span className="errmsg">*</span></label>
                                    <input
                                        value={oab}
                                        onChange={(e) => setOab(e.target.value)} // Atualizar o estado da identificação da OAB do usuário quando o campo é alterado
                                        type="text"
                                        className="form-control"
                                        placeholder="EX: 12345-BA"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Cadastrar</button>&nbsp;
                        <Link to={"/"} className="btn btn-secondary">Voltar</Link>
                    </div>
            </div>
        </form>
</div>
</div>
);
};

export default Cadastro;


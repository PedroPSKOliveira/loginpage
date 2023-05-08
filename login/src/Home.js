
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useState } from "react";

const Home = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    fetch('http://localhost:3000/data', {
        method: 'GET',
        headers: {'Accept':'application/json',
            'Content-Type': 'application/json',
           // 'Authorization' : Cookies.get("Authorization")
        }

    }).then((res)=>{
        console.log(res)
        return res.json();
    }).then((resp)=>{
        console.log(resp)
        setNome(resp.nome)
        setEmail(resp.email)
        if (Object.keys(resp).length === 0) {
            toast.error('Error')
        }else{
            if(resp.code === 400) {
                toast.error(resp.error)
            }else if(resp.code === 200){
                setNome(resp.nome)
                setEmail(resp.email)
            }
        }
    }).catch((err)=>{
        toast.error('Alguma falha aconteceu, faça login novamente '+err.message);
        console.log(err);
        console.log(err.message);
    })


    return(
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <div className="card">
                    <div className="card-header">
                        <h2>Home</h2>
                        <div className="card-header-info">
                            <Link className="btn btn-link" to={'/informacoes'}>Juizados e Clientes</Link>
                        </div>
                        <div className="card-header-pay">
                            <Link className="btn btn-link" to={'/pagamento'}>Método de pagamento</Link>
                        </div>
                    </div>
                    <div className="card-body-home-stats">
                        <div>
                            <form className="form-home">
                                <p id="nm">Nome: {nome} </p>
                                <p id="em">Email: {email} </p>
                                <Link className="btn btn-primary" to={'/atualizar'}>Atualizar dados</Link>&nbsp;&nbsp;
                                <Link className="btn btn-info" to={'/chat'}>Iniciar Chat</Link>&nbsp;&nbsp;<p></p>
                                <Link className={"btn btn-warning"} to={'/login'}>Voltar</Link>
                                <p></p>
                            </form>

                        </div>
                    </div>
                    <div className="card-footer">
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;
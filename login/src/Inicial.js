import { useNavigate } from "react-router-dom";

const Inicial = () => {

    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        navigate('/cadastro')
        return (
            handlesubmit
        )
    }
    const handlesubmit2 = (e) => {
        e.preventDefault();
        navigate('/login')
        return(
            handlesubmit2
        )
    }
    return(
        <div>
        <div className="offser-lg-3 col-lg-6">
                <div className="card">
                    <div className="card-header">
                        <h1>Bem-vindo</h1>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handlesubmit2}>
                            <button type="submit" className="btn btn-success">Entrar</button>
                        </form>
                        <form onSubmit={handlesubmit}>
                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                        </form>

                    </div>
                    <div className="card-footer">
                    </div>

                </div>
        </div>
        
    </div>
    );
}

export default Inicial;
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Info = () => {
            fetch('https://account-production-68f0.up.railway.app/api/v1/account/', {
                method: 'GET', 
                headers: {'Accept':'application/json', 
                'Content-Type': 'application/json', 
                "Authorization": localStorage.getItem("__token")}, 
                mode:'cors'
            }).then((res)=>{
                return res.json();
            }).then((resp)=>{
                console.log(resp)
                if (Object.keys(resp).length === 0) {
                    toast.error('Error')
                }else{
                    if(resp.code === 400) {
                        toast.error(resp.error)
                   }else if(resp.code === 200){

                        document.getElementById("jz").innerHTML = "Juizados: "+resp.data.juizados
                        document.getElementById("el").innerHTML = "Clientes: "+resp.data.elementos
                   }
               }
            }).catch((err)=>{
                toast.error('Alguma falha aconteceu, faça login novamente '+err.message);
            })
            
            const navigate = useNavigate();

            const handlesubmit3 = (e) => {
                e.preventDefault();
                navigate('/home')
            }
    return(
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h2>Home</h2>
                            <div className="card-header-info">
                             <Link className="btn btn-link" to={'/info'}>Juizados e Clientes</Link>
                            </div>
                        </div>
                        <div className="card-body-home-stats">
                            <div>
                                <form>
                                <p id="jz">Juizados: </p>
                                <p id="el">Clientes: </p>

                                </form>
                                <form onSubmit={handlesubmit3}>
                                    <button type="submit" className="btn btn-danger">Voltar</button>
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
export default Info;
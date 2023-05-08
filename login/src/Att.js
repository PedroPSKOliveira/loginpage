import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Att = () => {

    const [name, namechange] = useState("");
    const [emaill, emaillchange] = useState("");
    const [pw, pwchange] = useState("");

    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj={name, emaill, pw};
        console.log(regobj);
        (async() =>{
            const rawResponse = await fetch('https://account-production-68f0.up.railway.app/api/v1/account/update', {
               method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("__token")
                }, mode: 'cors',
               body: JSON.stringify({nome: name, senha: pw})
            })
           const content = await rawResponse.json();
            console.log(content);
            if(content.code == 400){
               toast.error(content.message);
            }else if(content.code == 500){
                toast.error(content.message)
            }
            else if(content.code == 200){
               toast.success('Atualizado com sucesso')
                navigate('/home');
            }})()}

    return(
        <div>
            <div className="offser-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h1>Cadastro</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-grup">
                                        <label>Nome<span className="errmsg">*</span></label>
                                        <input value={name} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-grup">
                                        <label>Senha<span className="errmsg">*</span></label>
                                        <input value={pw} onChange={e=>pwchange(e.target.value)} type="password" className="form-control"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Cadastrar</button>&nbsp;
                            <a className="btn btn-danger">Cancelar</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Att;
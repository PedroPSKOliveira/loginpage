import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Att = ({modalIsOpen, closeModal}) => {

    const [name, namechange] = useState("Pedro");
    const [pw, pwchange] = useState("Pedro123#");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const s = () => {
        navigate('/home')
    }

    console.log(name, pw);



    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj={name, pw};
        console.log(regobj);
        closeModal();
            }


    return(
        <section className={"container"}>
                <form onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h1>Atualizar</h1>
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
                            <a className="btn btn-danger" onClick={s}>Cancelar</a>
                        </div>
                    </div>
                </form>
        </section>
    )
}
export default Att;
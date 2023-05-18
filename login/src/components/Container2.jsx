import React from 'react';
import './Styles/Style.css';
import {useState} from "react";
import {BrowserRouter, Route, Switch, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

function Container2({setCurrentContainer}) {

    const [direitos, setDireitos] = useState([localStorage.getItem("direito0"), localStorage.getItem("direito1"), localStorage.getItem("direito2"), localStorage.getItem("direito3"), localStorage.getItem("direito4")]);
    const [direito1, setDireito1] = useState();
    const [direito2, setDireito2] = useState();
    const [direito3, setDireito3] = useState();
    const [direito4, setDireito4] = useState();
    const [direito5, setDireito5] = useState();
    const navigate = useNavigate();
    let id = Cookies.get("id");

    fetch(`https://gateway-d6c99606-f18c-11ed-a05b-0242ac120003.up.railway.app/api/peticiona/direitos/${id}`  , {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'token': Cookies.get("token"),
        },
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                return response.json().then((response) => {
                    throw new Error(response.message);
                });
            }
        })
        .then((data) => {
            console.log(data)
            setDireito1(data.data[0])
            setDireito2(data.data[1])
            setDireito3(data.data[2])
            setDireito4(data.data[3])
            setDireito5(data.data[4])
            setDireitos([data.data[0], data.data[1], data.data[2], data.data[3], data.data[4]])
            const direitos = data.data.direitos;
            direitos.forEach((value, index) => {
                localStorage.setItem("direito" + index, value);
                console.log(value);
            });
        })
        .catch((error) => {

        });

    const atualizar = (i, event) => {
        event.preventDefault();
        const novoDireito = prompt("Digite o novo direito:");
        localStorage.setItem("direito" + i, novoDireito);
        // Atualize o "direito" específico no estado
        setDireitos((prevDireitos) => {
            const updatedDireitos = [...prevDireitos];
            updatedDireitos[i] = novoDireito;
            return updatedDireitos;
        });
        console.log("Atualizou o direito " + (i + 1) + "!");
    };

    const remover = (i, event) => {
        event.preventDefault();
        localStorage.removeItem("direito" + i);
        // Remova o "direito" específico do estado
        setDireitos((prevDireitos) => {
            const updatedDireitos = prevDireitos.filter((_, index) => index !== i);
            return updatedDireitos;
        });
        console.log("Removeu o direito " + (i + 1) + "!");
    };


    const handleClick = () => {
        setCurrentContainer(3);
    }

    const handleClick2 = () => {
        setCurrentContainer(1);
    }


return (
            <section className="container">
                <div>
                <h2>Apresentando o Direito</h2>
                <br/>


                        {direitos.map((valor, index) => {
                            // Renderize o "direito" apenas se tiver um valor
                            if (valor) {
                                return (
                                    <div key={index}>
                                        <li>
                                        {valor}
                                        &nbsp;&nbsp;<button id={index} onClick={(event) => atualizar(index, event)} className={"btn btn-outline-warning"}>
                                            Atualizar
                                        </button>
                                        &nbsp;&nbsp;<button id={index} onClick={(event) => remover(index, event)} className={"btn btn-outline-danger"}>
                                            Remover
                                        </button>
                                        </li>
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        })}
                    <br/><button className="btn btn-success" onClick={handleClick}>Gerar Petição</button>
                    <button className="btn btn-warning" onClick={handleClick2}>Voltar</button>
                    </div>



            </section>
    );
}

export default Container2;
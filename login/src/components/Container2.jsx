import React, { useState, useEffect } from 'react';
import './Styles/Style.css';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsRotate, faRotateRight} from "@fortawesome/free-solid-svg-icons";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons/faPowerOff";
import {faBan} from "@fortawesome/free-solid-svg-icons/faBan";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";

const id = Cookies.get("id");

function Container2({ setCurrentContainer }) {
    const [direitos, setDireitos] = useState(['']);
    const [deleteCount, setDeleteCount] = useState(0);
    const navigate = useNavigate();
    const id = Cookies.get("id");
    const token = Cookies.get("token");

    useEffect(() => {
        fetch(`https://peticiona-8a3b4bb2-c0c7-4a4e-b616-bc105682467b.up.railway.app/api/peticao/direitos/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'token': token,
            },
        })
            .then(response => {
                if (!response.ok) throw new Error(response.message);
                return response.json();
            })
            .then(data => {
                console.log(data);
                setDireitos(data.data);

                console.log(direitos)

            })
            .catch(error => {
                console.error(error.message);
            });
    }, [id, token]);

    const atualizar = (i) => {

        console.log(i)
        console.log(direitos[i]);

        fetch(`https://peticiona-8a3b4bb2-c0c7-4a4e-b616-bc105682467b.up.railway.app/api/peticao/direitos/update/6467b8d316be006e359326b3?idx=${i}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
            },
        }).then(response => {
            if (!response.ok) throw new Error(response.message);
            return response.json();
        }).then(data => {
            console.log(data);
            console.log(direitos[i])
            console.log(data.data)
            setDireitos(prevDireitos => {
                const updatedDireitos = [...prevDireitos];  // make a copy of the original state
                updatedDireitos[i] = data.data;  // update the value in the copied array
                return updatedDireitos;  // update the state with the new array
            });
            console.log(direitos[i])

        }).catch(error => {
                console.error(error.message);
                toast.error("Limite atingido");
            }
        );
    };


    const remover = (i) => {
        if (deleteCount >= 2) {
            toast.error('Você só pode excluir 2 vezes!');
            return;
        }

        fetch(`https://peticiona-8a3b4bb2-c0c7-4a4e-b616-bc105682467b.up.railway.app/api/peticao/direitos/remove/6467b8d316be006e359326b3?idx=${i}`,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
            }
        }).then(response => {
            if (!response.ok) throw new Error(response.message);
            return response.json();
        }).then(data => {
            console.log(data);
            setDireitos(prevDireitos => prevDireitos.filter((_, index) => index !== i));
            setDeleteCount(deleteCount + 1);
        }).catch(error => {
            console.error(error.message);
            toast.error("Limite de remoção atingido");
        })
    };

    const handleClick = () => setCurrentContainer(3);
    const handleClick2 = () => setCurrentContainer(1);

    return (
        <section className="container">
            <h2>Apresentando o Direito</h2>
            <br />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxSizing: 'border-box',
                width: '100%'
            }}>
                {direitos.map((valor, index) => valor && (
                    <div style={{ display: 'flex', width: '80%', marginBottom: '10px' }}>
                        <div key={index} style={{
                            border: '1px solid #ccc',
                            padding: '10px',
                            borderRadius: '5px',
                            boxSizing: 'border-box',
                            flex: '1',
                            marginRight: '10px',
                            wordWrap: 'break-word',
                        }}>
                            {valor}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <button id={index} onClick={() => atualizar(index)} style={{backgroundColor: '#fafafa', border: 'none'}}>
                                <FontAwesomeIcon icon={faRotateRight} size="xl" style={{color: "#33b1ff"}} />
                            </button>
                            <button id={index} onClick={() => remover(index)} style={{backgroundColor: '#fafafa', border: 'none'}}>
                                <FontAwesomeIcon icon={faXmark} size="2xl" style={{color: "#ff0000",}} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <br />
            <button className="btn btn-success" onClick={handleClick}>Gerar Petição</button>
            <button className="btn btn-warning" onClick={handleClick2}>Voltar</button>
        </section>
    );



}

export default Container2;

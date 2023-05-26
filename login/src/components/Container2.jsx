import React, { useState, useEffect } from 'react';
import './Styles/Style.css';
import Cookies from "js-cookie";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateRight} from "@fortawesome/free-solid-svg-icons";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import SplashScreen from "../SplashScreen";

const id = Cookies.get("id");

function Container2({ setCurrentContainer }) {
    const [direitos, setDireitos] = useState(['']);
    const [deleteCount, setDeleteCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const id = Cookies.get("id");
            const token = Cookies.get("token");

            try {
                const response = await fetch(`https://peticiona-8a3b4bb2-c0c7-4a4e-b616-bc105682467b.up.railway.app/api/peticao/direitos/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'token': token,
                    },
                });

                if (!response.ok) throw new Error(response.message);

                const data = await response.json();
                console.log(data);
                setDireitos(data.data);
            } catch (error) {
                console.error(error.message);
            }
        };

        // Waiting for 1 second before calling the API
        const timeoutId = setTimeout(fetchData, 1000);

        // Clean up function
        return () => clearTimeout(timeoutId);
    }, []); // <-- empty dependency array


    const atualizar = (i) => {

        console.log(i)
        console.log(direitos[i]);
        const id = Cookies.get("id");


        fetch(`https://peticiona-8a3b4bb2-c0c7-4a4e-b616-bc105682467b.up.railway.app/api/peticao/direitos/update/${id}?idx=${i}`, {
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
        const id = Cookies.get("id");


        fetch(`https://peticiona-8a3b4bb2-c0c7-4a4e-b616-bc105682467b.up.railway.app/api/peticao/direitos/remove/${id}?idx=${i}`,{
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
            <div className="container2-title">
                <h2>Apresentando Direitos</h2>
                <img className="icon-direito" src="https://img.icons8.com/ios-filled/64/null/scales--v1.png" alt="ícone de arquivo"/>
            </div>
            <br />
            <div className="container-direitos">
                {direitos.map((valor, index) => valor && (
                    <div className="box-direitos">
                        <div className="direitos" key={index} >
                            {valor}
                        </div>
                        <div className="icon-att-del">
                            <button className="att-del" id={index} onClick={() => atualizar(index)} style={{backgroundColor: '#fFFFFF', border: 'none', cursor:'pointer'}}>
                                <FontAwesomeIcon icon={faRotateRight} size="xl" style={{color: "#07216e"}} />
                            </button>
                            <button className="att-del" id={index} onClick={() => remover(index)} style={{backgroundColor: '#fFFFFF', border: 'none', cursor:'pointer'}}>
                                <FontAwesomeIcon icon={faXmark} size="2xl" style={{color: "#ff0000",}} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <br />
            <div className="buttons-container-direitos">
                <button className="cont2-btn1" onClick={handleClick2}>Voltar</button>
                <button className="cont2-btn2" onClick={handleClick}>Gerar Petição</button>
            </div>
        </section>
    );



}

export default Container2;

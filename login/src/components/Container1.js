import React, {useRef, useState, createContext, useContext} from 'react';
import './Style.css';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Cookies from "js-cookie";
import AudioRecorder from "../AudioRecorder";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Container2 from "./Container2";
import {render} from "@testing-library/react";
import {MyContext} from "./Main";
import Container3 from "./Container3";
// Import any necessary images or other assets

const Container1 = ({setCurrentContainer}) => {

    // Definindo o estado da aplicação
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [pet, setPet] = useState('');
    const [dir, setDir] = useState('CIVIL');
    const [lim, setLim] = useState('true');
    const [prior, setPrior] = useState('true');
    const recorderRef = useRef(null);
    const navigate = useNavigate();


    // Envia o áudio para ser transcrito
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', audioBlob, '.mp4');

        // Faz a chamada à API para transcrever o áudio
        fetch('https://gateway-production-2587.up.railway.app/api/v1/transcritor/audio', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'token': Cookies.get("token"),
            },
            body: formData
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return response.json().then((data) => {
                        throw new Error(data.message);
                    });
                }
            })
            .then((data) => {
                document.getElementById("peticao").value = data.data;
                document.cookie = 'peticao=' + data.data;
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
            });
    };

    // Envia a petição e seus detalhes para a API


    const handleCLick = () => {
        setCurrentContainer(2);
    }


    const handleSubmit2 = async (event) => {
        event.preventDefault();

        console.log(pet, dir, lim, prior);





    document.cookie = 'v=' + 1;




        // Envia a petição e seus detalhes para a API
      //  fetch('https://gateway-production-2587.up.railway.app/api/v1/peticiona/peticionar', {
     //       method: 'POST',
     //       headers: {
     //           'Accept': 'application/json',
     //           'Content-Type': 'application/json',
     //           'token': Cookies.get("token")
     //       },
     //       body: JSON.stringify({
     //           transcricao: pet, tema: dir,
     //           liminar: lim, prioridade: prior
     //       })
     //   })
     //       .then(response => response.json())
      //      .then(data => {
       //         Cookies.set('id', data.data);

                // Busca os direitos relacionados à petição


      //          fetch('https://gateway-production-2587.up.railway.app/api/v1/peticiona/peticionar/direitos/' + data.data, {
      //              method: 'GET',
       //             headers: {
       //                 'Accept': 'application/json',
       //                 'token': Cookies.get("token"),
       //             },
       //         })
         //           .then((response) => {
           //             if (response.status === 200) {
             //               return response.json();
               //         } else {
                 //           return response.json().then((response) => {
                   //             throw new Error(response.message);
                     //       });
                       // }
                   // })
                   // .then((data) => {
                     //   const direitos = data.data.direitos;
                       // direitos.forEach((value, index) => {
                         //   localStorage.setItem("direito" + index, value);
                           // console.log(value);
                       // });
                    //    navigate('/direitos', { state: { id: data.data } });
                   // })
                   // .catch((error) => {
                     //   console.log(error);
                       // toast.error(error.message);
                   // });
            //});
    };

    const handleUploadAudio = async (audioBlob) => {
        const formData = new FormData();
        formData.append('file', audioBlob);
        formData.append('upload_preset', 'ml_default');
        formData.append('resource_type', 'video'); // Usamos "video" porque o Cloudinary trata áudio como vídeo sem imagem

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/doorbyq3k/video/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log('Áudio enviado com sucesso:', data);
            setPet("Audio gravado :)")
        } catch (err) {
            console.error('Erro ao enviar áudio:', err);
        }
    };


    return (
        <body>
        <section className="container">
            <div className="textarea-wrapper">
                <form onSubmit={handleSubmit2}>
                <div className="others">
                    <h2>Criador de petições</h2>
                    <img src="https://img.icons8.com/ios-filled/50/null/file-2.png" alt="ícone de arquivo"/>
                    <p>Conte-me os fatos. Digite as informações de forma clara e objetiva. Certifique-se de que as
                        informações estejam completas e corretas, para que possamos atender adequadamente à sua
                        solicitação.</p>

                    <div className="audio-button">
                        <AudioRecorder onUpload={handleUploadAudio} />
                    </div>

                    <div className="icons-textarea">
                        <i className="fa-solid fa-microphone-lines mic" id="microphone" style={{color: '#203250'}}></i>
                        <i className="fa-solid fa-file-arrow-up file" id="file-arrow-up" style={{color: '#203250'}}></i>
                    </div>
                </div>
                <textarea className="text-area" value={pet} onChange={(e) => setPet(e.target.value)}></textarea>



                    {/* Selecione o direito */}
                    <label>Direito
                        <select value={dir} onChange={(e) => setDir(e.target.value)} id="direito" name="direito" className="form-select" aria-label="Default select example">
                            {/* Opções de direito */}
                            <option selected value="CIVIL">Direito Civil</option>
                            <option value="PENAL">Direito Penal</option>
                            <option value="TRABALHISTA">Direito Trabalhista</option>
                            <option value="ADMINISTRATIVO">Direito Administrativo</option>
                            <option value="TRIBUTARIO">Direito Tributário</option>
                            <option value="CONSTITUCIONAL">Direito Constitucional</option>
                            <option value="EMPRESARIAL">Direito Empresarial</option>
                            <option value="INTERNACIONAL">Direito Internacional</option>
                            <option value="AMBIENTAL">Direito Ambiental</option>
                            <option value="PREVIDENCIARIO">Direito Previdenciário</option>
                            <option value="CONSUMIDOR">Direito do Consumidor</option>
                            <option value="FAMILIA">Direito da Família</option>
                            <option value="CRIANCA">Direito da Criança e do Adolescente</option>
                            <option value="ELEITORIAL">Direito Eleitoral</option>
                            <option value="MILITAR">Direito Militar</option>
                            <option value="SANITARIO">Direito Sanitário</option>
                            <option value="DESPORTIVO">Direito Desportivo</option>
                        </select>
                    </label>
                    {/* Selecione se há liminar */}
                    <label>Liminar
                        <select value={lim} onChange={(e) => setLim(e.target.value)} id="liminar" name="liminar" className="form-select" aria-label="Default select example">
                            {/* Opções de liminar */}
                            <option selected value="true">Sim</option>
                            <option value="false">Não</option>
                        </select>
                    </label>
                    {/* Selecione a prioridade */}
                    <label>Prioridade
                        <select value={prior} onChange={(e) => setPrior(e.target.value)} id="prio" name="prio" className="form-select" aria-label="Default select example">
                            {/* Opções de prioridade */}
                            <option selected value="true">Alta</option>
                            <option value="false">Baixa</option>
                        </select>
                    </label>
                    <div className="submit-button-pet">
                        <button type="submit" className="btn btn-primary" onClick={handleCLick} id="btn-enviar">Enviar</button>
                    </div>
                </form>
            </div>
            <div className="text-divs">
                <div className="text-div">
                    <header>
                        <i className="ri-checkbox-blank-circle-fill circle-div-header"></i>
                        <i className="ri-checkbox-blank-circle-fill circle-div-header"></i>
                        <i className="ri-checkbox-blank-circle-fill circle-div-header"></i>
                    </header>
                    <p>Clique para formatar seu texto</p>
                    <button className="send-button-blue">Formatar</button>
                </div>
                <div className="text-div">
                    <header>
                        <i className="ri-checkbox-blank-circle-fill circle-div-header"></i>
                        <i className="ri-checkbox-blank-circle-fill circle-div-header"></i>
                        <i className="ri-checkbox-blank-circle-fill circle-div-header"></i>
                    </header>
                    <p>Dúvidas no que colocar? Clique para receber ajuda</p>
                    <button className="send-button-blue">Ajuda</button>
                </div>
            </div>
        </section>
        </body>
    );
}

export default Container1;
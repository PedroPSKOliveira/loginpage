import React, {useEffect, useState} from 'react';
import './Styles/Style.css';
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import Cookies from "js-cookie";
import AudioRecorder from "../AudioRecorder";
import Upload from "./Upload";
import SplashScreen from "../SplashScreen";
// Import any necessary images or other assets



const Container1 = ({setCurrentContainer}) => {

    // Definindo o estado da aplicação
    const [pet, setPet] = useState('');
    const [dir, setDir] = useState();
    const [lim, setLim] = useState(false);
    const [tutela, setTutela] = useState(false);
    const [transcricao, setTranscricao] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [userPlan, setUserPlan] = useState('');
    const navigate = useNavigate();
    const [isFetching, setIsFetching] = useState(false);
    const [isUploading, setIsUploading] = useState(false);



    // Definindo o estado da aplicação
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setUserPlan(Cookies.get("userPlan"));
        }, 2000); // delay of 2 second

        // Clean up function
        return () => clearTimeout(timeoutId);
    }, [Cookies.get("userPlan")]);


    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleCLick = (e) => {
        e.preventDefault();
        console.log(pet, lim, tutela);

        setCurrentContainer(2);
    }

    const handleSubmit2 = async (event) => {
        event.preventDefault();
        console.log(pet, lim, tutela);
        setIsFetching(true);
        try {
            fetch('https://peticiona-8a3b4bb2-c0c7-4a4e-b616-bc105682467b.up.railway.app/api/peticao/previa', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json', },
                body: JSON.stringify({
                    transcricao: pet,
                    liminar: lim, tutela: tutela
                })
            })
                .then(response => {
                    // Check the response
                    console.log(response);
                    return response.json();
                })
                .then(async data => {
                    console.log(data);
                    if (data.code === 200) {
                        let id = data.data;
                        Cookies.set('id', data.data);
                        console.log(id);
                        toast.success(data.message)
                        setCurrentContainer(2);
                        await new Promise(resolve => setTimeout(resolve, 2000)); // Ajuste aqui
                        setIsFetching(false); // Ajuste aqui
                    } else {
                        toast.error("Erro ao enviar os fatos")
                        setIsFetching(false); // Ajuste aqui
                    }

                })
                .catch (err => {
                    console.log(err);
                    toast.error("Erro ao enviar os fatos")
                    setIsFetching(false); // Ajuste aqui
                });
        } catch (err) {
            console.log(err);
            toast.error("Erro ao enviar os fatos")
            setIsFetching(false); // Ajuste aqui
        }
    };

    //Transcritor a ser usado

    const handleUploadAudio = async (audioBlob) => {
        setIsUploading(true);

        const formData = new FormData();
        formData.append('file', audioBlob, '.mp4');

        try {
            const response = await fetch('https://gateway-d6c99606-f18c-11ed-a05b-0242ac120003.up.railway.app/api/transcript/audio', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData,
            });
            const data = await response.json();
            setTranscricao(data)
            console.log('Áudio enviado com sucesso:', data);
            setPet(data.data)
        } catch (err) {
            console.error('Erro ao enviar áudio:', err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleUploadFile = async (file) => {
        await handleUploadAudio(file);
    }


    return (
        <section className="container">
            {isFetching ? <SplashScreen /> :
                <div className="textarea-wrapper">
                <form action={"#!"}>
                <div className="others">
                    <div className="container-title">
                        <h2>Criador de petições</h2>
                        <img className="icon-textarea" src="https://img.icons8.com/ios-filled/50/null/file-2.png" alt="ícone de arquivo"/>
                    </div>
                    <br/>
                    <p>Conte-me os fatos. Digite as informações de forma clara e objetiva. Certifique-se de que as
                        informações estejam completas e corretas, para que possamos atender adequadamente à sua
                        solicitação.</p>
                    <div className="audio-buttons-container">
                        <div className="checkbox">
                            <label className="check">Liminar
                                <input
                                    type="checkbox"
                                    id="liminar"
                                    name="liminar"
                                    checked={lim}
                                    onChange={(e) => setLim(e.target.checked)}
                                />
                                <svg viewBox="0 0 64 64" height="1em" width="2em">
                                    <path
                                        d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                        pathLength="575.0541381835938" className="path"></path>
                                </svg>
                            </label>&nbsp;

                            <label className="check">Tutela
                                <input
                                    type="checkbox"
                                    id="tutela"
                                    name="tutela"
                                    checked={tutela}
                                    onChange={(e) => setTutela(e.target.checked)}
                                />
                                <svg viewBox="0 0 64 64" height="1em" width="2em">
                                    <path
                                        d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                        pathLength="575.0541381835938" className="path"></path>
                                </svg>
                            </label>&nbsp;
                        </div>
                        {/* Exibe o botão de gravação de áudio apenas se o plano do usuário for 'Gold' */}
                        {(userPlan === "ENTERPRISE" || userPlan === "SEMESTRAL_ENTERPRISE") && (
                            <div className="audio-button">
                                <AudioRecorder onUpload={handleUploadAudio} isUploading={isUploading} />
                            </div>
                        )}
                        {(userPlan === 'SEMESTRAL_PREMIUM' || userPlan === 'SEMESTRAL_ENTERPRISE' || userPlan === 'PREMIUM' || userPlan === 'ENTERPRISE') && (
                            <div className="audio-button">
                                <Upload onUpload={handleUploadFile}/>
                            </div>
                        )}

                    </div>
                    <div className="icons-textarea">
                        <i className="fa-solid fa-microphone-lines mic" id="microphone" style={{color: '#203250'}}></i>
                        <i className="fa-solid fa-file-arrow-up file" id="file-arrow-up" style={{color: '#203250'}}></i>
                    </div>
                </div>
                    <textarea
                        className="text-area"
                        maxLength="3000"
                        value={pet}
                        onChange={(e) => {
                            if (e.target.value.length === 7800) {
                                toast.warning("Você está se aproximando do limite de caracteres!");
                            } else if (e.target.value.length >= 8000) {
                                toast.error("Você atingiu o limite de caracteres!");
                            }

                            // Limitar o valor a 3000 caracteres
                            setPet(e.target.value.slice(0, 8000));
                        }}
                    />
                    <div className="submit-button-pet" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                className="button"
                                id="chatbot-send-btn"
                                type="submit"
                                style={{backgroundColor :"#030957"}}
                                onClick={handleSubmit2}>
                                Enviar
                            </button>
                    </div>
                </form>
            </div>
            }
        </section>
    );
}

export default Container1;
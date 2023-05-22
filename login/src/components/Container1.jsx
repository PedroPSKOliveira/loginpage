import React, {useEffect, useState} from 'react';
import './Styles/Style.css';
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import Cookies from "js-cookie";
import AudioRecorder from "../AudioRecorder";
import Upload from "./Upload";
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
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);


    useEffect(() => {
        fetch(`https://gateway-d6c99606-f18c-11ed-a05b-0242ac120003.up.railway.app/api/pay/find`,
            {
                method: 'GET',
                headers: {
                    "Authorization": Cookies.get("Authorization"),
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
            return res.json();
        }).then((res) => {
                console.log(res);
                setUserPlan(res.data.signature);
                ;

            }
        ).catch((err) => {
            console.log(err);
        })
    }, []);


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
        console.log(pet, lim, tutela)
        try{
            console.log(pet, lim, tutela)
            fetch('https://peticiona-8a3b4bb2-c0c7-4a4e-b616-bc105682467b.up.railway.app/api/peticao/previa', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',},
                body: JSON.stringify({
                    transcricao: pet,
                    liminar: lim, tutela: tutela
                })
            })
                .then(response => {
                    // Check the response
                    console.log(response);
                })
                .then(data => {
                    console.log(data);
                    if (data.status === 200) {
                        let id = data;
                        Cookies.set('id', data);
                        console.log(id);
                    //    setCurrentContainer(2);
                    }else {
                        toast.error("Erro ao enviar os fatos")
                    }

                })
                .catch (err => {
                    console.log(err);
                    toast.error("Erro ao enviar os fatos")
                });
        } catch (err) {
            console.log(err);
            toast.error("Erro ao enviar os fatos")
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

        const speakText = () => {
            let synth = window.speechSynthesis;

            let id = setInterval(() => {
                if (synth.getVoices().length !== 0) {
                    let voices = synth.getVoices();

                    let voice = voices[1];

                    let utterance = new SpeechSynthesisUtterance(`
            Olá, tudo bem? 
            Sou a Vitória, sua assessora jurídica. 
            Estou aqui para descrever a página e te guiar.
            A página que você está agora é composta por uma barra de navegação, onde
            você encontra seu nome e email, uma opção para você atualizar os seus dados,
            uma opção para você verificar o plano adquirido e uma opção para sair da sua conta.
            Abaixo dessa barra, você estará no criador de petições, onde os fatos
            serão descritos e formatados, e dependendo do seu plano, você poderá enviar
            arquivos e gravar áudio. 
            Você também possui um controlador de interações e botões de ajuda.
            Ao descrever e enviar os fatos, você poderá escolher entre ver os seus direitos, ou
            gerar sua petição.
            Abaixo do criador de petições você possui um espaço onde poderá falar comigo e tirar qualquer dúvida.
            Por último você pode encontrar nossos planos de compra para interagir com os nossos serviços.
            Nosso contato e endereço se encontram ao final da página, precisando de qualquer coisa, entre em contato.
            Agora você está pronto para iniciar sua experiência com a Smart Petição.
            Foi um prazer te ajudar.
          `);

                    utterance.voice = voice;

                    synth.speak(utterance);

                    clearInterval(id);
                }
            }, 10);
        }

    return (
        <section className="container">
            <div className="textarea-wrapper">
                <form action={"#!"}>
                <div className="others">
                    <h2>Criador de petições</h2>
                    <img src="https://img.icons8.com/ios-filled/50/null/file-2.png" alt="ícone de arquivo"/>
                    <br/>
                    <h1>

                    </h1>
                    <p>Conte-me os fatos. Digite as informações de forma clara e objetiva. Certifique-se de que as
                        informações estejam completas e corretas, para que possamos atender adequadamente à sua
                        solicitação.</p>
                    <div className="audio-buttons-container">
                        <div className="checkbox">
                            <label>Lim</label>&nbsp;
                            <input
                                type="checkbox"
                                id="liminar"
                                name="liminar"
                                checked={lim}
                                onChange={(e) => setLim(e.target.checked)}
                            />&nbsp;&nbsp;
                            <label>Tut</label>&nbsp;
                            <input
                                type="checkbox"
                                id="tutela"
                                name="tutela"
                                checked={tutela}
                                onChange={(e) => setTutela(e.target.checked)}
                            />&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        {/* Exibe o botão de gravação de áudio apenas se o plano do usuário for 'Gold' */}
                        {(userPlan === "ENTERPRISE" || userPlan === "SEMESTRAL_ENTERPRISE") && (
                            <div className="audio-button">
                                <AudioRecorder onUpload={handleUploadAudio} isUploading={isUploading} />
                            </div>
                        )}
                        {(userPlan === 'SEMESTRAL_PREMIUM' || userPlan === 'SEMESTRAL_ENTERPRISE' || userPlan === 'PREMIUM' || userPlan === 'ENTERPRISE') && (
                            <div className="audio-button">
                                <Upload />
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
                            if (e.target.value.length === 2800) {
                                toast.warning("Você está se aproximando do limite de caracteres!");
                            } else if (e.target.value.length >= 3000) {
                                toast.error("Você atingiu o limite de caracteres!");
                            }

                            // Limitar o valor a 3000 caracteres
                            setPet(e.target.value.slice(0, 3000));
                        }}
                    />
                    <div className="submit-button-pet" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                className="button"
                                id="chatbot-send-btn"
                                type="submit"
                                    style={{backgroundColor :"#040e36", height: "47px"}}
                                onClick={handleSubmit2}>
                                Enviar
                            </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Container1;
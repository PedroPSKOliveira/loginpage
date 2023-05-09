import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import AudioRecorder from "./AudioRecorder";

const PeticaoChat = () => {
    // Limpa o localStorage
    localStorage.clear();

    // Definindo o estado da aplicação
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [pet, setPet] = useState('');
    const [dir, setDir] = useState('CIVIL');
    const [lim, setLim] = useState('true');
    const [prior, setPrior] = useState('true');
    const recorderRef = useRef(null);
    const navigate = useNavigate();

    // Inicia a gravação de áudio
    const startRecording = () => {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                const recorder = new MediaRecorder(stream);
                recorderRef.current = recorder;
                recorder.start();
                setRecording(true);
                recorder.addEventListener("dataavailable", (event) => {
                    setAudioBlob(event.data);
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // Para a gravação de áudio
    const stopRecording = () => {
        const recorder = recorderRef.current;
        if (recorder) {
            recorder.stop();
            setRecording(false);
        }
    };

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
    const handleSubmit2 = async (event) => {
        event.preventDefault();

        console.log(pet, dir, lim, prior);

        document.cookie = 'peticao=' + pet;

        // Envia a petição e seus detalhes para a API
        fetch('https://gateway-production-2587.up.railway.app/api/v1/peticiona/peticionar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': Cookies.get("token")
            },
            body: JSON.stringify({
                transcricao: pet, tema: dir,
                liminar: lim, prioridade: prior
            })
        })
            .then(response => response.json())
            .then(data => {
                Cookies.set('id', data.data);

                // Busca os direitos relacionados à petição


                fetch('https://gateway-production-2587.up.railway.app/api/v1/peticiona/peticionar/direitos/' + data.data, {
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
                        const direitos = data.data.direitos;
                        direitos.forEach((value, index) => {
                            localStorage.setItem("direito" + index, value);
                            console.log(value);
                        });
                        navigate('/direitos', { state: { id: data.data } });
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error(error.message);
                    });
            });
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


    return <div>
        <div className="container">
            <h1>Gerador de Petições</h1>
                <div className="mb-3">
                    <label htmlFor="case_details" className="form-label">Detalhes do caso:</label>
                    <textarea value={pet} onChange={(e) => setPet(e.target.value)} className="form-control" name="case_details" id="peticao" rows="10"></textarea>
                </div>

            <div className="App">
                <h1>Gravador de Áudio</h1>
                <AudioRecorder onUpload={handleUploadAudio} />
            </div>

            <form onSubmit={handleSubmit2}>
                {/* Selecione o direito */}
                <label>Direito
                    <select value={dir} onChange={(e) => setDir(e.target.value)} id="direito" name="direito" className="form-select" aria-label="Default select example">
                        {/* Opções de direito */}
                        <option selected={true}  value="CIVIL">Direito Civil</option>
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
                        <option selected={true}  value="true">Sim</option>
                        <option value="false">Não</option>
                    </select>
                </label>
                {/* Selecione a prioridade */}
                <label>Prioridade
                    <select value={prior} onChange={(e) => setPrior(e.target.value)} id="prio" name="prio" className="form-select" aria-label="Default select example">
                        {/* Opções de prioridade */}
                        <option selected={true} value="true">Alta</option>
                        <option value="false">Baixa</option>
                    </select>
                </label>
                <div className="submit-button-pet">
                    <button type="submit" className="btn btn-primary" onSubmit={handleSubmit2} id="btn-enviar">Enviar</button>
                </div>
            </form>
        </div>
    </div>
}

export default PeticaoChat;
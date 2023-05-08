import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from "react-toastify";

function App() {
    // Limpa o localStorage
    localStorage.clear();

    // Definindo o estado da aplicação
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [pet, setPet] = useState(null);
    const [dir, setDir] = useState(null);
    const [lim, setLim] = useState(null);
    const [prior, setPrior] = useState(null);
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
        const op = document.getElementById("peticao").value;
        const direito = document.getElementById("direito").value;
        const liminar = document.getElementById("liminar").value;
        const prio = document.getElementById("prio").value;

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

    return (
        <div>
            <div className="container">
                <h1>Gerador de Petições</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="case_details" className="form-label">Detalhes do caso:</label>
                        <textarea value={pet} onChange={(e) => setPet(e.target.value)} className="form-control" name="case_details" id="peticao" rows="10"></textarea>
                    </div>
                    {recording ? (
                        <div className="audio-stop">
                            <button onClick={stopRecording} className="btn btn-primary">Parar gravação</button>
                        </div>
                    ) : (
                        <div className="audio-grav">
                            <button onClick={startRecording} className="btn btn-primary">Iniciar gravação</button>
                        </div>
                    )}
                    {audioBlob && (
                        <div>
                            <div className="audio-grav">
                                <audio src={URL.createObjectURL(audioBlob)} controls id="audioUs"></audio>
                            </div>
                            <div className="audio-grav">
                                <button onClick={handleSubmit} className="btn btn-primary">Enviar áudio</button>
                            </div>
                        </div>
                    )}
                </form>

                <form onSubmit={handleSubmit2}>
                    {/* Selecione o direito */}
                    <label>Direito
                            <select value={dir} onChange={(e) => setDir(e.target.value)} id="direito" name="direito" className="form-select" aria-label="Default select example">
                            {/* Opções de direito */}
                            <option value="CIVIL">Direito Civil</option>
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
                            <option value="1">Sim</option>
                            <option value="0">Não</option>
                        </select>
                    </label>
                    {/* Selecione a prioridade */}
                    <label>Prioridade
                        <select value={prior} onChange={(e) => setPrior(e.target.value)} id="prio" name="prio" className="form-select" aria-label="Default select example">
                            {/* Opções de prioridade */}
                            <option value="1">Alta</option>
                            <option value="0">Baixa</option>
                        </select>
                    </label>
                    <div className="submit-button-pet">
                        <button type="submit" className="btn btn-primary" onSubmit={handleSubmit2} id="btn-enviar">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default App;
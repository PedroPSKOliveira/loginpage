// src/AudioRecorder.js
import React, { useState, useRef } from 'react';
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMicrophoneLines} from "@fortawesome/free-solid-svg-icons";

const AudioRecorder = ({ onUpload }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioURL, setAudioURL] = useState('');
    const recordedChunks = useRef([]);
    let cos;

    const handleStartRecording = () => {
        cos = true;
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                const recorder = new MediaRecorder(stream);
                setMediaRecorder(recorder);

                recorder.ondataavailable = (e) => {
                    recordedChunks.current.push(e.data);
                };

                recorder.onstop = () => {
                    const blob = new Blob(recordedChunks.current, { type: 'audio/webm' });
                    const url = URL.createObjectURL(blob);
                    setAudioURL(url);
                    onUpload(blob);
                    recordedChunks.current = [];
                };

                recorder.start();
                setIsRecording(true);
            })
            .catch((err) => {
                console.error('Erro ao acessar o microphone:', err);
                toast.error("Erro ao acessar o microphone: "+err);
            });
    };

    const handleStopRecording = () => {
        cos = false;
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    return (
        <div>
            <button onClick={handleStartRecording} disabled={isRecording}>
                <FontAwesomeIcon icon={faMicrophoneLines}/>
            </button>
            <button onClick={handleStopRecording} disabled={!isRecording}>
                <FontAwesomeIcon icon={faMicrophoneLines} style={{color: "#511f1f",}} />
            </button>
            {audioURL && (
                <div>
                    <h3>Áudio gravado:</h3>
                    <audio src={audioURL} controls />
                </div>
            )}
        </div>
    );
};

export default AudioRecorder;

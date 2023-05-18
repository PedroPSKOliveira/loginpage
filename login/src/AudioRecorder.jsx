// src/AudioRecorder.jsx
import React, { useState, useRef } from 'react';
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMicrophoneLines} from "@fortawesome/free-solid-svg-icons";
import {faMicrophone} from "@fortawesome/free-solid-svg-icons/faMicrophone";
import './components/Styles/Pulse.css';

const AudioRecorder = ({ onUpload, isUploading }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioURL, setAudioURL] = useState('');
    const recordedChunks = useRef([]);
    let cos;

    const handleClick = () => {
        if (isRecording) {
            handleStopRecording();
        } else {
            handleStartRecording();
        }
    }

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

    {/*
    {audioURL && (
        <div>
            <h3>Áudio gravado:</h3>
            <audio src={audioURL} controls />
        </div>
    )}
    */}

    return (
        <div>
            <button
                onClick={handleClick}
                disabled={isUploading}
                style={{ outline: "none", border: "none", background: "none" }}
                className={isRecording ? "recording" : ""}
            >
                <FontAwesomeIcon
                    icon={faMicrophone}
                    size="2xl"
                    style={{color: isUploading ? "gray" : isRecording ? "red" : "black"}}
                />
            </button>

        </div>
    );
};

export default AudioRecorder;

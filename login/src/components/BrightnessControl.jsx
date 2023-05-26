import React, { useState } from 'react';
import './Styles/BrightnessControl.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';

const BrightnessControl = () => {
    const [overlayOpacity, setOverlayOpacity] = useState(0);
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [lightActive, setLightActive] = useState(false);
    const [audioActive, setAudioActive] = useState(false);

    const handleClickLight = () => {
        setOverlayOpacity(overlayOpacity === 0 ? 0.6 : 0);
        setLightActive(!lightActive);
    }

    const handleClickHeadphone = () => {
        var synth = window.speechSynthesis;

        if (audioPlaying) {
            synth.cancel();
            setAudioPlaying(false);
            setAudioActive(false);
            return;
        }

        var id = setInterval(() => {
            if (synth.getVoices().length !== 0) {
                var voices = synth.getVoices();

                var voice = voices[1];

                var utterance = new SpeechSynthesisUtterance(`
                Olá, tudo bem? 
                Sou a Lucy, sua assessora jurídica. 
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
                Nosso contato e endereço se encontram ao final da página, entre em contato.
                Agora você está pronto para iniciar sua experiência com a Smart Petição.
                Foi um prazer te ajudar.
            `);

                utterance.voice = voice;
                utterance.onend = function() {
                    setAudioActive(false);
                    setAudioPlaying(false);
                };

                synth.speak(utterance);
                setAudioPlaying(true);
                setAudioActive(true);

                clearInterval(id);
            }
        }, 10);
    }

    return (
        <>
            <div id="brightness-control">
                <button onClick={handleClickLight}>
                    <FontAwesomeIcon  className={`icons-light ${lightActive ? "active" : ""}`} icon={faLightbulb} />
                </button>
                <button onClick={handleClickHeadphone}>
                    <FontAwesomeIcon  className={`icons-light ${audioActive ? "active" : ""}`} icon={faHeadphones} />
                </button>
            </div>
            <div id="overlay" style={{ opacity: overlayOpacity }}></div>
        </>
    );
}

export default BrightnessControl;

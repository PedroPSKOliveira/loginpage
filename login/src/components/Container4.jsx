import React, {useEffect, useState} from "react";
import "./Styles/Chatbot.css";
import {toast} from "react-toastify";
import Cookies from "js-cookie";

const Container4 = () => {
    const [messages, setMessages] = useState([{ role: 'bot', text: 'Olá! Eu sou a Lucy. Como posso ajudá-lo?' }]);
    const [userInput, setUserInput] = useState('');

    const getResponse2 = async (input) => {
        setUserInput(userInput.toLowerCase().trim())
        try {
            const response = await fetch('https://gateway-d6c99606-f18c-11ed-a05b-0242ac120003.up.railway.app/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Cookies.get('Authorization'),
                },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();

            if (data.code === 200) {
                return data.data.message;
            } else {
                toast.error('Erro ao enviar mensagem');
                return '';
            }
        } catch (error) {
            toast.error('Erro ao enviar mensagem');
            return '';
        }
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setMessages([
            ...messages,
            { role: 'user', text: userInput },
            { role: 'bot', text: 'Digitando...' },
        ]);

        setUserInput('');

        const botMessage = await getResponse2(userInput);
        setMessages((oldMessages) => {
            const newMessages = [...oldMessages];
            newMessages[newMessages.length - 1].text = botMessage;
            return newMessages;
        });
    };

    return (
        <section className="container">
            <div className="container-title">
                <h2>Assessora Jurídica <img src="https://img.icons8.com/glyph-neue/64/null/technical-support.png" className="icons-textarea"/></h2>
            </div>
            <div id="chatbot">
                <div id="messages">
                    {messages.map((message, index) =>
                        <div key={index} className={`message ${message.role}-message`}>
                            <i className={`fas fa-${message.role === 'bot' ? 'robot' : 'user'}`}></i>
                            {message.text}
                        </div>
                    )}
                </div>
                <form id="chat-form" onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        id="user-input"
                        placeholder="Digite sua mensagem..."
                        value={userInput}
                        onChange={e => setUserInput(e.target.value)}
                    />
                    <button className="button" id="chatbot-send-btn" type="submit">Enviar</button>
                </form>
            </div>
        </section>
    );
};

export default Container4;
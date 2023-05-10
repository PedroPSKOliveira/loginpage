import React from 'react';
import './Style.css';

const Container = () => {
    return(
        <body>
        <header>
            <nav>
                <img src="./img/logo1.png" alt="" className="logo"/>

                    <div className="mobile-menu">
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                    <ul className="nav-list">
                        <li><a href="#" className="btn-nav-border">Criar</a></li>
                        <li><span className="vertical-line"></span></li>
                        <li><a href="#" className="btn-nav-border">Painel</a></li>
                        <li><span className="vertical-line"></span></li>
                        <li><a href="#" className="btn-nav-border">Contato</a></li>
                        <li><span className="vertical-line"></span></li>
                        <li><a href="#" className="btn-nav-border">Ajuda</a></li>
                        <li><span className="vertical-line"></span></li>
                        <li><a href="#" className="btn-nav-border">Logout</a></li>
                    </ul>
            </nav>
        </header>

        <main>
            <section className="container">
                <div className="textarea-wrapper">
                    <div className="others">
                        <h2>Criador de petições</h2>
                        <img src="https://img.icons8.com/ios-filled/50/null/file-2.png"/>
                        <p>Conte-me os fatos. Digite as informações de forma clara e objetiva. Certifique-se de que as
                            informações estejam completas e corretas, para que possamos atender adequadamente à sua
                            solicitação.</p>
                        <div className="icons-textarea">
                            <i className="fa-solid fa-microphone-lines mic" id="microphone" style={{color: "#203250"}}></i>
                            <i className="fa-solid fa-file-arrow-up file" id="file-arrow-up"
                               style={{color: "#203250"}}></i>
                        </div>
                    </div>
                    <textarea className="text-area"></textarea>
                    <button className="send-button-green">Enviar</button>
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

            <section className="container2">
                <h2>Apresentando o Direito</h2>
                <img src="https://img.icons8.com/ios-filled/64/null/scales--v1.png"/>
                <button className="send-button-blue">Novos Direitos</button>
                <button className="send-button-green">Gerar Petição</button>
            </section>

            <section className="container">
                <h2>Assessora Jurídica</h2>
                <img src="https://img.icons8.com/glyph-neue/64/null/technical-support.png"/>
                <div id="chatbot">
                    <div id="messages">
                        <div className="message bot-message">Vitória: Olá! Eu sou o Vitória. Como posso ajudá-lo?</div>
                    </div>
                    <form id="chat-form">
                        <input type="text" id="user-input" placeholder="Digite sua mensagem..."/>

                            <button className="button" type="submit">Enviar</button>
                    </form>
                </div>
            </section>

            <section className="container4">
                <div className="block-container">
                    <div className="block">
                        <header>
                            <img className="card-img-top" style={{width: "300px"}} src="img/card1.png"
                                 alt="Imagem de capa do card"/>
                                <div className="card-body">
                                    <h5 className="card-title" style={{fontSize: '1.2rem'}}>Direitos do consumidor
                                        turista</h5>
                                    <p className="card-text" style={{fontSize: '0.8rem'}}>Se você pensa em viajar neste
                                        ano, não perca as dicas e saiba quais são seus direitos. Todas as dicas foram
                                        retiradas das Cartilhas do Consumidor Turista publicações produzidas pelo
                                        Ministério do Turismo, em parceria com o Ministério da Justiça e Segurança
                                        Pública (MJSP).</p>
                                    <a href="#" className="btn btn-primary"
                                       style={{backgroundColor: '#0b60f3', padding: '5px', borderRadius: '5px'}}>Visitar</a>
                                </div>
                        </header>
                    </div>
                    <div className="block">
                        <header>
                            <img className="card-img-top" style={{width: '300px'}} src="img/card2.png"
                                 alt="Imagem de capa do card"/>
                                <div className="card-body">
                                    <h5 className="card-title" style={{fontSize: '1.2rem'}}>Direitos do consumidor
                                        turista</h5>
                                    <p className="card-text" style={{fontSize: '0.8rem'}}>Se você pensa em viajar neste
                                        ano, não perca as dicas e saiba quais são seus direitos. Todas as dicas foram
                                        retiradas das Cartilhas do Consumidor Turista publicações produzidas pelo
                                        Ministério do Turismo, em parceria com o Ministério da Justiça e Segurança
                                        Pública (MJSP).</p>
                                    <a href="#" className="btn btn-primary"
                                       style={{backgroundColor: '#0b60f3', padding: '5px', borderRadius: '5px'}}>Visitar</a>
                                </div>
                        </header>
                    </div>
                    <div className="block">
                        <header>

                        </header>
                    </div>
                </div>
            </section>

            <section className="container">
                <p>AI Collaboration - @Copyright - 2023</p>
            </section>
        </main>

        <script src="chatbot.js"></script>
        <script src="navbar.js"></script>
        </body>
    )
}

export default Container;
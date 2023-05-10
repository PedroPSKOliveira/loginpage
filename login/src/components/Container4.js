const Container4 = () => {


    return (
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
    );
}
export default Container4;
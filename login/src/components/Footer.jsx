import React, {useState} from "react";
import "./Styles/Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {

    const [emailc, setEmailc] = useState('aicollabdev@gmail.com');
    const [whatsapp, setWhatsapp] = useState('(73) 98142-7266');

    return (
        <footer>
            <div className="footer">
                <div className="footer-item">
                    <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" style={{ cursor: 'pointer' }} />
                    <a href="https://www.google.com/maps/search/?api=1&query=Av.+Demetrio+C.+Guerrieri,+94+-+Centro,+Eunápolis+-+BA,+45825-000" target="_blank" style={{ textDecoration: 'none', color: '#ffffff', cursor: 'pointer' }}>
                        Av. Demetrio C. Guerrieri, 94 - Centro<br/>Eunápolis - BA, 45825-000
                    </a>
                </div>
                <div className="footer-item">
                    <FontAwesomeIcon icon={faEnvelope} size="lg" style={{ cursor: 'pointer' }} />
                    <a href="mailto:aicollabdev@gmail.com?subject=Assunto%20do%20email&body=Corpo%20da%20mensagem" style={{ textDecoration: 'none', color: '#ffffff', cursor: 'pointer' }}>
                        aicollabdev@gmail.com
                    </a>
                </div>
                <div className="footer-item">
                    <FontAwesomeIcon icon={faWhatsapp} size="lg" style={{ cursor: 'pointer' }} />
                    <a href="#" style={{ textDecoration: 'none', color: '#ffffff', cursor: 'pointer' }}>
                        +55 (73) 91234-5678
                    </a>
                </div>
            </div>
            <div className="sub-footer">
                &copy; 2023 Smart Petição. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
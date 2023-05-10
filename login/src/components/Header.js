import React from 'react';
import './Styles/Header.css';
import logo from './img/logo1.png'

const Header = () => {
    return (
        <header>
            <nav>
                <img src={logo} alt="" className="logo" />

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
    );
};

export default Header;
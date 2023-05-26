import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Styles/PasswordResetPage.css';
import BrightnessControl from "./BrightnessControl";

const PasswordResetPage = () => {
    const { id } = useParams();
    const [showPassword, setShowPassword] = useState(false);

    console.log(id);

    // Agora você pode usar esse ID para buscar informações do usuário
    // e permitir a atualização da senha.

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="page-container">
            <form className="form ">
                <p className="form-title">Recupere sua senha</p>
                <div className="recuperar-input">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Senha"
                        required
                    />
                    <FontAwesomeIcon onClick={handleTogglePassword} className="reset-icon"  icon={showPassword ? faEye : faEyeSlash} />
                </div>

                <button type="submit" className="reset-submit">Enviar</button>
            </form>
            <BrightnessControl />
        </div>
    );
};

export default PasswordResetPage;

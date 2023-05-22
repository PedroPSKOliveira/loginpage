import React from 'react';
import { useParams } from 'react-router-dom';

const PasswordResetPage = () => {
    const { id } = useParams();

    console.log(id);

    // Agora você pode usar esse ID para buscar informações do usuário
    // e permitir a atualização da senha.

    return (
        <div>
            <h2>Reset Password</h2>
            {/* Seu formulário de reset de senha aqui */}
            {id}
        </div>
    );
};

export default PasswordResetPage;

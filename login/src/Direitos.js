import React, { useState } from "react";

function Direito() {
    // Inicialize o estado com valores de localStorage para "direito0" a "direito4"
    const [direitos, setDireitos] = useState([
        localStorage.getItem("direito0"),
        localStorage.getItem("direito1"),
        localStorage.getItem("direito2"),
        localStorage.getItem("direito3"),
        localStorage.getItem("direito4"),
    ]);

    const atualizar = (i) => {
        const novoDireito = prompt("Digite o novo direito:");
        localStorage.setItem("direito" + i, novoDireito);
        // Atualize o "direito" específico no estado
        setDireitos((prevDireitos) => {
            const updatedDireitos = [...prevDireitos];
            updatedDireitos[i] = novoDireito;
            return updatedDireitos;
        });
        console.log("Atualizou o direito " + (i + 1) + "!");
        window.location.reload(false);
    };

    const remover = (i) => {
        localStorage.removeItem("direito" + i);
        // Remova o "direito" específico do estado
        setDireitos((prevDireitos) => {
            const updatedDireitos = prevDireitos.filter((_, index) => index !== i);
            return updatedDireitos;
        });
        console.log("Removeu o direito " + (i + 1) + "!");
        window.location.reload(false);
    };

    return (
        <div>
            {direitos.map((valor, index) => {
                // Renderize o "direito" apenas se tiver um valor
                if (valor) {
                    return (
                        <div key={index}>
                            {valor}
                            <button id={index} onClick={() => atualizar(index)}>
                                Atualizar
                            </button>
                            <button id={index} onClick={() => remover(index)}>
                                Remover
                            </button>
                        </div>
                    );
                } else {
                    return null;
                }
            })}
        </div>
    );
}

export default Direito;

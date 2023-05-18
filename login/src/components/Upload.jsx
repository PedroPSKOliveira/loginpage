import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/free-solid-svg-icons/faUpload";

const Upload = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            // Aqui você pode fazer a chamada para a API em nuvem usando a biblioteca Fetch ou Axios
            // Exemplo usando Fetch:
            fetch('https://sua-api-em-nuvem.com/upload', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    // Manipule a resposta da API conforme necessário
                    console.log(data);
                })
                .catch((error) => {
                    // Trate qualquer erro de requisição
                    console.error(error);
                });
        }
    };


    return (
        <div className="audio-button">
            <input
                type="file"
                id="audio-upload"
                accept="audio/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <label htmlFor="audio-upload">
                <FontAwesomeIcon icon={faUpload} size="2xl" style={{ cursor: 'pointer' }} />
            </label>
        </div>
    );
}

export default Upload;
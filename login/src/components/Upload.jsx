import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/free-solid-svg-icons/faUpload";

const Upload = ({ onUpload }) => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = async (event) => {
        setSelectedFile(event.target.files[0]);

        if(event.target.files[0]){
            // Convert the audio file to a Blob
            const audioBlob = new Blob([event.target.files[0]], { type: 'audio/mp3' });

            try {
                await onUpload(audioBlob);
            } catch (error) {
                console.error('Erro ao enviar o áudio:', error);
            }
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

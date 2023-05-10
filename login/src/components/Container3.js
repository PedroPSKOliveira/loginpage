import React from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {pdfExporter} from "quill-to-pdf";
import {saveAs} from "file-saver";
import {useRef} from "react";
import Cookies from "js-cookie";

const Container3 = ({setCurrentContainer}) => {

    const [idd, setIdd] = useState(Cookies.get("id"));

    const handleClick = () => {
        setCurrentContainer(2);
    }
    const handleClick2 = () => {
        setCurrentContainer(1);
    }


    if (localStorage.getItem("final") === null) {
        localStorage.clear();
        fetch("https://gateway-production-2587.up.railway.app/api/v1/peticiona/peticionar/finalizar/" + idd, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            }
        }).then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return response.json().then((response) => {
                        throw new Error(response.message);
                    });
                }
            }
        ).then((data) => {
            console.log(data)
            localStorage.setItem("final", data.data)

        })
    } else {
        console.log(localStorage.getItem("final"))
    }

    const modules = {
        toolbar: [[{'header': [1, 2, 3, 4, 5, 6, false],}],
            [{font: []}],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                {list: 'ordered'},
                {list: 'bullet'},
                {indent: '-1'},
                {indent: '+1'},
                {direction: 'rtl'},
                {align: []},
                [{'color': []}, {'background': []}],
                [{'script': 'sub'}, {'script': 'super'}],
                ['link', 'image', 'video'],
                ['clean'],



            ],
            ['link', 'image', 'video'],
        ],
    };

    const editorRef = useRef(null);


    const exportAsPDF = async () => {
        const delta = editorRef.current?.editor?.getContents(); // gets the Quill delta
        const pdfAsBlob = await pdfExporter.generatePdf(delta); // converts to PDF
        saveAs(pdfAsBlob, "pdf-export.pdf"); // downloads from the browser
    };

    const variavel = localStorage.getItem("final")
    console.log(variavel)

    const [value, setValue] = useState(variavel)
    return <div>
        <div className="container">
            <button className="btn btn-primary btn-final" onClick={exportAsPDF}>Baixar</button>
            <button className="btn btn-warning btn-final" onClick={handleClick}>Voltar</button>
            <button className="btn btn-danger btn-final" onClick={handleClick2}>Cancelar</button>

        </div>
        <div className="container-final">
            <div className="row-final">
                <div className="editor-final">
                    <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        className="editor-input"
                        modules={modules}
                        ref={editorRef}
                    />
                </div>

            </div>

        </div>


    </div>


}

export default Container3;
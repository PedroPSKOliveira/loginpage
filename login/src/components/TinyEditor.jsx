import React, {useEffect, useRef, useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { saveAs } from 'file-saver';
import htmlDocx from 'html-docx-js/dist/html-docx';
import html2pdf from 'html2pdf.js';
import {toast} from "react-toastify";
import Cookies from "js-cookie";
import SplashScreen from "../SplashScreen";

export default function Container3({setCurrentContainer}) {
    const editorRef = useRef(null);
    const [inicial, setInicial] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [idd, setIdd] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            setIdd(Cookies.get('id'));
            setIsFetching(true);
            console.log(inicial);

            try {
                const response = await fetch(`https://peticiona-8a3b4bb2-c0c7-4a4e-b616-bc105682467b.up.railway.app/api/peticao/646e82b97bd86112cc9a3f97`, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    const data = await response.json();
                    setInicial(data.data);
                    console.log(inicial);
                    setIsFetching(false);
                } else {
                    const errorData = await response.json();
                    setIsFetching(false);
                    toast.error(errorData.message);
                    throw new Error(errorData.message);
                }
            } catch (error) {
                console.log(error);
                setIsFetching(false);
                toast.error(error);
                setCurrentContainer(1);
            }
        };

        fetchData();
    }, [idd, setCurrentContainer]);


    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const exportAsDocx = () => {
        const editorContent = editorRef.current.getContent();
        const content = `<!DOCTYPE html><html lang="ptBR"><head><meta charset="utf-8"><style>body{text-align: justify;} body {
        font-family: Arial, "Times New Roman", serif;
        font-size: 12pt;
        line-height: 1.5;
        text-align: justify;
        margin: 3em 2em 2em 3em;
    }

    ul,
    ol {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        list-style-type: upper-roman;
    }

    li {
        font-size: 12pt;
        text-align: justify;
        margin-bottom: 0.5em;
        padding-left: 0;
    }

    h1 {
        font-size: 12pt;
        text-align: justify;
    }

    h2 {
        font-size: 12pt;
        text-align: left;
        font-weight: bold;
        margin-bottom: 1.5em;
    }

    span.name {
        display: block;
        text-align: center;
        font-size: 12pt;
        font-weight: bold;
        text-transform: uppercase;
    }

    p {
        margin-top: 1.5em;
        margin-bottom: 1.5em;
        text-indent: 1.25cm;
    }

    .references {
        text-align: right;
        text-indent: 5cm;
    }

    blockquote.long-quote {
        margin-left: 4cm;
    }

    h3 {
        font-size: 12pt;
        text-align: left;
        margin-bottom: 1.5em;
        font-weight: normal;
    }
    
    </style>
    <title>Editor</title>
    </head>
    <body>${editorContent}</body>
    </html>`;

        const converted = htmlDocx.asBlob(content);
        saveAs(converted, 'editor.docx');


    }


    const exportAsPdf = () => {
        const content = editorRef.current.getContent();
        const style = `<style>body{text-align: justify;} body {
        font-family: Arial, "Times New Roman", serif;
        font-size: 12pt;
        line-height: 1.5;
        text-align: justify;
        margin: 3em 2em 2em 3em;
    }

    ul,
    ol {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        list-style-type: upper-roman;
    }

    li {
        font-size: 12pt;
        text-align: justify;
        margin-bottom: 0.5em;
        padding-left: 0;
    }

    h1 {
        font-size: 12pt;
        text-align: justify;
    }

    h2 {
        font-size: 12pt;
        text-align: left;
        font-weight: bold;
        margin-bottom: 1.5em;
    }

    span.name {
        display: block;
        text-align: center;
        font-size: 12pt;
        font-weight: bold;
        text-transform: uppercase;
    }

    p {
        margin-top: 1.5em;
        margin-bottom: 1.5em;
        text-indent: 1.25cm;
    }

    .references {
        text-align: right;
        text-indent: 5cm;
    }

    blockquote.long-quote {
        margin-left: 4cm;
    }

    h3 {
        font-size: 12pt;
        text-align: left;
        margin-bottom: 1.5em;
        font-weight: normal;
    }
    </style>
`;

        const element = document.createElement('div');
        element.innerHTML = style + content;

        const options = {
            margin: [20, 30, 20, 30],
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            fonts: [{ family: 'Arial' }],
        };

        html2pdf()
            .set(options)
            .from(element)
            .save('documento.pdf');
    };



    return (
            <section className="container">
                {isFetching ? <SplashScreen/> :
                <div className="row-final" style={{display: 'flex'}}>
                    <div className={"editor-final"}>
                        <Editor
                            tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue={inicial}
                            init={{
                                height: 500,
                                width: 1000,
                                menubar: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                        <button onClick={log}>Log editor content</button>
                        <button onClick={exportAsDocx}>Exportar para DOCX</button>
                        <button onClick={exportAsPdf}>Exportar para PDF</button>
                    </div>
                </div>
                }
            </section>
    );
}
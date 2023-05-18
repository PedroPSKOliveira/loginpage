import React from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {pdfExporter} from "quill-to-pdf";
import {saveAs} from "file-saver";
import {useRef} from "react";
import Cookies from "js-cookie";
import htmlDocx from 'html-docx-js/dist/html-docx';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


pdfMake.vfs = pdfFonts.pdfMake.vfs;


const Container3 = ({setCurrentContainer}) => {


    const [idd, setIdd] = useState(Cookies.get("id"));
    const [editor, setEditor] = useState("");
    const editorRef = useRef();
    let inputRef = useRef();
    const outputRef = useRef();
    const [text, setText] = useState(
        "<body>\n" +
        "    <h3 style=\"font-size: 12pt; text-align: justify;\">EXCELENTÍSSIMO(A) SENHOR(A) JUIZ(A) DE DIREITO DA [VARA] DA COMARCA DE [CIDADE/ESTADO]</h3>\n" +
        "    <p style=\"margin-top: 1.5em; margin-bottom: 1.5em; text-indent: 1.25cm;\">\n" +
        "        <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[NOME COMPLETO DO AUTOR], [NACIONALIDADE]</strong>, [ESTADO CIVIL], [PROFISSÃO], portador(a) do RG nº [NÚMERO] e CPF nº\n" +
        "        [NÚMERO], residente e domiciliado(a) na [ENDEREÇO COMPLETO], por meio de seu(sua) advogado(a) [NOME COMPLETO DO ADVOGADO],\n" +
        "        inscrito(a) na OAB/[UF] sob o nº [NÚMERO], com escritório profissional na [ENDEREÇO COMPLETO],\n" +
        "        vem, respeitosamente, à presença de Vossa Excelência, propor a presente\n" +
        "    </p>\n" +
        "    <span class=\"name\" style=\"display: block; text-align: center; font-size: 12pt; font-weight: bold; text-transform: uppercase;\">{{TITULO}}.</span>\n" +
        "    <p style=\"margin-top: 1.5em; margin-bottom: 1.5em; text-indent: 1.25cm;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Em face de <strong>[NOME COMPLETO DO RÉU]</strong>,[NACIONALIDADE],\n" +
        "        [ESTADOCIVIL], [PROFISSÃO], portador(a) do RG nº [NÚMERO] e CPF nº[NÚMERO],\n" +
        "        residenteedomiciliado(a) na [ENDEREÇO COMPLETO], pelos motivos fáticos e jurídicos que passa a expor:\n" +
        "    </p><br/><br/> \n" +
        "    <h3 style=\"font-size: 12pt; text-align: left; font-weight: bold; margin-bottom: 1.5em;\">DOS FATOS</h3><br/>\n" +
        "    <p style=\"margin-top: 1.5em; margin-bottom: 1.5em; text-indent: 1.25cm;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No dia 23/12/2019, o Autor realizou uma " +
        "busca em sites da internet com a finalidade de comprar espumantes para ser servido no aniversário de sua esposa que seria " +
        "realizado na primeira semana de janeiro de 2020. Entrementes, encontrou a melhor condição no site da 1ª requerida (AMAZON), e " +
        "assim, realizou a compra de 6 unidades de Kit 3 Espumantes Reserv Brut 750ml – Chandon, pelo valor de R$ 77,01 cada Kit, totalizando " +
        "a compra no valor de R$ 536,49 já incluso o frete. Ocorre que, 07 (sete) dias depois, em 30/12/2019, as Requeridas enviou um e-mail notificando " +
        "o cancelamento do pedido por “Problema Técnico”. Este fato inconveniente gerou transtorno ao Autor que estava programado para receber o produto" +
        " na data prevista para ser utilizado na comemoração do aniversário de sua esposa. Insta ressaltar que a compra foi realizada no site da " +
        "1º Requerida (Amazon), no entanto, o produto seria entregue pela 2ª Requerida (Museu da Gula). Na tentativa de resolver o fato administrativamente, " +
        "inicialmente pelo portal Consumidor.gov.br no sentido de registrar o importuno causado pelas Requeridas, conquanto, as Rés não estavam " +
        "" +
        "cadastradas no portal, impossibilitando o registro e a resolução amigável e administrativa. Em Seguida, buscou resolução pelos canais de " +
        "atendimento da Requerida, sendo negada a solução. Sem outra opção, só restou a busca a tutela jurisdicional para solucionar o litígio</p><br/><br/>\n" +
        "    <h3 style=\"font-size: 12pt; text-align: left; font-weight: bold; margin-bottom: 1.5em;\">DOS DIREITOS</h3><br/>\n" +
        "    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{DIREITOS}}\n" +
        "    <br/><br/>\n" +
        "    <h4 style=\"font-size: 12pt; text-align: left; margin-bottom: 1.5em; font-weight: normal;\">Diante do exposto, requer a Vossa Excelência:</h4><br/>\n" +
        "    <h3 style=\"font-size: 12pt; text-align: left; font-weight: bold; margin-bottom: 1.5em;\">DOS PEDIDOS</h3><br/>\n" +
        "    <ol style=\"margin-top: 0.5em; margin-bottom: 0.5em; list-style-type: upper-roman;\">\n" +
        "        <li style=\"font-size: 12pt; text-align: justify; margin-bottom: 0.5em; padding-left: 0;\">A citação do(a) requerido(a) para que, querendo, apresente sua defesa no prazo legal;</li>\n" +
        "        <li style=\"font-size: 12pt; text-align: justify; margin-bottom: 0.5em; padding-left: 0;\">A produção de todas as provas admitidas em direito, em especial [ENUMERAR AS PROVAS QUE SE PRETENDE PRODUZIR];</li>\n" +
        "        <li style=\"font-size: 12pt; text-align: justify; margin-bottom: 0.5em; padding-left: 0;\">A condenação do(a) requerido(a) ao pagamento das custas processuais e honorários advocatícios. </li>\n" +
        "    </ol><br/><br/>\n" +
        "    <h4 style=\"font-size: 12pt; text-align: left; margin-bottom: 1.5em; font-weight: normal;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dá-se à causa o valor de [VALOR DA CAUSA] para fins fiscais. Nestes termos, pede e esperadeferimento.</h4>\n" +
        "    <h4 style=\"font-size: 12pt; text-align: left; margin-bottom: 1.5em; font-weight: normal;\">[CIDADE/ESTADO], 16/05/2023.</h4>\n" +
        "    <h4 style=\"font-size: 12pt; text-align: left; margin-bottom: 1.5em; font-weight: normal;\">OAB/[UF] nº [NÚMERO]</h4>\n" +
        "</body>");

    const formats = [
        'header', 'font', 'size', 'color', 'background',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'align', 'script',
        'link', 'image', 'video'
    ];

    const handleClick = () => {
        setCurrentContainer(2);
    }
    const handleClick2 = () => {
        setCurrentContainer(1);
    }

    {/*
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
    */}



    const modules = {
        toolbar: [
            [{'header': [1, 2, 3, 4, 5, 6, false]}, {'font': []}],
            [{'size': []}],
            [{'align': []}, {'color': []}, {'background': []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            [{'script': 'sub'}, {'script': 'super'}],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    let Inline = Quill.import('blots/inline');
    let Block = Quill.import('blots/block');
    let BlockEmbed = Quill.import('blots/block/embed');

    class H1StyleBlot extends Inline { }
    H1StyleBlot.blotName = 'myH1Style';
    H1StyleBlot.tagName = 'h1';
    H1StyleBlot.className = 'myH1Style';

    Quill.register(H1StyleBlot);


    class H2StyleBlot extends Inline { }
    H2StyleBlot.blotName = 'myH2Style';
    H2StyleBlot.tagName = 'h2';
    H2StyleBlot.className = 'myH2Style';

    Quill.register(H2StyleBlot);

    class H3StyleBlot extends Inline { }
    H3StyleBlot.blotName = 'myH3Style';
    H3StyleBlot.tagName = 'h3';
    H3StyleBlot.className = 'myH3Style';

    Quill.register(H3StyleBlot);

    class MyPStyleBlot extends Block { }
    MyPStyleBlot.blotName = 'myPStyle';
    MyPStyleBlot.tagName = 'p';
    MyPStyleBlot.className = 'myPStyle';

    Quill.register(MyPStyleBlot);

    class MySpanStyleBlot extends Inline { }
    MySpanStyleBlot.blotName = 'mySpanStyle';
    MySpanStyleBlot.tagName = 'span';
    MySpanStyleBlot.className = 'mySpanStyle';

    Quill.register(MySpanStyleBlot);

    class MyOlStyleBlot extends Block { }
    MyOlStyleBlot.blotName = 'myOlStyle';
    MyOlStyleBlot.tagName = 'ol';
    MyOlStyleBlot.className = 'myOlStyle';

    Quill.register(MyOlStyleBlot);

    class MyLiStyleBlot extends Block { }
    MyLiStyleBlot.blotName = 'myLiStyle';
    MyLiStyleBlot.tagName = 'li';
    MyLiStyleBlot.className = 'myLiStyle';

    Quill.register(MyLiStyleBlot);



    const exportAsPDF = async () => {
        const delta = editorRef.current?.editor?.getContents(); // gets the Quill delta
        const pdfAsBlob = await pdfExporter.generatePdf(delta); // converts to PDF
        saveAs(pdfAsBlob, "pdf-export.pdf"); // downloads from the browser
    };

    const exportAsPDF2 = async () => {
        const content = editorRef.current.getEditor().root.innerHTML;
        const pedContent = htmlToPdfmake(content);


        const docDefinition = {
            content: pedContent,
            defaultStyle: {
                font: {
                    Times: {
                        normal: 'Times-Roman',
                        bold: 'Times-Bold',
                        italics: 'Times-Italic',
                        bolditalics: 'Times-BoldItalic'
                    },
                }
            },
            styles: {
                alignJustify: {
                    alignment: 'justify'
                }
            },
        };
        pdfMake.createPdf(docDefinition).download('documento.pdf');
    }



    const exportAsDocx = () => {
        const editorContent = editorRef.current.getEditor().root.innerHTML;
        const content = `<!DOCTYPE html><html lang="ptBR"><head><meta charset="utf-8"><style>body{text-align: justify;}/* Estilos necessários para o documento Word aqui */</style><title>Editor</title></head><body>${editorContent}</body></html>`;

        const converted = htmlDocx.asBlob(content);
        saveAs(converted, 'documento.docx');
    };

    console.log(text)

    const [value, setValue] = useState(text)

    return <div>
        <div className="container">
            <div className="row-final">
                <div className="editor-final">
                    <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        className="editor-input"
                        modules={modules}
                        formats={formats}
                        ref={editorRef}
                    /><br/>
                </div>

            </div>

            <br/><button className="btn btn-outline-primary btn-final" onClick={exportAsDocx}>Baixar como DOCX</button>&nbsp;
            <button className="btn btn-outline-warning btn-final" onClick={handleClick}>Voltar</button>&nbsp;
            <button className="btn btn-outline-danger btn-final" onClick={handleClick2}>Cancelar</button>

        </div>


    </div>


}

export default Container3;
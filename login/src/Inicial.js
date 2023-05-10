import React, { useState, useRef } from 'react';
import Header from "./components/Header";
import {MyContextProvider} from "./components/Main";
import Container1 from "./components/Container1";
import Container2 from "./components/Container2";
import Container3 from "./components/Container3";
import Container4 from "./components/Container4";
import Container5 from "./components/Container5";

const Inicial = () => {

    const [showContainer2, setShowContainer2] = useState(false);
    const [showContainer3, setShowContainer3] = useState(false);
    const [currentContainer, setCurrentContainer] = useState(1);


    return (
        <div>
            <Header />
            {currentContainer === 1 && (
                <Container1 setCurrentContainer = {setCurrentContainer} />
            )}
            {currentContainer === 2 && (
                <Container2 setCurrentContainer = {setCurrentContainer} />
            )}
            {currentContainer === 3 && (
                <Container3 setCurrentContainer = {setCurrentContainer} />
            )}
            <Container4 />
            <Container5 />


        </div>

    );
}
export default Inicial;
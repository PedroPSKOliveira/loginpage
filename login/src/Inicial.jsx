import React, { useState } from 'react';
import Header from "./components/Header";
import Container1 from "./components/Container1";
import Container2 from "./components/Container2";
import Container3 from "./components/Container3";
import Container4 from "./components/Container4";
import Container5 from "./components/Container5";
import Footer from "./components/Footer";

const Inicial = () => {


    const [currentContainer, setCurrentContainer] = useState(1);

    localStorage.setItem("direito0", "Direito 1");
    localStorage.setItem("direito1", "Direito 2");
    localStorage.setItem("direito2", "Direito 3");
    localStorage.setItem("direito3", "Direito 4");
    localStorage.setItem("direito4", "Direito 5");


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
            <Footer />



        </div>

    );
}
export default Inicial;
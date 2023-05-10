import React, {useState, useContext} from 'react';
import Container1 from "./Container1";
import Container2 from "./Container2";
import Container3 from "./Container3";
import Container4 from "./Container4";
import Cookies from "js-cookie";
import Header from "./Header";
import Inicial from "../Inicial";

export const MyContext = React.createContext();

export const MyContextProvider = ({children}) => {
    const [container, setContainer] = useState(<Container1/>);

    const updateMyState = (value) => {
        setContainer(value);
    }




    return (
        <body>
        <main>
            <body>
            <section className="container">
            </section>
            </body>

        </main>
        </body>
    );
};


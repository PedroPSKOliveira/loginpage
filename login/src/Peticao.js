import React, { useState, useRef } from 'react';
import PeticaoChat from "./PeticaoChat";
import Final from "./Final";
import Direito from "./DireitosChat";
import Assistente from "./Assistente";

function App() {

    return (
        <div>
            <PeticaoChat/>
            <h1>Após os chat irão*/ aparecer os direitos</h1>
            <Direito/>
            <h1>Após os direitos irá aparecer o editor</h1>
            <Final/>
            <Assistente/>
        </div>

    );
}
export default App;
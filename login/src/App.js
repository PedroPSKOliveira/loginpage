import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import { ToastContainer } from 'react-toastify';
import ApiPag from './ApiPag';
import Att from './Att';
import Inicial from './Inicial';
import Info from './Info';
import Direitos from './Direitos';
import Revisao from './Revisao';
import Peticao2 from './Peticao2';
import Auth from './Auth';
import Final from "./Final";
import Editor from "./Editor";


function App() {
  return (
    <div className="App">
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/pagamento' element={<ApiPag/>}></Route>
        <Route path='/atualizar' element={<Att/>}></Route>
        <Route path='/home' element={<Inicial/>}></Route>
        <Route path='/informacoes' element={<Info/>}></Route>
        <Route path='/direitos' element={<Direitos/>}></Route>
        <Route path='/revisao' element={<Revisao/>}></Route>
        <Route path='/peticao' element={<Peticao2/>}></Route>
        <Route path='/auth' element={<Auth/>}></Route>
        <Route path='/edicao' element={<Final/>}></Route>
        <Route path='/editor' element={<Editor/>}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

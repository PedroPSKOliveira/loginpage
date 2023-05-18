import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import { ToastContainer } from 'react-toastify';
import ApiPag from './ApiPag';
import Att from './components/Att';
import Inicial from './Inicial';
import Auth from './Auth';
import Final from "./Final";
import LoginPay from "./components/LoginPay";
import PaymentForm from "./components/PaymentForm";
import Editor from "./components/Editor";



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
        <Route path='/auth' element={<Auth/>}></Route>
        <Route path='/edicao' element={<Final/>}></Route>
        <Route path={'/first'} element={<LoginPay/>}></Route>
          <Route path={'/pay'} element={<PaymentForm/>}></Route>
            <Route path={'/editor'} element={<Editor/>}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

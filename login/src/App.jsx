import {BrowserRouter, Route, Router, Routes} from 'react-router-dom';
import Login from './Login';
import { ToastContainer } from 'react-toastify';
import ApiPag from './ApiPag';
import Att from './components/Att';
import Plan from './components/Plan';
import BrightnessControl from "./components/BrightnessControl";
import Inicial from './Inicial';
import Auth from './Auth';
import LoginPay from "./components/LoginPay";
import PaymentForm from "./components/PaymentForm";
import Editor from "./components/Editor";
import {Analytics} from '@vercel/analytics/react';
import Container1 from "./components/Container1";
import Container3 from "./components/Container3";
import Container2 from "./components/Container2";
import Container5 from "./components/Container5";
import Container4 from "./components/Container4";
import Footer from "./components/Footer";
import GoogleLogin from "./components/GoogleLogin";
import GoogleRegister from "./components/GoogleRegister";
import Header from "./components/Header";
import PasswordResetPage from "./components/PasswordResetPage";
import TinyEditor from "./components/TinyEditor";
import ApiUpdatePag from "./ApiUpdatePag";
import ApiCancelPag from "./ApiCancelPag";





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
        <Route path='/Plan' element={<Plan/>}></Route>
        <Route path='/BrightnessControl' element={<BrightnessControl/>}></Route>
        <Route path='/home' element={<Inicial/>}></Route>
        <Route path='/auth' element={<Auth/>}></Route>
        <Route path={'/first'} element={<LoginPay/>}></Route>
        <Route path={'/pay'} element={<PaymentForm/>}></Route>
        <Route path={'/editor'} element={<Editor/>}></Route>
        <Route path={'/qwrwfasfzdfaf'} element={<Container1/>}/>
          <Route path={'/qwrwfasfzdfafgfd'} element={<Container2/>}></Route>
          <Route path={'/qwrwfasfzdfafsd'} element={<Container3/>}></Route>
          <Route path={'/qwrwfasfzdfafhdt'} element={<Container4/>}></Route>
          <Route path={'/qwrwfasfzdfafasd'} element={<Container5/>}></Route>
          <Route path={'/qwrwfasfzdfaf3r'} element={<Container1/>}></Route>
            <Route path={'/qwrwfasfzdfafgfd4vs'} element={<Footer/>}></Route>
          <Route path={'/qwrwfasfzdfsdfafsd5'} element={<GoogleLogin/>}></Route>
          <Route path={'/qwrwfasfzsegsdfafhdt6'} element={<GoogleRegister/>}></Route>
          <Route path={'/qwrwfasfzdfafasdsdfsf7'} element={<Header/>}></Route>
          <Route path={'/reset-password/:id'} element={<PasswordResetPage/>}></Route>
        <Route path={'/editu'} element={<TinyEditor/>}></Route>
        <Route path={'/upgrade'} element={<ApiUpdatePag/>}></Route>
        <Route path={'/cancel'} element={<ApiCancelPag/>}></Route>
      </Routes>


      </BrowserRouter>
        <Analytics />
      
    </div>
  );
}

export default App;

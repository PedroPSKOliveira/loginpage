import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const Auth = () => {

    const usenavigate = useNavigate();

        fetch ('https://alleged-doll-production.up.railway.app/api/v1/auth/auth',
    {
        method: 'GET',
        headers: {
            "refresh_token": Cookies.get("refresh_token")
        }
        }).then((res)=> {
            return res.json();
    }).then((res)=> {
            console.log(res);
            Cookies.set("Authorization", res.data, { expires: 30, maxAge: true })
        usenavigate('/home')
        }).catch((err)=>{
        console.log(err);
        usenavigate('/login');
        });
    return (
        <div>

        </div>
    )
}
export default Auth;
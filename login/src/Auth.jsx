import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import {toast} from "react-toastify";

const Auth = () => {

    const usenavigate = useNavigate();

        fetch ('https://gateway-d6c99606-f18c-11ed-a05b-0242ac120003.up.railway.app/api/auth/auth',
    {
        method: 'GET',
        headers: {
            "TOKEN": Cookies.get("refresh_token")
        }
        }).then((res)=> {
            return res.json();
    }).then((res)=> {
            console.log(res);
            Cookies.set("Authorization", res.data, { expires: 30, maxAge: true })

            fetch(`https://gateway-d6c99606-f18c-11ed-a05b-0242ac120003.up.railway.app/api/pay/find`,
                {
                    method: 'GET',
                    headers: {
                        "Authorization": Cookies.get("Authorization"),
                        'Content-Type': 'application/json',
                    },
                }).then((res) => {
                    console.log(res);
                return res.json();
            }).then((res) => {
                console.log(res);
                if (res.data.signature === "NONE" || res.data.signature === null) {
                    usenavigate('/first')
                }else {
                    usenavigate('/home')
                    Cookies.set("Assinatura", res.data.signature, { expires: 30, maxAge: true })
                }
            }).catch((err) => {
                console.log(err);
                toast.error(err)
                usenavigate('/')
            })

        }).catch((err)=>{
        console.log(err);
        usenavigate('/');
        });
    return (
        <div>

        </div>
    )
}
export default Auth;
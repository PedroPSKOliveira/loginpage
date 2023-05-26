import React, {useEffect} from 'react';
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";
import './components/Styles/Cartao.css';
import {toast} from "react-toastify";

export default function ApiCancelPag() {
    const navigate = useNavigate();
    useEffect(() => {
        const cancelPlan = async () => {
            try {
                const response = await fetch(`https://gateway-d6c99606-f18c-11ed-a05b-0242ac120003.up.railway.app/api/pay/cancel`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Cookies.get('Authorization'),
                    },
                });

                const data = await response.json();

                console.log(data);

                if (data.code === 200) {
                    console.log('Cancelamento realizado com sucesso!');
                    toast.success('Cancelamento realizado com sucesso!');
                    navigate('/auth');
                } else if (data.code === 401){
                    toast.error(data.message);
                    navigate('/auth');
                } else {
                    console.log('Erro ao realizar cancelamento!');
                    toast.error(data.message);
                    navigate('/auth');
                }

            } catch (error) {
                console.error('Error:', error);
                toast.error('Houve um erro ao processar o cancelamento, tente novamente mais tarde.');
                navigate('/auth');
            }
        };

        cancelPlan();
    }, []);

    return (
        <div>

        </div>
    );
}
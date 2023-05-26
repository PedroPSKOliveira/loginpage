import React, {useEffect} from 'react';
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";
import './components/Styles/Cartao.css';
import {toast} from "react-toastify";

export default function ApiUpdatePag() {
    const navigate = useNavigate();
        let plano = Cookies.get('AssinaturaNova')

    useEffect(() => {
        const updatePlan = async () => {
            try {
                // Adicionar um atraso de 1 segundo antes de executar o fetch
                await new Promise(resolve => setTimeout(resolve, 1000));

                const response = await fetch(`https://gateway-d6c99606-f18c-11ed-a05b-0242ac120003.up.railway.app/api/pay/update/plan?signature=${plano}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Cookies.get('Authorization'),
                    },
                });

                const data = await response.json();

                console.log(data);

                if (data.code === 200) {
                    console.log('Pagamento realizado com sucesso!');
                    toast.success('Pagamento realizado com sucesso!');
                    navigate('/auth');
                    Cookies.remove('AssinaturaNova');
                } else if (data.code === 401){
                    toast.error(data.message);
                    navigate('/plan');
                    Cookies.remove('AssinaturaNova');
                } else {
                    console.log('Erro ao realizar pagamento!');
                    toast.error(data.message);
                    navigate('/plan');
                    Cookies.remove('AssinaturaNova');
                }

            } catch (error) {
                console.error('Error:', error);
                toast.error('Houve um erro ao processar o pagamento, tente novamente mais tarde.');
                navigate('/plan');
                Cookies.remove('AssinaturaNova');
            }
        };

        updatePlan();
    }, [plano]);

    return (
        <div>

        </div>
    );
}
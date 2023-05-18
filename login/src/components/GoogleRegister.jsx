import jwt_decode from "jwt-decode";
import {useEffect} from "react";
import {toast} from "react-toastify";

const GoogleRegister = () => {

    const handleCredentialResponse = (response) => {
        console.log('Encoded JWT ID token: ' + response.credential);
        const jwt = response.credential;
        const google_account = jwt_decode(response.credential);
        console.log(google_account);

        fetch('https://gateway-d6c99606-f18c-11ed-a05b-0242ac120003.up.railway.app/api/account/create/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'USERINFO': jwt,
                }
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                toast.success("Conta criada com sucesso!");
            }
        ).catch((error) => {
                console.error('Error:', error);
            }
        );
    }

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            window.google.accounts.id.initialize({
                client_id:
                    '182918162904-q8e4ga3257980c41pkg6tp3kpnj5rgji.apps.googleusercontent.com',
                callback: handleCredentialResponse,
            });

            window.google.accounts.id.renderButton(document.getElementById('buttonDivR'), {
                theme: 'outline',
                size: 'large',
                type: 'icon',
                shape: 'pill'
            });

            window.google.accounts.id.prompt();
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return <div id="buttonDivR"></div>;
}

export default GoogleRegister;
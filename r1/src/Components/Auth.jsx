import { useEffect, useState, useContext } from 'react';
import Login from './Login';
import axios from 'axios';
import { Global } from './Global';
import monkelogin from '../assets/monkelogin.jpeg';

function Auth({children}) {

    const [logged, setLogged] = useState(null);
    const {setAuthName} = useContext(Global);



    useEffect(() => {
        axios.get('http://localhost:3003/login', { withCredentials: true })
        .then(res => {
            console.log(res.data);
            if (res.data.status === 'ok') {
                setLogged(true);
                setAuthName(res.data.name);
            } else {
                setLogged(false);
                setAuthName(null);
            }
        });
    }, []);

    if (null === logged) {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        )
    }

    if (true === logged) {
        return (
            <>
            {children}
            </>
        )
    }

    if (false === logged) {
        return (
            <>
            <div>
                    <h1 style={{color: 'lightseagreen'}}>To use bank, please login first!</h1>
                    <img src={monkelogin} alt="monkelogin" />
                </div>
            </>
        )
    }

}

export default Auth;
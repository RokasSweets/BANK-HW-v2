import { useState, useEffect } from "react";
import axios from 'axios';

function Login() {

    const [username, setUsername] = useState(null);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [psw, setPsw] = useState('');


    useEffect(() => {
        axios.get('http://localhost:3003/login', { withCredentials: true })
        .then(res => {
            console.log(res.data);
            if (res.data.status === 'ok') {
                setUsername(res.data.name);
            }
        });
    }, []);

    const login = _ => {
        axios.post('http://localhost:3003/login', {username, psw}, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                if(res.data.status === 'ok') {
                    setUsername(res.data.name);
                    setName('');
                    setPsw('');
                    setError(null);
                } else {
                    setError(true);
                    setUsername(null);
                }
            });
    }

    return (
        <div>
            <div style={{margin: '20px'}}>
                {
                    error ? <span style={{color: 'red'}}>Login Error</span> : <span>Login</span>
                }
            </div>
            <div>
                <h4>
                {
                    username ? <span>Hello, {username}</span> : <span>Hello, guest</span>
                }
                </h4>
                <div className="login">
                    <label>Username</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="login">
                    <label>Password</label>
                    <input type="password" style={{height: '18px'}} value={psw} onChange={e => setPsw(e.target.value)} />
                </div>
                <button className="balance-update-btn" style={{margin: '15px'}} onClick={login}>Login</button>
            </div>
        </div>
    )
}

export default Login;
import { useState } from "react";
import axios from 'axios';

function Login() {

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [psw, setPsw] = useState('');


    const login = _ => {
        axios.post('http://localhost:3003/login', {username, psw}, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                if(res.data.status === 'ok') {
                    setUsername(res.data.name);
                    setName('');
                    setPsw('');
                }
            });
    }

    return (
        <div>
            <div>
                Login
            </div>
            <div>
                <h5>
                    {
                        username ? <span>Hello, {username}</span> : <span>Hello, guest</span>
                }
                </h5>
                <div>
                    <label>Username</label>
                    <input type="text" className="login" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" className="login" value={psw} onChange={e => setPsw(e.target.value)} />
                </div>
                <button className="balance-update-btn" onClick={login}>Login</button>
            </div>
        </div>
    )
}

export default Login;
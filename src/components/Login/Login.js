import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import './Login.css';

const Login = ({ history }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function login() {
        console.log(username + " " + password);
        axios.post('https://simple-todo-mx.herokuapp.com/user/login', {
            username,
            password
        }).then(response => {
            const { token, err } = response.data;
            if(err) {
                setError(err);
            } else {
                localStorage.setItem('x-token', token);
                history.push("/todo");
            }
            
        }).catch(err => {
            console.log(err);
        });
    }
    return (
        <div className="login-container">
            <div className="login-left">

            </div>
            <div className="login-right">
                <h1>Login</h1>
                <div>{error}</div>
                <div className="input-fields">
                    <input type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)}/>
                    <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="input-fields">
                    <input type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <FontAwesomeIcon icon={faLock} />
                </div>
                <input type="submit" onClick={login} value="login"/>
                <span>Wanna create an account? <Link to="/register">Register</Link> </span>
            </div>
            
        </div>
    );
}

export default Login;
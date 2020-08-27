import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Register.css';

const Register = ()=> {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const register = () => {
        axios.post('https://simple-todo-mx.herokuapp.com/user/register', {username, password, email})
        .then(res => console.log(res)).catch((err) => console.log(err));
    }
    return (
        <div className="register-container">
            <div className="register-left"></div>
            <div className="register-right">
                <h1>Register</h1>
                <div className="input-fields">
                    <input type='text'placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="input-fields">
                    <input type='text'placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="input-fields">
                    <input type='password'placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <FontAwesomeIcon icon={faLock} />
                </div>
                
                <span>Already registered? <Link to="/">Login</Link></span>
                <input type="submit" onClick={register} value="Register"/>
            </div>
                
        </div>
    )
}

export default Register;
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logo from '../../assets/logo.svg';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            password,
            city,
            uf,
        }

        try{
            const response = await api.post('airlines', data);
            alert(`Registration successful!`);
            history.push('/');
        }catch(err){
            alert('Registration failed, please try again.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt="SomeName" />

                    <h1>Register</h1>
                    <p>Register yourself and start booking now!</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#17333C" />
                        Go Back
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Name" 
                        value={name}
                        onChange={e=>setName(e.target.value)}
                    />
                    <input type="email" placeholder="Email" 
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <input type="password" placeholder="Password" 
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    />
                    <input placeholder="City" 
                        value={city}
                        onChange={e=>setCity(e.target.value)}
                    />
                    <div className="form-group">
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

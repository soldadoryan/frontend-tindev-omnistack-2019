import React, { useState } from 'react';

import api from '../services/api.js';

import './Login.css';
import logo from '../imgs/logo.svg';

export default function Login ({ history }) {
    const [username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.post('/devs/store', { username });

        const { id_user } = response.data;

        history.push(`/dev/${id_user}`);
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev"/>
                <input
                    placeholder="Digite seu usuário do seu Github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
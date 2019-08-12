import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../imgs/logo.svg';
import like from '../imgs/like.svg';
import dislike from '../imgs/dislike.svg';

import api from '../services/api.js';

import './Main.css';

export default function Main({ match }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers () {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id
                }
            });

            setUsers(response.data);
        }

        loadUsers();

    }, [match.params.id])

    async function handleLike(id) {
        const response = await api.post(`/devs/like/${id}`, null, {
            headers: {
                user: match.params.id,
            }
        });

        setUsers(users.filter(user => user.id != id));
    }

    async function handleDislike(id) {
        const response = await api.post(`/devs/dislike/${id}`, null, {
            headers: {
                user: match.params.id,
            }
        });

        setUsers(users.filter(user => user.id != id));
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Tindev" />
            </Link>
                { users.length > 0 ? (
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                <img src={user.avatar} alt={user.nome} className="img-user" />
                                <footer>
                                    <strong>{user.nome}</strong>
                                    <p>
                                        {user.bio}
                                    </p>
        
                                </footer>
                                <div className="buttons">
                                    <button type="button" onClick={() => handleDislike(user.id)}>
                                        <img src={dislike} />
                                    </button>
                                    <button type="button" onClick={() => handleLike(user.id)}>
                                        <img src={like} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="empty">Acabou :(</div>
                ) }
        </div>
    );
}
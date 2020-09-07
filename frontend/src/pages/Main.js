import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

import api from '../services/api';

import './Main.css';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import itsamatch from '../assets/itsamatch.png';

export default function Main({ match }){
    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(false);

    useEffect(() => {
        (async function loadUsers(){
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id,
                }
            });
            setUsers(response.data);
        })();
        
    }, [match.params.id]);

    useEffect(() => {
        const socket = io('http://localhost:3333', {
            query: { user: match.params.id },
        });

        socket.on('match', dev => {
            setMatchDev(dev);
        });

    }, [match.params.id]);

    async function handleLike(id){
        await api.post(`/devs/${id}/likes`, null, {
            headers: {
                user: match.params.id,
            }
        });

        setUsers(users.filter(user => user._id !== id));
    };

    
    async function handleDisLike(id){
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: {
                user: match.params.id,
            }
        });

        setUsers(users.filter(user => user._id !== id));
    };

    return (
        <main className="main">
            <Link to="/">
                <img src={logo} alt="Tindev"/>
            </Link>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (            
                        <li key={user._id}>
                            <img src={user.avatar} alt={user.name}/>
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>
                            <div className="main__buttons">
                                <button type="button" onClick={() => handleDisLike(user._id)}>
                                    <img src={dislike} alt="Dislike"/>
                                </button>
                                <button type="button" onClick={() => handleLike(user._id)}>
                                    <img src={like} alt="Like"/>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>
                    <h1>Acabou os users</h1>
                </div>
            )}
            
            {matchDev && (
                <section className="match__container">
                    <img src={itsamatch} alt="Its a match" />
                    <img className="avatar" src={matchDev.avatar} alt="Avatar"/>

                    <strong>{matchDev.name}</strong>
                    <p>{matchDev.bio}</p>
                    <button type="button" onClick={() => setMatchDev(false)}>Fechar</button>
                </section>
            )}
        </main>
    );
}



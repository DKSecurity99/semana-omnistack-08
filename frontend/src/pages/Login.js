import React from 'react';

import api from '../services/api';
import './Login.css';
import logo from '../assets/logo.svg';

export default function Login({ history }){
    const [username, setUsername] = React.useState('');

    async function handleSubmit(event){
        event.preventDefault();
        
        const response = await api.post('/devs',{
            username,
        });
        
        const { _id } = response.data;
        history.push(`/dev/${_id}`);
    }

    return (
        <section className="login__container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev"/>
                <input 
                    placeholder="Digite seu usúario do Github"
                    onChange={event => setUsername(event.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </section>
    );
}


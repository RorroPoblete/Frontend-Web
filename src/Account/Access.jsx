import React, { useState, useContext } from 'react';
import axios from 'axios';
import "./Access.css";
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import API_URL from '../common/config';

export default function Access() {
    const { setToken } = useContext(AuthContext);
    const [activePanel, setActivePanel] = useState("login");
    const [message, setMessage] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const navigate = useNavigate();

    function handleLoginClick() {
        setActivePanel("login");
    }

    function handleRegisterClick() {
        setActivePanel("register");
    }

    async function handleRegisterSubmit(event) {
        event.preventDefault();

        const userData = {
            mail: registerEmail,
            username: registerUsername,
            password: registerPassword,
            sanction: false,
            qualification: 1
        };

        try {
            const registerResponse = await axios.post(`${API_URL}/signup`, userData);
            setMessage('Cuenta creada con éxito. Iniciando sesión...');
            handleLogin(registerEmail, registerPassword);
        } catch (error) {
            const errorMessage = error.response && error.response.data ? error.response.data : 'Error al crear la cuenta';
            setMessage(errorMessage);
        }
    }

    async function handleLoginSubmit(event) {
        event.preventDefault();
        handleLogin(loginEmail, loginPassword);
    }

    async function handleLogin(email, password) {
        try {
            const response = await axios.post(`${API_URL}/login`, {
                mail: email, 
                password: password
            });

            const access_token = response.data.access_token;
            if (access_token) {
                setToken(access_token);
                navigate('/principal?success=login');
            } else {
                setMessage('Error al iniciar sesión: No se recibió token');
            }
        } catch (error) {
            const errorMessage = error.response && error.response.data ? error.response.data : 'Error al iniciar sesión';
            setMessage(errorMessage);
        }
    }

    return (
        <div className="container-access">
            {/* Mensaje de alerta */}
            <div className="message">
                {message && (
                    <div className={`alert ${message.includes('éxito') ? 'alert-success' : 'alert-danger'}`}>
                        {message}
                    </div>
                )}
            </div>
            {/* Formularios de login y registro */}
            <div className="box">
                {/* Formulario de login */}
                <form onSubmit={handleLoginSubmit} className="box-login" style={{ left: activePanel === 'login' ? '27px' : '-350px' }}>
                    <div className="top-header">
                        <h3>Inicio de sesión</h3>
                        <small>Qué gusto tenerte de vuelta!</small>
                    </div>
                    <div className="input-group">
                        <div className="input-field">
                            <input type="email" className="input-box" id="logEmail" required placeholder=' ' onChange={e => setLoginEmail(e.target.value)}/>
                            <label htmlFor="logEmail">Email</label>
                        </div>
                        <div className="input-field">
                            <input type="password" className="input-box" id="logPassword" required placeholder=' ' onChange={e => setLoginPassword(e.target.value)}/>
                            <label htmlFor="logPassword">Password</label>
                        </div>
                        <div className="input-field">
                            <input type="submit" className="input-submit" value="Ingresar" />
                        </div>
                    </div>
                </form>

                {/* Formulario de registro */}
                <div className="box-register" style={{ right: activePanel === 'register' ? '25px' : '-350px' }}>
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="top-header">
                            <h3>Crear cuenta</h3>
                            <small>Únete a nuestra comunidad</small>
                        </div>
                        <div className="input-group">
                            <div className="input-field">
                                <input type="text" className="input-box" id="regUser" required placeholder=' ' onChange={e => setRegisterUsername(e.target.value)}/>
                                <label htmlFor="regUser">Nombre</label>
                            </div>
                            <div className="input-field">
                                <input type="email" className="input-box" id="regEmail" required placeholder=' ' onChange={e => setRegisterEmail(e.target.value)}/>
                                <label htmlFor="regEmail">Email</label>
                            </div>
                            <div className="input-field">
                                <input type="password" className="input-box" id="regPassword" required placeholder=' ' onChange={e => setRegisterPassword(e.target.value)}/>
                                <label htmlFor="regPassword">Password</label>
                            </div>
                            <div className="input-field">
                                <input type="submit" className="input-submit" value="Registrar" />
                            </div>
                        </div>
                    </form>
                </div>
                {/* Botones para cambiar entre login y registro */}
                <div className="switch">
                    <a href="#" className={`login ${activePanel === 'login' ? 'active' : ''}`} data-target="login" onClick={handleLoginClick}>Iniciar sesión</a>
                    <a href="#" className={`register ${activePanel === 'register' ? 'active' : ''}`} data-target="register" onClick={handleRegisterClick}>Crear cuenta</a>
                    <div className="btn-active" id="btn" style={{ left: activePanel === 'login' ? '0' : '150px' }}></div>
                </div>
            </div>
        </div>
    );
}



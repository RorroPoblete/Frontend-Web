import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UsersList.css';
import API_URL from '../../common/config';

function UsersList() {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        // Realiza una solicitud para obtener la lista de usuarios desde tu servidor local
        axios.get(`${API_URL}/users`)
        .then((response) => {
            setUsers(response.data);
        })
        .catch((error) => {
            console.error('Error al obtener la lista de usuarios', error);
        });
    }, []);

    const handleDeleteUser = (userId) => {
        // Realiza una solicitud para eliminar un usuario desde tu servidor local
        axios.delete(`${API_URL}/users/${userId}`)
        .then((response) => {
            console.log('User deleted successfully:', response.data);
            // Actualiza la lista de usuarios
            setUsers(users.filter((user) => user.id !== userId));
        })
        .catch((error) => {
            console.error('Error deleting user:', error);
        });
    }

    return (
        <div className='users-list'>
            <h1>Lista de Usuarios</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Correo</th>
                        <th>Nombre de usuario</th>
                        <th>Contraseña</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.mail}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>
                                <button className="delete-button" onClick={() => handleDeleteUser(user.id)}>
                                    Eliminar Usuario
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersList;

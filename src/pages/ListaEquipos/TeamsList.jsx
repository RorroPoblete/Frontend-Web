import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TeamsList.css';
import API_URL from '../../common/config';

function TeamsList() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        // Realiza una solicitud para obtener la lista de usuarios desde tu servidor local
        axios.get(`${API_URL}/teams`)
        .then((response) => {
            setTeams(response.data);
        })
        .catch((error) => {
            console.error('Error al obtener la lista de usuarios', error);
        });
    }, []);
      
    const handleDeleteTeam = (teamId) => {
        // Realiza una solicitud para eliminar un usuario desde tu servidor local
        axios.delete(`${API_URL}/teams/${teamId}`)
        .then((response) => {
            console.log('Team deleted successfully:', response.data);
            // Actualiza la lista de usuarios
            setTeams(teams.filter((team) => team.id !== teamId));
        })
        .catch((error) => {
            console.error('Error deleting team:', error);
        });
    }

    const handleAddPlayerToTeam = (teamId) => {
        // Verificar si el jugador ya está en el equipo
        if (teamUsers[teamId] && teamUsers[teamId].includes(newTeamUser)) {
          console.log('El jugador ya está en el equipo.');
          return;
        }
      
        // Realiza una solicitud POST para agregar un jugador al equipo
        axios.post(`${API_URL}/teamusers`, {
          idTeam: teamId,
          idUser: newTeamUser,
        })
          .then((response) => {
            console.log('Player added to team:', response.data);
            // Limpia el campo de entrada después de agregar al jugador
            setNewPlayerId('');
          })
          .catch((error) => {
            console.error('Error adding player to team:', error);
          });
      }
      
    return (
        <div className='teams-list'>
            <h1>Lista de Equipos</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre del equipo</th>
                        <th>Calificación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team) => (
                        <tr key={team.id}>
                            <td>{team.id}</td>
                            <td>{team.teamName}</td>
                            <td>{team.qualification}</td>
                            <td>
                                <button className="delete-button" onClick={() => handleDeleteTeam(team.id, )}>
                                    Eliminar Equipo
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TeamsList;

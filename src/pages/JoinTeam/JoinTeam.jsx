import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './JoinTeam.css';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';
import API_URL from '../../common/config';

function JoinTeam() {
    const [teams, setTeams] = useState(null);
    const [teamWhereIsUser, setTeamWhereIsUser] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const teamsResponse = await axios.get(`${API_URL}/teams`);
                setTeams(teamsResponse.data);

                const teamUserResponse = await axios.get(`${API_URL}/teamusers/user/${userId}`);
                const teamsIds = teamUserResponse.data.map((teamUser) => teamUser.idTeam);
                setTeamWhereIsUser(teamsIds);

                const pendingRequestsResponse = await axios.get(`${API_URL}/teamUnionRequests/user/${userId}`);
                const pendingRequestsIds = pendingRequestsResponse.data.map((request) => request.idTeam);
                setPendingRequests(pendingRequestsIds);

            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        fetchData();
    }, [userId]);
      
    const requestToJoinTeam = async (teamId) => {
        try {
            await axios.post(`${API_URL}/teamUnionRequests`, {
                idTeam: teamId,
                idUser: userId,
                state: 'pending',
            });
            navigate(`/userProfile?success=joinTeam`); 
        } catch (error) {
            console.error('Error al unirse al equipo:', error);
        }
        
    }
    if(!teams){
        return (
            <>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '91vh' }}>
                    <CircularProgress />
                </div>
            </>
            );
        }
    return (
        <div className='teams-list'>
            <h1>Lista de Equipos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nombre del equipo</th>
                        <th>Calificación</th>
                        <th>Deporte</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {teams
                        .filter((team) => team.acceptRequest) // Filtrar equipos con acceptRequest true
                        .map((team) => (
                            <tr key={team.id}>
                                <td>{team.teamName}</td>
                                <td><Rating name="read-only" value={Number(team.qualification)} precision={0.1} readOnly /></td>
                                <td>{team.sport} </td>
                                <td>
                                    {teamWhereIsUser.includes(team.id) ? (
                                        <button className="disabled-button" disabled={true}>
                                            <FaCheckSquare style={{ color: '#1b2430', fontSize: '1.5em' }}/>
                                        </button>
                                    ) : pendingRequests.includes(team.id) ? (
                                        <button className="pending-button" disabled={true}>
                                            <FaUserClock style={{ color: '#1b2430', fontSize: '1.5em' }}/>
                                        </button>
                                    ) : (
                                        <button className="join-button" onClick={() => requestToJoinTeam(team.id)}>
                                            <FaUserPlus className="prueba" style={{ color: 'white', fontSize: '1.5em' }}/>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default JoinTeam;
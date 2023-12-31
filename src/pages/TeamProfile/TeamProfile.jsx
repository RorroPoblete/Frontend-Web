import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TeamProfile.css';
import { jwtDecode } from 'jwt-decode';
import CircularProgress from '@mui/material/CircularProgress';
import MuiAlert from '@mui/material/Alert';
import Rating from '@mui/material/Rating';
import TeamChat from '../../chat/TeamChat';
import { FaUserMinus } from "react-icons/fa";
import { FaUserLock } from "react-icons/fa";
import API_URL from '../../common/config';
import { useNavigate } from 'react-router-dom';
import { FaPencil } from "react-icons/fa6";
import { fontSize } from '@mui/system';
import { IoIosSave } from "react-icons/io";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TeamProfile() {
    const { teamId } = useParams();
    const [teamInfo, setTeamInfo] = useState(null);
    const [teamUsers, setTeamUsers] = useState([]);
    const [teamUsernames, setTeamUsernames] = useState([]);
    const [captainUsername, setCaptainUsername] = useState('');
    const [initialMessage, setInitialMessage] = useState('');
    const [createTeamInitialMessage, setCreateTeamInitialMessage] = useState('');
    const [deleteTeamUserMessage, setDeleteTeamUserMessage] = useState('');
    const [username, setUsername] = useState('');
    const [isMatchPending, setIsMatchPending] = useState(false);
    const [isEditingTeamName, setIsEditingTeamName] = useState(false);

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    const navigate = useNavigate();

    // Botones de aceptar solicitudes
    const [acceptRequest, setAcceptRequest] = useState(teamInfo?.acceptRequest || false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const success = urlParams.get('success');
        setCreateTeamInitialMessage(success === 'createdTeam' ? 'Equipo creado correctamente' : '');
        setTimeout(() => {
            setCreateTeamInitialMessage('');
        }, 6000);
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }
                  };
                const teamInfoResponse = await axios.get(`${API_URL}/teams/${teamId}`);
                const captainResponse = await axios.get(`${API_URL}/users/${teamInfoResponse.data.captainId}`, config);
                const teamUsersResponse = await axios.get(`${API_URL}/teamusers/team/${teamId}`);
                const teamUsernamesResponse = await Promise.all(
                    teamUsersResponse.data.map(async (teamUser) => {
                        const userResponse = await axios.get(`${API_URL}/users/${teamUser.idUser}`, config);
                        return userResponse.data;
                    })
                );
                const usernameResponse = await axios.get(`${API_URL}/users/${userId}`, config);

                const matchRequestResponse = await axios.get(`${API_URL}/matches/team/${teamId}`);
                // Saber si tengo un match con location = pending entonces poner true en isMatchPending
                const matchRequestPending = matchRequestResponse.data.some(matchRequest => matchRequest.location === 'pending');
                setIsMatchPending(matchRequestPending);
                setTeamInfo(teamInfoResponse.data);
                setCaptainUsername(captainResponse.data.username);
                setTeamUsers(teamUsersResponse.data);
                setTeamUsernames(teamUsernamesResponse);
                setAcceptRequest(teamInfoResponse.data.acceptRequest);
                setUsername(usernameResponse.data.username);

            } catch (error) {
                console.error('Error al obtener información del equipo:', error);
            }
        };
        
        fetchData();
    }, [teamId]);

    const isCaptain = teamInfo?.captainId === userId;

    const handleDeleteTeamUser = async (teamUserId) => {
        try {
            const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar a este usuario del equipo?');
            if (confirmDelete) {
                await axios.delete(`${API_URL}/teamusers/${teamUserId}/${teamId}`);

                const teamUserRequest = await axios.get(`${API_URL}/teamUnionRequests/user/${teamUserId}`);

                const teamRequestToDelete = teamUserRequest.data.find(teamRequest => teamRequest.idTeam === Number(teamId));

                if (teamRequestToDelete) {
                    await axios.delete(`${API_URL}/teamUnionRequests/${teamRequestToDelete.id}`);
                }
                const newTeamUsernames = teamUsernames.filter((teamUsername) => teamUsername.id !== teamUserId);
                setTeamUsernames(newTeamUsernames);
                setDeleteTeamUserMessage('Usuario eliminado del equipo correctamente');
                setTimeout(() => {
                    setDeleteTeamUserMessage('');
                }, 6000);
            }
        } catch (error) {
            console.error('Error al eliminar usuario del equipo:', error);
        }
    }

    const handleSwitchChange = async (event) => {
        try {
            await axios.put(`${API_URL}/teams/${teamId}`, {
                acceptRequest: event.target.checked,
            });
            setAcceptRequest(!event.target.checked);
            const messageInfo = !event.target.checked ? 'Configuración cambiada, ahora se aceptan solicitudes' : 'Configuración cambiada, ahora no se aceptan solicitudes';
            setInitialMessage(messageInfo);
            setTimeout(() => {
                setInitialMessage('');
            }, 5000);
        } catch (error) {
            console.error('Error al cambiar la configuración del equipo:', error);
        }
    };

    const handleDeleteTeam = async () => {
        try {
            const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este equipo?');
            if (confirmDelete) {
                // Al eliminar equipo quiero borrar todos los teamusers asociados a ese equipo
                // el endpoint es teamusers.delete", "/:userId/:teamId"
                await teamUsers.map(async (teamUser) => {
                    axios.delete(`${API_URL}/teamusers/${teamUser.idUser}/${teamId}`);
                });
                // Al eliminar equipo quiero borrar todos los teamUnionRequest, 
                // para esto tengo que ver todas las request que apuntan a este teamId 
                // con request.idTeam === teamId y borrar todas esas request
                const teamUnionRequests = await axios.get(`${API_URL}/teamUnionRequests/team/${teamId}`);
                teamUnionRequests.data.map(async (teamUnionRequest) => {
                    await axios.delete(`${API_URL}/teamUnionRequests/${teamUnionRequest.id}`);
                });
                await axios.delete(`${API_URL}/teams/${teamId}`);
                navigate('/userProfile?success=deleteTeam');
            }
        } catch (error) {
            console.error('Error al eliminar equipo:', error);
        }
    }

    const handleUpdateTeamName = async () => {
        try {
            await axios.put(`${API_URL}/teams/${teamId}`, {
                teamName: teamInfo.teamName,
            });
            setIsEditingTeamName(false);
        } catch (error) {
            console.error('Error al cambiar el nombre del equipo:', error);
        }
    }


    if (!teamInfo) {
        return (
            <>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '91vh' }}>
                    <CircularProgress />
                </div>
            </>
        )
    }

    return (
        <div className='main-container'>                
            {initialMessage && (
                <Alert severity="info">{initialMessage}</Alert>
            )}
            {createTeamInitialMessage && (
                <Alert severity="success">{createTeamInitialMessage}</Alert>
            )}
            {deleteTeamUserMessage && (
                <Alert severity="error">{deleteTeamUserMessage}</Alert>
            )}
            <div className="team-profile-container">
                {isMatchPending && (
                    <div className="team-find-match-container">
                        <h2> ¡Tienes un match pendiente con otro equipo!</h2>
                    </div>
                )}
                <div className="team-container">
                    {!isEditingTeamName ? (
                        <div className="name-container">
                            <h1>
                                {teamInfo.teamName} 
                            </h1>
                            <button onClick={() => setIsEditingTeamName(true)}>
                                <FaPencil 
                                    className='edit-team-name' 
                                />
                            </button>
                        </div>
                    ) : (
                        <div className="change-name-container">
                            <input
                                type="text"
                                value={teamInfo.teamName}
                                onChange={(e) => setTeamInfo({ ...teamInfo, teamName: e.target.value })}
                            />
                            <button onClick={handleUpdateTeamName}><IoIosSave /></button>
                        </div>
                    )}
                
                    <div className='team-actions'>
                        {isCaptain && 
                            <a
                                className="team-button-search"
                                href={`/match-finder/${teamId}`}
                            >
                                Buscar Equipos
                            </a>
                        }
                        <a 
                            className="team-button-view"
                            href={`/match-view/${teamId}`}
                            >
                                Matchs
                        </a>
                    </div>
                    <div className="team-info">
                        <h3>Información</h3>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Rating name="read-only" value={Number(teamInfo.qualification)} readOnly />
                        </div>
                        <p><strong>Deporte:</strong> {teamInfo.sport}</p>
                        <p><strong>Capitán:</strong> {captainUsername}</p> 
                    </div>
                </div>
                {teamUsernames && (
                        <div className="team-users-container">
                            <div className="team-users-header">
                                {isCaptain && (
                                    <> 
                                        <h2>Aceptar solicitudes de unión</h2>
                                        <Switch 
                                            checked={acceptRequest} 
                                            onChange={handleSwitchChange}
                                        />
                                    </>
                                )}
                            </div>
                            <h2>Miembros del equipo:</h2>
                            <table>
                                <thead>
                                    <th>Nombre</th>
                                    <th>Correo electrónico</th>
                                    <th>Calificación</th>
                                    <th>Sanción</th>
                                    {isCaptain && <th>Acciones</th>}
                                </thead>
                                <tbody>
                                    {teamUsernames.map((teamUsername, index) => (
                                        <tr key={index}>
                                            <td>{teamUsernames[index]?.username || 'Usuario no encontrado'}</td>
                                            <td>{teamUsernames[index]?.mail || 'Usuario no encontrado'}</td>
                                            <td>{teamUsernames[index]?.qualification || 'Usuario no encontrado'}</td>
                                            <td>{teamUsernames[index]?.sanction === false ? 'Usuario no sancionado' : 'Usuario sancionado'}</td>
                                            {isCaptain && (
                                            <td>
                                                <button
                                                    className={teamUsernames[index]?.id === userId ? "disabled-button" : "delete-button"}
                                                    onClick={() => {
                                                        if (teamUsernames[index]?.id !== userId) {
                                                            handleDeleteTeamUser(teamUsernames[index].id);
                                                        }
                                                    }}
                                                    disabled={teamUsernames[index]?.id === userId}
                                                >
                                                    {teamUsernames[index]?.id === userId ? "Eres tú" : "Eliminar"}
                                                </button>
                                            </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                <div className="team-buttons-container">
                    <button 
                        className="delete-button" 
                        title="Se eliminar todos los usuarios del equipo y el equipo en sí"
                        onClick={handleDeleteTeam}
                    >
                        Eliminar equipo
                    </button>
                </div>
                <div className="team-chat-container">
                    <TeamChat teamId={teamId} username={username} />
                </div>
            </div>
        </div>
    );
}

export default TeamProfile;

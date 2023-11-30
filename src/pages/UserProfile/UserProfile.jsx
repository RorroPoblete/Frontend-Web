import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './UserProfile.css';
import teamImg from '../../assets/img/soccer-team.png';
import { FaTrashAlt } from "react-icons/fa";
import { BsEyeFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { BsXCircleFill } from "react-icons/bs";
import { BsPlusCircleFill } from "react-icons/bs";
import Footer from '../../common/Footer';
import CircularProgress from '@mui/material/CircularProgress';
import MuiAlert from '@mui/material/Alert';
import Rating from '@mui/material/Rating';
import VisibilityIcon from '@mui/icons-material/Visibility';
import API_URL from '../../common/config';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UserProfile() {
  const [initialMessage, setInitialMessage] = useState('');
  // CONTENEDOR 0
  const [userData, setUserData] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  // CONTENEDOR 1
  const [userTeams, setUserTeams] = useState([]);
  // CONTENEDOR 2
  const [userRequests, setUserRequests] = useState([]);
  const [teamsRequest, setTeamsRequest] = useState([]);
  // CONTENEDOR 3
  const [pendingRequestWhereIAmCaptain, setPendingRequestWhereIAmCaptain] = useState([]);
  const [pendingUsersRequestWhereIAmCaptain, setPendingUsersRequestWhereIAmCaptain] = useState([]);

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const successParam = urlParams.get('success');
    setInitialMessage(successParam === 'joinTeam' ? 'Solicitud enviada con éxito' : '');
    setTimeout(() => {
      setInitialMessage('');
    }, 6000);
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        // 0. PARA CONTENEDOR INICIAL: LLAMADO DE DATOS DE USUARIO
        const userResponse = await axios.get(`${API_URL}/users/${userId}`, config);

        // 1. PARA PRIMER CONTENEDOR: LLAMADO DE LOS EQUIPOS DEL USUARIO
        const userTeamsResponse = await axios.get(`${API_URL}/teams/user/${userId}`);

        // 2. PARA SEGUNDO CONTENEDOR: LLAMADO DE TODAS MIS SOLICITUDES
        const userRequestsResponse = await axios.get(`${API_URL}/teamUnionRequests/user/${userId}`);

        // 2.1 PARA SEGUNDO CONTENEDOR: LLAMADO DE TODOS LOS EQUIPOS DONDE TENGO SOLICITUDES
        const userTeamsRequestResponde = await axios.get(`${API_URL}/teams/userRequest/${userId}`);

        // 3. PARA TERCER CONTENEDOR: LLAMADO DE TODOS LOS EQUIPOS DONDE TENGO SOLICITUDES Y SOY CAPITAN (Y ESTAN PENDIENTES)
        const teamsUnionRequestWhereIAmCaptain = await axios.get(`${API_URL}/teamUnionRequests/captain/${userId}`);
        const pendingRequestsCaptain = teamsUnionRequestWhereIAmCaptain.data.filter((request) => request.state === 'pending');

        // 3.1 PARA TERCER CONTENEDOR: LLAMADO DE NOMBRE DE LOS USUARIOS QUE HACEN SOLICITUDES A MI EQUIPO
        const pendingUsersRequestWhereIAmCaptain = await Promise.all(
          pendingRequestsCaptain.map(async (request) => {
            const userRequestResponse = await axios.get(`${API_URL}/users/${request.idUser}`, config);
            return userRequestResponse.data;
          })
        );

        setUserData(userResponse.data);
        setUserTeams(userTeamsResponse.data);
        setUserRequests(userRequestsResponse.data);
        setTeamsRequest(userTeamsRequestResponde.data);
        setPendingRequestWhereIAmCaptain(pendingRequestsCaptain);
        setPendingUsersRequestWhereIAmCaptain(pendingUsersRequestWhereIAmCaptain);


      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };

    fetchData();
  }, [userId, token]);

  const handleDeleteMyTeam = async (userId, teamId) => {
    try {
      const confirmDelete = window.confirm('¿Estás seguro de salir del equipo?');
      if (confirmDelete) {
        await axios.delete(`${API_URL}/teamusers/${userId}/${teamId}`);
        const userTeamRequest = await axios.get(`${API_URL}/teamUnionRequests/user/${userId}`);
        const teamRequestToDelete = userTeamRequest.data.find(request => request.idTeam === teamId);
  
        if (teamRequestToDelete) {
          await axios.delete(`${API_URL}/teamUnionRequests/${teamRequestToDelete.id}`);
        }
        // Actualizar los equipos después de eliminar un equipo
        const updatedUserTeams = userTeams.filter((team) => team.id !== teamId);
        const updatedUserRequests = userRequests.filter((request) => request.idTeam !== teamId);
        setUserRequests(updatedUserRequests);
        setUserTeams(updatedUserTeams);
        setAlertMessage('Te has salido del equipo');
        setTimeout(() => {
          setAlertMessage(null);
        }, 6000);
      }
    } catch (error) {
      console.error('Error al eliminar equipo:', error);
    }
  }

  const findNameTeamById = (teamId) => {
    const team = teamsRequest.find((team) => team.id === teamId);
    return team ? team.teamName : 'Equipo no encontrado';
  };

  const findSportById = (teamId) => {
    const team = teamsRequest.find((team) => team.id === teamId);
    return team ? team.sport : 'Deporte no encontrado';
  };

  const handleDeleteMyRequest = async (requestId) => {
    try {
      const confirmDelete = window.confirm('¿Estás seguro de eliminar tu solicitud?');
      if (confirmDelete) {
        await axios.delete(`${API_URL}/teamUnionRequests/${requestId}`);
        // Actualizar las solicitudes pendientes después de eliminar una solicitud
        const updatedPendingRequests = userRequests.filter((request) => request.id !== requestId);
        setUserRequests(updatedPendingRequests);
        setAlertMessage('Tú solicitud fue eliminada');
        setTimeout(() => {
          setAlertMessage(null);
        }, 6000);
      }
    } catch (error) {
      console.error('Error al eliminar solicitud:', error);
    }
  }

  const handleDeclineRequest = async (requestId) => {
    try {
      const confirmDecline = window.confirm('¿Estás seguro de rechazar la solicitud?');
      if (confirmDecline) {
        await axios.put(`${API_URL}/teamUnionRequests/${requestId}`, {
          state: 'declined',
        });
        // Actualizar las solicitudes pendientes después de eliminar una solicitud
        const updatedPendingRequests = pendingRequestWhereIAmCaptain.filter((request) => request.id !== requestId);
        setPendingRequestWhereIAmCaptain(updatedPendingRequests);

        // Poner un alert para avisar que se rechazó la solicitud
        setAlertMessage('La solicitud fue rechazada');
        setTimeout(() => {
          setAlertMessage(null);
        }, 6000);
      }
    } catch (error) {
      console.error('Error al rechazar solicitud:', error);
    }
  }

  const handleAcceptRequest = async (requestId, idTeam, idUser) => {
    try {
      const confirmAccept = window.confirm('¿Estás seguro de aceptar la solicitud?');
      if (confirmAccept) {
        await axios.put(`${API_URL}/teamUnionRequests/${requestId}`, {
          state: 'accepted',
        });
        await axios.post(`${API_URL}/teamusers`, {
          idTeam: idTeam,
          idUser: idUser,
        });
        // Actualizar las solicitudes pendientes después de eliminar una solicitud
        const updatedPendingRequests = pendingRequestWhereIAmCaptain.filter((request) => request.id !== requestId);
        setPendingRequestWhereIAmCaptain(updatedPendingRequests);

        setSuccessMessage('La solicitud fue aceptada');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 6000);
      }
    } catch (error) {
      console.error('Error al aceptar solicitud:', error);
    }
  }

  if(!userData) {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '91vh' }}>
            <CircularProgress />
        </div>
      </>
    );
  }

  return (
    <>
      {initialMessage && (
        <Alert severity="info">{initialMessage}</Alert>
      )}
      {successMessage && (
        <Alert severity="success">{successMessage}</Alert>
      )}

      {alertMessage && (
        <Alert severity="error">{alertMessage}</Alert>
      )}
      <div className="container-user-profile">
        <div className="user-container">
          <img src={teamImg} alt="Imagen de equipo" />
          <h1>Perfil de usuario</h1>
          {userData ? (
            <div className="user-info">
              <h3>
                <strong>Información</strong>
              </h3>
              <p>
                <strong>Nombre de usuario:</strong> {userData.username}
              </p>
              <p>
                <strong>Email:</strong> {userData.mail}
              </p>
              <p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Rating name="read-only" value={Number(userData.qualification)} precision={0.1} readOnly />
                </div>
              </p>
            </div>
          ) : (
            <CircularProgress />
          )}
        </div>

        {userTeams && (
          <div className="teams-container">
            <h1>Mis equipos</h1>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Deporte</th>
                  <th>Calificación</th>
                  <th>Salir del Equipo</th>
                  <th>Ver Equipo</th>
                </tr>
              </thead>
              <tbody>
                {userTeams.map((team) => (
                  <tr key={team.id}>
                    <td>{team.teamName}</td>
                    <td>{team.sport}</td>
                    <td><Rating name="read-only" value={Number(team.qualification)} precision={0.1} readOnly /></td>
                    <td>
                      <a className="exit-team" onClick={() => handleDeleteMyTeam(userId, team.id)}>
                        <ImExit style={{fontSize: '1.2em' }} />
                      </a>
                    </td>
                    <td>
                      <a className="view-team" href={`/teamProfile/${team.id}`}>
                        <BsEyeFill style={{fontSize: '1.2em' }}/>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {userRequests && (
          <div className="pending-container">
            <h1>Solicitudes en espera</h1>
            <table>
              <thead>
                <tr>
                  <th>Nombre Equipo</th>
                  <th>Deporte</th>
                  <th>Estado</th>
                  <th>Eliminar solicitud</th>
                </tr>
              </thead>
              <tbody>
                {userRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{findNameTeamById(request.idTeam)}</td>
                    <td>{findSportById(request.idTeam)}</td>
                    <td><strong>{request.state}</strong></td>
                    <td>
                      {request.state == 'accepted' ? (
                        <a className="button-disabled-request">
                          Ya estás en el equipo
                        </a>
                      ) : (
                        <a className="button-delete-request" onClick={() => handleDeleteMyRequest(request.id)}>
                          <FaTrashAlt style={{fontSize: '1.2em' }}/>
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pendingRequestWhereIAmCaptain && (
          <div className="request-container">
            <h1>Solicitudes Unión</h1>
            <table>
              <thead>
                <tr>
                  <th>Equipo</th>
                  <th>Deporte</th>
                  <th>Nombre del usuario</th>
                  <th>Estado</th>
                  <th>Rechazar Solicitud</th>
                  <th>Aceptar Solicitud</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequestWhereIAmCaptain.map((request, index) => (
                  <tr key={request.id}>
                    <td>{request.Team.teamName}</td>
                    <td>{request.Team.sport}</td>
                    <td>{pendingUsersRequestWhereIAmCaptain[index]?.username || 'Usuario no encontrado'}</td>
                    <td>{request.state}</td>
                    <td>
                      <a className="decline-button" onClick={() => handleDeclineRequest(request.id)}> 
                        <BsXCircleFill style={{fontSize: '1.2em' }}/>
                      </a>
                    </td>
                    <td>
                      <a className="success-button" onClick={() => handleAcceptRequest(request.id, request.idTeam, request.idUser)}> 
                        <BsPlusCircleFill style={{fontSize: '1.2em' }}/>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;

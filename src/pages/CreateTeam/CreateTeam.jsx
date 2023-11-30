import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './CreateTeam.css'; // Importa el archivo CSS
import 'jwt-decode';
import Footer from "../../common/Footer";
import API_URL from '../../common/config';

function CreateTeam() {
  const [teamName, setName] = useState("");
  const [sport, setSport] = useState("Fútbol"); // Valor por defecto
  const qualification = 1;
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        const createTeamResponse = await axios.post(`${API_URL}/teams`, {
            teamName,
            qualification,
            sport,
            captainId: userId,
            acceptRequest: true,
        });
        const teamId = createTeamResponse.data.id;

        await axios.post(`${API_URL}/teamusers`, {
            idTeam: teamId,
            idUser: userId,
        });
        navigate(`/teamProfile/${teamId}?success=createdTeam`); 
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <>
      <div className="create-team">
        <h1>
          Crea tu propio equipo
        </h1>
        <form onSubmit={handleSubmit}>
          <label>
            <h3><strong>Nombre del equipo</strong></h3>
            <input
              type="text"
              value={teamName}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label>
            <h3><strong>Deporte</strong></h3>
            <select
              value={sport}
              onChange={(event) => setSport(event.target.value)}
            >
              <option value="Fútbol">Fútbol</option>
              <option value="Padel">Padel</option>
            </select>
          </label>
          <button type="submit">Crear equipo</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default CreateTeam;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import { BsEyeFill } from "react-icons/bs";
import "./MatchView.css";
import Rating from '@mui/material/Rating';
import API_URL from "../../common/config";

function MatchView() {
  const { teamId } = useParams();
  const [myTeam, setMyTeam] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  const [myMatchs, setMyMatchs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMyTeam = await axios.get(
          `${API_URL}/teams/${teamId}`
        );
        const responseAllTeams = await axios.get(
          `${API_URL}/teams`
        );
        const responseMatchs = await axios.get(
          `${API_URL}/matches/team/${teamId}`
        );
        setMyTeam(responseMyTeam.data);
        setAllTeams(responseAllTeams.data);
        setMyMatchs(responseMatchs.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }
  , [teamId]);

  const searchTeamNameById = (id) => {
    const team = allTeams.find((team) => team.id === id);
    return team ? team.teamName : 'Nombre de equipo no encontrado';
  }

  return (
    <div className='match-view-container'>
      <h1>{myTeam.teamName}</h1>
      <div className='matchs-container'>
        <h1>Todos mis Matchs</h1>
        <table>
          <thead>
            <tr>
              <th>Equipo 1</th>
              <th></th>
              <th>Equipo 2</th>
              <th>Fecha y Hora</th>
              <th>Lugar</th>
              <th>Resultado</th>
              <th>Calificación</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {myMatchs.map((match) => (
              <tr key={match.id}>
                <td>{searchTeamNameById(match.idTeam1)}</td>
                <td><strong>V/S</strong></td>
                <td>{searchTeamNameById(match.idTeam2)}</td>
                <td>
                  {dayjs(match.gameTime).format('DD/MM/YY HH:mm')}
                </td>
                <td>{match.location}</td>
                <td>{match.result}</td>
                <td>
                  <Rating
                    name="read-only"
                    value={match.qualification}
                    precision={0.1} 
                    readOnly 
                  />
                </td>
                <td>
                  <a className="view-team" href={`/match-details/${match.id}`}>
                    <BsEyeFill style={{fontSize: '1.2em' }}/>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MatchView;

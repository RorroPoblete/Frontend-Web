import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MuiAlert from '@mui/material/Alert';
import API_URL from '../../common/config';
import './MatchDetails.css';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const today = dayjs();

function MatchDetails() {
  const { matchId } = useParams();
  const [selectedDateTime, setSelectedDateTime] = useState(today);
  const [isValidSelection, setIsValidSelection] = useState(true);
  const [match, setMatch] = useState({});
  const [Team1, setMyTeam] = useState([]);
  const [Team2, setMyRivalTeam] = useState([]);
  const [newLocation, setNewLocation] = useState('');
  const [newResult, setNewResult] = useState('');
  const [newQualification, setNewQualification] = useState(0);
  const [updateAlert, setUpdateAlert] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMatch = await axios.get(
          `${API_URL}/matches/${matchId}`
        );
        const responseTeam1 = await axios.get(
          `${API_URL}/teams/${responseMatch.data.idTeam1}`
        );
        const responseTeam2 = await axios.get(
          `${API_URL}/teams/${responseMatch.data.idTeam2}`
        );
        setMatch(responseMatch.data);
        setMyTeam(responseTeam1.data);
        setMyRivalTeam(responseTeam2.data);
        setNewLocation(responseMatch.data.location);
        setNewResult(responseMatch.data.result);
        setNewQualification(responseMatch.data.qualification);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [matchId, updateAlert]);

  const handleDateTimeChange = (dateTime) => {
    if (dateTime.isBefore(today)) {
      setIsValidSelection(false);
    } else {
      setSelectedDateTime(dateTime);
      setIsValidSelection(true);
    }
  };

  const handleLocationChange = (event) => {
    setNewLocation(event.target.value);
  };

  const handleResultChange = (event) => {
    setNewResult(event.target.value);
  };

  const handleQualificationChange = (value) => {
    setNewQualification(value);
  };

  const handleSubmit = () => {
    // Aquí puedes enviar la información actualizada al servidor o realizar otras acciones necesarias.
    try {
      const response = axios.put(
        `${API_URL}/matches/${matchId}`,
        {
          gameTime: selectedDateTime.toISOString(),
          location: newLocation,
          result: newResult,
          qualification: newQualification,
        }
      );
      console.log('Response:', response);
      setUpdateAlert('Match actualizado con exito')
      setTimeout(() => {
        setUpdateAlert(null)
      } , 4000)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      {updateAlert && <Alert severity="success">{updateAlert}</Alert>}
      <div className="container-match-view">
        <h2>Detalles del Partido</h2>
        <h1>{Team1.teamName} V/S {Team2.teamName}</h1>
        <p>Fecha y Hora: {dayjs(match.gameTime).format('DD/MM/YY HH:mm')}</p>
        <p>Lugar: {match.location}</p>
        <p>Resultado: {match.result}</p>
        <Rating name="read-only" value={Number(match.qualification)} precision={0.1} readOnly />
        <div className='container-actualizar'>
          <h2>Actualiza los detalles del partido:</h2>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              fontFamily="Red Hat Display"
              value={selectedDateTime}
              disablePast
              format="DD/MM/YYYY HH:mm"
              onChange={handleDateTimeChange}
            />
          </LocalizationProvider>
          <label>
            Nueva Ubicación:
            <input type="text" value={newLocation} onChange={handleLocationChange} />
          </label>
          <label>
            Nuevo Resultado:
            <input type="text" value={newResult} onChange={handleResultChange} />
          </label>
          <label>
            Nueva Calificación:
            <Rating
              name="new-rating"
              value={newQualification}
              onChange={(event, value) => handleQualificationChange(value)}
            />
          </label>
          <button onClick={handleSubmit} disabled={!isValidSelection}>
            Actualizar Detalles del Partido
          </button>
        </div>
      </div>
    </>
  );
}

export default MatchDetails;

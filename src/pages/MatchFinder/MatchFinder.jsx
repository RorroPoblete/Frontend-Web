import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MatchFinder.css';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import TinderCard from 'react-tinder-card';
import Footer from '../../common/Footer';
import CircularProgress from '@mui/material/CircularProgress';
import './MatchFinder.css';
import dayjs from 'dayjs';



function MatchFinder() {
  const { teamId } = useParams();
  const [myTeam, setMyTeam] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentTeamIndex);
  const [lastTeamLiked, setLastTeamLiked] = useState();
  const [itsMatch, setItsMatch] = useState(null);

  const today = dayjs();

  const childRefs = useMemo(
    () =>
      Array(allTeams.length)
        .fill(0)
        .map(() => React.createRef()),
    [allTeams.length]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMyTeam = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/teams/${teamId}`);
        const responseAllTeams = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/teams`);
        const filteredTeams = responseAllTeams.data.filter((team) => team.sport === responseMyTeam.data.sport);
        const filteredTeams2 = filteredTeams.filter((team) => team.id !== responseMyTeam.data.id);
        // Filtrar los equipos con los que ya le has dado like
        const responseMatchRequests = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/matchRequests/requester/${teamId}`);
        const filteredTeams3 = filteredTeams2.filter((team) => !responseMatchRequests.data.some(request => request.teamIdReceiver === team.id));
        setMyTeam(responseMyTeam.data);
        setAllTeams(filteredTeams3);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [teamId]);

  const updateCurrentIndex = (val) => {
    setCurrentTeamIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentTeamIndex < allTeams.length - 1;
  const canSwipe = currentTeamIndex >= 0;

  const swiped = (direction, index) => {
    if (direction === 'right') {
      setLastDirection('derecha');
      console.log(`Team ${allTeams[index].teamName} (${index}) liked!`);
      setLastTeamLiked(allTeams[index]);
      handleLikeTeam(allTeams[index].id);
    } else if (direction === 'left') {
      setLastDirection('izquierda');
    }
    updateCurrentIndex(index - 1);
  };

  const handleLikeTeam = async (teamId) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/matchRequests`, {
        teamIdRequester: myTeam.id,
        teamIdReceiver: teamId
      });
      console.log(response, 'se ha dado like al equipo');
      isTeamRequesterAlreadyLikedByTeamReceiver(teamId);
      
    } catch (error) {
      console.error('Error liking team:', error);
    }
  }
  const isTeamRequesterAlreadyLikedByTeamReceiver = async (teamIdReceiver) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/matchRequests/requester/${teamIdReceiver}`);
      console.log(response.data, 'requests del equipo receptor');
      
      // Si dentro de las requests del equipo receptor ya está el equipo que le ha dado like (myTeam),
      // entonces crear un match y mostrar un mensaje de que hay un match
      if (response.data.some(request => request.teamIdReceiver === myTeam.id)) {
        console.log('Hay un match');
        createMatch(teamIdReceiver);
      }
    } catch (error) {
      console.error('Error getting teamRequest:', error);
    }
  };

  const createMatch = async (teamIdReceiver) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/matches`, {
        idTeam1: myTeam.id,
        idTeam2: teamIdReceiver,
        result: 'pending',
        location: 'pending',
        qualification: 0,
        gameTime: today
      });
      setItsMatch("¡Hiciste Match! Ahora puedes verlo en la sección de Matches");
      setTimeout(() => {
        setItsMatch(null);
      }, 5000);
      console.log(response.data, 'match creado');
    } catch (error) {
      console.error('Error creating match:', error);
    }
  }

  const outOfFrame = (idx) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  if (!allTeams || allTeams.length === 0) {
    return (
      <>
        <div className="container-match-finder">
          <h1>
            ¡Busca a tu rival ideal para jugar contra ellos con {myTeam.teamName}!
          </h1>
          <div className='infoText'>
            {allTeams ? (
              <h2>No hay equipos disponibles para hacer Match.</h2>
            ) : (
              <CircularProgress />
            )}
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="container-match-finder">
        {itsMatch && 
          <div className="infoText">
            <h2>{itsMatch}</h2>
          </div>
        }
        <h1>
          ¡Busca a tu rival ideal para jugar contra ellos con {myTeam.teamName}!
        </h1>
        <div className="cardContainer">
          {allTeams.map((team, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={team.id}
              onSwipe={(dir) => swiped(dir, index)}
              onCardLeftScreen={() => outOfFrame(index)}
              preventSwipe={['up', 'down']}
            >
              <div
                style={{ backgroundColor: `rgba(255, 255, 255)` }}
                className="card"
              >
                <h5>{team.sport}</h5>
                <h3>{team.teamName}</h3>
                <Rating className="rating" name="read-only" value={team.qualification} readOnly />
              </div>
            </TinderCard>
          ))}
        </div>
        {lastDirection ? (
          <h2 key={lastDirection} className="infoText">
            {lastDirection === 'derecha' 
            ? `¡Has dado like a ${lastTeamLiked.teamName}!`
            : 'Equipo descartado'}
          </h2>
        ) : (
          <h2 className="infoText">
            Desliza a la derecha para buscar al equipo que te guste, o a la izquierda para descartarlo.
          </h2>
        )}
      </div>
      <Footer />
    </>
  );
}

export default MatchFinder;

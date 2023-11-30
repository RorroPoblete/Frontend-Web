import React from "react"
import gifImage from "../assets/img/logo.gif"
import "./Navbar.css"
import axios from 'axios';
import LogoutButton from "./buttons/LogoutButton"
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import Badge from '@mui/material/Badge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import API_URL from '../common/config';

function Navbar() {
  const { token } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(false);
  const [userId, setUserId] = useState(0);
  const [pendingRequestWhereIAmCaptain, setPendingRequestWhereIAmCaptain] = useState(0);
  const config = {
    'method': 'get',
    'url': `${API_URL}/scope-example/protecteduser`,
    'headers': {
      'Authorization': `Bearer ${token}`
    }
  }

  useEffect(() => {
      axios(config).then((response) => {
        setUserDetails(true);
        setUserId(response.data.user.id);
      }).catch((error) => {
        setUserDetails(false);
      });
      const fetchData = async () => {
        try {
          const teamsUnionRequestWhereIAmCaptain = await axios.get(`${API_URL}/teamUnionRequests/captain/${userId}`);
          const pendingRequestsCaptain = teamsUnionRequestWhereIAmCaptain.data.filter((request) => request.state === 'pending');
          const numberOfPendingRequestsCaptain = pendingRequestsCaptain.length;
          setPendingRequestWhereIAmCaptain(numberOfPendingRequestsCaptain);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
  }, [token, pendingRequestWhereIAmCaptain, userDetails]); 
  return (
    <nav className="nav">
      <a href={userDetails ? "/principal" : "/"} className="site-title">
        <img src={gifImage} alt="Logo" className="logo" />
      </a>
      <div>
        <ul id="navbar">
          {userDetails && (
            <li>
              <a href="/">Landing</a>
            </li>
          )}
          <li>
            <a href="/instructions">Instrucciones</a>
          </li>
          {!userDetails ? (
            <li>
              <a href="/access">Log In</a>
            </li>
          ) : (
            <>
              <li>
                <a href="/join-team">Unirse a un equipo</a>
              </li>
              <li>
                <a href="/create-team">Crear un equipo</a>
              </li>
              <li>
              <Badge badgeContent={pendingRequestWhereIAmCaptain} color="primary">
                <a href="/userProfile"><AccountCircleIcon /></a>
              </Badge>
              </li>
              <li className="logout-button">
                <LogoutButton />
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  )
}

export default Navbar;
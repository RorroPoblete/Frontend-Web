import React, {useContext, useState} from 'react';
import { AuthContext } from '../../auth/AuthContext';
import './LogoutButton.css';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const {logout} = useContext(AuthContext);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMsg("Has hecho logout con éxito!")
    navigate('/');
  }

  return (
    <>
        {msg.length > 0 && <div className="successMsg"> {msg} </div>}
        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
    </>
  );
}

export default LogoutButton;
import React from 'react';
import './Principal.css'; 
import campeonatoImg from '../../assets/img/campeonato_principal.webp'; 
import centroImg from '../../assets/img/centro_deportivo.jpeg';
import Footer from '../../common/Footer';
import SecondaryButton from '../../common/buttons/SecondaryButton';
import { useState, useEffect } from 'react';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Principal() {
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
      // Verificar si hay un mensaje de éxito en la URL (por ejemplo, después de redirigir desde Access.jsx)
      const urlParams = new URLSearchParams(window.location.search);
      const successParam = urlParams.get('success');
  
      if (successParam === 'login') {
        setSuccessMessage('Inicio de sesión exitoso');
        // Después de 5 segundos, ocultar el mensaje
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } else if (successParam == "register") {
        setSuccessMessage('Cuenta creada con éxito');
        // Después de 5 segundos, ocultar el mensaje
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      }
    }, []);
    return (
      <>
        <div className="principal">
            {successMessage && (
              <Alert severity="success">{successMessage}</Alert>
            )}
            <div className="title">
                <h1>Funciones Sport Teamer</h1>
            </div>

            <div className="main-content">

                <div className="image-container">
                    <img src={campeonatoImg} alt="Imagen de messi"/>
                    <SecondaryButton href="/join-team" text="Unirse a un equipo" />
                </div>

                <div className="image-container">
                    <img src={centroImg} alt="Imagen de una cancha"/>
                    <SecondaryButton href="/create-team" text="Crear un equipo" />
                </div>

            </div>
        </div>
        <Footer />
      </>
    );
}

export default Principal;

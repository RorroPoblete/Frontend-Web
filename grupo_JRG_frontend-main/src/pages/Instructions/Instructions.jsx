import React from "react"
import Slider from "react-slick/lib/slider"
import Footer from "../../common/Footer"
import "./Instructions.css"

function Instructions() {
    // const instructionsData = [
    //     {
    //         title: "Registro y perfiles de usuario",
    //         description: "Los usuarios pueden registrarse, crear perfiles con información personal, \
    //         incluyendo deportes que practican, habilidades, intereses y ubicación.",
    //     },
    //     {
    //         title: "Creación y gestión de equipos",
    //         description: "Los usuarios pueden crear equipos, agregar detalles como nombre, deporte \
    //         principal, nivel de juego y ubicación, e invitar a otros usuarios a unirse a sus equipos.",
    //     },
    //     {
    //         title: "Búsqueda y unión a equipos",
    //         description: "Los usuarios pueden buscar equipos por deporte, ubicación \
    //         y nivel de juego, y solicitar unirse a equipos que se adapten a sus preferencias.",
    //     },
    //     {
    //         title: "Organización de partidos y eventos",
    //         description: "Los usuarios pueden crear partidos, definir fecha, hora y ubicación, \
    //         invitar equipos o jugadores y administrar los detalles del evento.",
    //     },
    //     {
    //         title: "Calificación y reseñas",
    //         description: "Los usuarios pueden calificar a otros usuarios, equipos y partidos, y \
    //         dejar reseñas y comentarios para compartir sus experiencias y evaluaciones.",
    //     },
    //     {
    //         title: "Chat y comunicación",
    //         description: "Los usuarios pueden participar en chats grupales con sus equipos y \
    //         otros jugadores, lo que permite una comunicación directa y la organización de eventos.",
    //     },
    //     {
    //         title: "Exploración de deportes y comunidades deportivas",
    //         description: "Los usuarios pueden explorar deportes, unirse a comunidades deportivas \
    //         relacionadas con sus intereses y descubrir eventos deportivos locales.",
    //     }
    // ]
    
    // const settings = {
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 5000,
    // }

    return (
        <div className="instructions-box">
            <div className="instructions">
                {/* <h1>Cómo funciona Sport Teamer</h1> */}

                {/* <h2>Nuestras funcionalidades</h2>

                <div className="funcionalidades">
                    <Slider {...settings}>
                    {instructionsData.map((functionality, index) => (
                        <div key={index} className="funcionalidades-slide">
                            <h3>{functionality.title}</h3>
                            <p>{functionality.description}</p>
                        </div>
                    ))}
                    </Slider>
                </div> */}
                
                <div className="modo-de-uso">
                    <h1>Modo de uso</h1>

                    <p>1. A través de la barra de navegación, accede a tu cuenta en el apartado de <i>Log In</i>.
                            Si aún no tienes una cuenta, te invitamos a crear una!</p>

                    <p>2. Con tu cuenta ya creada, puedes ver nuevas funcionalidades como unirse o crear un equipo.</p>
                    
                    <p>3. Una vez tengas tu decisión, envía una solicitud de unión. Opcionalmente, 
                        ánimate y crea tu propio equipo!</p>
                    
                    <p>4. Utiliza el chat para poder comunicarte con tus compañeros de equipo y otros jugadores y así organizar eventos (Pronto)</p>

                    <p>5. Después de cada evento, deja una calificación o reseña sobre tu experiencia.</p>

                </div>
            </div>
        </div>
    )
}

export default Instructions
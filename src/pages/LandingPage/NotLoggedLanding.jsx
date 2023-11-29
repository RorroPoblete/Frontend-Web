import React from "react";
import Typed from "react-typed";
import "./NotLoggedLanding.css";
import PrimaryButton from "../../common/buttons/PrimaryButton";
import SecondaryButton from "../../common/buttons/SecondaryButton";
import Footer from "../../common/Footer";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaRegCalendarCheck, FaSearchPlus } from "react-icons/fa";
import { MdOutlineSportsSoccer, MdOutlineRateReview } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";

export default function NotLoggedLanding() {
    return (
        <div>
            <div className="not-landing-hero">
                <div className='highlight-text'>ÚNTETE Y POTENCIA TU JUEGO</div>
                <h1 className='main-heading'>Encuentra tu equipo ideal.</h1>
                <div className='flex-container'>
                    <Typed
                        className='typed-text'
                        strings={['Organiza partidos', 'Conecta con jugadores', 'Compite y diviértete']} 
                        typeSpeed={60} 
                        backSpeed={70} 
                        loop
                    />
                </div>
                <p className='description-text'>La plataforma definitiva para buscar compañeros de equipo y organizar eventos deportivos locales.</p>
                <div className="buttons">
                    <PrimaryButton  href="/instructions" text="Cómo funciona" />
                    <SecondaryButton href="/access" text="Regístrarme" />
                </div>
            </div>
            <div className="features-box">
                <div className="feature">
                    <div className="feature-icon">
                        <FaPeopleGroup style={{ color: '#1b2430', fontSize: '2.5em' }} />
                    </div>
                    <div className="feature-title">Creación y gestión de equipos</div>
                    <div className="feature-description">
                        Podrás crear equipos, personalizarlos e invitar a otros usuarios a unirse a tus equipos.
                    </div>
                </div>
                <div className="feature">
                    <div className="feature-icon">
                        <FaSearchPlus style={{ color: '#1b2430', fontSize: '2.5em' }} />
                    </div>
                    <div className="feature-title">Búsqueda y unión a equipos</div>
                    <div className="feature-description">
                        Podrás buscar equipos por deporte, ubicación y nivel de juego, y solicitar unirte a equipos que se adapten a tus preferencias.
                    </div>
                </div>
                <div className="feature">
                    <div className="feature-icon">
                        <FaRegCalendarCheck style={{ color: '#1b2430', fontSize: '2.5em' }} />
                    </div>
                    <div className="feature-title">Organización de partidos y eventos</div>
                    <div className="feature-description">
                        Podrás crear partidos, definir fecha, hora y ubicación, invitar equipos o jugadores y administrar los detalles del evento.
                    </div>
                </div>
                <div className="feature">
                    <div className="feature-icon">
                        <MdOutlineRateReview style={{ color: '#1b2430', fontSize: '2.5em' }} />
                    </div>
                    <div className="feature-title">Calificación y reseñas</div>
                    <div className="feature-description">
                        Podrás calificar a otros usuarios, equipos y partidos, y dejar reseñas y comentarios para compartir tus experiencia.
                    </div>
                </div>
                <div className="feature">
                    <div className="feature-icon">
                        <IoChatbubblesOutline style={{ color: '#1b2430', fontSize: '2.5em' }} />
                    </div>
                    <div className="feature-title">Chat y comunicación</div>
                    <div className="feature-description">
                        Podrás participar en chats grupales con sus equipos y otros jugadores, lo que permite una comunicación directa y la organización de eventos.
                    </div>
                </div>
                <div className="feature">
                    <div className="feature-icon">
                        <MdOutlineSportsSoccer style={{ color: '#1b2430', fontSize: '2.5em' }} />
                    </div>
                    <div className="feature-title">Exploración de deportes</div>
                    <div className="feature-description">
                        Podrás explorar deportes, unirte a comunidades deportivas relacionadas con tus intereses y descubrir eventos deportivos locales.
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
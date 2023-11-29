import React, { useState } from 'react';
import './Chat.css';
import chatMinimizedImg from '../assets/img/minimizar.png';
import chatMaximizedImg from '../assets/img/maximizar.png';

function Chat() {
  // Estado para controlar la visibilidad del chat
  const [chatVisible, setChatVisible] = useState(true);

  // Función para minimizar o maximizar el chat
  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  // Renderizar el componente
  return (
    <div className={`chat-container ${chatVisible ? '' : 'minimized'}`}>
      <div className="chat-header">
        <h3>Chat Sport Teamer</h3>
        <button className="close-chat-button" onClick={toggleChat}>
          {chatVisible ? (
            <img src={chatMinimizedImg} alt="Minimizar" />
          ) : (
            <img src={chatMaximizedImg} alt="Abrir chat" />
          )}
        </button>
      </div>
      {chatVisible && (
        <>
          <div className="chat-content">
            <p> ¿Quieres algún otro deporte es nuestra página? ¡Contáctanos!</p>
          </div>
          <div className="chat-input">
            <input type="text" className="chat-box" placeholder="Escribe un mensaje..." />
            {/* Agregar link para ver donde se va */}
            <button>Enviar</button>

          </div>
        </>
      )}
    </div>
  );
}

export default Chat;

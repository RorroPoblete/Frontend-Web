import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./TeamChat.css";
import API_URL from '../common/config';

const socket = io.connect(API_URL);


// Asume que teamId se pasa como prop al componente TeamChat
export default function TeamChat({ teamId, username }) {

    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const messagesEndRef = useRef(null);

    // El efecto se ejecuta cuando el componente se monta o cuando el teamId cambia
    useEffect(() => {
        // Si teamId está presente, se une a la sala correspondiente
        if (teamId) {
            console.log("Uniendo a sala: ", teamId);
            socket.emit("join_room", teamId);
        }

        // Escuchar mensajes entrantes
        socket.on("receive_message", (messageData) => {
            console.log("Mensaje recibido: ", messageData);
            setChat(prevChat => [...prevChat, messageData]);
        });

        // Recuperar mensajes antiguos del backend
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${API_URL}/chats/${teamId}/messages`);
                setChat(response.data);
            } catch (error) {
                console.error("Error al recuperar mensajes:", error);
            }
        };

        if (teamId) {
            fetchMessages();
        }

        // Limpiar al desmontar
        return () => {
            console.log(`Dejando la sala: ${teamId}`);
            socket.off("receive_message");
        };
    }, [teamId]);

    const sendMessage = async () => {
        if (message) {
            const messageData = { 
                room: teamId, 
                message: message, 
                sender: username, 
                timestamp: new Date().toLocaleTimeString() 
            };
            console.log("Enviando mensaje: ", message);
            socket.emit("send_message", messageData);

            try {
                await axios.post(`${API_URL}/chats/${teamId}/messages`, {
                  content: message,
                //   senderId: /* id del usuario */,
                });
            } catch (error) {
                console.error("Error al enviar mensaje:", error);
            }

            setMessage(""); // Limpiar el campo de mensaje después de enviar
            setChat(prevChat => [...prevChat, messageData]); // Agregar el mensaje enviado al chat  
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // El efecto se ejecuta cuando el componente se monta o cuando el chat cambia
    useEffect(scrollToBottom, [chat]);

    return (
        <div>
            <div className="chat-tittle">
                <h2>Chat de equipo</h2>
            </div>
            <div className="messages-container">
                {chat.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender === username ? "my-message" : "their-message"}`}>
                        <div className="message-sender">{msg.sender}</div>
                        <div className="message-content">
                            {msg.message}
                            <div className="message-timestamp">{msg.timestamp}</div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input-container">
                <input
                    placeholder="Escribe un mensaje..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}>Enviar</button>
            </div>
        </div>
    );
}

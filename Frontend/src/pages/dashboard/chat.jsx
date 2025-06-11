import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import '../../styles/dashboard/chat.css';

export default function Chat() {
  const { amigoId } = useParams();
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const chatEndRef = useRef(null);

  const amigosMock = {
    1: 'gymbro1',
    2: 'stronggal',
    3: 'powermax'
  };

  useEffect(() => {
    // Simula carga de mensajes
    const mensajesDemo = [
      { autor: 'yo', texto: '¡Ey! ¿Listo para entrenar?' },
      { autor: amigosMock[amigoId], texto: '¡Siempre listo!' }
    ];
    setMensajes(mensajesDemo);
  }, [amigoId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  const enviarMensaje = () => {
    if (nuevoMensaje.trim()) {
      setMensajes((prev) => [
        ...prev,
        { autor: 'yo', texto: nuevoMensaje.trim() }
      ]);
      setNuevoMensaje('');
    }
  };

  return (
    <div className="chat-panel">
      <header className="chat-header">
        <h3>💬 Chat con {amigosMock[amigoId] || `amigo ${amigoId}`}</h3>
      </header>

      <div className="chat-mensajes">
        {mensajes.map((msg, i) => (
          <div
            key={i}
            className={`chat-burbuja ${msg.autor === 'yo' ? 'yo' : 'otro'}`}
          >
            <p>{msg.texto}</p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
        />
        <button onClick={enviarMensaje}>Enviar</button>
      </div>
    </div>
  );
}

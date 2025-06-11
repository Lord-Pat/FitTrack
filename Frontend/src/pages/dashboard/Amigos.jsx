import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/dashboard/amigos.css';

export default function Amigos() {
  const navigate = useNavigate();

  const amigosIniciales = [
    { id: 1, username: 'gymbro1', online: true },
    { id: 2, username: 'stronggal', online: false },
    { id: 3, username: 'powermax', online: true },
  ];

  const [amigos, setAmigos] = useState(amigosIniciales);
  const [motes, setMotes] = useState(() => {
    const guardados = localStorage.getItem('motes');
    return guardados ? JSON.parse(guardados) : {};
  });

  const [nuevoAmigo, setNuevoAmigo] = useState('');

  const cambiarMote = (id, nuevoMote) => {
    const actualizado = { ...motes, [id]: nuevoMote };
    setMotes(actualizado);
    localStorage.setItem('motes', JSON.stringify(actualizado));
  };

  const eliminarAmigo = (id) => {
    const filtrados = amigos.filter((a) => a.id !== id);
    setAmigos(filtrados);
  };

  const agregarAmigo = () => {
    if (!nuevoAmigo.trim()) return;
    const nuevo = {
      id: Date.now(),
      username: nuevoAmigo.trim(),
      online: Math.random() > 0.5
    };
    setAmigos([...amigos, nuevo]);
    setNuevoAmigo('');
  };

  return (
    <div className="amigos-panel">
      <h2 className="amigos-titulo">👥 Amigos conectados</h2>

      <div className="form-nuevo-amigo">
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={nuevoAmigo}
          onChange={(e) => setNuevoAmigo(e.target.value)}
        />
        <button onClick={agregarAmigo}>➕ Añadir amigo</button>
      </div>

      <div className="grid-amigos">
        {amigos.map((amigo) => (
          <div key={amigo.id} className="card-amigo">
            <div className="estado" data-online={amigo.online}></div>
            <h4>{motes[amigo.id] || amigo.username}</h4>
            <input
              type="text"
              placeholder="Mote"
              value={motes[amigo.id] || ''}
              onChange={(e) => cambiarMote(amigo.id, e.target.value)}
            />
            <div className="acciones-amigo">
              <button onClick={() => navigate(`/dashboard/chat/${amigo.id}`)}>💬 Chat</button>
              <button onClick={() => alert('Ver perfil próximamente')}>👤 Ver perfil</button>
              <button className="eliminar" onClick={() => eliminarAmigo(amigo.id)}>
                ❌ Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

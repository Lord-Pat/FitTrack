import { useState } from 'react';
import '../../styles/dashboard/ajustes.css';

export default function Ajustes() {
  const [nombre, setNombre] = useState('Pat');
  const [email, setEmail] = useState('pat@example.com');
  const [genero, setGenero] = useState('otro');
  const [peso, setPeso] = useState(70);
  const [altura, setAltura] = useState(170);
  const [unidades, setUnidades] = useState('kg');
  const [notificaciones, setNotificaciones] = useState(true);
  const [temaOscuro, setTemaOscuro] = useState(true);

  const handleActualizarPerfil = () => {
    alert('Datos actualizados (simulado)');
  };

  const handleCerrarSesion = () => {
    alert('Sesión cerrada (simulado)');
  };

  return (
    <div className="ajustes-panel">
      <h2 className="ajustes-titulo">⚙️ Ajustes de tu cuenta</h2>

      {/* PERFIL */}
      <section className="ajustes-bloque">
        <h3>👤 Información de perfil</h3>
        <div className="formulario-ajustes">
          <label>Nombre</label>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} />

          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Género</label>
          <select value={genero} onChange={(e) => setGenero(e.target.value)}>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>

          <label>Peso (kg)</label>
          <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} />

          <label>Altura (cm)</label>
          <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} />

          <button onClick={handleActualizarPerfil}>Actualizar datos</button>
        </div>
      </section>

      {/* PREFERENCIAS */}
      <section className="ajustes-bloque">
        <h3>🛠️ Preferencias</h3>
        <div className="preferencias-ajustes">
          <label>Unidades</label>
          <select value={unidades} onChange={(e) => setUnidades(e.target.value)}>
            <option value="kg">Kilogramos (kg)</option>
            <option value="lbs">Libras (lbs)</option>
          </select>

          <label>
            <input
              type="checkbox"
              checked={notificaciones}
              onChange={() => setNotificaciones(!notificaciones)}
            />
            Recibir recordatorios de peso semanal
          </label>

          <label>
            <input
              type="checkbox"
              checked={temaOscuro}
              onChange={() => setTemaOscuro(!temaOscuro)}
            />
            Usar tema oscuro
          </label>
        </div>
      </section>

      {/* SEGURIDAD */}
      <section className="ajustes-bloque">
        <h3>🔐 Seguridad</h3>
        <div className="seguridad-ajustes">
          <button onClick={() => alert('Cambiar contraseña (simulado)')}>🔒 Cambiar contraseña</button>
          <button className="cerrar-sesion" onClick={handleCerrarSesion}>🔓 Cerrar sesión</button>
        </div>
      </section>
    </div>
  );
}

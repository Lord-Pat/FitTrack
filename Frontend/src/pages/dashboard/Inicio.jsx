import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/dashboard/inicio.css';
import { useState, useEffect } from 'react';

export default function Inicio() {
  const [userName, setUserName] = useState(''); // ← dinámico
  const [fraseAleatoria, setFraseAleatoria] = useState('');
  const [diasEntrenados, setDiasEntrenados] = useState([]);

  const frasesMotivadoras = [
    "Hoy es un gran día para mejorar 💥",
    "No pares hasta estar orgulloso.",
    "La constancia vence al talento.",
    "Entrena con cabeza, no con ego.",
    "Cada repetición te hace más fuerte 💪",
    "Tus límites están en tu mente.",
    "Un día más es un paso menos.",
    "Hazlo por ti, no por otros."
  ];

  const marcarDia = (date) => {
    const fecha = date.toDateString();
    if (diasEntrenados.includes(fecha)) {
      setDiasEntrenados(diasEntrenados.filter(d => d !== fecha));
    } else {
      setDiasEntrenados([...diasEntrenados, fecha]);
    }
  };

  useEffect(() => {
    const random = Math.floor(Math.random() * frasesMotivadoras.length);
    setFraseAleatoria(frasesMotivadoras[random]);

    // Obtener nombre de usuario
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/api/usuario/perfil', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.usuario?.nombre) {
            setUserName(data.usuario.nombre);
          }
        })
        .catch((err) => console.error('Error al cargar perfil:', err));
    }
  }, []);

  return (
    <div className="inicio-panel">
      {/* Saludo + frase */}
      <header className="inicio-encabezado">
        <h2>🏋️‍♂️ ¡Bienvenido de nuevo, {userName}!</h2>
        <p className="motivacion">{fraseAleatoria}</p>
      </header>

      {/* Tarjetas resumen */}
      <section className="dashboard-stats">
        <div className="stat-card">
          <div className="icon">📆</div>
          <div>
            <h4>Días entrenados este mes</h4>
            <p>{diasEntrenados.length} días</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="icon">💪</div>
          <div>
            <h4>Rutina más común</h4>
            <p>Pecho y tríceps</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="icon">👥</div>
          <div>
            <h4>Amigos activos</h4>
            <p>4 conectados</p>
          </div>
        </div>
      </section>

      {/* Acciones rápidas */}
      <section className="quick-actions">
        <h3>🚀 Acciones rápidas</h3>
        <div className="quick-buttons">
          <button>➕ Nueva rutina</button>
          <button>📈 Ver progreso</button>
          <button>⚙️ Ajustes</button>
        </div>
      </section>

      {/* Calendario */}
      <section className="dashboard-calendario">
        <h3>🗓️ Calendario de entrenamientos</h3>
        <div className="calendario-container">
          <Calendar
            onClickDay={marcarDia}
            tileClassName={({ date }) =>
              diasEntrenados.includes(date.toDateString()) ? 'entrenado' : null
            }
            maxDate={new Date()}
          />
        </div>
      </section>

      {/* Mapa general */}
      <section className="mapa-general">
        <h3>🧭 Explora la app</h3>
        <div className="mapa-grid">
          <button>📊 Progreso</button>
          <button>🏋️ Rutinas</button>
          <button>👥 Amigos</button>
          <button>⚙️ Ajustes</button>
        </div>
      </section>

      {/* Consejo del día */}
      <section className="dashboard-tip">
        💡 <em>Consejo del día:</em> "Disciplina es hacer lo que tienes que hacer incluso cuando no tienes ganas."
      </section>
    </div>
  );
}

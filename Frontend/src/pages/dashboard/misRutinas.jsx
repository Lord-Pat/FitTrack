import { useState, useEffect } from 'react';
import '../../styles/dashboard/misrutinas.css';

export default function MisRutinas() {
  const [rutinas, setRutinas] = useState(() => {
    const guardadas = localStorage.getItem('misRutinas');
    return guardadas ? JSON.parse(guardadas) : [];
  });

  const [nombre, setNombre] = useState('');
  const [grupo, setGrupo] = useState('');
  const [ejercicio, setEjercicio] = useState('');
  const [listaEjercicios, setListaEjercicios] = useState([]);

  const [expandedId, setExpandedId] = useState(null);

  const agregarEjercicio = () => {
    if (ejercicio.trim() !== '') {
      setListaEjercicios((prev) => [...prev, ejercicio.trim()]);
      setEjercicio('');
    }
  };

  const crearRutina = () => {
    if (!nombre || listaEjercicios.length === 0) return;
    const nuevaRutina = {
      id: Date.now(),
      nombre,
      grupo,
      ejercicios: listaEjercicios
    };
    const actualizadas = [...rutinas, nuevaRutina];
    setRutinas(actualizadas);
    localStorage.setItem('misRutinas', JSON.stringify(actualizadas));
    setNombre('');
    setGrupo('');
    setListaEjercicios([]);
  };

  return (
    <div className="mis-rutinas-panel">
      <h2 className="titulo-rutinas">📝 Mis Rutinas</h2>

      <section className="formulario-rutina">
        <h3>Crear nueva rutina</h3>
        <input
          type="text"
          placeholder="Nombre de la rutina"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Grupo muscular (opcional)"
          value={grupo}
          onChange={(e) => setGrupo(e.target.value)}
        />
        <div className="agregar-ejercicio">
          <input
            type="text"
            placeholder="Ejercicio"
            value={ejercicio}
            onChange={(e) => setEjercicio(e.target.value)}
          />
          <button onClick={agregarEjercicio}>+ Añadir</button>
        </div>
        <ul className="lista-ejercicios">
          {listaEjercicios.map((ej, i) => (
            <li key={i}>{ej}</li>
          ))}
        </ul>
        <button className="btn-crear" onClick={crearRutina}>
          Crear rutina
        </button>
      </section>

      <section className="rutinas-guardadas">
        {rutinas.map((rutina) => (
          <div className="rutina-card" key={rutina.id}>
            <div
              className="cabecera-card"
              onClick={() =>
                setExpandedId((prev) => (prev === rutina.id ? null : rutina.id))
              }
            >
              <h4>{rutina.nombre}</h4>
              {rutina.grupo && <span className="grupo">{rutina.grupo}</span>}
            </div>

            {expandedId === rutina.id && (
              <div className="contenido-card">
                <ul>
                  {rutina.ejercicios.map((ej, i) => (
                    <li key={i}>• {ej}</li>
                  ))}
                </ul>
                <button onClick={() => alert('Editar rutina próximamente')}>
                  ✏️ Modificar
                </button>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

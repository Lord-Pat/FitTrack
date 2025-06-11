import { useState } from 'react';
import '../../styles/dashboard/rutinas.css';

export default function Rutinas() {
  const grupos = ['Pecho', 'Espalda', 'Piernas', 'Brazos', 'Hombros', 'Core'];

  const ejerciciosMock = [
    {
      id: 1,
      nombre: 'Press Banca',
      grupo: 'Pecho',
      imagen: 'https://wger.de/media/exercise-images/14/Bench-press-1.gif'
    },
    {
      id: 2,
      nombre: 'Remo con barra',
      grupo: 'Espalda',
      imagen: 'https://wger.de/media/exercise-images/9/Barbell-bent-over-row-1.gif'
    },
    {
      id: 3,
      nombre: 'Sentadilla',
      grupo: 'Piernas',
      imagen: 'https://wger.de/media/exercise-images/2/Squat-1.gif'
    },
    {
      id: 4,
      nombre: 'Curl Bíceps',
      grupo: 'Brazos',
      imagen: 'https://wger.de/media/exercise-images/16/Biceps-curl-1.gif'
    },
    {
      id: 5,
      nombre: 'Elevaciones laterales',
      grupo: 'Hombros',
      imagen: 'https://wger.de/media/exercise-images/74/Lateral-raises-1.gif'
    },
    {
      id: 6,
      nombre: 'Crunch abdominal',
      grupo: 'Core',
      imagen: 'https://wger.de/media/exercise-images/45/Crunch-1.gif'
    }
  ];

  const [grupoSeleccionado, setGrupoSeleccionado] = useState('Pecho');

  const ejerciciosFiltrados = ejerciciosMock.filter(
    (ej) => ej.grupo === grupoSeleccionado
  );

  return (
    <div className="rutinas-panel">
      <h2 className="rutinas-titulo">🏋️ Ejercicios por grupo muscular</h2>

      <div className="selector-grupo">
        <label htmlFor="grupo">Selecciona grupo muscular:</label>
        <select
          id="grupo"
          value={grupoSeleccionado}
          onChange={(e) => setGrupoSeleccionado(e.target.value)}
        >
          {grupos.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div className="ejercicios-grid">
        {ejerciciosFiltrados.map((ej) => (
          <div className="ejercicio-card" key={ej.id}>
            <img src={ej.imagen} alt={ej.nombre} />
            <h4>{ej.nombre}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import '../../styles/dashboard/progreso.css';

export default function Progreso() {
  const ejerciciosMock = [
    {
      id: 1,
      nombre: 'Press Banca',
      datos: [
        { fecha: '2024-06-01', peso: 60 },
        { fecha: '2024-06-10', peso: 65 },
        { fecha: '2024-06-20', peso: 70 }
      ]
    },
    {
      id: 2,
      nombre: 'Sentadilla',
      datos: [
        { fecha: '2025-04-01', peso: 80 },
        { fecha: '2025-04-01', peso: 20 },
        { fecha: '2025-04-01', peso: 50 },
        { fecha: '2025-04-01', peso: 40 },
        { fecha: '2025-04-01', peso: 90 },
        { fecha: '2025-06-05', peso: 100 },
        { fecha: '2025-06-20', peso: 40 }
      ]
    }
  ];

  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(ejerciciosMock[0].id);
  const [datosEjercicio, setDatosEjercicio] = useState(ejerciciosMock[0].datos);
  const [rango, setRango] = useState('mes');

  useEffect(() => {
    const ejercicio = ejerciciosMock.find(e => e.id === Number(ejercicioSeleccionado));
    setDatosEjercicio(ejercicio?.datos || []);
  }, [ejercicioSeleccionado]);

  const filtrarPorRango = (datos) => {
    const ahora = new Date();
    let limite = new Date();

    if (rango === 'semana') {
      limite.setDate(ahora.getDate() - 7);
    } else if (rango === 'mes') {
      limite.setMonth(ahora.getMonth() - 1);
    } else if (rango === '3meses') {
      limite.setMonth(ahora.getMonth() - 3);
    }

    return datos.filter((d) => new Date(d.fecha) >= limite);
  };

  const datosFiltrados = filtrarPorRango(datosEjercicio);

  // PESO CORPORAL
const [pesos, setPesos] = useState(() => {
  const guardado = localStorage.getItem('registroPeso');
  return guardado ? JSON.parse(guardado) : [];
});

const [pesoInput, setPesoInput] = useState('');
const [fechaInput, setFechaInput] = useState(() =>
  new Date().toISOString().split('T')[0]
);

// Guarda nuevo peso
const registrarPeso = () => {
  if (!pesoInput) return;
  const nuevo = [...pesos, { fecha: fechaInput, peso: Number(pesoInput) }];
  nuevo.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  setPesos(nuevo);
  localStorage.setItem('registroPeso', JSON.stringify(nuevo));
  setPesoInput('');
};

// Última fecha registrada
const ultimaFecha = pesos.length ? pesos[pesos.length - 1].fecha : null;

// Verificar si han pasado más de 7 días
const mostrarRecordatorio = () => {
  if (!ultimaFecha) return true;
  const hoy = new Date();
  const ultima = new Date(ultimaFecha);
  const diferencia = (hoy - ultima) / (1000 * 60 * 60 * 24); // días
  return diferencia >= 7;
};


  return (
    <div className="progreso-panel">
      <h2 className="progreso-titulo">📊 Seguimiento de tu progreso</h2>

      {/* Peso corporal */}
      <section className="bloque-peso-corporal">
  <div className="peso-header">
    <h3>🧍 Evolución del peso corporal</h3>
    {mostrarRecordatorio() && (
      <p className="recordatorio-alerta">
        ⚠️ ¡Hace más de 7 días que no registras tu peso!
      </p>
    )}
  </div>

  <div className="peso-formulario">
    <input
      type="date"
      value={fechaInput}
      onChange={(e) => setFechaInput(e.target.value)}
    />
    <input
      type="number"
      placeholder="Peso (kg)"
      value={pesoInput}
      onChange={(e) => setPesoInput(e.target.value)}
    />
    <button onClick={registrarPeso}>Guardar</button>
  </div>

  <div className="chart-placeholder" style={{ height: '300px' }}>
    {pesos.length > 0 ? (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={pesos}>
          <CartesianGrid stroke="#333" strokeDasharray="3 3" />
          <XAxis
            dataKey="fecha"
            scale="band"
            stroke="#ccc"
            tickFormatter={(date) =>
              new Date(date).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'short'
              })
            }
          />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f1f1f',
              border: '1px solid #444',
              borderRadius: '8px',
              color: '#00ffb3'
            }}
            labelStyle={{ color: '#fff' }}
          />
          <Area
            type="monotone"
            dataKey="peso"
            stroke="none"
            fill="rgba(0, 255, 179, 0.1)"
          />
          <Line
            type="monotone"
            dataKey="peso"
            stroke="#00ffb3"
            strokeWidth={3}
            dot={{
              r: 5,
              stroke: '#00ffb3',
              strokeWidth: 2,
              fill: '#1f1f1f'
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    ) : (
      <p style={{ textAlign: 'center' }}>Aún no has registrado peso.</p>
    )}
  </div>
</section>


      {/* Selector de ejercicio + evolución */}
      <section className="bloque-ejercicio">
        <div className="bloque-ejercicio-header">
          <h3>🏋️ Mejora por ejercicio</h3>
          <div className="filtros-tiempo">
            <button onClick={() => setRango('semana')}>Semana</button>
            <button onClick={() => setRango('mes')}>Mes</button>
            <button onClick={() => setRango('3meses')}>3 meses</button>
          </div>
        </div>

        <div className="selector-ejercicio">
          <label htmlFor="ejercicio">Selecciona un ejercicio:</label>
          <select
            id="ejercicio"
            value={ejercicioSeleccionado}
            onChange={(e) => setEjercicioSeleccionado(Number(e.target.value))}
          >
            {ejerciciosMock.map((ej) => (
              <option key={ej.id} value={ej.id}>
                {ej.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="chart-placeholder" style={{ height: '300px' }}>
          {datosFiltrados.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={datosFiltrados}>
                <CartesianGrid stroke="#333" strokeDasharray="3 3" />
                <XAxis dataKey="fecha" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f1f1f',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    color: '#00ffb3'
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Area
                  type="basis"
                  dataKey="peso"
                  stroke="none"
                  fill="rgba(0, 255, 179, 0.1)"
                />
                <Line
                  type="basis"
                  dataKey="peso"
                  stroke="#00ffb3"
                  strokeWidth={3}
                  dot={{
                    r: 5,
                    stroke: '#00ffb3',
                    strokeWidth: 2,
                    fill: '#1f1f1f'
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ textAlign: 'center' }}>No hay datos en este rango de tiempo.</p>
          )}
        </div>
      </section>

      {/* Ranking con amigos */}
      <section className="bloque-ranking">
        <h3>🏆 Ranking con tus amigos</h3>
        <div className="chart-placeholder">
          <p>Gráfico comparativo por ejercicio o peso máximo</p>
        </div>
      </section>
    </div>
  );
}
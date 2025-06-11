import { useSearchParams, useNavigate } from 'react-router-dom'; // ← Añadido useNavigate
import { useState } from 'react';
import '../styles/resetPassword.css'

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get('token');
  const navigate = useNavigate(); // ← Inicializar navegación

  const [nueva, setNueva] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nueva !== confirmar) {
      return setError('Las contraseñas no coinciden');
    }

    try {
      const res = await fetch('http://localhost:3000/api/auth/resetear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, nueva }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.mensaje || 'Error al cambiar la contraseña');

      setMensaje('✅ Contraseña actualizada correctamente');
      setError('');

      // 🔁 Redirigir al login tras 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError(err.message);
      setMensaje('');
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-card">
        <h2>Restablecer contraseña</h2>
        <form onSubmit={handleSubmit} className="reset-form">
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={nueva}
            onChange={(e) => setNueva(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            required
          />
          <button type="submit">Actualizar contraseña</button>
        </form>

        {mensaje && <p className="success-msg">{mensaje}</p>}
        {error && <p className="error-msg">{error}</p>}
      </div>
    </div>
  );
}

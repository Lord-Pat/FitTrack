import '../styles/ForgotPassword.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/auth/recuperar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.mensaje || 'Error al enviar el correo.');

      setMensaje('✅ Correo de recuperación enviado. Revisa tu bandeja de entrada o la consola.');
      setError('');
    } catch (err) {
      setError(err.message);
      setMensaje('');
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <h2>¿Olvidaste tu contraseña?</h2>
        <p className="subtitle">Ingresa tu correo electrónico y te enviaremos un enlace para restablecerla.</p>

        <form className="forgot-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="forgot-btn">Enviar enlace</button>
        </form>

        {mensaje && <p className="success-msg">{mensaje}</p>}
        {error && <p className="error-msg">{error}</p>}

        <p className="back-to-login">
          <Link to="/login">← Volver al inicio de sesión</Link>
        </p>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import '../styles/Landing.css';
import { Link } from 'react-router-dom';


export default function Landing() {
  // Refs para Hero (animación al cargar)
  const titleRef = useRef();
  const textRef = useRef();
  const buttonRef = useRef();
  const [isLightMode, setIsLightMode] = useState(false);

  const toggleTheme = () => {
    setIsLightMode((prev) => !prev);
  };

  // Refs para beneficios (animación al hacer scroll)
  const benefitRefs = useRef([]);

  useEffect(() => {
    // Hero animación al cargar
    gsap.set([titleRef.current, textRef.current, buttonRef.current], { opacity: 0, y: 30 });
  
    gsap.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.2,
    });
  
    gsap.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.4,
    });
  
    gsap.to(buttonRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.6,
    });
  
    // Nueva animación al cargar para los beneficios
    gsap.set(benefitRefs.current, { opacity: 0, y: 30 });
  
    gsap.to(benefitRefs.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.8,
      stagger: 0.2,
    });
  }, []);
  

  return (
    <div className={`landing ${isLightMode ? 'light' : ''}`}>
      <header className="landing-header">
        <h1>GymTrack</h1>
        <nav>
          <Link to="/login">Iniciar Sesión</Link>
          <Link to="/register">Registrarse</Link>
          <button onClick={toggleTheme} className="theme-toggle">
            {isLightMode ? 'Modo oscuro 🌙' : 'Modo claro ☀️'}
          </button>
        </nav>
      </header>

      <section className="landing-hero">
        <h2 ref={titleRef}>Transforma tu cuerpo. Transforma tu vida.</h2>
        <p ref={textRef}>
          La plataforma definitiva para llevar control de tus entrenamientos,
          progreso y salud.
        </p>
        <Link to="/register" className="cta-btn" ref={buttonRef}>
          Empieza Gratis
        </Link>
      </section>

      <section className="landing-benefits">
        <h3 className="benefits-title gradient-animated">¿Por qué elegir GymTrack?</h3>
        <div className="benefits-list">
          {[
            {
              emoji: '💪',
              title: 'Control total',
              desc: 'Registra tus rutinas, repeticiones y progresos día a día.',
            },
            {
              emoji: '📊',
              title: 'Estadísticas visuales',
              desc: 'Visualiza tu evolución con gráficos y comparativas reales.',
            },
            {
              emoji: '📱',
              title: 'Acceso móvil',
              desc: 'Tu progreso desde cualquier dispositivo, en cualquier momento.',
            },
          ].map((b, i) => (
            <div
              className="benefit"
              key={i}
              ref={(el) => (benefitRefs.current[i] = el)}
            >
              <span>{b.emoji}</span>
              <h4>{b.title}</h4>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="landing-social">
        <h3 className="social-title gradient-animated">Motívate con tu comunidad</h3>
        <div className="social-features">
          <div className="feature-box">
            <span className="emoji">🗨️</span>
            <h4>Chat en tiempo real</h4>
            <p>Conversa con tus amigos, comparte entrenamientos y mantente motivado cada día.</p>
          </div>
          <div className="feature-box">
            <span className="emoji">🏆</span>
            <h4>Ranking competitivo</h4>
            <p>Compite en retos semanales y mira tu posición frente a tus amigos y la comunidad global.</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} GymTrack. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="#">Política de privacidad</a>
          <a href="#">Contacto</a>
          <a href="#">Instagram</a>
        </div>
      </footer>
    </div>
  );
}

import { Outlet, NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import {
  MdDashboard,
  MdShowChart,
  MdFitnessCenter,
  MdPeople,
  MdSettings,
} from 'react-icons/md';
import '../../styles/dashboard/dashboard.css';

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const menuRef = useRef(null);
  const containerRef = useRef(null);

  // 🔐 Obtener usuario autenticado al cargar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:3000/api/usuario/perfil', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.usuario) {
          setUsuario(data.usuario);
          localStorage.setItem('nombreUsuario', data.usuario.nombre); // 👈 para usarlo en otras pantallas
        }
      })
      .catch(err => {
        console.error('Error al obtener usuario:', err);
      });
  }, []);

  // Cierra dropdown si clicas fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-dropdown')) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 🔁 Cierra sidebar si clicas fuera
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        sidebarOpen &&
        containerRef.current &&
        !e.target.closest('.sidebar') &&
        !e.target.closest('.sidebar-toggle')
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [sidebarOpen]);

  return (
    <div
      ref={containerRef}
      className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : ''}`}
    >
      <aside className="sidebar">
        <nav>
          <NavLink to="/dashboard" end>
            <MdDashboard /> <span>Inicio</span>
          </NavLink>
          <NavLink to="/dashboard/progreso">
            <MdShowChart /> <span>Progreso</span>
          </NavLink>
          <NavLink to="/dashboard/rutinas">
            <MdFitnessCenter /> <span>Ejercicios</span>
          </NavLink>
          <NavLink to="/dashboard/misrutinas">
            <MdFitnessCenter /> <span>Mis rutinas</span>
          </NavLink>
          <NavLink to="/dashboard/amigos">
            <MdPeople /> <span>Amigos</span>
          </NavLink>
          <NavLink to="/dashboard/chat">
            💬 <span>Chat</span>
          </NavLink>
          <NavLink to="/dashboard/ajustes">
            <MdSettings /> <span>Ajustes</span>
          </NavLink>
        </nav>
      </aside>

      <div className="dashboard-content">
        <header className="topbar">
          <div className="left-top">
            <button
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars />
            </button>
            <h2 className="topbar-title">GymTrack</h2>
          </div>

          <div className="user-dropdown" ref={menuRef}>
            <button
              className="user-icon"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <FaUserCircle size={26} />
            </button>
            {menuOpen && (
              <div className="dropdown-menu">
                <NavLink to="/dashboard/ajustes" onClick={() => setMenuOpen(false)}>
                  ⚙️ Ajustes
                </NavLink>
                <button onClick={() => alert('Función de avatar próximamente')}>
                  🧍 Cambiar avatar
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('nombreUsuario'); // 👈 limpiar nombre también
                    window.location.href = '/login';
                  }}
                >
                  🔓 Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="main-panel">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

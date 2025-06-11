import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/resetPassword';

// Dashboard layout y vistas internas
import Dashboard from '../pages/dashboard/Dashboard';
import Inicio from '../pages/dashboard/Inicio';
import Rutinas from '../pages/dashboard/Rutinas';
import Progreso from '../pages/dashboard/Progreso';
import Perfil from '../pages/dashboard/Ajustes';
import Amigos from '../pages/dashboard/Amigos';
import Chat from '../pages/dashboard/chat';
import MisRutinas from '../pages/dashboard/MisRutinas';
console.log('AppRoutes renderizado');


export default function AppRoutes() {
  return (

    <Routes>
      {/* públicas */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/resetPassword" element={<ResetPassword />} />

      {/* privadas */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Inicio />} />
        <Route path="rutinas" element={<Rutinas />} />
        <Route path="misrutinas" element={<MisRutinas />} />
        <Route path="progreso" element={<Progreso />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="amigos" element={<Amigos />} />
        <Route path="chat" element={<Chat />} />
      </Route>
    </Routes>
  );
}
console.log('Dashboard layout cargado');

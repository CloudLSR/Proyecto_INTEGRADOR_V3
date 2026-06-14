import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Registro from './Registro';
import CambiarPassword1 from './CambiarPassword1';
import CambiarPassword2 from './CambiarPassword2';
import CambiarPassword3 from './CambiarPassword3';
import CambiarPassword4 from './CambiarPassword4';
import Perfil from './Perfil';
import AdminMenu from './AdminMenu';
// Productos
import Productos from './Productos';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/"          element={<App />} />
      <Route path="/login"     element={<Login />} />
      <Route path="/registro"  element={<Registro />} />
      <Route path="/perfil"    element={<Perfil />} />
      <Route path="/cambiar-password-1" element={<CambiarPassword1 />} />
      <Route path="/cambiar-password-2" element={<CambiarPassword2 />} />
      {/* FIX: CambiarPassword3 acepta ?token=XXX en la URL (enlace del correo) */}
      <Route path="/cambiar-password-3" element={<CambiarPassword3 />} />
      <Route path="/cambiar-password-4" element={<CambiarPassword4 />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/adminmenu" element={<AdminMenu />} />
    </Routes>
  </BrowserRouter>
);
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from './Layout';
import './Stylee.css';
import casaRosaImg from './assets/casa_Rosa.png';
import edificioRosaImg from './assets/edificioRosa.png';
import carroRosaImg from './assets/carroRosa.png';
import footer1Img from './assets/footer_1.png';
import footer2Img from './assets/footer_2.png';
import footer3Img from './assets/footer_3.png';

function DireccionEnvio() {
    const navigate = useNavigate();
    const [seleccionada, setSeleccionada] = useState(1);

    const direcciones = [
    {
        id: 1,
        tipo: 'Casa',
        principal: true,
        icono: casaRosaImg,
        calle: 'Av. Los Rosales 123',
        ciudad: 'San Borja, Lima - Lima',
        referencia: 'Referencia: Frente al parque, casa blanca con reja negra',
    },
    {
        id: 2,
        tipo: 'Trabajo',
        principal: false,
        icono: edificioRosaImg,
        calle: 'Calle Las Flores 456, Oficina 501',
        ciudad: 'Miraflores, Lima - Lima',
        referencia: 'Referencia: Edificio Corporativo, Ingreso por recepción',
    },
    {
        id: 3,
        tipo: 'Casa de Mamá',
        principal: false,
        icono: casaRosaImg,
        calle: 'Jr. Los Jazmines 789',
        ciudad: 'Surco, Lima - Lima',
        referencia: 'Referencia: Casa de 2 pisos color beige',
    },
    ];
  
    return (

    <div style={{ backgroundColor: '#FFF0F2', fontFamily: "'Segoe UI', sans-serif", color: '#4A3E3F' }}>
        <Header />

        <main className="cart-page-container">

        {/* ══ Bienvenida ══ */}
        <div className="cart-welcome-header">
            <img src="/assets/products/logo.png" alt="Sweet Cream Rose" className="cart-circle-logo"
                onError={e => e.target.style.display = 'none'} />
            <p className="cart-welcome-text">Tu espacio personal para organizar tus pedidos, favoritos y disfrutar de una experiencia más dulce.</p>
        </div>

        {/* ══ Título ══ */}
        <h2 className="cart-main-title">SELECCIONA TU DIRECCIÓN</h2>
        <div className="title-divider"><span>--- ♥️ ---</span></div>
        <p className="direccion-subtitle">Elige la dirección donde deseas recibir tu pedido</p>

        {/* ══ Lista de direcciones ══ */}
        <div className="direcciones-lista">
            {direcciones.map(dir => (
            <div
                key={dir.id}
                className={`direccion-card ${seleccionada === dir.id ? 'direccion-card-activa' : ''}`}
                onClick={() => setSeleccionada(dir.id)}
            >
              {/* Radio */}
                <div className="direccion-radio">
                <div className={`radio-circle ${seleccionada === dir.id ? 'radio-activo' : ''}`} />
                </div>

              {/* Ícono */}
                <img src={dir.icono} alt={dir.tipo} className="direccion-icono" />

              {/* Info */}
                <div className="direccion-info">
                <div className="direccion-tipo-row">
                    <span className="direccion-tipo">{dir.tipo}</span>
                    {dir.principal && <span className="badge-principal">Principal</span>}
                </div>
                <span className="direccion-calle">{dir.calle}</span>
                <span className="direccion-ciudad">{dir.ciudad}</span>
                <span className="direccion-referencia">{dir.referencia}</span>
                </div>

              {/* Badge seleccionada */}
                {seleccionada === dir.id && (
                    <span className="badge-seleccionada">Seleccionada</span>
                )}
            </div>
            ))}
        </div>

        {/* ══ ¿No ves la dirección? ══ */}
        <div className="direccion-no-ves">
            <i className="fas fa-truck" style={{ color: '#b86b6b', fontSize: '1.4rem' }}></i>
            <div>
            <p className="no-ves-titulo">¿No ves la dirección que necesitas?</p>
            <p className="no-ves-texto">Puedes administrarlas desde tu perfil</p>
            </div>
            <span className="no-ves-link" onClick={() => navigate('/perfil')}>
            Ir a mi perfil →
            </span>
        </div>

        {/* ══ Botones ══ */}
        <div className="direccion-botones">
            <button className="btn-usar-direccion" onClick={() => navigate('/carrito')}>
                USA ESTA DIRECCIÓN
            </button>
            <button className="btn-cancelar-direccion" onClick={() => navigate('/carrito')}>
                CANCELAR
            </button>
        </div>

        {/* ══ Íconos footer info ══ */}
        <div className="footer-info-row">
            <div className="footer-info-item">
                <img src="./assets/footer_1.png" alt="" onError={e => e.target.style.display = 'none'} />
                <span>Ingredientes de primera calidad</span>
            </div>
            <div className="footer-info-item">
                <img src="/assets/footer_2.png" alt="" onError={e => e.target.style.display = 'none'} />
                <span>Hecho con amor en cada detalle</span>
            </div>
            <div className="footer-info-item">
                <img src="/assets/footer_3.png" alt="" onError={e => e.target.style.display = 'none'} />
                <span>Envíos seguros y rápidos</span>
            </div>
            <div className="footer-info-item">
                <img src="/assets/footer_4.png" alt="" onError={e => e.target.style.display = 'none'} />
                <span>Atención personalizada para ti</span>
            </div>
        </div>

        </main>

        <Footer />
    </div>
  );
}

export default DireccionEnvio;
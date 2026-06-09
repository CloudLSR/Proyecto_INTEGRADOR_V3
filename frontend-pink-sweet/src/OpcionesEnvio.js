import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from './Layout';
import './Stylee.css';
import ubicacionImg from './assets/ubicación.png';
import motoRosaImg from './assets/motoRosa.png';
import motoRosa2Img from './assets/motoRosa_2.png';
import configuracionImg from './assets/configuracion_cuadradoRosa.png';
import alertaImg from './assets/productos_agregarProducto_Alerta.png';
import relojImg from './assets/perfil_relojRosa.png';
import footer1Img from './assets/footer_1.png';
import footer2Img from './assets/footer_2.png';
import footer3Img from './assets/footer_3.png';

function OpcionesEnvio() {
    const navigate = useNavigate();
    const [seleccionada, setSeleccionada] = useState(1);

    const opciones = [
        {
            id: 1,
            icono: motoRosaImg,
            titulo: 'Entrega estándar',
            desc: 'Recibe tu pedido de forma rápida y segura.',
            tiempo: '45 - 90 minutos',
            precio: 'S/ 8.00',
            badge: 'Ideal para la mayoría de pedidos',
            badgeColor: '#b86b6b',
        },
        {
            id: 2,
            icono: motoRosa2Img,
            titulo: 'Entrega express',
            desc: 'Prioridad en preparación y envío. Recibe tu pedido lo antes posible.',
            tiempo: '30 - 60 minutos',
            precio: 'S/ 12.00',
            badge: 'Lo más rápido disponible',
            badgeColor: '#b86b6b',
        },
        {
            id: 3,
            icono: configuracionImg,
            titulo: 'Recojo en tienda',
            desc: 'Recoge tu pedido en nuestro local sin costo adicional.',
            tiempo: '20 - 40 minutos',
            precio: 'GRATIS',
            badge: 'Sin costo de envío',
            badgeColor: '#27ae60',
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
        <h2 className="cart-main-title">OPCIONES DE ENVÍO</h2>
        <div className="title-divider"><span>--- ♥️ ---</span></div>
        <p className="direccion-subtitle">Elige la opción de envío que mejor se adapte a ti</p>

        {/* ══ Dirección actual ══ */}
        <div className="envio-direccion-box">
            <img src={ubicacionImg} alt="ubicacion" style={{ width: 28, height: 28, objectFit: 'contain', flexShrink: 0 }} />
            <div className="envio-direccion-info">
                <span className="envio-direccion-titulo">Enviar a:</span>
                <span className="envio-direccion-calle">Av. Los Rosales 123</span>
                <span className="envio-direccion-ciudad">San Borja, Lima - Lima</span>
                <span className="envio-direccion-ref">Referencia: Frente al parque, casa blanca con reja negra</span>
            </div>
            <span className="envio-cambiar-link" onClick={() => navigate('/direccion-envio')}>
                Cambiar dirección
            </span>
        </div>

        {/* ══ Opciones de envío ══ */}
        <div className="direcciones-lista">
            {opciones.map(op => (
                <div
                    key={op.id}
                    className={`direccion-card ${seleccionada === op.id ? 'direccion-card-activa' : ''}`}
                    onClick={() => setSeleccionada(op.id)}
                >
                  {/* Radio */}
                    <div className="direccion-radio">
                        <div className={`radio-circle ${seleccionada === op.id ? 'radio-activo' : ''}`} />
                    </div>
                
                  {/* Ícono */}
                    <img src={op.icono} alt={op.titulo} className="direccion-icono" />
                
                  {/* Info */}
                    <div className="direccion-info">
                        <span className="direccion-tipo">{op.titulo}</span>
                        <span className="direccion-calle">{op.desc}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                            <img src={relojImg} alt="tiempo" style={{ width: 14, height: 14 }} />
                            <span className="direccion-referencia">{op.tiempo}</span>
                        </div>
                    </div>
                
                  {/* Precio + badge */}
                    <div className="envio-precio-col">
                        <span className="envio-precio" style={{ color: op.badgeColor }}>{op.precio}</span>
                        <span className="envio-badge" style={{ color: op.badgeColor }}>{op.badge}</span>
                    </div>
                </div>
            ))}
        </div>

        {/* ══ Aviso ══ */}
        <div className="envio-aviso">
            <img src={alertaImg} alt="aviso" style={{ width: 24, height: 24, flexShrink: 0 }} />
            <span>Los tiempos son estimados y pueden variar ligeramente según la demanda y la ubicación</span>
        </div>

        {/* ══ Botones ══ */}
        <div className="direccion-botones">
            <button className="btn-usar-direccion" onClick={() => navigate('/carrito')}>
                APLICAR ENVÍO<br />
                <span style={{ fontSize: '0.8rem', fontWeight: 400 }}>y volver al carrito</span>
            </button>
            <button className="btn-cancelar-direccion" onClick={() => navigate('/carrito')}>
                CANCELAR
            </button>
        </div>

        {/* ══ Footer info ══ */}
        <div className="footer-info-row">
            <div className="footer-info-item">
                <img src={footer1Img} alt="" />
                <span>Ingredientes de primera calidad</span>
            </div>
            <div className="footer-info-item">
                <img src={footer2Img} alt="" />
                <span>Hecho con amor en cada detalle</span>
            </div>
            <div className="footer-info-item">
                <img src={footer3Img} alt="" />
                <span>Envíos seguros y rápidos</span>
            </div>
            <div className="footer-info-item">

                <span>Atención personalizada para ti</span>
            </div>
        </div>

        </main>

        <Footer />
    </div>
    );
}

export default OpcionesEnvio;
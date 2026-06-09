import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from './Layout';
import './Stylee.css';
import footer1Img from './assets/footer_1.png';
import footer2Img from './assets/footer_2.png';
import footer3Img from './assets/footer_3.png';

function PedidoConfirmado() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#FFF0F2', fontFamily: "'Segoe UI', sans-serif", color: '#4A3E3F' }}>
      <Header />

      <main className="cart-page-container">

        {/* ══ Bienvenida ══ */}
        <div className="cart-welcome-header">
          <img src="/assets/products/logo.png" alt="Sweet Cream Rose" className="cart-circle-logo"
            onError={e => e.target.style.display = 'none'} />
          <p className="cart-welcome-text" style={{ fontStyle: 'italic', color: '#b86b6b' }}>
            Gracias por tu compra
          </p>
        </div>

        {/* ══ Título ══ */}
        <h2 className="cart-main-title">¡TU PEDIDO HA SIDO CONFIRMADO!</h2>
        <div className="title-divider"><span>--- ♥️ ---</span></div>
        <p className="direccion-subtitle">Hemos recibido tu pedido correctamente</p>

        {/* ══ Número de pedido ══ */}
        <div className="pedido-numero-box">
          <div className="pedido-numero-icono-placeholder" />
          <div className="pedido-numero-info">
            <span className="pedido-numero-label">NÚMERO DE PEDIDO</span>
            <span className="pedido-numero">#SRC-2026-0158</span>
            <span className="pedido-numero-fecha">10 de mayo de 2024 · 11:45 a.m.</span>
          </div>
        </div>
        <p className="direccion-subtitle">
          Te enviaremos actualizaciones a tu correo y número de contacto
        </p>

        {/* ══ Resumen del pedido ══ */}
        <section className="confirmar-seccion">
          <div className="confirmar-seccion-titulo">
            <div className="confirmar-icono-placeholder" />
            <span>RESUMEN DEL PEDIDO</span>
          </div>
          <div className="confirmar-tabla">
            <div className="confirmar-fila">
              <span>Subtotal (3 productos)</span>
              <span></span>
              <span className="confirmar-precio">S/35.00</span>
            </div>
            <div className="confirmar-fila">
              <span>Envío (Envío express)</span>
              <span></span>
              <span className="confirmar-precio">S/18.00</span>
            </div>
            <div className="confirmar-fila">
              <span>IGV (18%)</span>
              <span></span>
              <span className="confirmar-precio">S/28.00</span>
            </div>
            <div className="confirmar-fila confirmar-total">
              <span>TOTAL PAGADO</span>
              <span></span>
              <span>S/110.82</span>
            </div>
          </div>
        </section>

        {/* ══ Detalles de entrega ══ */}
        <section className="confirmar-seccion">
          <div className="confirmar-seccion-titulo">
            <div className="confirmar-icono-placeholder" />
            <span>DETALLES DE ENTREGA</span>
          </div>
          <div className="confirmar-tabla">
            <div className="confirmar-fila-col">
              <span className="confirmar-label">Dirección:</span>
              <span>Av. Los Rosales 123</span>
              <span>San Borja, Lima - Lima</span>
              <span style={{ color: '#999', fontSize: '0.8rem' }}>
                <strong>Referencia:</strong> Frente al parque, casa blanca con reja negra
              </span>
            </div>
            <div className="confirmar-fila-col" style={{ marginTop: 8 }}>
              <span className="confirmar-label">Método de envío:</span>
              <span>Envío express (30-60 minutos)</span>
            </div>
          </div>
        </section>

        {/* ══ Comprobante emitido ══ */}
        <section className="confirmar-seccion">
          <div className="confirmar-seccion-titulo">
            <div className="confirmar-icono-placeholder" />
            <span>COMPROBANTE EMITIDO</span>
          </div>
          <div className="confirmar-tabla">
            <div className="confirmar-fila">
              <span className="confirmar-label">Tipo de comprobante:</span>
              <span></span>
              <span>Factura (para empresa)</span>
            </div>
            <div className="confirmar-fila">
              <span className="confirmar-label">Razón social:</span>
              <span></span>
              <span>Inversiones Dulces S.A.C.</span>
            </div>
            <div className="confirmar-fila">
              <span className="confirmar-label">RUC:</span>
              <span></span>
              <span>20123456789</span>
            </div>
            <div className="pedido-factura-aviso">
              <div className="confirmar-icono-placeholder" style={{ width: 20, height: 20 }} />
              <span>Tu factura ha sido generada correctamente. Puedes descargarla o también la hemos enviado a tu correo electrónico</span>
              <button className="btn-descargar-factura">⬇ DESCARGAR FACTURA</button>
            </div>
          </div>
        </section>

        {/* ══ Método de pago ══ */}
        <section className="confirmar-seccion">
          <div className="confirmar-seccion-titulo">
            <div className="confirmar-icono-placeholder" />
            <span>MÉTODO DE PAGO</span>
          </div>
          <div className="confirmar-fila">
            <span>Yape</span>
            <span></span>
            <span style={{ color: '#888', fontSize: '0.85rem' }}>Pago realizado de forma rápida y segura.</span>
          </div>
        </section>

        {/* ══ Tu compra protegida ══ */}
        <div className="pedido-protegido-box">
          <div className="confirmar-icono-placeholder" style={{ width: 36, height: 36, borderRadius: '50%' }} />
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.88rem', color: '#4A3E3F' }}>Tu compra será 100% protegida</p>
            <p style={{ fontSize: '0.8rem', color: '#888' }}>Usamos tecnología de encriptación avanzada para proteger tu información.</p>
          </div>
        </div>

        {/* ══ Botones ══ */}
        <div className="pedido-botones">
          <button className="btn-ver-pedidos" onClick={() => navigate('/perfil')}>
            VER MIS PEDIDOS
          </button>
          <button className="btn-ir-inicio" onClick={() => navigate('/')}>
            IR AL INICIO
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
            {/* icono pendiente */}
            <span>Atención personalizada para ti</span>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default PedidoConfirmado;
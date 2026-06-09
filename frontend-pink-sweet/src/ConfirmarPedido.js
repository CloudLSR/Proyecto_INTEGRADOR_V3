import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from './Layout';
import './Stylee.css';
import footer1Img from './assets/footer_1.png';
import footer2Img from './assets/footer_2.png';
import footer3Img from './assets/footer_3.png';

function ConfirmarPedido() {
  const navigate = useNavigate();

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
        <h2 className="cart-main-title">CONFIRMA TU PEDIDO</h2>
        <div className="title-divider"><span>--- ♥️ ---</span></div>
        <p className="direccion-subtitle">Revisa los detalles de tu pedido antes de pagar</p>

        {/* ══ 1. Resumen del pedido ══ */}
        <section className="confirmar-seccion">
          <div className="confirmar-seccion-titulo">
            <div className="confirmar-icono-placeholder" />
            <span>1. RESUMEN DEL PEDIDO</span>
          </div>
          <div className="confirmar-tabla">
            <div className="confirmar-fila">
              <span>Torta de Chocolate Intenso</span>
              <span className="confirmar-qty">x1</span>
              <span className="confirmar-precio">S/.35,00</span>
            </div>
            <div className="confirmar-fila">
              <span>Cupcake de Arándanos</span>
              <span className="confirmar-qty">x2</span>
              <span className="confirmar-precio">S/.18,00</span>
            </div>
            <div className="confirmar-fila">
              <span>Tequeños de queso (caja x6)</span>
              <span className="confirmar-qty">x1</span>
              <span className="confirmar-precio">S/.28,00</span>
            </div>
            <div className="confirmar-fila confirmar-subtotal">
              <span>Subtotal (3 productos)</span>
              <span></span>
              <span>S/.81,00</span>
            </div>
          </div>
        </section>

        {/* ══ 2. Envío ══ */}
        <section className="confirmar-seccion">
          <div className="confirmar-seccion-titulo">
            <div className="confirmar-icono-placeholder" />
            <span>2. Envío</span>
          </div>
          <div className="confirmar-tabla">
            <div className="confirmar-fila-col">
              <span className="confirmar-label">Dirección de entrega:</span>
              <span>Av. Los Rosales 123</span>
              <span>San Borja, Lima - Lima</span>
              <span style={{ color: '#999', fontSize: '0.8rem' }}>Referencia: Frente al parque, casa blanca con reja negra</span>
            </div>
            <div className="confirmar-fila">
              <span className="confirmar-label">Método de envío:</span>
              <span></span>
              <span></span>
            </div>
            <div className="confirmar-fila">
              <span>Envío express (30-60 minutos)</span>
              <span></span>
              <span className="confirmar-precio">S/.12,00</span>
            </div>
          </div>
        </section>

        {/* ══ 3. Comprobante de pago ══ */}
        <section className="confirmar-seccion">
          <div className="confirmar-seccion-titulo">
            <div className="confirmar-icono-placeholder" />
            <span>3. Comprobante de pago</span>
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
          </div>
        </section>

        {/* ══ 4. Método de pago ══ */}
        <section className="confirmar-seccion">
          <div className="confirmar-seccion-titulo">
            <div className="confirmar-icono-placeholder" />
            <span>4. Método de pago</span>
          </div>
          <div className="confirmar-tabla">
            <div className="confirmar-fila">
              <span>Yape</span>
              <span></span>
              <span style={{ color: '#888', fontSize: '0.85rem' }}>Paga de forma rápida y segura con yape</span>
            </div>
          </div>
        </section>

        {/* ══ 5. Resumen de pago ══ */}
        <section className="confirmar-seccion">
          <div className="confirmar-seccion-titulo">
            <div className="confirmar-icono-placeholder" />
            <span>5. Resumen de pago</span>
          </div>
          <div className="confirmar-tabla">
            <div className="confirmar-fila">
              <span>Subtotal (3 productos)</span>
              <span className="confirmar-qty">x1</span>
              <span className="confirmar-precio">S/.81,00</span>
            </div>
            <div className="confirmar-fila">
              <span>Envío (Envío express)</span>
              <span className="confirmar-qty">x2</span>
              <span className="confirmar-precio">S/.12,00</span>
            </div>
            <div className="confirmar-fila">
              <span>IGV (18%)</span>
              <span className="confirmar-qty">x1</span>
              <span className="confirmar-precio">S/.17,82</span>
            </div>
            <div className="confirmar-fila confirmar-total">
              <span>TOTAL</span>
              <span></span>
              <span>S/.110,82</span>
            </div>
          </div>
        </section>

        {/* ══ Botón confirmar ══ */}
        <div className="confirmar-botones">
          <button className="btn-confirmar-pagar" onClick={() => alert('¡Pedido confirmado!')}>
            CONFIRMAR Y PAGAR
          </button>
          <p className="confirmar-seguro">
            🛡️ Tus datos y pagos están 100% protegidos.
          </p>
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

export default ConfirmarPedido;
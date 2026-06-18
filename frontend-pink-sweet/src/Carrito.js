// Carrito.js — Página de CARRITO
// CORRECCIONES:
// 1. El carrito carga del backend con el token. Sin token → vacío.
// 2. Los métodos de pago son SOLO: Tarjeta de banco y Yape (según lo requerido).
// 3. Al confirmar el pago, se crea la orden en el backend con estado PENDIENTE.
// 4. Se muestra pantalla de "PAGO EXITOSO" con resumen del pedido.
// 5. La orden queda en perfil > Mis Pedidos como PENDIENTE hasta que el admin la cambie.

import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const ENVIO = 8.00;

// Solo los dos métodos de pago requeridos
const METODOS_PAGO = [
  {
    valor: 'Tarjeta',
    icono: '💳',
    etiqueta: 'Tarjeta de banco',
    descripcion: 'Visa, Mastercard, American Express',
  },
  {
    valor: 'Yape',
    icono: '📱',
    etiqueta: 'Yape',
    descripcion: 'Paga con tu aplicación Yape',
  },
];

function Carrito({ setPage, onCartUpdate }) {
  // ── Estado principal ────────────────────────────────────────────────────
  const [items, setItems]             = useState([]);
  const [cargando, setCargando]       = useState(true);
  const [comprobante, setComprobante] = useState('boleta');
  const [comentario, setComentario]   = useState('');

  // ── Modal de pago ────────────────────────────────────────────────────────
  const [mostrarModal, setMostrarModal]     = useState(false);
  const [metodoPago, setMetodoPago]         = useState('Tarjeta');
  const [pagando, setPagando]               = useState(false);
  const [pagoConfirmado, setPagoConfirmado] = useState(false);
  const [ordenConfirmada, setOrdenConfirmada] = useState(null); // guarda el resumen

  // ── Cargar carrito del backend al montar ─────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCargando(false);
      return;
    }

    fetch(`${API_BASE}/api/carrito`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => (res.ok ? res.json() : []))
      .then(data => {
        const mapeados = (Array.isArray(data) ? data : []).map(ci => ({
          id:       ci.producto?.id,
          img:      ci.producto?.imagenUrl
                      ? `${API_BASE}${ci.producto.imagenUrl}`
                      : '/assets/products/logo.png',
          nombre:   ci.producto?.nombre || 'Producto',
          desc:     ci.producto?.descripcion || '',
          precio:   Number(ci.producto?.precio || 0),
          cantidad: ci.cantidad || 1,
        }));
        setItems(mapeados);
      })
      .catch(() => setItems([]))
      .finally(() => setCargando(false));
  }, []);

  // ── Cambiar cantidad ──────────────────────────────────────────────────────
  const cambiarCantidad = (id, delta) => {
    const token = localStorage.getItem('token');
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const nueva = item.cantidad + delta;
      if (nueva < 1) return item;
      if (token) {
        fetch(`${API_BASE}/api/carrito/actualizar-cantidad?productoId=${id}&nuevaCantidad=${nueva}`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        }).then(() => onCartUpdate && onCartUpdate()).catch(() => {});
      }
      return { ...item, cantidad: nueva };
    }));
  };

  // ── Eliminar item ─────────────────────────────────────────────────────────
  const eliminar = (id) => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${API_BASE}/api/carrito/eliminar/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }).then(() => onCartUpdate && onCartUpdate()).catch(() => {});
    }
    setItems(prev => prev.filter(item => item.id !== id));
    if (onCartUpdate) onCartUpdate();
  };

  // ── Totales ───────────────────────────────────────────────────────────────
  const subtotal       = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const igv            = subtotal * 0.18;
  const total          = subtotal + ENVIO + igv;
  const totalProductos = items.reduce((acc, item) => acc + item.cantidad, 0);

  // ── Confirmar pago ────────────────────────────────────────────────────────
  const confirmarPago = async () => {
    const token      = localStorage.getItem('token');
    const usuarioStr = localStorage.getItem('usuario');
    if (!token) {
      alert('Debes iniciar sesión para pagar.');
      if (setPage) setPage('perfil');
      return;
    }

    setPagando(true);
    try {
      const detalles = items.map(item => ({
        productoId: item.id,
        cantidad:   item.cantidad,
        precio:     item.precio,
      }));

      let usuarioId = null;
      if (usuarioStr) {
        try { usuarioId = JSON.parse(usuarioStr)?.id; } catch (_) {}
      }

      // Si no tenemos el id en localStorage, lo pedimos al backend
      if (!usuarioId) {
        const resPerfil = await fetch(`${API_BASE}/api/usuarios/perfil`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (resPerfil.ok) {
          const perfil = await resPerfil.json();
          usuarioId = perfil.id;
          // Guardar para futuros usos
          localStorage.setItem('usuario', JSON.stringify(perfil));
        }
      }

      if (!usuarioId) throw new Error('No se pudo obtener el usuario');

      // 1) Crear la orden → el backend la crea con estado PENDIENTE
      const resOrden = await fetch(`${API_BASE}/api/ordenes/usuario/${usuarioId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          metodoPago:       metodoPago,
          direccionEntrega: 'Dirección registrada',
          detalles:         detalles,
        }),
      });
      if (!resOrden.ok) throw new Error('No se pudo crear la orden');
      const ordenData = await resOrden.json();

      // 2) Vaciar carrito en el backend
      await fetch(`${API_BASE}/api/carrito/pagar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ metodoPago }),
      });

      // 3) Guardar resumen para mostrar confirmación
      const ahora = new Date();
      setOrdenConfirmada({
        id:         ordenData?.id || '—',
        fecha:      ahora.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' }),
        hora:       ahora.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
        metodoPago: metodoPago,
        items:      [...items],
        subtotal,
        envio:      ENVIO,
        igv,
        total,
      });

      // 4) Limpiar estado local y refrescar badge
      setItems([]);
      setMostrarModal(false);
      setPagoConfirmado(true);
      if (onCartUpdate) onCartUpdate();

    } catch (err) {
      alert('Ocurrió un error al procesar el pago. Intenta de nuevo.');
      console.error(err);
    } finally {
      setPagando(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Si el pago fue confirmado, mostramos PANTALLA DE ÉXITO
  // ─────────────────────────────────────────────────────────────────────────
  if (pagoConfirmado && ordenConfirmada) {
    return (
      <div style={{ backgroundColor: '#FFF0F2', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", color: '#4A3E3F', padding: '40px 20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>

          {/* Ícono de éxito */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '5rem', lineHeight: 1 }}>✅</div>
            <h2 style={{ color: '#2e7d32', fontSize: '1.8rem', margin: '16px 0 8px', fontFamily: "'Georgia', serif" }}>
              ¡Pago realizado con éxito!
            </h2>
            <p style={{ color: '#555', fontSize: '1rem' }}>
              Tu pedido ha sido registrado y está <strong>pendiente de preparación</strong>.<br />
              Puedes ver su estado en tu perfil → Mis Pedidos.
            </p>
          </div>

          {/* Resumen de la orden */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
            <h3 style={{ color: '#5A3E41', borderBottom: '2px solid #FADADD', paddingBottom: '12px', marginBottom: '16px', fontSize: '1rem' }}>
              📦 Resumen del pedido #{ordenConfirmada.id}
            </h3>

            <div style={{ fontSize: '0.88rem', color: '#666', marginBottom: '16px' }}>
              <div>📅 <strong>{ordenConfirmada.fecha}</strong> a las <strong>{ordenConfirmada.hora}</strong></div>
              <div style={{ marginTop: '4px' }}>
                {ordenConfirmada.metodoPago === 'Tarjeta' ? '💳' : '📱'}{' '}
                Pagado con <strong>{ordenConfirmada.metodoPago === 'Tarjeta' ? 'Tarjeta de banco' : 'Yape'}</strong>
              </div>
            </div>

            {/* Lista de productos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {ordenConfirmada.items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f5e0e4' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#4a3030', fontSize: '0.9rem' }}>{item.nombre}</div>
                    <div style={{ color: '#999', fontSize: '0.8rem' }}>x{item.cantidad} · S/ {item.precio.toFixed(2)} c/u</div>
                  </div>
                  <div style={{ fontWeight: 700, color: '#C3666D' }}>
                    S/ {(item.precio * item.cantidad).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Totales */}
            <div style={{ fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#666' }}>Subtotal</span>
                <span>S/ {ordenConfirmada.subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#666' }}>Envío</span>
                <span>S/ {ordenConfirmada.envio.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#666' }}>IGV (18%)</span>
                <span>S/ {ordenConfirmada.igv.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', borderTop: '2px solid #FADADD', paddingTop: '10px' }}>
                <span style={{ color: '#5A3E41' }}>TOTAL PAGADO</span>
                <span style={{ color: '#C3666D' }}>S/ {ordenConfirmada.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Estado del pedido */}
          <div style={{ background: '#DCE8F4', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.5rem' }}>🕐</span>
            <div>
              <div style={{ fontWeight: 700, color: '#6A8BBD', fontSize: '0.95rem' }}>Estado: Pendiente</div>
              <div style={{ color: '#666', fontSize: '0.82rem' }}>
                El administrador actualizará el estado cuando tu pedido sea preparado y entregado.
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={() => setPage && setPage('perfil')}
              style={{ padding: '12px 28px', background: '#C3666D', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}
            >
              Ver mis pedidos
            </button>
            <button
              onClick={() => setPage && setPage('productos')}
              style={{ padding: '12px 28px', background: 'white', color: '#C3666D', border: '2px solid #C3666D', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}
            >
              Seguir comprando
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER PRINCIPAL DEL CARRITO
  // ─────────────────────────────────────────────────────────────────────────
  const token = localStorage.getItem('token');

  return (
    <div style={{ backgroundColor: '#FFF0F2', fontFamily: "'Segoe UI', sans-serif", color: '#4A3E3F', minHeight: '100vh' }}>

      <main className="cart-page-container">
        {/* ══ Bienvenida ══ */}
        <div className="cart-welcome-header">
          <img src="/assets/products/logo.png" alt="Sweet Cream Rose" className="cart-circle-logo"
               onError={e => e.target.style.display='none'} />
          <p className="cart-welcome-text">Tu espacio personal para organizar tus pedidos, favoritos y disfrutar de una experiencia más dulce.</p>
        </div>

        <h2 className="cart-main-title">MI CARRITO</h2>
        <div className="title-divider"><span>--- ♥️ ---</span></div>

        {/* ══ Sin sesión ══ */}
        {!token && !cargando && (
          <div style={{ textAlign: 'center', padding: '40px 20px', background: 'white', borderRadius: '16px', margin: '20px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🛒</div>
            <h3 style={{ color: '#5A3E41', marginBottom: '8px' }}>Tu carrito está vacío</h3>
            <p style={{ color: '#888', marginBottom: '20px' }}>Inicia sesión para agregar productos a tu carrito.</p>
          </div>
        )}

        {/* ══ Cargando ══ */}
        {cargando && (
          <p style={{ textAlign: 'center', color: '#888', padding: '40px 0' }}>Cargando carrito...</p>
        )}

        {/* ══ Carrito vacío (con sesión) ══ */}
        {!cargando && token && items.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', background: 'white', borderRadius: '16px', margin: '20px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🍰</div>
            <h3 style={{ color: '#5A3E41', marginBottom: '8px' }}>Tu carrito está vacío</h3>
            <p style={{ color: '#888', marginBottom: '20px' }}>Explora nuestros productos y agrega tus favoritos.</p>
            <button
              onClick={() => setPage && setPage('productos')}
              style={{ padding: '12px 30px', background: '#C3666D', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
            >
              Ver productos
            </button>
          </div>
        )}

        {/* ══ Lista de productos ══ */}
        {!cargando && items.length > 0 && (
          <section className="cart-section-box">
            <h3 className="cart-box-title">
              <i className="fas fa-shopping-bag"></i> TUS PRODUCTOS
            </h3>
            {items.map(item => (
              <div key={item.id} className="cart-item-row">
                <img
                  src={item.img}
                  alt={item.nombre}
                  className="cart-item-img"
                  onError={e => { e.target.onerror = null; e.target.src = '/assets/products/logo.png'; }}
                />
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.nombre}</h4>
                  <p className="cart-item-desc">{item.desc}</p>
                  <p className="cart-item-price">S/ {item.precio.toFixed(2)}</p>
                </div>
                <div className="cart-item-controls">
                  <button className="qty-btn" onClick={() => cambiarCantidad(item.id, -1)}>−</button>
                  <span className="qty-val">{item.cantidad}</span>
                  <button className="qty-btn" onClick={() => cambiarCantidad(item.id, +1)}>+</button>
                  <button className="del-btn" onClick={() => eliminar(item.id)}>Eliminar</button>
                </div>
                <div className="cart-item-subtotal">
                  S/ {(item.precio * item.cantidad).toFixed(2)}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* ══ Comprobante de pago ══ */}
        {!cargando && items.length > 0 && (
          <section className="cart-section-box">
            <h3 className="cart-box-title">
              <i className="fas fa-file-invoice"></i> COMPROBANTE DE PAGO
            </h3>
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" name="comprobante" value="boleta" checked={comprobante === 'boleta'}
                       onChange={() => setComprobante('boleta')} />
                <span className="custom-radio"></span>
                <strong>Boleta</strong> (Para persona natural)
              </label>
              <label className="radio-label">
                <input type="radio" name="comprobante" value="factura" checked={comprobante === 'factura'}
                       onChange={() => setComprobante('factura')} />
                <span className="custom-radio"></span>
                <strong>Factura</strong> (Para empresa)
              </label>
            </div>
            {comprobante === 'boleta' && (
              <div className="invoice-form-grid">
                <div className="invoice-field">
                  <label>Nombre Completo (Opcional)</label>
                  <input type="text" placeholder="Ej. María Rodríguez" />
                </div>
                <div className="invoice-field">
                  <label>DNI (Opcional)</label>
                  <input type="text" placeholder="Ej. 12345678" />
                </div>
              </div>
            )}
            {comprobante === 'factura' && (
              <div className="invoice-form-grid">
                <div className="invoice-field">
                  <label>Razón Social</label>
                  <input type="text" placeholder="Ej. Inversiones Dulces S.A.C." />
                </div>
                <div className="invoice-field">
                  <label>RUC</label>
                  <input type="text" placeholder="Ej. 20123456789" />
                </div>
                <div className="invoice-field" style={{ gridColumn: 'span 2' }}>
                  <label>Dirección Fiscal</label>
                  <input type="text" placeholder="Ej. Av. Primavera 456, San Borja" />
                </div>
              </div>
            )}
          </section>
        )}

        {/* ══ Resumen del pedido ══ */}
        {!cargando && items.length > 0 && (
          <section className="cart-section-box">
            <h3 className="cart-box-title">
              <i className="fas fa-receipt"></i> RESUMEN DEL PEDIDO
            </h3>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal ({totalProductos} productos)</span>
                <span>S/ {subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Envío</span>
                <span>S/ {ENVIO.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>IGV (18%)</span>
                <span>S/ {igv.toFixed(2)}</span>
              </div>
              <div className="summary-row total-row">
                <span>TOTAL</span>
                <span className="total-price">S/ {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="center-btn-container">
              <button
                className="btn-submit-pay"
                onClick={() => {
                  if (!token) {
                    alert('Debes iniciar sesión para pagar.');
                    return;
                  }
                  setMostrarModal(true);
                }}
              >
                IR A PAGAR →
              </button>
            </div>

            <div className="secure-checkout-badge">
              <div className="shield-circle">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="secure-text">
                <h4>Tus compras están 100% protegidas</h4>
                <p>Usamos tecnología de encriptación avanzada para proteger tu información</p>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* ══════════════════════════════════════════════════════════════
          MODAL DE MÉTODO DE PAGO
          Solo muestra TARJETA y YAPE (según requerimiento)
      ══════════════════════════════════════════════════════════════ */}
      {mostrarModal && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999,
        }}>
          <div style={{
            background: 'white',
            borderRadius: 20,
            padding: '36px 32px',
            maxWidth: 480,
            width: '90%',
            boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
            fontFamily: "'Segoe UI', sans-serif",
          }}>
            <h3 style={{ color: '#5A3E41', margin: '0 0 6px', fontSize: '1.3rem' }}>
              💳 Selecciona tu método de pago
            </h3>
            <p style={{ color: '#888', fontSize: '0.88rem', margin: '0 0 22px' }}>
              Elige cómo quieres realizar tu pago
            </p>

            {/* Opciones de pago: solo Tarjeta y Yape */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {METODOS_PAGO.map(mp => (
                <label key={mp.valor} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  border: `2px solid ${metodoPago === mp.valor ? '#C3666D' : '#EAAFB8'}`,
                  borderRadius: 12, padding: '16px 18px', cursor: 'pointer',
                  background: metodoPago === mp.valor ? '#FFF0F2' : 'white',
                  transition: 'all 0.15s',
                }}>
                  <input
                    type="radio"
                    name="metodoPago"
                    value={mp.valor}
                    checked={metodoPago === mp.valor}
                    onChange={() => setMetodoPago(mp.valor)}
                    style={{ accentColor: '#C3666D', width: 18, height: 18 }}
                  />
                  <span style={{ fontSize: '1.6rem' }}>{mp.icono}</span>
                  <div>
                    <div style={{ fontWeight: metodoPago === mp.valor ? 700 : 500, color: '#4A3E3F', fontSize: '0.95rem' }}>
                      {mp.etiqueta}
                    </div>
                    <div style={{ color: '#999', fontSize: '0.78rem', marginTop: '2px' }}>
                      {mp.descripcion}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {/* Resumen rápido */}
            <div style={{ background: '#FFF0F2', borderRadius: 10, padding: '12px 16px', marginBottom: 22, fontSize: '0.9rem', color: '#5A3E41' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span>Subtotal</span><span>S/ {subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span>Envío</span><span>S/ {ENVIO.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span>IGV (18%)</span><span>S/ {igv.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1rem', borderTop: '1px solid #EAAFB8', paddingTop: 8, marginTop: 8 }}>
                <span>TOTAL</span><span style={{ color: '#C3666D' }}>S/ {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Botones */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setMostrarModal(false)}
                disabled={pagando}
                style={{ flex: 1, padding: '12px', border: '2px solid #EAAFB8', borderRadius: 10, background: 'white', color: '#5A3E41', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem' }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmarPago}
                disabled={pagando}
                style={{
                  flex: 2, padding: '12px', border: 'none', borderRadius: 10,
                  background: pagando ? '#e8a4a8' : '#C3666D',
                  color: 'white', fontWeight: 700, cursor: pagando ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                }}
              >
                {pagando ? 'Procesando...' : `✓ Confirmar pago con ${metodoPago === 'Tarjeta' ? 'Tarjeta' : 'Yape'}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;
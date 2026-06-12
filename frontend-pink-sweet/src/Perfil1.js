import { useState } from "react";

// ─── DATA DE MARTA RODRÍGUEZ (INFORMACIÓN PERSONAL) ───────
const usuarioInfo = {
  nombre: "Marta Rodríguez",
  correo: "marta.rodriguez@gmail.com",
  telefono: "+51 987654321",
  fechaNacimiento: "15 de mayo de 1998",
  genero: "Femenino",
  fechaRegistro: "20 de enero de 2024"
};

const actividadUsuario = {
  totalPedidos: "12 pedidos",
  ultimoPedido: "#0008425 — 12 de mayo de 2026",
  totalGastado: "S/ 1874.50"
};

// ─── DATA DE PEDIDOS RECIENTES ───────────────────────────
const PEDIDOS_RECIENTES = [
  {
    id: "#0008425",
    nombre: "Torta Triple Chocolate",
    fecha: "12 de mayo, 2026",
    estado: "Entregado",
    imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150&auto=format&fit=crop&q=60"
  },
  {
    id: "#0000124",
    nombre: "Cupcakes de Arándanos",
    fecha: "05 de mayo, 2026",
    estado: "Entregado",
    imagen: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=150&auto=format&fit=crop&q=60"
  },
  {
    id: "#0000103",
    nombre: "Alfajor Clásico",
    fecha: "28 de abril, 2026",
    estado: "Entregado",
    imagen: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=150&auto=format&fit=crop&q=60"
  }
];

// ─── DATA DE PRODUCTOS FAVORITOS ─────────────────────────
const PRODUCTOS_FAVORITOS = [
  {
    id: 1,
    nombre: "Torta Triple Chocolate",
    descripcion: "Bizcocho húmedo relleno de fudge artesanal y crema de chocolate.",
    precio: "S/ 85.00",
    imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    nombre: "Cupcake Amor",
    descripcion: "Suave cupcake de vainilla con frosting de fresas naturales.",
    precio: "S/ 7.50",
    imagen: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=300&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    nombre: "Alfajor Clásico",
    descripcion: "Fina masa de maicena rellena de abundante manjar blanco.",
    precio: "S/ 4.50",
    imagen: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=300&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    nombre: "Cupcake de Arándanos",
    descripcion: "Muffin esponjoso con arándanos frescos y topping de crema.",
    precio: "S/ 8.00",
    imagen: "https://images.unsplash.com/photo-1464349172961-60a361c57eef?w=300&auto=format&fit=crop&q=60"
  }
];

// ─── COMPONENTE HEADER ───────────────────────────────────
function PageHeader() {
  return (
    <section style={{ background: "#fdf2f4", padding: "48px 24px 32px", textAlign: "center", borderBottom: "1px solid #f0d0d8" }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#fff", border: "1px solid #f0d0d8", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: "bold", color: "#c8506a", fontSize: 20 }}>
        SCR
      </div>
      <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: 18, color: "#7a4055", marginBottom: 6 }}>
        "Tu espacio personal para organizar tus pedidos, favoritos y disfrutar de una experiencia más dulce."
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 24 }}>
        <div style={{ height: 1, width: 60, background: "#f0d0d8" }}></div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#2d1a10", letterSpacing: 3 }}>MI PERFIL</h2>
        <div style={{ height: 1, width: 60, background: "#f0d0d8" }}></div>
      </div>
      <div style={{ marginTop: 8, color: "#c8506a", fontSize: 18, letterSpacing: 4 }}>— 🤍 —</div>
    </section>
  );
}

// ─── COMPONENTE PRINCIPAL INTEGRADO CON FOOTER ────────────
export default function PerfilInformacionCompleto({ setPage }) {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <>
      <style>{`
        .menu-profile-btn { width:100%; display:flex; align-items:center; gap:12px; background:none; border:none; padding:12px 16px; font-family:'Lato',sans-serif; font-size:13px; color:#2d1a10; text-align:left; cursor:pointer; border-radius:6px; transition: background .2s, color .2s; }
        .menu-profile-btn:hover { background:#fdf2f4; color:#c8506a; }
        .menu-profile-btn.active { background:#fdf2f4; color:#c8506a; font-weight:700; }
        
        .info-row { display: flex; align-items: center; padding: 12px 0; border-bottom: 1px dashed #fdf2f4; font-family: 'Lato', sans-serif; font-size: 13px; }
        .info-label { width: 200px; color: #7a4055; font-weight: 600; display: flex; align-items: center; gap: 8px; }
        .info-value { color: #2d1a10; }

        .recent-card { display: flex; align-items: center; justify-content: space-between; border: 1px solid #fdf2f4; border-radius: 10px; padding: 12px; background: #fff; transition: box-shadow .2s; }
        .recent-card:hover { box-shadow: 0 4px 12px rgba(200,80,106,.03); }

        .fav-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .fav-card { border: 1px solid #fdf2f4; border-radius: 12px; overflow: hidden; background: #fff; display: flex; flexDirection: column; justify-content: space-between; }
        
        .footer-feature-item { display: flex; align-items: center; gap: 12px; font-family: 'Lato', sans-serif; font-size: 13px; color: #7a4055; font-weight: 600; }
        .footer-link { display: block; font-family: 'Lato', sans-serif; font-size: 13px; color: rgba(255,255,255,0.8); text-decoration: none; margin-bottom: 8px; transition: color .2s; }
        .footer-link:hover { color: #fff; }

        @media(max-width:900px){
          .profile-layout { flex-direction: column!important; }
          .profile-sidebar { width: 100%!important; }
          .fav-grid { grid-template-columns: repeat(2, 1fr); }
          .info-row { flex-direction: column; align-items: flex-start; gap: 4px; }
        }
        @media(max-width:600px) {
          .fav-grid { grid-template-columns: 1fr; }
          .footer-features { flex-direction: column; gap: 16px; align-items: flex-start!important; }
          .footer-cols { flex-direction: column; gap: 32px; }
        }
      `}</style>

      <PageHeader />

      <main className="profile-layout" style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 60px", display: "flex", gap: 32 }}>
        
        {/* COLUMNA IZQUIERDA: MENÚ DE CONFIGURACIÓN */}
        <div className="profile-sidebar" style={{ width: 260, flexShrink: 0 }}>
          <div style={{ background: "#fff", border: "1px solid #f0d0d8", borderRadius: 12, padding: "24px 16px", textAlign: "center", marginBottom: 20, boxShadow: "0 2px 12px rgba(200,80,106,.05)" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#fdf2f4", border: "2px solid #f0d0d8", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: "#c8506a", marginBottom: 12 }}>
              <i className="fa-regular fa-user"></i>
            </div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: "#2d1a10", marginBottom: 4 }}>{usuarioInfo.nombre}</h3>
            <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: "#a07080", margin: 0 }}>{usuarioInfo.correo}</p>
          </div>

          <div style={{ background: "#fff", border: "1px solid #f0d0d8", borderRadius: 12, padding: "10px", boxShadow: "0 2px 12px rgba(200,80,106,.05)" }}>
            <button className={`menu-profile-btn ${activeTab === "info" ? "active" : ""}`} onClick={() => setActiveTab("info")}>
              <i className="fa-solid fa-id-card" style={{ width: 16 }}></i> Información personal
            </button>
            <button className="menu-profile-btn" onClick={() => setPage("pedidos")}>
              <i className="fa-solid fa-bag-shopping" style={{ width: 16 }}></i> Mis pedidos
            </button>
            <button className="menu-profile-btn">
              <i className="fa-solid fa-location-dot" style={{ width: 16 }}></i> Direcciones
            </button>
            <button className="menu-profile-btn">
              <i className="fa-solid fa-credit-card" style={{ width: 16 }}></i> Métodos de pago
            </button>
            <button className="menu-profile-btn">
              <i className="fa-solid fa-heart" style={{ width: 16 }}></i> Favoritos
            </button>
            <button className="menu-profile-btn">
              <i className="fa-solid fa-gear" style={{ width: 16 }}></i> Configuración
            </button>
            <hr style={{ border: "none", borderTop: "1px solid #f0d0d8", margin: "8px 0" }} />
            <button className="menu-profile-btn" style={{ color: "#c8506a" }} onClick={() => setPage("inicio")}>
              <i className="fa-solid fa-right-from-bracket" style={{ width: 16 }}></i> Cerrar sesión
            </button>
          </div>
        </div>

        {/* COLUMNA DERECHA: SECCIÓN COMPLETA DE PERFIL 1_2 */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          
          {/* Bloque 1: Información Personal y Actividad */}
          <div style={{ background: "#fff", border: "1px solid #f0d0d8", borderRadius: 14, padding: "28px", boxShadow: "0 2px 14 rgba(200,80,106,.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid #fdf2f4" }}>
              <i className="fa-regular fa-id-card" style={{ color: "#c8506a" }}></i>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: "#2d1a10", margin: 0 }}>INFORMACIÓN PERSONAL</h3>
            </div>
            
            <div className="info-row">
              <span className="info-label"><i className="fa-regular fa-user" style={{ width: 14 }}></i> Nombre completo:</span>
              <span className="info-value">{usuarioInfo.nombre}</span>
            </div>
            <div className="info-row">
              <span className="info-label"><i className="fa-regular fa-envelope" style={{ width: 14 }}></i> Correo electrónico:</span>
              <span className="info-value">{usuarioInfo.correo}</span>
            </div>
            <div className="info-row">
              <span className="info-label"><i className="fa-solid fa-phone" style={{ width: 14 }}></i> Teléfono:</span>
              <span className="info-value">{usuarioInfo.telefono}</span>
            </div>
            <div className="info-row">
              <span className="info-label"><i className="fa-regular fa-calendar" style={{ width: 14 }}></i> Fecha de nacimiento:</span>
              <span className="info-value">{usuarioInfo.fechaNacimiento}</span>
            </div>
            <div className="info-row">
              <span className="info-label"><i className="fa-solid fa-venus-mars" style={{ width: 14 }}></i> Género:</span>
              <span className="info-value">{usuarioInfo.genero}</span>
            </div>
            <div className="info-row" style={{ borderBottom: "none" }}>
              <span className="info-label"><i className="fa-regular fa-calendar-check" style={{ width: 14 }}></i> Fecha de registro:</span>
              <span className="info-value">{usuarioInfo.fechaRegistro}</span>
            </div>

            {/* Sub-bloque: Actividad */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 32, marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid #fdf2f4" }}>
              <i className="fa-solid fa-chart-line" style={{ color: "#c8506a" }}></i>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: "#2d1a10", margin: 0 }}>MI ACTIVIDAD</h3>
            </div>
            <div className="info-row">
              <span className="info-label"><i className="fa-solid fa-basket-shopping" style={{ width: 14 }}></i> Total de pedidos:</span>
              <span className="info-value" style={{ fontWeight: 600 }}>{actividadUsuario.totalPedidos}</span>
            </div>
            <div className="info-row">
              <span className="info-label"><i className="fa-regular fa-clock" style={{ width: 14 }}></i> Último pedido:</span>
              <span className="info-value">{actividadUsuario.ultimoPedido}</span>
            </div>
            <div className="info-row" style={{ borderBottom: "none" }}>
              <span className="info-label"><i className="fa-solid fa-wallet" style={{ width: 14 }}></i> Total gastado:</span>
              <span className="info-value" style={{ color: "#c8506a", fontWeight: 700 }}>{actividadUsuario.totalGastado}</span>
            </div>
          </div>

          {/* Bloque 2: Pedidos Recientes */}
          <div style={{ background: "#fff", border: "1px solid #f0d0d8", borderRadius: 14, padding: "28px", boxShadow: "0 2px 14 rgba(200,80,106,.04)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, borderBottom: "1px solid #fdf2f4", paddingBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <i className="fa-solid fa-bag-shopping" style={{ color: "#c8506a" }}></i>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: "#2d1a10", margin: 0 }}>MIS PEDIDOS RECIENTES</h3>
              </div>
              <button style={{ background: "none", border: "none", color: "#c8506a", fontFamily: "'Lato',sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer" }} onClick={() => setPage("pedidos")}>Ver todos →</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {PEDIDOS_RECIENTES.map((pedido) => (
                <div key={pedido.id} className="recent-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <img src={pedido.imagen} alt={pedido.nombre} style={{ width: 56, height: 50, objectFit: "cover", borderRadius: 6, border: "1px solid #f0d0d8" }} />
                    <div>
                      <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, fontWeight: 700, color: "#2d1a10", margin: "0 0 2px 0" }}>Pedido {pedido.id}</h4>
                      <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: "#7a4055", margin: "0 0 2px 0" }}>{pedido.nombre}</p>
                      <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: "#a07080", margin: 0 }}>{pedido.fecha}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ background: "#e8f5e9", color: "#2e7d32", border: "1px solid #c8e6c9", fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>
                      {pedido.estado}
                    </span>
                    <i className="fa-solid fa-chevron-right" style={{ color: "#a07080", fontSize: 12 }}></i>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bloque 3: Productos Favoritos */}
          <div style={{ background: "#fff", border: "1px solid #f0d0d8", borderRadius: 14, padding: "28px", boxShadow: "0 2px 14 rgba(200,80,106,.04)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, borderBottom: "1px solid #fdf2f4", paddingBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <i className="fa-regular fa-heart" style={{ color: "#c8506a" }}></i>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: "#2d1a10", margin: 0 }}>MIS PRODUCTOS FAVORITOS</h3>
              </div>
              <button style={{ background: "none", border: "none", color: "#c8506a", fontFamily: "'Lato',sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Ver todos →</button>
            </div>

            <div className="fav-grid">
              {PRODUCTOS_FAVORITOS.map((prod) => (
                <div key={prod.id} className="fav-card">
                  <img src={prod.imagen} alt={prod.nombre} style={{ width: "100%", height: 110, objectFit: "cover" }} />
                  <div style={{ padding: "10px", display: "flex", flexDirection: "column", justifyInbound: "space-between", flex: 1 }}>
                    <div>
                      <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 13, fontWeight: 700, color: "#2d1a10", margin: "0 0 4px 0" }}>{prod.nombre}</h4>
                      <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: "#a07080", margin: "0 0 10px 0", lineHeight: "1.3" }}>{prod.descripcion}</p>
                    </div>
                    <div>
                      <span style={{ display: "block", fontFamily: "'Lato',sans-serif", fontSize: 13, fontWeight: 700, color: "#c8506a", marginBottom: 8 }}>{prod.precio}</span>
                      <button className="btn-add-cart" style={{ width: "100%", padding: "6px 0", fontSize: 11 }}>Añadir al carrito</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Banner de Invitación / CTA */}
          <div style={{ background: "linear-gradient(135deg,#c8506a 0%,#a83858 100%)", borderRadius: 14, padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#fff" }}>
                <i className="fa-solid fa-cookie-bite"></i>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: "#fff", fontWeight: 700 }}>¿No encuentras lo que buscas?</h3>
                <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: "rgba(255,255,255,.8)" }}>Contáctanos para realizar un diseño de repostería totalmente personalizado.</p>
              </div>
            </div>
            <button className="scr-btn-white" style={{ padding: "8px 20px", fontSize: 12 }}>Contactar 📞</button>
          </div>

        </div>
      </main>

      {/* ─── NAVEGACIÓN DE CARACTERÍSTICAS (PRE-FOOTER) ────────── */}
      <section style={{ background: "#fdf2f4", padding: "24px", borderTop: "1px solid #f0d0d8", borderBottom: "1px solid #f0d0d8" }}>
        <div className="footer-features" style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div className="footer-feature-item">
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#c8506a", border: "1px solid #f0d0d8" }}><i className="fa-solid fa-cake-candles"></i></div>
            <span>Ingredientes de primera calidad</span>
          </div>
          <div className="footer-feature-item">
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#c8506a", border: "1px solid #f0d0d8" }}><i className="fa-solid fa-heart"></i></div>
            <span>Hecho con amor en cada detalle</span>
          </div>
          <div className="footer-feature-item">
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#c8506a", border: "1px solid #f0d0d8" }}><i className="fa-solid fa-truck"></i></div>
            <span>Envíos seguros y rápidos</span>
          </div>
          <div className="footer-feature-item">
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#c8506a", border: "1px solid #f0d0d8" }}><i className="fa-solid fa-user-tag"></i></div>
            <span>Atención personalizada para ti</span>
          </div>
        </div>
      </section>

      {/* ─── FOOTER DE LA MARCA COMPLETO ─────────────────────── */}
      <footer style={{ background: "#b2586c", padding: "48px 24px 20px", color: "#fff" }}>
        <div className="footer-cols" style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: 40, flexWrap: "wrap", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: 32 }}>
          
          <div style={{ maxWidth: 280 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 16 }}>Sweet Cream Rose</div>
            <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: "1.6" }}>
              Creamos momentos inolvidables con la mejor pastelería artesanal y detalles hechos con amor.
            </p>
          </div>

          <div>
            <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>ENLACES</h4>
            <a href="#inicio" className="footer-link">Inicio</a>
            <a href="#productos" className="footer-link">Productos</a>
            <a href="#ofertas" className="footer-link">Ofertas</a>
            <a href="#nosotros" className="footer-link">Nosotros</a>
          </div>

          <div>
            <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>AYUDA</h4>
            <a href="#preguntas" className="footer-link">Preguntas frecuentes</a>
            <a href="#politicas" className="footer-link">Políticas de envío</a>
            <a href="#terminos" className="footer-link">Términos y condiciones</a>
            <a href="#privacidad" className="footer-link">Políticas de privacidad</a>
          </div>

          <div style={{ maxWidth: 240 }}>
            <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>CONTÁCTANOS</h4>
            <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.8)", margin: "0 0 8px 0" }}>
              <i className="fa-solid fa-location-dot" style={{ marginRight: 8 }}></i> Lima, Perú
            </p>
            <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.8)", margin: "0 0 8px 0" }}>
              <i className="fa-solid fa-phone" style={{ marginRight: 8 }}></i> +51 987654321
            </p>
            <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.8)", margin: "0 0 8px 0" }}>
              <i className="fa-solid fa-envelope" style={{ marginRight: 8 }}></i> hola@sweetcreamrose.com
            </p>
            <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.8)", margin: "0 0 8px 0" }}>
              <i className="fa-regular fa-clock" style={{ marginRight: 8 }}></i> Lunes a Sábado: 9am - 8pm
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 1100, margin: "20px auto 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, fontFamily: "'Lato',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span>SÍGUENOS:</span>
            <a href="#fb" style={{ color: "#fff", fontSize: 14 }}><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#ig" style={{ color: "#fff", fontSize: 14 }}><i className="fa-brands fa-instagram"></i></a>
            <a href="#wa" style={{ color: "#fff", fontSize: 14 }}><i className="fa-brands fa-whatsapp"></i></a>
          </div>
          <span>© 2026 Sweet Cream Rose. Todos los derechos reservados.</span>
        </div>
      </footer>
    </>
  );
}
import { useState } from "react";

// ─── DATA DE MARTA RODRÍGUEZ (DASHBOARD) ──────────────────
const usuario = {
  nombre: "Marta Rodríguez",
  correo: "marta.rodriguez@gmail.com"
};

// ─── DATA DE PEDIDOS CON URLS ESTÁTICAS DE RESPALDO ────────
const LISTA_PEDIDOS = [
  {
    id: "#0008425",
    fecha: "12 de mayo, 2026",
    hora: "10:30 am",
    estado: "Pendiente",
    total: "S/ 145.00",
    productosContador: "3 productos",
    imagenPrincipal: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&auto=format&fit=crop&q=60",
    miniaturas: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=80&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=80&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=80&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "#0000141",
    fecha: "12 de mayo, 2026",
    hora: "2:15 pm",
    estado: "Entregado",
    total: "S/ 45.00",
    productosContador: "2 productos",
    imagenPrincipal: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=300&auto=format&fit=crop&q=60",
    miniaturas: [
      "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=80&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=80&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "#0000124",
    fecha: "05 de mayo, 2026",
    hora: "11:20 am",
    estado: "Cancelado",
    total: "S/ 32.50",
    productosContador: "2 productos",
    imagenPrincipal: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=300&auto=format&fit=crop&q=60",
    miniaturas: [
      "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=80&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=80&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "#0000115",
    fecha: "18 de abril, 2026",
    hora: "5:40 pm",
    estado: "Entregado",
    total: "S/ 120.00",
    productosContador: "4 productos",
    imagenPrincipal: "https://images.unsplash.com/photo-1464349172961-60a361c57eef?w=300&auto=format&fit=crop&q=60", 
    miniaturas: [
      "https://images.unsplash.com/photo-1464349172961-60a361c57eef?w=80&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=80&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=80&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "#0000103",
    fecha: "11 de abril, 2026",
    hora: "3:10 pm",
    estado: "Cancelado",
    total: "S/ 18.50",
    productosContador: "1 producto",
    imagenPrincipal: "https://images.unsplash.com/photo-1548907040-4d42b52115ca?w=300&auto=format&fit=crop&q=60", 
    miniaturas: [
      "https://images.unsplash.com/photo-1548907040-4d42b52115ca?w=80&auto=format&fit=crop&q=60"
    ]
  }
];

// ─── HEADER DE LA PÁGINA ─────────────────────────────────
function PageHeader() {
  return (
    <section style={{ background: "#fdf2f4", padding: "48px 24px 32px", textAlign: "center", borderBottom: "1px solid #f0d0d8" }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#fff", border: "1px solid #f0d0d8", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: "bold", color: "#c8506a", fontSize: 20 }}>
        SCR
      </div>
      <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: 18, color: "#7a4055", marginBottom: 6 }}>
        "Tu espacio personal para organizar tus pedidos, favoritos
      </p>
      <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: 16, color: "#a07080", marginBottom: 28 }}>
        y disfrutar de una experiencia más dulce."
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <div style={{ height: 1, width: 60, background: "#f0d0d8" }}></div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#2d1a10", letterSpacing: 3 }}>MI PERFIL</h2>
        <div style={{ height: 1, width: 60, background: "#f0d0d8" }}></div>
      </div>
      <div style={{ marginTop: 8, color: "#c8506a", fontSize: 18, letterSpacing: 4 }}>— 🤍 —</div>
    </section>
  );
}

// ─── COMPONENTE PRINCIPAL CON FOOTER INCORPORADO ──────────
export default function Perfil2({ setPage }) {
  const [activeTab, setActiveTab] = useState("pedidos");
  const [filtro, setFiltro] = useState("Todos");

  const pedidosFiltrados = LISTA_PEDIDOS.filter(p => {
    if (filtro === "Todos") return true;
    return p.estado === filtro;
  });

  const obtenerEstilosEstado = (estado) => {
    switch (estado) {
      case "Pendiente": return { bg: "#e3f2fd", color: "#0d47a1", border: "#bbdefb" };
      case "Entregado": return { bg: "#e8f5e9", color: "#2e7d32", border: "#c8e6c9" };
      case "Cancelado": return { bg: "#eaeaea", color: "#616161", border: "#e0e0e0" };
      default: return { bg: "#fff", color: "#2d1a10", border: "#f0d0d8" };
    }
  };

  return (
    <>
      <style>{`
        .menu-profile-btn { width:100%; display:flex; align-items:center; gap:12px; background:none; border:none; padding:12px 16px; font-family:'Lato',sans-serif; font-size:13px; color:#2d1a10; text-align:left; cursor:pointer; border-radius:6px; transition: background .2s, color .2s; }
        .menu-profile-btn:hover { background:#fdf2f4; color:#c8506a; }
        .menu-profile-btn.active { background:#fdf2f4; color:#c8506a; font-weight:700; }
        
        .filter-btn { background:#fff; border:1px solid #f0d0d8; color:#7a4055; font-family:'Lato',sans-serif; font-size:12px; font-weight:600; padding:6px 16px; border-radius:20px; cursor:pointer; transition:all .2s; }
        .filter-btn:hover { background:#fdf2f4; color:#c8506a; }
        .filter-btn.active { background:#c8506a; color:#fff; border-color:#c8506a; }
        
        .order-select { border:1px solid #f0d0d8; background:#fff; padding:6px 12px; font-family:'Lato',sans-serif; font-size:12px; color:#2d1a10; border-radius:6px; cursor:pointer; font-weight:600; }
        
        .pedido-card { display:flex; gap:20px; border:1px solid #fdf2f4; border-radius:12px; padding:16px; background:#fff; transition: box-shadow .2s; }
        .pedido-card:hover { box-shadow:0 4px 12px rgba(200,80,106,.04); }
        
        .mini-thumb { width:32px; height:32px; border-radius:50%; object-fit:cover; border:2px solid #fff; box-shadow:0 1px 4px rgba(0,0,0,0.1); margin-right:-8px; }

        .footer-feature-item { display: flex; align-items: center; gap: 12px; font-family: 'Lato', sans-serif; font-size: 13px; color: #7a4055; font-weight: 600; }
        .footer-link { display: block; font-family: 'Lato', sans-serif; font-size: 13px; color: rgba(255,255,255,0.8); text-decoration: none; margin-bottom: 8px; transition: color .2s; }
        .footer-link:hover { color: #fff; }

        @media(max-width:850px){
          .profile-layout { flex-direction:column!important; }
          .profile-sidebar { width:100%!important; }
          .pedido-card { flex-direction: column; }
          .pedido-right { align-items: flex-start!important; text-align: left!important; width: 100%; border-top: 1px dashed #fdf2f4; padding-top: 12px; }
          .filters-wrapper { flex-direction: column; align-items: flex-start!important; gap: 12px; }
          .footer-features { flex-direction: column; gap: 16px; align-items: flex-start!important; }
          .footer-cols { flex-direction: column; gap: 32px; }
        }
      `}</style>

      <PageHeader />

      <main className="profile-layout" style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 60px", display: "flex", gap: 32 }}>
        
        {/* COLUMNA IZQUIERDA: DASHBOARD DEL USUARIO */}
        <div className="profile-sidebar" style={{ width: 260, flexShrink: 0 }}>
          <div style={{ background: "#fff", border: "1px solid #f0d0d8", borderRadius: 12, padding: "24px 16px", textAlign: "center", marginBottom: 20, boxShadow: "0 2px 12px rgba(200,80,106,.05)" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#fdf2f4", border: "2px solid #f0d0d8", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: "#c8506a", marginBottom: 12 }}>
              <i className="fa-regular fa-user"></i>
            </div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: "#2d1a10", marginBottom: 4 }}>{usuario.nombre}</h3>
            <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: "#a07080", margin: 0 }}>{usuario.correo}</p>
          </div>

          {/* MENÚ LATERAL INTERACTIVO */}
          <div style={{ background: "#fff", border: "1px solid #f0d0d8", borderRadius: 12, padding: "10px", boxShadow: "0 2px 12px rgba(200,80,106,.05)" }}>
            <button className={`menu-profile-btn ${activeTab === "info" ? "active" : ""}`} onClick={() => setActiveTab("info")}>
              <i className="fa-solid fa-id-card" style={{ width: 16 }}></i> Información personal
            </button>
            <button className={`menu-profile-btn ${activeTab === "pedidos" ? "active" : ""}`} onClick={() => setActiveTab("pedidos")}>
              <i className="fa-solid fa-bag-shopping" style={{ width: 16 }}></i> Mis pedidos
            </button>
            <button className={`menu-profile-btn ${activeTab === "direcciones" ? "active" : ""}`} onClick={() => setActiveTab("direcciones")}>
              <i className="fa-solid fa-location-dot" style={{ width: 16 }}></i> Direcciones
            </button>
            <button className={`menu-profile-btn ${activeTab === "pagos" ? "active" : ""}`} onClick={() => setActiveTab("pagos")}>
              <i className="fa-solid fa-credit-card" style={{ width: 16 }}></i> Métodos de pago
            </button>
            <button className={`menu-profile-btn ${activeTab === "favoritos" ? "active" : ""}`} onClick={() => setActiveTab("favoritos")}>
              <i className="fa-solid fa-heart" style={{ width: 16 }}></i> Favoritos
            </button>
            <button className={`menu-profile-btn ${activeTab === "config" ? "active" : ""}`} onClick={() => setActiveTab("config")}>
              <i className="fa-solid fa-gear" style={{ width: 16 }}></i> Configuración
            </button>
            <hr style={{ border: "none", borderTop: "1px solid #f0d0d8", margin: "8px 0" }} />
            <button className="menu-profile-btn" style={{ color: "#c8506a" }} onClick={() => setPage("inicio")}>
              <i className="fa-solid fa-right-from-bracket" style={{ width: 16 }}></i> Cerrar sesión
            </button>
          </div>
        </div>

        {/* COLUMNA DERECHA: PANEL DE PEDIDOS FIJO */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 28 }}>
          
          <div style={{ background: "#fff", border: "1px solid #f0d0d8", borderRadius: 14, padding: "28px", boxShadow: "0 2px 14px rgba(200,80,106,.06)" }}>
            
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, borderBottom: "1px solid #f0d0d8", paddingBottom: 12 }}>
              <i className="fa-solid fa-bag-shopping" style={{ color: "#c8506a", fontSize: 18 }}></i>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: "#2d1a10", textTransform: "uppercase", letterSpacing: 1 }}>Mis Pedidos</h3>
            </div>

            {/* Barra de Filtros */}
            <div className="filters-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 24 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Todos", "Pendientes", "Entregados", "Cancelados"].map((label) => {
                  const valorFiltro = label === "Pendientes" ? "Pendiente" : label === "Entregados" ? "Entregado" : label === "Cancelados" ? "Cancelado" : "Todos";
                  return (
                    <button 
                      key={label} 
                      className={`filter-btn ${filtro === valorFiltro ? "active" : ""}`}
                      onClick={() => setFiltro(valorFiltro)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: "#a07080" }}>Ordenar por:</span>
                <select className="order-select" defaultValue="recientes">
                  <option value="recientes">Más recientes</option>
                  <option value="antiguos">Más antiguos</option>
                </select>
              </div>
            </div>

            {/* Mapeo de Tarjetas de Pedidos */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {pedidosFiltrados.map((pedido) => {
                const badge = obtenerEstilosEstado(pedido.estado);
                return (
                  <div key={pedido.id} className="pedido-card">
                    
                    <div style={{ flexShrink: 0 }}>
                      <img src={pedido.imagenPrincipal} alt={pedido.id} style={{ width: 110, height: 85, objectFit: "cover", borderRadius: 8, border: "1px solid #f0d0d8" }} />
                    </div>

                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, color: "#2d1a10", margin: "0 0 4px 0" }}>Pedido {pedido.id}</h4>
                        <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: "#7a4055", margin: 0 }}>{pedido.fecha} — {pedido.hora}</p>
                        <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: "#a07080", marginTop: 4, margin: 0 }}>{pedido.productosContador}</p>
                      </div>
                      
                      <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                        {pedido.miniaturas.map((thumb, idx) => (
                          <img key={idx} src={thumb} className="mini-thumb" alt="producto" />
                        ))}
                      </div>
                    </div>

                    <div className="pedido-right" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between", minWidth: 130, textAlign: "right" }}>
                      <span style={{ background: badge.bg, color: badge.color, border: `1px solid ${badge.border}`, fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>
                        {pedido.estado}
                      </span>
                      <div style={{ margin: "6px 0" }}>
                        <span style={{ display: "block", fontFamily: "'Lato',sans-serif", fontSize: 11, color: "#a07080" }}>Total</span>
                        <strong style={{ fontFamily: "'Lato',sans-serif", fontSize: 15, fontWeight: 700, color: "#2d1a10" }}>{pedido.total}</strong>
                      </div>
                      <button className="btn-add-cart" style={{ padding: "6px 14px", fontSize: 11, background: pedido.estado === "Cancelado" ? "#7a4055" : "#c8506a" }}>
                        {pedido.estado === "Cancelado" ? "Reordenar" : "Ver detalles"}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* BANNER DE INVITACIÓN */}
          <div style={{ maxWidth: "100%", background: "linear-gradient(135deg,#c8506a 0%,#a83858 100%)", borderRadius: 14, padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#fff" }}>
                <i className="fa-solid fa-cookie-bite"></i>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: "#fff", fontWeight: 700 }}>¿No encuentras lo que buscas?</h3>
                <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: "rgba(255,255,255,.8)" }}>Explora todo nuestro catálogo hecho con los mejores ingredientes artesanales.</p>
              </div>
            </div>
            <button className="scr-btn-white" style={{ padding: "8px 20px", fontSize: 12 }} onClick={() => setPage("productos")}>Comprar ahora</button>
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

      {/* ─── FOOTER COMPLETO EXCLUSIVO (PERFIL2_3.PNG) ────────── */}
      <footer style={{ background: "#b2586c", padding: "48px 24px 20px", color: "#fff" }}>
        <div className="footer-cols" style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: 40, flexWrap: "wrap", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: 32 }}>
          
          {/* Columna Marca */}
          <div style={{ maxWidth: 280 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 16 }}>Sweet Cream Rose</div>
            <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: "1.6" }}>
              Creamos momentos inolvidables con la mejor pastelería artesanal y detalles hechos con amor.
            </p>
          </div>

          {/* Columna Enlaces */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>ENLACES</h4>
            <a href="#inicio" className="footer-link">Inicio</a>
            <a href="#productos" className="footer-link">Productos</a>
            <a href="#ofertas" className="footer-link">Ofertas</a>
            <a href="#nosotros" className="footer-link">Nosotros</a>
          </div>

          {/* Columna Ayuda */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>AYUDA</h4>
            <a href="#preguntas" className="footer-link">Preguntas frecuentes</a>
            <a href="#politicas" className="footer-link">Políticas de envío</a>
            <a href="#terminos" className="footer-link">Términos y condiciones</a>
            <a href="#privacidad" className="footer-link">Políticas de privacidad</a>
          </div>

          {/* Columna Contáctanos */}
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

        {/* Derechos de Autor */}
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
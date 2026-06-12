import { useState } from "react";

// Importación de Logos e Imágenes Reutilizadas de tu App
import logo from "./assets/products/logo.png";

// ─── DATA DE MARTA RODRÍGUEZ (DASHBOARD) ──────────────────
const usuario = {
  nombre: "Marta Rodríguez",
  correo: "marta.rodriguez@gmail.com"
};

// ─── DATA DE DIRECCIONES (PERFIL3.PNG) ────────────────────
const LISTA_DIRECCIONES = [
  {
    id: 1,
    etiqueta: "Casa",
    esPrincipal: true,
    icono: "fa-solid fa-house",
    direccion: "Av. Los Rosales 123",
    distrito: "San Borja, Lima - Lima",
    referencia: "Frente al parque, casa blanca con rejas negras",
    telefono: "+51 987654321"
  },
  {
    id: 2,
    etiqueta: "Trabajo",
    esPrincipal: false,
    icono: "fa-solid fa-building",
    direccion: "Calle Los Flores 456, Oficina 301",
    distrito: "Miraflores, Lima - Lima",
    referencia: "Cerca de la Iglesia, color beige",
    telefono: "+51 988776655"
  },
  {
    id: 3,
    etiqueta: "Casa de mis padres",
    esPrincipal: false,
    icono: "fa-solid fa-house-chimney-user",
    direccion: "Jr. Las Pantuflas 789",
    distrito: "Surco, Lima - Lima",
    referencia: "Casa de 2 pisos color beige",
    telefono: "+51 955112233"
  }
];

// ─── HEADER DE LA PÁGINA ─────────────────────────────────
function PageHeader() {
  return (
    <section style={{ background: "#fdf2f4", padding: "48px 24px 32px", textAlign: "center", borderBottom: "1px solid #f0d0d8" }}>
      <img src={logo} alt="Sweet Cream Rose" style={{ height: 80, objectFit: "contain", marginBottom: 16 }} />
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

// ─── COMPONENTE PRINCIPAL PERFIL DIRECCIONES CON FOOTER ───
export default function PerfilDireccionesUnico({ setPage }) {
  const [activeTab, setActiveTab] = useState("direcciones");

  return (
    <>
      <style>{`
        .menu-profile-btn { width:100%; display:flex; align-items:center; gap:12px; background:none; border:none; padding:12px 16px; font-family:'Lato',sans-serif; font-size:13px; color:#2d1a10; text-align:left; cursor:pointer; border-radius:6px; transition: background .2s, color .2s; }
        .menu-profile-btn:hover { background:#fdf2f4; color:#c8506a; }
        .menu-profile-btn.active { background:#fdf2f4; color:#c8506a; font-weight:700; }
        
        .address-card { border: 1px solid #f0d0d8; border-radius: 12px; padding: 20px; background: #fff; display: flex; gap: 20px; position: relative; transition: box-shadow .2s; }
        .address-card:hover { box-shadow: 0 4px 12px rgba(200,80,106,.04); }
        
        .address-action-btn { background: none; border: none; font-family: 'Lato', sans-serif; font-size: 12px; color: #7a4055; cursor: pointer; display: flex; align-items: center; gap: 6px; padding: 4px 8px; border-radius: 4px; transition: background .2s; }
        .address-action-btn:hover { background: #fdf2f4; color: #c8506a; }

        /* Estilos del Footer */
        .footer-feature-item { display: flex; alignItems: center; gap: 12px; font-family: 'Lato', sans-serif; font-size: 13px; color: #7a4055; font-weight: 600; }
        .footer-link { display: block; font-family: 'Lato', sans-serif; font-size: 13px; color: rgba(255,255,255,0.8); text-decoration: none; margin-bottom: 8px; transition: color .2s; }
        .footer-link:hover { color: #fff; }

        @media(max-width:850px){
          .profile-layout { flex-direction:column!important; }
          .profile-sidebar { width:100%!important; }
          .address-card { flex-direction: column; gap: 14px; }
          .address-actions { position: static!important; flex-direction: row!important; justify-content: flex-start!important; margin-top: 10px; border-top: 1px dashed #f0d0d8; padding-top: 10px; }
          .address-header-row { flex-direction: column; align-items: flex-start!important; gap: 6px; }
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

          {/* MENÚ LATERAL INTERACTIVO ORIGINAL */}
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

        {/* COLUMNA DERECHA: PANEL DE DIRECCIONES FIJO */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
          
          <div style={{ background: "#fff", border: "1px solid #f0d0d8", borderRadius: 14, padding: "28px", boxShadow: "0 2px 14px rgba(200,80,106,.06)" }}>
            
            <div style={{ display: "flex", alignItems: "center", justifyContent: "between", wrap: "wrap", gap: 16, marginBottom: 24, borderBottom: "1px solid #f0d0d8", paddingBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <i className="fa-solid fa-location-dot" style={{ color: "#c8506a", fontSize: 18 }}></i>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: "#2d1a10", textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>Mis Direcciones</h3>
                  <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: "#a07080", margin: "2px 0 0 0" }}>Gestiona las direcciones donde quieres recibir tus pedidos</p>
                </div>
              </div>
              <button className="scr-btn" style={{ padding: "8px 16px", fontSize: 11, marginLeft: "auto" }}>
                + Agregar dirección
              </button>
            </div>

            {/* Listado de Direcciones */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {LISTA_DIRECCIONES.map((item) => (
                <div key={item.id} className="address-card">
                  
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#fdf2f4", border: "1px solid #f0d0d8", display: "flex", alignItems: "center", justifyContent: "center", color: "#c8506a", fontSize: 16, flexShrink: 0 }}>
                    <i className={item.icono}></i>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div className="address-header-row" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                      <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: "#2d1a10", margin: 0 }}>{item.etiqueta}</h4>
                      {item.esPrincipal && (
                        <span style={{ background: "#fdf2f4", color: "#c8506a", border: "1px solid #f0d0d8", fontSize: 10, fontWeight: 700, padding: "2px 10px", borderRadius: 12, fontFamily: "'Lato',sans-serif" }}>
                          Dirección principal
                        </span>
                      )}
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, fontFamily: "'Lato',sans-serif", fontSize: 13, color: "#2d1a10" }}>
                      <span><strong>Dirección:</strong> {item.direccion}</span>
                      <span style={{ color: "#7a4055" }}>{item.distrito}</span>
                      <span style={{ color: "#a07080", fontSize: 12 }}><strong>Referencia:</strong> {item.referencia}</span>
                      <span style={{ color: "#a07080", fontSize: 12 }}><strong>Teléfono:</strong> {item.telefono}</span>
                    </div>
                  </div>

                  <div className="address-actions" style={{ position: "absolute", top: 20, right: 20, display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                    <button className="address-action-btn">
                      <i className="fa-regular fa-pen-to-square"></i> Editar
                    </button>
                    {!item.esPrincipal && (
                      <button className="address-action-btn" style={{ color: "#a07080" }}>
                        <i className="fa-regular fa-trash-can"></i> Eliminar
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>

            {/* BANNER RECOMENDACIÓN INFERIOR */}
            <div style={{ marginTop: 24, background: "#fdf2f4", border: "1px dashed #c8506a", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ color: "#c8506a", fontSize: 20 }}>
                <i className="fa-solid fa-truck-fast"></i>
              </div>
              <div>
                <h5 style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, fontWeight: 700, color: "#2d1a10", margin: "0 0 2px 0" }}>Tu pedido llegará más rápido</h5>
                <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: "#7a4055", margin: 0 }}>Asegúrate de que tu dirección esté actualizada para una mejor experiencia de entrega.</p>
              </div>
            </div>

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

      {/* ─── FOOTER PRINCIPAL DE LA MARCA ──────────────────────── */}
      <footer style={{ background: "#b2586c", padding: "48px 24px 20px", color: "#fff" }}>
        <div className="footer-cols" style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: 40, flexWrap: "wrap", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: 32 }}>
          
          {/* Logo y Eslogan */}
          <div style={{ maxWidth: 280 }}>
            <img src={logo} alt="Sweet Cream Rose" style={{ height: 60, brightness: "10", filter: "brightness(0) invert(1)", marginBottom: 16 }} />
            <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: "1.6" }}>
              Creamos momentos inolvidables con la mejor pastelería artesanal y detalles hechos con amor.
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>ENLACES</h4>
            <a href="#inicio" className="footer-link">Inicio</a>
            <a href="#productos" className="footer-link">Productos</a>
            <a href="#ofertas" className="footer-link">Ofertas</a>
            <a href="#nosotros" className="footer-link">Nosotros</a>
          </div>

          {/* Ayuda */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>AYUDA</h4>
            <a href="#preguntas" className="footer-link">Preguntas frecuentes</a>
            <a href="#politicas" className="footer-link">Políticas de envío</a>
            <a href="#terminos" className="footer-link">Términos y condiciones</a>
            <a href="#privacidad" className="footer-link">Políticas de privacidad</a>
          </div>

          {/* Contáctanos */}
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

        {/* Barra de Derechos de Autor e Iconos de Redes Sociales */}
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
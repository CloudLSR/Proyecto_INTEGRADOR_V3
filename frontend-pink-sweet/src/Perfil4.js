import { useState } from "react";

// ─── DATA ESTRUCTURADA (FIEL A LAS CAPTURAS) ────────────────
const METODOS_PAGO = [
  {
    id: 1,
    tipo: "Visa terminada en 1234",
    titular: "Marta Rodríguez",
    expiracion: "Vence: 12/29",
    principal: true,
    icono: "fa-brands fa-cc-visa",
    colorIcono: "#00579f"
  },
  {
    id: 2,
    tipo: "Mastercard terminada en 5678",
    titular: "Marta Rodríguez",
    expiracion: "Vence: 08/27",
    principal: false,
    icono: "fa-brands fa-cc-mastercard",
    colorIcono: "#eb001b"
  },
  {
    id: 3,
    tipo: "Interbank terminada en 4321",
    titular: "Marta Rodríguez",
    expiracion: "Vence: 05/28",
    principal: false,
    icono: "fa-solid fa-credit-card",
    colorIcono: "#00b159"
  },
  {
    id: 4,
    tipo: "YAPE",
    titular: "Marta Rodríguez",
    expiracion: "+51 987654321",
    principal: false,
    icono: "fa-solid fa-mobile-screen-button",
    colorIcono: "#732d8a"
  }
];

// ─── COMPONENTE HEADER UNIFICADO ───────────────────────────
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

// ─── COMPONENTE PRINCIPAL CON ENFOQUE MODULAR ───────────────
export default function Perfil4({ setPage }) {
  // El estado cambia al hacer clic, activando las clases de estilo correspondientes
  const [activeTab, setActiveTab] = useState("pagos");

  return (
    <>
      <style>{`
        .menu-profile-btn { width:100%; display:flex; align-items:center; gap:12px; background:none; border:none; padding:12px 16px; font-family:'Lato',sans-serif; font-size:13px; color:#2d1a10; text-align:left; cursor:pointer; border-radius:6px; transition: background .2s, color .2s; }
        .menu-profile-btn:hover { background:#fdf2f4; color:#c8506a; }
        .menu-profile-btn.active { background:#fdf2f4; color:#c8506a; font-weight:700; }
        
        .payment-card { display: flex; align-items: center; justify-content: space-between; border: 1px solid #fdf2f4; border-radius: 12px; padding: 16px; background: #fff; transition: box-shadow .2s; }
        .payment-card:hover { box-shadow: 0 4px 12px rgba(200,80,106,.04); }

        .footer-feature-item { display: flex; align-items: center; gap: 12px; font-family: 'Lato', sans-serif; font-size: 13px; color: #7a4055; font-weight: 600; }
        .footer-link { display: block; font-family: 'Lato', sans-serif; font-size: 13px; color: rgba(255,255,255,0.8); text-decoration: none; margin-bottom: 8px; transition: color .2s; }
        .footer-link:hover { color: #fff; }

        @media(max-width:900px){
          .profile-layout { flex-direction: column!important; }
          .profile-sidebar { width: 100%!important; }
          .payment-card { flex-direction: column; align-items: flex-start; gap: 16px; }
          .payment-actions { width: 100%; justify-content: space-between; border-top: 1px solid #fff0f2; padding-top: 12px; }
        }
        @media(max-width:600px) {
          .footer-features { flex-direction: column; gap: 16px; align-items: flex-start!important; }
          .footer-cols { flex-direction: column; gap: 32px; }
        }
      `}</style>

      <PageHeader />

      <main className="profile-layout" style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 60px", display: "flex", gap: 32 }}>
        
        {/* COLUMNA IZQUIERDA: DASHBOARD NAV */}
        <div className="profile-sidebar" style={{ width: 260, flexShrink: 0 }}>
          {/* Bloque Identificación de Usuario */}
          <div style={{ background: "#fff", border: "1px solid #f0d0d8", borderRadius: 12, padding: "24px 16px", textAlign: "center", marginBottom: 20, boxShadow: "0 2px 12px rgba(200,80,106,.05)" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#fdf2f4", border: "2px solid #f0d0d8", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: "#c8506a", marginBottom: 12 }}>
              <i className="fa-regular fa-user"></i>
            </div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: "#2d1a10", marginBottom: 4 }}>Marta Rodríguez</h3>
            <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: "#a07080", margin: 0 }}>marta.rodriguez@gmail.com</p>
          </div>

          {/* Menú de Botones Funcionales con estado activo */}
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

        {/* COLUMNA DERECHA: CONTENIDO DEL PANEL PRINCIPAL */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          
          <div style={{ background: "#fff", border: "1px solid #f0d0d8", borderRadius: 14, padding: "28px", boxShadow: "0 2px 14px rgba(200,80,106,.04)" }}>
            {/* Cabecera interna fija */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6, paddingBottom: 8, borderBottom: "1px solid #fdf2f4" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <i className="fa-solid fa-credit-card" style={{ color: "#c8506a" }}></i>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: "#2d1a10", margin: 0 }}>MÉTODOS DE PAGO</h3>
              </div>
              <button className="scr-btn-pink-sm" style={{ padding: "6px 14px", fontSize: 12 }}>+ Agregar tarjeta</button>
            </div>
            <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: "#a07080", marginTop: 0, marginBottom: 24 }}>Administra tus tarjetas y métodos de pago de forma segura.</p>

            {/* Listado de Tarjetas Fijo (No cambia ni oculta nada al clickear en la barra lateral) */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {METODOS_PAGO.map((card) => (
                <div key={card.id} className="payment-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 52, height: 40, background: "#fdf2f4", border: "1px solid #f0d0d8", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: card.colorIcono }}>
                      <i className={card.icono}></i>
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, fontWeight: 700, color: "#2d1a10", margin: 0 }}>{card.tipo}</h4>
                        {card.principal && (
                          <span style={{ background: "#fdf2f4", color: "#c8506a", border: "1px solid #f0d0d8", fontFamily: "'Lato',sans-serif", fontSize: 10, fontWeight: 700, padding: "1px 8px", borderRadius: 4 }}>
                            Principal
                          </span>
                        )}
                      </div>
                      <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: "#7a4055", margin: "2px 0 0 0" }}>
                        {card.titular} • <span style={{ color: "#a07080" }}>{card.expiracion}</span>
                      </p>
                    </div>
                  </div>

                  <div className="payment-actions" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ background: "#e8f5e9", color: "#2e7d32", border: "1px solid #c8e6c9", fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 6, height: 6, background: "#2e7d32", borderRadius: "50%" }}></span> Activo
                    </span>
                    <button style={{ background: "none", border: "none", color: "#a07080", cursor: "pointer", padding: 4 }}>
                      <i className="fa-regular fa-trash-can" style={{ fontSize: 14 }}></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Información de Seguridad Fija */}
            <div style={{ marginTop: 24, background: "#fff5f6", border: "1px solid #f0d0d8", borderRadius: 12, padding: "16px", display: "flex", gap: 14, alignItems: "start" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fff", border: "1px solid #f0d0d8", display: "flex", alignItems: "center", justifyContent: "center", color: "#c8506a", flexShrink: 0 }}>
                <i className="fa-solid fa-shield-halved" style={{ fontSize: 16 }}></i>
              </div>
              <div>
                <h5 style={{ fontFamily: "'Playfair Display',serif", fontSize: 13, fontWeight: 700, color: "#7a4055", margin: "0 0 4px 0" }}>Tus pagos están 100% protegidos</h5>
                <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: "#a07080", margin: 0, lineHeight: "1.5" }}>
                  Usamos tecnología de encriptación avanzada para proteger tu información financiera y asegurar que cada una de tus compras se procese de manera transparente y segura.
                </p>
              </div>
            </div>
          </div>

          {/* Banner publicitario de personalización */}
          <div style={{ background: "linear-gradient(135deg,#c8506a 0%,#a83858 100%)", borderRadius: 14, padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#fff" }}>
                <i className="fa-solid fa-cookie-bite"></i>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: "#fff", fontWeight: 700, margin: 0 }}>¿No encuentras lo que buscas?</h3>
                <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: "rgba(255,255,255,.8)", margin: "4px 0 0 0" }}>Contáctanos para realizar un design de repostería totalmente personalizado.</p>
              </div>
            </div>
            <button className="scr-btn-white" style={{ padding: "8px 20px", fontSize: 12 }}>Contactar 📞</button>
          </div>

        </div>
      </main>

      {/* ─── PRE-FOOTER: DETALLES DE VALOR DE MARCA ────────── */}
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

      {/* ─── FOOTER OFICIAL DE LA MARCA ──────────────────────── */}
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
import React, { useState } from 'react';

// Subcomponente de Contenido de Configuración
function ConfiguracionView() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      
      {/* NUEVA SECCIÓN SUPERIOR AÑADIDA */}
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "#5d4037", fontStyle: "italic", marginBottom: 15 }}>
          Tu espacio personal para organizar tus pedidos, favoritos<br />
          y disfrutar de una experiencia más dulce.
        </p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#2d1a10", margin: "0 0 20px 0" }}>MI PERFIL</h2>
      </div>

      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#2d1a10", margin: 0 }}>CONFIGURACIÓN</h2>
      <p style={{ color: "#9c7382", fontSize: 14 }}>Administra tu cuenta y las preferencias del sistema.</p>

      {/* 1. INFORMACIÓN DE LA CUENTA */}
      <div style={{ background: "#fff", border: "1px solid #f2d5dd", borderRadius: 12, padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontSize: 18, margin: 0 }}><i className="fa-regular fa-user" style={{ color: "#c8506a", marginRight: 10 }}></i> Información de la cuenta</h3>
          <button style={{ border: "1px solid #f2d5dd", background: "none", color: "#c8506a", padding: "4px 20px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Editar</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {[
            {l:"Nombre completo", v:"María Rodríguez"}, 
            {l:"Correo electrónico", v:"maria.rodriguez@gmail.com"}, 
            {l:"Teléfono", v:"+51 987654987"}, 
            {l:"Fecha de nacimiento", v:"15 de mayo de 1998"},
            {l:"Genero", v:"Femenino"},
            {l:"Fecha de registro", v:"20 de enero de 2024"}
          ].map((item, i) => (
            <div key={item.l} style={{ display: "flex", borderBottom: i < 5 ? "1px solid #fdf2f4" : "none", paddingBottom: "10px" }}>
              <div style={{ width: "40%", fontSize: 14, fontWeight: 600, color: "#2d1a10" }}>{item.l}</div>
              <div style={{ width: "60%", fontSize: 14, color: "#2d1a10" }}>{item.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. CAMBIAR CONTRASEÑA */}
      <div style={{ background: "#fff", border: "1px solid #f2d5dd", borderRadius: 12, padding: "24px" }}>
        <h3 style={{ fontSize: 18, marginBottom: 20 }}><i className="fa-solid fa-lock" style={{ color: "#c8506a", marginRight: 10 }}></i> Cambiar contraseña</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          {[ {p: "Ingrese su contraseña actual"}, {p: "Ingrese su nueva contraseña"}, {p: "Confirme su nueva contraseña"} ].map((input, idx) => (
            <div key={idx} style={{ position: "relative" }}>
              <input type="password" placeholder={input.p} style={{ width: "100%", padding: "12px 40px 12px 12px", borderRadius: 8, border: "1px solid #f2d5dd" }} />
            </div>
          ))}
          <button style={{ background: "#c8506a", color: "#fff", border: "none", padding: "12px", borderRadius: 8, alignSelf: "flex-end", cursor: "pointer" }}>Actualizar contraseña</button>
        </div>
      </div>

      {/* 3. NOTIFICACIONES */}
      <div style={{ background: "#fff", border: "1px solid #f2d5dd", borderRadius: 12, padding: "24px" }}>
        <h3 style={{ fontSize: 18, marginBottom: 20 }}><i className="fa-regular fa-bell" style={{ color: "#c8506a", marginRight: 10 }}></i> Notificaciones</h3>
        {[
          { t: "Nuevos pedidos", d: "Elige el modo de visualización" },
          { t: "Cambios en pedidos", d: "Selecciona el idioma del sistema" },
          { t: "Ofertas y promociones", d: "Selecciona tu zona horaria" },
          { t: "Recordatorios importantes", d: "Recibe recordatorios del sistema" },
          { t: "Notificaciones por correo", d: "Recibe notificaciones también por gmail" }
        ].map((n, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 0", borderBottom: i < 4 ? "1px solid #fdf2f4" : "none" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{n.t}</div>
              <div style={{ fontSize: 12, color: "#9c7382" }}>{n.d}</div>
            </div>
            <input type="checkbox" defaultChecked style={{ accentColor: "#c8506a", transform: "scale(1.2)" }} />
          </div>
        ))}
      </div>

      {/* 4. SEGURIDAD DE LA CUENTA */}
      <div style={{ background: "#fff", border: "1px solid #f2d5dd", borderRadius: 12, padding: "24px" }}>
        <h3 style={{ fontSize: 18, marginBottom: 20 }}><i className="fa-solid fa-shield-halved" style={{ color: "#c8506a", marginRight: 10 }}></i> Seguridad de la cuenta</h3>
        {[
          { t: "Verificación de dos pasos", d: "Aumenta la seguridad de tu cuenta", b: "ACTIVAR" },
          { t: "Dispositivos conectados", d: "Administra los dispositivos con acceso a tu cuenta", b: "VER DISPOSITIVOS" },
          { t: "Sesiones activas", d: "Revisa y cierra sesiones activas", b: "VER SESIONES" }
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 0", borderBottom: i < 2 ? "1px solid #fdf2f4" : "none" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{s.t}</div>
              <div style={{ fontSize: 12, color: "#9c7382" }}>{s.d}</div>
            </div>
            <button style={{ border: "1px solid #f2d5dd", background: "none", color: "#c8506a", padding: "6px 12px", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>{s.b}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente Principal
export default function Perfil6() {
  const [activeTab, setActiveTab] = useState("configuración");
  const menu = [
    { name: "Información personal", icon: "fa-user" },
    { name: "Mis pedidos", icon: "fa-bag-shopping" },
    { name: "Direcciones", icon: "fa-location-dot" },
    { name: "Métodos de pago", icon: "fa-credit-card" },
    { name: "Favoritos", icon: "fa-heart" },
    { name: "Configuración", icon: "fa-gear" }
  ];

  return (
    <>
      <div style={{ maxWidth: 1200, margin: "40px auto", display: "flex", gap: 32, padding: "0 20px" }}>
        <aside style={{ width: 280 }}>
          <div style={{ textAlign: "center", padding: 20, border: "1px solid #f2d5dd", borderRadius: 12, marginBottom: 20 }}>
            <div style={{ width: 70, height: 70, borderRadius: "50%", background: "#fdf2f4", margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#c8506a" }}>
              <i className="fa-solid fa-user" style={{ fontSize: 24 }}></i>
            </div>
            <h3 style={{ margin: 0 }}>María Rodríguez</h3>
          </div>
          <nav style={{ border: "1px solid #f2d5dd", borderRadius: 12, padding: "10px" }}>
            {menu.map(item => (
              <div key={item.name} onClick={() => setActiveTab(item.name.toLowerCase())} 
                style={{ padding: "12px", cursor: "pointer", borderRadius: 6, display: "flex", alignItems: "center", gap: 10,
                background: activeTab === item.name.toLowerCase() ? "#fdf2f4" : "transparent",
                color: activeTab === item.name.toLowerCase() ? "#c8506a" : "#2d1a10" }}>
                <i className={`fa-solid ${item.icon}`}></i> {item.name}
              </div>
            ))}
          </nav>
        </aside>
        <main style={{ flex: 1 }}>
          <ConfiguracionView />
        </main>
      </div>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer style={{ backgroundColor: "#c8506a", color: "#fff", padding: "40px 0", fontFamily: "'Lato', sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-around", paddingBottom: "40px", borderBottom: "1px solid #d9788f" }}>
        {["Ingredientes de primera calidad", "Hecho con amor en cada detalle", "Envíos seguros y rápidos", "Atención personalizada para ti"].map((text, i) => (
          <div key={i} style={{ textAlign: "center", width: "20%" }}>
            <p style={{ fontSize: 13, margin: 0 }}>{text}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "40px 60px", alignItems: "flex-start" }}>
        <div style={{ width: "25%" }}>
          <p style={{ fontSize: 13, lineHeight: 1.6 }}>En un mundo de experiencias duras con un pastel dale dulzura.</p>
        </div>
        <div style={{ width: "20%" }}>
          <h4 style={{ marginBottom: 15, fontSize: 14 }}>ENLACES</h4>
          {["Inicio", "Productos", "Ofertas", "Nosotros"].map(link => <p key={link} style={{ fontSize: 13, margin: "5px 0" }}>{link}</p>)}
        </div>
        <div style={{ width: "20%" }}>
          <h4 style={{ marginBottom: 15, fontSize: 14 }}>AYUDA</h4>
          {["Preguntas frecuentes", "Políticas de envío", "Términos y condiciones", "Políticas de privacidad"].map(link => <p key={link} style={{ fontSize: 13, margin: "5px 0" }}>{link}</p>)}
        </div>
        <div style={{ width: "25%" }}>
          <h4 style={{ marginBottom: 15, fontSize: 14 }}>CONTÁCTANOS</h4>
          <p style={{ fontSize: 13, margin: "5px 0" }}>Lima, Perú</p>
          <p style={{ fontSize: 13, margin: "5px 0" }}>+51 987654900</p>
          <p style={{ fontSize: 13, margin: "5px 0" }}>info@SweetCreamRose.com</p>
          <p style={{ fontSize: 13, margin: "5px 0" }}>Lunes a Sábado: 9am - 6pm</p>
        </div>
      </div>
      <div style={{ padding: "20px 60px", borderTop: "1px solid #d9788f", display: "flex", justifyContent: "space-between", fontSize: 12 }}>
        <div style={{ fontWeight: 600 }}>SÍGUENOS</div>
        <div>© 2026 Sweet Cream Rose. Todos los derechos reservados.</div>
      </div>
    </footer>
  );
}
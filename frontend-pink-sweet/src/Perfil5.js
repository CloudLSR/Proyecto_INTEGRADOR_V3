import { useState } from "react";

// ─── BASE DE DATOS EXACTA EXTRAÍDA DE TU IMAGEN ───
const PRODUCTOS_FAVORITOS = [
  {
    id: 1,
    nombre: "Torta Triple Chocolate",
    precio: "S/ 65.00",
    imagen: "🍰", 
    categoria: "Tortas"
  },
  {
    id: 2,
    nombre: "Tequeños Saborizados",
    precio: "S/ 22.00",
    imagen: "🥖",
    categoria: "Salados"
  },
  {
    id: 3,
    nombre: "Frutos del Bosque",
    precio: "S/ 75.00",
    imagen: "🧁",
    categoria: "Tortas"
  },
  {
    id: 4,
    nombre: "Red Velvet Spec",
    precio: "S/ 85.00",
    imagen: "🎂",
    categoria: "Especiales"
  },
  {
    id: 5,
    nombre: "Mini Empanadas de Carne",
    precio: "S/ 20.00",
    imagen: "🥟",
    categoria: "Salados"
  },
  {
    id: 6,
    nombre: "Alfajores de Manjar",
    precio: "S/ 18.00",
    imagen: "🍪",
    categoria: "Dulces"
  },
  {
    id: 7,
    nombre: "Mousse de Fresa",
    precio: "S/ 15.00",
    imagen: "🍨",
    categoria: "Postres"
  },
  {
    id: 8,
    nombre: "Cupcake Extra Chocolate",
    precio: "S/ 12.00",
    imagen: "🧁",
    categoria: "Postres"
  }
];

// ─── NAVBAR SUPERIOR DE LA MARCA ────────────────────────────
function Navbar() {
  return (
    <nav style={{ background: "#b2586c", padding: "14px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 4px rgba(0,0,0,0.08)" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 22, fontWeight: "bold", color: "#fff", letterSpacing: "0.5px" }}>
        Sweet Cream Rose
      </div>
      <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
        <a href="#inicio" style={{ color: "#fff", textDecoration: "none", fontFamily: "'Lato', sans-serif", fontSize: 13, fontWeight: "500" }}>INICIO</a>
        <a href="#productos" style={{ color: "#fff", textDecoration: "none", fontFamily: "'Lato', sans-serif", fontSize: 13, fontWeight: "500" }}>PRODUCTOS</a>
        <a href="#ofertas" style={{ color: "#fff", textDecoration: "none", fontFamily: "'Lato', sans-serif", fontSize: 13, fontWeight: "500" }}>OFERTAS</a>
        <a href="#nosotros" style={{ color: "#fff", textDecoration: "none", fontFamily: "'Lato', sans-serif", fontSize: 13, fontWeight: "500" }}>NOSOTROS</a>
        <div style={{ position: "relative", marginLeft: 10 }}>
          <input type="text" placeholder="Buscar..." style={{ padding: "8px 36px 8px 16px", borderRadius: 20, border: "none", fontSize: 13, width: 200, outline: "none" }} />
          <i className="fa-solid fa-magnifying-glass" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#b2586c", fontSize: 13 }}></i>
        </div>
        <i className="fa-regular fa-user" style={{ color: "#fff", cursor: "pointer", fontSize: 18 }}></i>
        <i className="fa-solid fa-cart-shopping" style={{ color: "#fff", cursor: "pointer", fontSize: 18 }}></i>
      </div>
    </nav>
  );
}

// ─── ENCABEZADO "MI PERFIL" SEPARADO ────────────────────────
function PageHeader() {
  return (
    <section style={{ background: "#fdf2f4", padding: "50px 20px", textAlign: "center", borderBottom: "1px solid #f2d5dd" }}>
      <div style={{ width: 84, height: 84, borderRadius: "50%", background: "#fff", border: "1px solid #f2d5dd", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 18, fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: "bold", color: "#c8506a", fontSize: 22, boxShadow: "0 2px 8px rgba(200,80,106,0.05)" }}>
        SCR
      </div>
      <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 18, color: "#6b3949", margin: "0 auto 24px", maxWidth: 600, lineHeight: 1.4 }}>
        "Tu espacio personal para organizar tus pedidos, favoritos y disfrutar de una experiencia más dulce."
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <div style={{ height: "1px", width: 70, background: "#e5b8c4" }}></div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: "bold", color: "#2d1a10", letterSpacing: "4px", margin: 0 }}>MI PERFIL</h2>
        <div style={{ height: "1px", width: 70, background: "#e5b8c4" }}></div>
      </div>
      <div style={{ marginTop: 10, color: "#c8506a", fontSize: 16, letterSpacing: "3px" }}>— 🤍 —</div>
    </section>
  );
}

// ─── COMPONENTE DASHBOARD PRINCIPAL (VISTA FIEL A PERFIL5.PNG) ───
export default function Perfi5({ setPage }) {
  // Inicializado por defecto en 'favoritos' tal como tu vista de la imagen
  const [activeTab, setActiveTab] = useState("favoritos");

  return (
    <>
      <style>{`
        /* Tipografías e Imports base */
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap');
        
        body { background-color: #fcfcfc; margin: 0; }

        /* Botonera Izquierda */
        .menu-profile-btn { width: 100%; display: flex; align-items: center; gap: 14px; background: none; border: none; padding: 13px 18px; font-family: 'Lato', sans-serif; font-size: 13.5px; color: #3d2519; text-align: left; cursor: pointer; border-radius: 8px; transition: all 0.2s ease; margin-bottom: 4px; }
        .menu-profile-btn i { font-size: 15px; color: #7c5c67; transition: color 0.2s; }
        .menu-profile-btn:hover { background: #fdf2f4; color: #c8506a; }
        .menu-profile-btn:hover i { color: #c8506a; }
        .menu-profile-btn.active { background: #fdf2f4; color: #c8506a; font-weight: 700; }
        .menu-profile-btn.active i { color: #c8506a; }
        
        /* Grid de Productos Favoritos */
        .fav-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 20px; }
        .fav-card { border: 1px solid #f2d5dd; border-radius: 8px; overflow: hidden; background: #fff; display: flex; flex-direction: column; justify-content: space-between; position: relative; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 2px 6px rgba(200,80,106,0.02); }
        .fav-card:hover { transform: translateY(-2px); box-shadow: 0 6px 14px rgba(200,80,106,0.06); }
        
        /* Contenedor de Foto/Emoji de la Tarjeta */
        .fav-card-img { height: 150px; background: #faf4f5; display: flex; align-items: center; justify-content: center; font-size: 52px; border-bottom: 1px solid #fdf2f4; }
        
        /* Botón de Carrito del Item */
        .btn-add-cart { width: 100%; background: #c8506a; color: #fff; border: none; padding: 8px 0; border-radius: 6px; font-family: 'Lato', sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 12px; transition: background 0.2s; }
        .btn-add-cart:hover { background: #b2586c; }

        /* Ajustes de Footer */
        .footer-feature-item { display: flex; align-items: center; gap: 12px; font-family: 'Lato', sans-serif; font-size: 14px; color: #6b3949; font-weight: 600; }
        .footer-link { display: block; font-family: 'Lato', sans-serif; font-size: 13.5px; color: rgba(255,255,255,0.85); text-decoration: none; margin-bottom: 10px; transition: color 0.2s; }
        .footer-link:hover { color: #fff; text-decoration: underline; }

        /* Media Queries de Adaptabilidad */
        @media(max-width: 950px){
          .profile-layout { flex-direction: column !important; }
          .profile-sidebar { width: 100% !important; }
        }
        @media(max-width: 600px) {
          .footer-features { flex-direction: column; gap: 20px; align-items: flex-start !important; }
          .footer-cols { flex-direction: column; gap: 36px; }
          .fav-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 14px; }
          .fav-card-img { height: 120px; font-size: 40px; }
        }
      `}</style>

      <Navbar />
      <PageHeader />

      <main className="profile-layout" style={{ maxWidth: 1240, margin: "0 auto", padding: "45px 24px 70px", display: "flex", gap: 36 }}>
        
        {/* PARTE IZQUIERDA: MENÚ DE CONFIGURACIONES DEL CLIENTE */}
        <div className="profile-sidebar" style={{ width: 290, flexShrink: 0 }}>
          {/* Tarjeta de Datos de Usuario Resumida */}
          <div style={{ background: "#fff", border: "1px solid #f2d5dd", borderRadius: 12, padding: "26px 20px", textAlign: "center", marginBottom: 24, boxShadow: "0 4px 16px rgba(200,80,106,0.03)" }}>
            <div style={{ width: 76, height: 76, borderRadius: "50%", background: "#fdf2f4", border: "2px solid #f2d5dd", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 30, color: "#c8506a", marginBottom: 14 }}>
              <i className="fa-regular fa-user"></i>
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: "bold", color: "#2d1a10", margin: "0 0 4px 0" }}>Marta Rodríguez</h3>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 13, color: "#9c7382", margin: 0 }}>marta.rodriguez@gmail.com</p>
          </div>

          {/* Menú de Opciones Interactivo (Mantiene la vista fija) */}
          <div style={{ background: "#fff", border: "1px solid #f2d5dd", borderRadius: 12, padding: "12px", boxShadow: "0 4px 16px rgba(200,80,106,0.03)" }}>
            <button className={`menu-profile-btn ${activeTab === "info" ? "active" : ""}`} onClick={() => setActiveTab("info")}>
              <i className="fa-solid fa-id-card" style={{ width: 18 }}></i> Información personal
            </button>
            <button className={`menu-profile-btn ${activeTab === "pedidos" ? "active" : ""}`} onClick={() => setActiveTab("pedidos")}>
              <i className="fa-solid fa-bag-shopping" style={{ width: 18 }}></i> Mis pedidos
            </button>
            <button className={`menu-profile-btn ${activeTab === "direcciones" ? "active" : ""}`} onClick={() => setActiveTab("direcciones")}>
              <i className="fa-solid fa-location-dot" style={{ width: 18 }}></i> Direcciones
            </button>
            <button className={`menu-profile-btn ${activeTab === "pagos" ? "active" : ""}`} onClick={() => setActiveTab("pagos")}>
              <i className="fa-solid fa-credit-card" style={{ width: 18 }}></i> Métodos de pago
            </button>
            <button className={`menu-profile-btn ${activeTab === "favoritos" ? "active" : ""}`} onClick={() => setActiveTab("favoritos")}>
              <i className="fa-solid fa-heart" style={{ width: 18 }}></i> Favoritos
            </button>
            <button className={`menu-profile-btn ${activeTab === "config" ? "active" : ""}`} onClick={() => setActiveTab("config")}>
              <i className="fa-solid fa-gear" style={{ width: 18 }}></i> Configuración
            </button>
            <hr style={{ border: "none", borderTop: "1px solid #f2d5dd", margin: "10px 0" }} />
            <button className="menu-profile-btn" style={{ color: "#c8506a" }} onClick={() => setPage && setPage("inicio")}>
              <i className="fa-solid fa-right-from-bracket" style={{ width: 18 }}></i> Cerrar sesión
            </button>
          </div>
        </div>

        {/* PARTE DERECHA: SECCIÓN EXACTA DE "MIS FAVORITOS" CLONADA DE PERFIL5.PNG */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          
          <div style={{ background: "#fff", border: "1px solid #f2d5dd", borderRadius: 12, padding: "34px", boxShadow: "0 4px 16px rgba(200,80,106,0.02)" }}>
            
            {/* Header del Bloque de Favoritos */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6, paddingBottom: 14, borderBottom: "1px solid #faf4f5" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <i className="fa-solid fa-heart" style={{ color: "#c8506a", fontSize: 20 }}></i>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: "bold", color: "#2d1a10", margin: 0, letterSpacing: "0.2px" }}>MIS FAVORITOS</h3>
              </div>
              <button style={{ background: "none", border: "none", color: "#c8506a", fontFamily: "'Lato', sans-serif", fontSize: 13, fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <i className="fa-regular fa-trash-can"></i> Eliminar todos
              </button>
            </div>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, color: "#9c7382", marginTop: 0, marginBottom: 32 }}>Tus productos favoritos, listos para añadir en tu próximo pedido.</p>

            {/* Malla Completa de los Productos Guardados */}
            <div className="fav-grid">
              {PRODUCTOS_FAVORITOS.map((prod) => (
                <div key={prod.id} className="fav-card">
                  
                  {/* Icono Redondo de Favorito Activo sobre la Imagen */}
                  <div style={{ position: "absolute", top: 10, right: 10, background: "#fff", width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", color: "#c8506a", fontSize: 13, cursor: "pointer", zIndex: 2 }}>
                    <i className="fa-solid fa-heart"></i>
                  </div>
                  
                  {/* Contenedor Visual del Producto */}
                  <div className="fav-card-img">
                    {prod.imagen}
                  </div>

                  {/* Metadatos y Textos Descriptivos de la Tarjeta */}
                  <div style={{ padding: "14px", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}>
                    <div>
                      <span style={{ fontFamily: "'Lato', sans-serif", fontSize: 10.5, textTransform: "uppercase", color: "#9c7382", fontWeight: "600", letterSpacing: "0.5px" }}>{prod.categoria}</span>
                      <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 14.5, fontWeight: "bold", color: "#2d1a10", margin: "4px 0 8px" }}>{prod.nombre}</h4>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 15, fontWeight: "700", color: "#c8506a" }}>{prod.precio}</div>
                      <button className="btn-add-cart">
                        <i className="fa-solid fa-basket-shopping"></i> Añadir al carrito
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cuadro de Información inferior (Caja de tips) */}
            <div style={{ marginTop: 32, background: "#faf4f5", border: "1px solid #f2d5dd", borderRadius: 12, padding: "20px 24px", display: "flex", gap: 18, alignItems: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#fff", border: "1px solid #f2d5dd", display: "flex", alignItems: "center", justifyContent: "center", color: "#c8506a", flexShrink: 0, boxShadow: "0 2px 6px rgba(0,0,0,0.02)" }}>
                <i className="fa-solid fa-gift" style={{ fontSize: 18 }}></i>
              </div>
              <div>
                <h5 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: "bold", color: "#6b3949", margin: "0 0 3px 0" }}>Guarda tus favoritos y encuéntralos siempre que los necesites</h5>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 12.5, color: "#9c7382", margin: 0 }}>
                  Los antojos más dulces siempre a un solo click de tu mesa.
                </p>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* ─── CINTA INTERMEDIA DE BENEFICIOS DE MARCA ──────────────── */}
      <section style={{ background: "#fdf2f4", padding: "26px 20px", borderTop: "1px solid #f2d5dd", borderBottom: "1px solid #f2d5dd" }}>
        <div className="footer-features" style={{ maxWidth: 1240, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div className="footer-feature-item">
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#c8506a", border: "1px solid #f2d5dd" }}><i className="fa-solid fa-cake-candles"></i></div>
            <span>Ingredientes de primera calidad</span>
          </div>
          <div className="footer-feature-item">
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#c8506a", border: "1px solid #f2d5dd" }}><i className="fa-solid fa-heart"></i></div>
            <span>Hecho con amor en cada detalle</span>
          </div>
          <div className="footer-feature-item">
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#c8506a", border: "1px solid #f2d5dd" }}><i className="fa-solid fa-truck"></i></div>
            <span>Envíos seguros y rápidos</span>
          </div>
          <div className="footer-feature-item">
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#c8506a", border: "1px solid #f2d5dd" }}><i className="fa-solid fa-user-tag"></i></div>
            <span>Atención personalizada para ti</span>
          </div>
        </div>
      </section>

      {/* ─── FOOTER INSTITUCIONAL COMPLETO ────────────────────── */}
      <footer style={{ background: "#b2586c", padding: "50px 24px 24px", color: "#fff" }}>
        <div className="footer-cols" style={{ maxWidth: 1240, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: 40, flexWrap: "wrap", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: 36 }}>
          <div style={{ maxWidth: 300 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 18 }}>Sweet Cream Rose</div>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 13.5, color: "rgba(255,255,255,0.85)", lineHeight: "1.6", margin: 0 }}>
              Creamos momentos inolvidables con la mejor pastelería artesanal y detalles hechos con la más alta dedicación y amor.
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: "bold", marginBottom: 18, letterSpacing: "1px" }}>ENLACES</h4>
            <a href="#inicio" className="footer-link">Inicio</a>
            <a href="#productos" className="footer-link">Productos</a>
            <a href="#ofertas" className="footer-link">Ofertas</a>
            <a href="#nosotros" className="footer-link">Nosotros</a>
          </div>
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: "bold", marginBottom: 18, letterSpacing: "1px" }}>AYUDA</h4>
            <a href="#preguntas" className="footer-link">Preguntas frecuentes</a>
            <a href="#politicas" className="footer-link">Políticas de envío</a>
            <a href="#terminos" className="footer-link">Términos y condiciones</a>
            <a href="#privacidad" className="footer-link">Políticas de privacidad</a>
          </div>
          <div style={{ maxWidth: 260 }}>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: "bold", marginBottom: 18, letterSpacing: "1px" }}>CONTÁCTANOS</h4>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 13.5, color: "rgba(255,255,255,0.8)", margin: "0 0 10px 0" }}><i className="fa-solid fa-location-dot" style={{ marginRight: 10 }}></i> Lima, Perú</p>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 13.5, color: "rgba(255,255,255,0.8)", margin: "0 0 10px 0" }}><i className="fa-solid fa-phone" style={{ marginRight: 10 }}></i> +51 987654321</p>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 13.5, color: "rgba(255,255,255,0.8)", margin: "0 0 10px 0" }}><i className="fa-solid fa-envelope" style={{ marginRight: 10 }}></i> hola@sweetcreamrose.com</p>
          </div>
        </div>
        
        <div style={{ maxWidth: 1240, margin: "24px auto 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, fontFamily: "'Lato', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.75)" }}>
          <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: "700" }}>SÍGUENOS:</span>
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
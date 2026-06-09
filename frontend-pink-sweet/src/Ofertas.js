import React, { useState } from 'react';

// Imágenes de Ofertas
import tortaFresa       from "./assets/products/torta de fresa.png";
import tortaChoco       from "./assets/products/torta triple chocolate.jpg";
import trufas           from "./assets/products/trufas.png";
import empanadas        from "./assets/products/empanadas.png";
import alfajores        from "./assets/products/alfajores.png";
import cupcakeArandano  from "./assets/products/cupcake_arandano.png";
import logo             from "./assets/products/logo.png";

// Datos de Ofertas
const offerProducts = [
  { img: tortaChoco,      name: "Torta Triple Chocolate",  desc: "Bizcocho de chocolate con relleno y cobertura de ganache, decorada con crema de chocolate.", oldPrice: "S/. 80.00", newPrice: "S/. 64.00", discount: "-20%" },
  { img: trufas,          name: "Trufas de Fresa",         desc: "Delicadas trufas de chocolate rellenas con crema sabor fresa.",                              oldPrice: "S/. 45.00", newPrice: "S/. 33.75", discount: "-25%" },
  { img: empanadas,       name: "Mini Empanadas de Carne", desc: "Empanadas doradas con relleno de carne casera.",                                             oldPrice: "S/. 36.00", newPrice: "S/. 30.60", discount: "-15%" },
  { img: alfajores,       name: "Alfajor Clásico",         desc: "Alfajores artesanales rellenos de manjar y espolvoreados con azúcar.",                       oldPrice: "S/. 28.00", newPrice: "S/. 22.40", discount: "-20%" },
  { img: cupcakeArandano, name: "Cupcakes de Arándano",    desc: "Cupcakes esponjosos decorados con crema y arándanos frescos.",                               oldPrice: "S/. 42.00", newPrice: "S/. 37.80", discount: "-10%" },
];

const valueProps = [
  { icon: "fa-seedling",   label: "Ingredientes de primera calidad" },
  { icon: "fa-heart",      label: "Hecho con amor en cada detalle" },
  { icon: "fa-truck",      label: "Envíos seguros y rápidos" },
  { icon: "fa-user",       label: "Atención personalizada para ti" },
];

// Componente Encabezado de Página
function PageHeader({ title, subtitle1, subtitle2 }) {
  return (
    <section style={{ background:"#fdf2f4", padding:"48px 24px 32px", textAlign:"center", borderBottom:"1px solid #f0d0d8" }}>
      <img src={logo} alt="Sweet Cream Rose" style={{ height:80, objectFit:"contain", marginBottom:16 }} />
      <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:18, color:"#7a4055", marginBottom:6 }}>{subtitle1}</p>
      <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:16, color:"#a07080", marginBottom:28 }}>{subtitle2}</p>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16 }}>
        <div style={{ height:1, width:60, background:"#f0d0d8" }}></div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:"#2d1a10", letterSpacing:3 }}>{title}</h2>
        <div style={{ height:1, width:60, background:"#f0d0d8" }}></div>
      </div>
      <div style={{ marginTop:8, color:"#c8506a", fontSize:18, letterSpacing:4 }}>— 🤍 —</div>
    </section>
  );
}

const Ofertas = ({ setPage }) => {
  const [wishlist, setWishlist] = useState([]);
  const toggleWish = i => setWishlist(w => w.includes(i) ? w.filter(x => x !== i) : [...w, i]);

  const scrollToGrid = () => document.getElementById("ofertas-grid")?.scrollIntoView({ behavior:"smooth" });

  return (
    <>
      <PageHeader title="OFERTAS"
        subtitle1="Aprovecha nuestras ofertas en postres artesanales hechos con amor."
        subtitle2="Sabores irresistibles ahora a precios especiales." />

      <section style={{ background:"linear-gradient(135deg,#fdf2f4 0%,#f5c8d8 100%)", padding:"52px 40px" }}>
        <div className="hero-offer-inner" style={{ maxWidth:1000, margin:"0 auto", display:"flex", alignItems:"center", gap:48, flexWrap:"wrap" }}>
          <div style={{ flex:1, minWidth:260 }}>
            <span style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#c8506a", color:"#fff", fontFamily:"'Lato',sans-serif", fontSize:12, fontWeight:700, letterSpacing:1.5, padding:"6px 16px", borderRadius:20, marginBottom:20 }}>
              <i className="fa-solid fa-heart"></i> DESCUENTOS ESPECIALES
            </span>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:36, fontWeight:700, color:"#2d1a10", marginBottom:14, lineHeight:1.25 }}>Disfruta lo mejor por menos</h2>
            <p style={{ fontFamily:"'Lato',sans-serif", fontSize:16, color:"#7a4055", marginBottom:32, lineHeight:1.7 }}>Aprovecha nuestras ofertas por tiempo limitado en tus productos favoritos.</p>
            <button className="scr-btn-primary" onClick={scrollToGrid}>
              APROVECHAR OFERTA <i className="fa-solid fa-arrow-right" style={{ marginLeft:8 }}></i>
            </button>
          </div>
          <div style={{ flex:"0 0 300px", position:"relative", display:"flex", justifyContent:"center" }}>
            <img src={tortaFresa} alt="Torta Especial de Oferta"
              style={{ width:260, height:260, objectFit:"cover", borderRadius:"50%", border:"6px solid #fff", boxShadow:"0 8px 32px rgba(200,80,106,.25)", display:"block" }} />
            <div style={{ position:"absolute", top:0, right:20, width:72, height:72, borderRadius:"50%", background:"#c8506a", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 12px rgba(200,80,106,.4)" }}>
              <span style={{ fontFamily:"'Lato',sans-serif", fontSize:10, fontWeight:700, color:"rgba(255,255,255,.8)", letterSpacing:1 }}>Hasta</span>
              <span style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:"#fff", lineHeight:1 }}>25%</span>
              <span style={{ fontFamily:"'Lato',sans-serif", fontSize:10, fontWeight:700, color:"rgba(255,255,255,.8)", letterSpacing:1 }}>DSCTO.</span>
            </div>
          </div>
        </div>
      </section>

      <section id="ofertas-grid" style={{ maxWidth:1100, margin:"0 auto", padding:"60px 24px" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:12 }}>
            <i className="fa-solid fa-tag" style={{ color:"#c8506a", fontSize:18 }}></i>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:"#2d1a10", letterSpacing:2 }}>OFERTAS DESTACADAS</span>
          </div>
          <div style={{ marginTop:8, color:"#c8506a", letterSpacing:6, fontSize:14 }}>— — — — — —</div>
        </div>
        <div className="offers-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
          {offerProducts.map((p, i) => (
            <div key={i} className="offer-card">
              <span className="badge-discount">{p.discount}</span>
              <button className={`wishlist-btn${wishlist.includes(i) ? " active" : ""}`} onClick={() => toggleWish(i)}>
                <i className={wishlist.includes(i) ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
              </button>
              <img src={p.img} alt={p.name} />
              <div style={{ padding:"16px 18px" }}>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:700, color:"#2d1a10", marginBottom:6 }}>{p.name}</h3>
                <p style={{ fontFamily:"'Lato',sans-serif", fontSize:13, color:"#7a4055", lineHeight:1.6, marginBottom:14 }}>{p.desc}</p>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:4 }}>
                  <span style={{ fontFamily:"'Lato',sans-serif", fontSize:13, color:"#b0a0a5", textDecoration:"line-through" }}>{p.oldPrice}</span>
                  <span style={{ fontFamily:"'Lato',sans-serif", fontSize:18, fontWeight:700, color:"#c8506a" }}>{p.newPrice}</span>
                </div>
                <button className="btn-add-cart">
                  <i className="fa-solid fa-cart-shopping" style={{ marginRight:8 }}></i>AÑADIR AL CARRITO
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding:"0 24px 48px" }}>
        <div style={{ maxWidth:900, margin:"0 auto", background:"linear-gradient(135deg,#c8506a 0%,#a83858 100%)", borderRadius:14, padding:"28px 40px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:20 }}>
          <div style={{ display:"flex", alignItems:"center", gap:20 }}>
            <div style={{ width:54, height:54, borderRadius:"50%", background:"rgba(255,255,255,.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, color:"#fff", flexShrink:0 }}>
              <i className="fa-regular fa-clock"></i>
            </div>
            <div>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:"#fff", marginBottom:4 }}>¡OFERTAS POR TIEMPO LIMITADO!</h3>
              <p style={{ fontFamily:"'Lato',sans-serif", fontSize:14, color:"rgba(255,255,255,.85)" }}>No te quedes sin tus favoritos. Promociones válidas hasta agotar stock</p>
            </div>
          </div>
          <button className="scr-btn-white" onClick={scrollToGrid}>¡APROVÉCHALOS YA!</button>
        </div>
      </section>

      <section style={{ background:"#fdf2f4", padding:"48px 24px", borderTop:"1px solid #f0d0d8" }}>
        <div className="value-props-grid" style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24 }}>
          {valueProps.map((v, i) => (
            <div key={i} className="prop-item">
              <div className="prop-icon"><i className={`fa-solid ${v.icon}`}></i></div>
              <span style={{ fontFamily:"'Lato',sans-serif", fontSize:13, color:"#5a3040", fontWeight:600, lineHeight:1.5 }}>{v.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Ofertas;
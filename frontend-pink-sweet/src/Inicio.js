import React, { useState, useEffect, useRef } from 'react';

// Imágenes de Inicio
import torta from "./assets/products/torta_principal.jpg";
import navidad from "./assets/products/navidad.jpg";
import halloween from "./assets/products/halloween.jpg";
import cupcake from "./assets/products/cupcake.jpg";
import payLimon from "./assets/products/pay_limon.jpg";
import flan from "./assets/products/flan.jpg";
import galletas from "./assets/products/galletas.jpg";
import gelatina from "./assets/products/gelatina.jpg";
import pastelImposible from "./assets/products/pastel_imposible.jpg";

// Datos de Inicio
const slides = [
  { img: torta,     title: "Nuestros Especiales",  text: "Especiales para cualquier ocasión y disfrutar con las personas que más quieres" },
  { img: navidad,   title: "Postres Navideños",    text: "Celebra la navidad con los mejores postres artesanales para compartir en familia" },
  { img: halloween, title: "Postres de Halloween",  text: "Sorprende a todos con postres espeluznantes y deliciosos para Halloween" },
];

const homeProducts = [
  { img: cupcake,        label: "Cupcake de fresa" },
  { img: payLimon,       label: "Pay de limón" },
  { img: flan,           label: "Flan de vainilla" },
  { img: galletas,       label: "Galletas de fresa" },
  { img: gelatina,       label: "Gelatina" },
  { img: pastelImposible,label: "Pastel de Flan con Chocolate" },
];

const testimonials = [
  { name: "Juliana López",   text: "Sus paquetes son ideales para regalar sorpresas." },
  { name: "Emilio Orozco",   text: "Entregan a tiempo y con buena calidad cada postre." },
  { name: "Valentina Gómez", text: "Tienen ricos sabores y los productos llegan a tiempo." },
];

const Inicio = ({ setPage }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(testimonials);
  const timerRef = useRef(null);

  const startSlider = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrentSlide(s => (s + 1) % slides.length), 4000);
  };
  
  useEffect(() => { 
    startSlider(); 
    return () => clearInterval(timerRef.current); 
  }, []);
  
  const goToSlide = i => { 
    setCurrentSlide(i); 
    startSlider(); 
  };

  const handleComment = e => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;
    setComments([{ name: commentName, text: commentText }, ...comments]);
    setCommentName(""); 
    setCommentText("");
  };

  return (
    <>
      <section style={{ position:"relative", background:"#fdf2f4", overflow:"hidden" }}>
        {slides.map((slide, i) => (
          <div key={i} className={`hero-slide${currentSlide === i ? " active" : ""}`} style={{ alignItems:"stretch", minHeight:420 }}>
            <div style={{ flex:"0 0 55%", overflow:"hidden", maxHeight:480 }}>
              <img src={slide.img} alt={slide.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
            </div>
            <div className="hero-text-block" style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding:"40px 56px", background:"#fdf2f4" }}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:36, fontWeight:700, color:"#2d1a10", marginBottom:16, lineHeight:1.25 }}>{slide.title}</h2>
              <p style={{ fontFamily:"'Lato',sans-serif", fontSize:16, color:"#7a4055", marginBottom:32, lineHeight:1.7 }}>{slide.text}</p>
              <button className="scr-btn-primary" onClick={() => setPage("productos")}>Ver más</button>
            </div>
          </div>
        ))}
        <div style={{ position:"absolute", bottom:18, left:"50%", transform:"translateX(-50%)", display:"flex", gap:8 }}>
          {slides.map((_, i) => (
            <span key={i} className="dot" style={{ background: currentSlide === i ? "#c8506a" : "rgba(200,80,106,.3)" }} onClick={() => goToSlide(i)} />
          ))}
        </div>
      </section>

      <main style={{ maxWidth:1100, margin:"0 auto", padding:"60px 24px 40px" }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:700, textAlign:"center", color:"#2d1a10", letterSpacing:2, marginBottom:36, textTransform:"uppercase" }}>Lo más comprado</h2>
        <div className="home-products-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
          {homeProducts.map((p, i) => (
            <div key={i} className="product-card-wrap" onClick={() => setPage("productos")}>
              <div style={{ overflow:"hidden" }}>
                <img src={p.img} alt={p.label} className="product-card-img" />
              </div>
              <div style={{ padding:"12px 16px", fontFamily:"'Lato',sans-serif", fontSize:14, fontWeight:700, color:"#2d1a10", letterSpacing:.5 }}>{p.label}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:36 }}>
          <button className="scr-btn-outline" onClick={() => setPage("productos")}>Ver más</button>
        </div>
      </main>

      <section style={{ background:"#fdf2f4", padding:"60px 24px" }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:700, textAlign:"center", color:"#2d1a10", letterSpacing:2, marginBottom:40, textTransform:"uppercase" }}>Promociones de Festividad</h2>
        <div className="festi-row" style={{ display:"flex", borderRadius:14, overflow:"hidden", maxWidth:960, margin:"0 auto 28px", background:"linear-gradient(135deg,#1a3c2e 0%,#2d6647 100%)", boxShadow:"0 4px 24px rgba(0,0,0,.13)" }}>
          <div style={{ flex:1, padding:"40px 44px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, color:"#fff", marginBottom:14, lineHeight:1.3 }}>POSTRES para acompañar esta <span style={{ color:"#f5d76e" }}>NAVIDAD</span></h3>
            <p style={{ fontFamily:"'Lato',sans-serif", fontSize:15, color:"rgba(255,255,255,.85)", marginBottom:28, lineHeight:1.7 }}>Mira los mejores postres para esta navidad y pasar tiempo en familia inolvidable.</p>
            <button className="scr-btn-white" style={{ alignSelf:"flex-start" }} onClick={() => setPage("ofertas")}>Ver más</button>
          </div>
          <div style={{ flex:"0 0 42%", overflow:"hidden", maxHeight:280 }}>
            <img src={navidad} alt="Postres Navideños" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
          </div>
        </div>
        <div className="festi-row" style={{ display:"flex", borderRadius:14, overflow:"hidden", maxWidth:960, margin:"0 auto", background:"linear-gradient(135deg,#2b1a0e 0%,#5c3010 100%)", boxShadow:"0 4px 24px rgba(0,0,0,.13)" }}>
          <div style={{ flex:1, padding:"40px 44px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, color:"#fff", marginBottom:14, lineHeight:1.3 }}>POSTRES para disfrutar en <span style={{ color:"#ff8c00" }}>HALLOWEEN</span></h3>
            <p style={{ fontFamily:"'Lato',sans-serif", fontSize:15, color:"rgba(255,255,255,.85)", marginBottom:28, lineHeight:1.7 }}>Descubre nuestros deliciosos postres para Halloween y organiza una fiesta espeluznante.</p>
            <button className="scr-btn-white" style={{ alignSelf:"flex-start" }} onClick={() => setPage("ofertas")}>Ver más</button>
          </div>
          <div style={{ flex:"0 0 42%", overflow:"hidden", maxHeight:280 }}>
            <img src={halloween} alt="Postres Halloween" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
          </div>
        </div>
        <div style={{ textAlign:"center", marginTop:36 }}>
          <button className="scr-btn-outline" onClick={() => setPage("ofertas")}>Ver más</button>
        </div>
      </section>

      <section style={{ maxWidth:900, margin:"0 auto", padding:"60px 24px" }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:700, textAlign:"center", color:"#2d1a10", letterSpacing:2, marginBottom:36, textTransform:"uppercase" }}>Deja tu comentario</h2>
        <form onSubmit={handleComment} style={{ background:"#fdf2f4", borderRadius:12, padding:"30px 36px", marginBottom:40, border:"1px solid #f0d0d8" }}>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontFamily:"'Lato',sans-serif", fontSize:12, fontWeight:700, letterSpacing:1.5, color:"#7a4055", marginBottom:6, textTransform:"uppercase" }}>Nombre</label>
            <input type="text" value={commentName} onChange={e => setCommentName(e.target.value)} placeholder="Escribe tu nombre completo"
              style={{ width:"100%", border:"1px solid #f0d0d8", borderRadius:6, padding:"10px 14px", fontSize:14, outline:"none", fontFamily:"'Lato',sans-serif", background:"#fff", color:"#2d1a10" }} />
          </div>
          <div style={{ marginBottom:20 }}>
            <textarea value={commentText} onChange={e => setCommentText(e.target.value)} rows={4} placeholder="Deja un comentario"
              style={{ width:"100%", border:"1px solid #f0d0d8", borderRadius:6, padding:"10px 14px", fontSize:14, outline:"none", resize:"vertical", fontFamily:"'Lato',sans-serif", background:"#fff", color:"#2d1a10" }} />
          </div>
          <div style={{ textAlign:"right" }}>
            <button type="submit" className="scr-btn-primary">COMENTAR</button>
          </div>
        </form>
        <div className="testimonials-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
          {comments.slice(0,6).map((t,i) => (
            <div key={i} className="testimonial-card">
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:15, color:"#c8506a", marginBottom:10 }}>{t.name}</div>
              <div style={{ fontFamily:"'Lato',sans-serif", fontSize:14, color:"#5a3040", lineHeight:1.6 }}>{t.text}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Inicio;
import React, { useState, useEffect } from 'react';
import { API_BASE, apiGet, authHeaders, getToken, notificarCarrito } from './api';

import logoPrincipal from './assets/logo.png';
import dividerTitle from "./assets/divider-title.png"; 
import iconOferta from "./assets/icon-oferta.png"; 
import tortaFresa from "./assets/products/torta de fresa.png";

// IMAGENES OFERTAS
import imgAClasico from './assets/products/a-clasico.png';
import imgTvClasicos from './assets/products/tv-clasicos.png';
import imgMeQueso from './assets/products/me-queso.png';
import imgTcChocolate from './assets/products/tc-chocolate.png';
import imgCArandano from './assets/products/c-arandano.png';
import imgTFresa from './assets/products/t-fresa.png';

const Ofertas = ({ setPage }) => {
  // WISHLIST
  const [wishlist, setWishlist] = useState([]);
  const toggleWish = i => setWishlist(w => w.includes(i) ? w.filter(x => x !== i) : [...w, i]);

  // Ofertas reales del backend (si las hay); si no, se muestran las de ejemplo.
  const [ofertasReales, setOfertasReales] = useState([]);
  useEffect(() => {
    apiGet('/api/ofertas/vigentes')
      .then(data => setOfertasReales(Array.isArray(data) ? data : []))
      .catch(() => setOfertasReales([]));
  }, []);

  const anadirAlCarrito = async (prodId) => {
    if (!prodId) { setPage('productos'); return; }
    if (!getToken()) { alert('Debes iniciar sesión para agregar productos al carrito.'); return; }
    try {
      const resp = await fetch(`${API_BASE}/api/carrito/agregar`, {
        method: 'POST',
        headers: authHeaders(true),
        body: JSON.stringify({ productoId: prodId, cantidad: 1 }),
      });
      if (!resp.ok) throw new Error();
      notificarCarrito();
      alert('Producto agregado al carrito.');
    } catch { alert('No se pudo agregar al carrito.'); }
  };

  const offerProducts = [
    { id: 0, img: imgTcChocolate, name: "Torta Triple Chocolate", desc: "Delicioso bizcocho de chocolate con relleno y cobertura de ganache, decorado con crema de chocolate.", oldPrice: "80.00", newPrice: "64.00", discount: "-20%" },
    { id: 1, img: imgTvClasicos, name: "Tequeños Clásicos", desc: "La receta tradicional que nunca falla. Rellenos de queso blanco llanero, crujientes por fuera y derretidos por dentro.", oldPrice: "38.00", newPrice: "32.30", discount: "-15%" },
    { id: 2, img: imgTFresa, name: "Trufas de Fresa", desc: "Chocolate negro relleno de una suave crema de fresa natural. Dulces, frutales y absolutamente irresistibles.", oldPrice: "45.00", newPrice: "33.75", discount: "-25%" },
    { id: 3, img: imgMeQueso, name: "Mini Empanadas de Queso", desc: "Deliciosas empanadas rellenas de queso fundido, cremosas por dentro y doradas por fuera.", oldPrice: "36.00", newPrice: "30.60", discount: "-15%" },
    { id: 4, img: imgAClasico, name: "Alfajor Clásico", desc: "Delicadas tapitas artesanales con un suave relleno de dulce de leche y un toque de azúcar en polvo.", oldPrice: "28.00", newPrice: "22.40", discount: "-20%" },
    { id: 5, img: imgCArandano, name: "Cupcakes de Arándano", desc: "Delicioso y suave pastelito de miga fina con un toque de dulzor a chocolate, es ideal para decorar con crema batida y/o fondant.", oldPrice: "42.00", newPrice: "37.80", discount: "-10%" },
  ];

  const listaMostrar = ofertasReales.length > 0
    ? ofertasReales.map((o, i) => ({
        id: o.oferId ?? i,
        prodId: o.producto?.id ?? null,
        img: o.producto?.imagenUrl ? (o.producto.imagenUrl.startsWith('http') ? o.producto.imagenUrl : `${API_BASE}${o.producto.imagenUrl}`) : imgTcChocolate,
        name: o.oferTitulo || o.producto?.nombre || 'Oferta',
        desc: o.oferDescripcion || '',
        oldPrice: o.producto?.precio != null ? Number(o.producto.precio).toFixed(2) : '',
        newPrice: (o.producto?.precio != null && o.oferDescuento != null) ? (Number(o.producto.precio) * (1 - Number(o.oferDescuento) / 100)).toFixed(2) : '',
        discount: o.oferDescuento != null ? `-${o.oferDescuento}%` : '',
      }))
    : offerProducts.map(p => ({ ...p, prodId: null }));

  // NUEVO: descuento más alto entre las ofertas reales vigentes (para el banner "Hasta X% DSCTO").
  // Si no hay ofertas reales todavía, se queda en 25 (el valor de boceto de siempre).
  const descuentoMaximo = ofertasReales.length > 0
    ? Math.max(...ofertasReales.map(o => Number(o.oferDescuento) || 0))
    : 25;

  return (
    <div style={{ backgroundColor: '#FFEFEF', fontFamily: 'sans-serif', minHeight: '100vh', paddingBottom: '80px' }}>
      
      <section style={{ textAlign: 'center', paddingTop: '40px', paddingBottom: '20px' }}>
        <img src={logoPrincipal} alt="Logo Sweet Cream Rose" style={{ width: '230px', objectFit: 'contain', marginBottom: '15px' }} />
        <h1 style={{ color: '#5A3E41', margin: '10 0 5px 30', fontFamily: 'Poppins-Bold', fontSize: '30px', letterSpacing: '2px' }}>OFERTAS</h1>
        <img src={dividerTitle} alt="divisor" style={{ width: '180px', height: 'auto', display: 'block', margin: '0 auto 10px auto' }} />
      </section>

      {/* HERO BANNER DE DESCUENTOS */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 60px auto', backgroundColor: '#FACFD8', borderRadius: '25px', display: 'flex', overflow: 'hidden', position: 'relative', padding: '0 20px' }}>
        <div style={{ flex: '1', padding: '60px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ color: '#C6676D', fontFamily: 'Poppins-Bold', fontSize: '13px', letterSpacing: '1px', marginBottom: '15px' }}>
            ♥ DESCUENTOS ESPECIALES
          </span>
          <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '46px', color: '#5A3E41', margin: '0 0 15px 0', lineHeight: '1.1' }}>
            Disfruta lo mejor<br/>por menos
          </h2>
          <p style={{ fontFamily: 'Poppins-Medium', fontSize: '15px', color: '#5A3E41', margin: '0 0 30px 0', maxWidth: '350px', lineHeight: '1.5' }}>
            Aprovecha nuestras ofertas por tiempo limitado en tus productos favoritos.
          </p>
          <button onClick={() => setPage('productos')} style={{ alignSelf: 'flex-start', backgroundColor: '#C6676D', color: 'white', border: 'none', padding: '12px 35px', fontFamily: 'Poppins-Bold', fontSize: '14px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
            APROVECHAR OFERTA <span style={{ fontSize: '18px' }}>→</span>
          </button>
        </div>
        
        <div style={{ flex: '1', position: 'relative' }}>
          <img src={tortaFresa} alt="Pastel en oferta" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          
          {/* ICON-OFERTA GRANDE */}
          <div style={{ 
            position: 'absolute', 
            top: '30px', 
            right: '40px', 
            width: '140px', 
            height: '140px', 
            backgroundImage: `url(${iconOferta})`, 
            backgroundSize: 'contain', 
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            color: 'white',
            transform: 'rotate(-5deg)'
          }}>
            <span style={{ fontFamily: 'Poppins-Medium', fontSize: '15px', marginTop: '-5px' }}>Hasta</span>
            <span style={{ fontFamily: 'Poppins-Bold', fontSize: '38px', lineHeight: '1' }}>{descuentoMaximo}%</span>
            <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px' }}>DSCTO.</span>
          </div>

        </div>
      </section>

      {/* TÍTULO OFERTAS DESTACADAS */}
      <div style={{ maxWidth: '1100px', margin: '0 auto 30px auto', padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <i className="fa-solid fa-tag" style={{ color: '#C6676D', fontSize: '26px', transform: 'scaleX(-1)' }}></i>
          <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '28px', color: '#5A3E41', margin: '0' }}>OFERTAS DESTACADAS</h2>
        </div>
        <img src={dividerTitle} alt="Divisor" style={{ width: '140px', objectFit: 'contain', marginLeft: '45px', marginTop: '5px' }} onError={e => e.target.style.display='none'} />
      </div>

      {/* GRID DE PRODUCTOS */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 60px auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', padding: '0 20px' }}>
        {listaMostrar.map((p) => (
          <div key={p.id} style={{ border: '2px solid #EAAFB8', borderRadius: '25px', overflow: 'hidden', backgroundColor: '#FFEFEF', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ position: 'relative', height: '240px' }}>
              <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              
              {/* ICON-OFERTA PEQUEÑOS */}
              <div style={{ 
                position: 'absolute', 
                top: '5px', 
                left: '5px', 
                width: '80px', 
                height: '80px',
                backgroundImage: `url(${iconOferta})`, 
                backgroundSize: 'contain', 
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                color: 'white',
                fontFamily: 'Poppins-Bold', 
                fontSize: '20px' 
              }}>
                {p.discount}
              </div>
              
              {/* FAVORITOS */}
              <div onClick={() => toggleWish(p.id)} style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'rgba(255,255,255,0.9)', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <i className={wishlist.includes(p.id) ? "fa-solid fa-heart" : "fa-regular fa-heart"} style={{ color: '#C6676D', fontSize: '18px', marginTop: '1px' }}></i>
              </div>
            </div>

            {/* CONTENIDO */}
            <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
              <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#644444', margin: '0 0 10px 0' }}>{p.name}</h3>
              <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#644444', margin: '0 0 20px 0', lineHeight: '1.5' }}>{p.desc}</p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 'auto', marginBottom: '20px' }}>
                {p.oldPrice && <span style={{ fontFamily: 'Poltawski-Nowy', fontSize: '20px', color: '#7C7978', textDecoration: 'line-through' }}>S/. {p.oldPrice}</span>}
                {p.newPrice && <span style={{ fontFamily: 'Poltawski-Nowy', fontSize: '20px', color: '#C6676D' }}>S/. {p.newPrice}</span>}
              </div>

              <button onClick={() => anadirAlCarrito(p.prodId)} style={{ backgroundColor: '#C6676D', color: '#FFFFFF', border: 'none', padding: '12px', borderRadius: '10px', fontFamily: 'Poppins-Medium', fontSize: '18px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', width: '100%' }}>
                <i className="fa-solid fa-cart-shopping"></i> AÑADIR AL CARRITO
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* BANNER INFERIOR TIEMPO LIMITADO */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 60px auto', backgroundColor: '#FACFD8', borderRadius: '20px', padding: '30px 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '3px solid #C6676D' }}>
            <i className="fa-regular fa-clock" style={{ fontSize: '35px', color: '#B14B47' }}></i>
          </div>
          <div>
            <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '24px', color: '#7D2530', margin: '0 0 5px 0' }}>¡OFERTAS POR TIEMPO LIMITADO!</h3>
            <p style={{ fontFamily: 'Poppins-Medium', fontSize: '15px', color: '#B14B47', margin: '0' }}>No te quedes sin tus favoritos.<br/>Promociones válidas hasta agotar stock</p>
          </div>
        </div>
        <button onClick={() => setPage('productos')} style={{ backgroundColor: '#C6676D', color: 'white', border: 'none', padding: '12px 30px', fontFamily: 'Poppins-Bold', fontSize: '15px', borderRadius: '8px', cursor: 'pointer' }}>
          ¡APROVECHALOS YA!
        </button>
      </section>

      {/* 7. PROPUESTAS DE VALOR */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', padding: '30px 40px 0 40px', borderTop: '2px solid #FADADD' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <i className="fa-solid fa-cube" style={{ fontSize: '35px', color: '#EAAFB8' }}></i>
          <span style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#C6676D', maxWidth: '120px', lineHeight: '1.3' }}>Ingredientes de primera calidad</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <i className="fa-regular fa-heart" style={{ fontSize: '35px', color: '#EAAFB8' }}></i>
          <span style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#C6676D', maxWidth: '120px', lineHeight: '1.3' }}>Hecho con amor en cada detalle</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <i className="fa-solid fa-truck-fast" style={{ fontSize: '35px', color: '#EAAFB8' }}></i>
          <span style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#C6676D', maxWidth: '120px', lineHeight: '1.3' }}>Envíos seguros y rápidos</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <i className="fa-regular fa-user" style={{ fontSize: '35px', color: '#EAAFB8' }}></i>
          <span style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#C6676D', maxWidth: '120px', lineHeight: '1.3' }}>Atención personalizada para ti</span>
        </div>

      </section>

    </div>
  );
};

export default Ofertas;
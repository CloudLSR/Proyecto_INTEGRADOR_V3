import React, { useState } from "react";

// PRODUCTOS (Esto debería borrarse pq esto debería ser funcional sin precargar estos productos en específico xd)
import imgTcTripleChocolate from './assets/products/tc-triple-chocolate.png';
import imgTvClasicos from './assets/products/tv-clasicos.png';
import imgTFresa from './assets/products/t-fresa.png';
import imgTcRedVelvet from './assets/products/tc-red-velvet.png';
import imgMeQueso from './assets/products/me-queso.png';
import imgAClasico from './assets/products/a-clasico.png';
import imgCArandano from './assets/products/c-arandano.png';
import imgCChocolate from './assets/products/c-chocolate.jpg';

// ─── DATA ESTRUCTURADA ───
const PRODUCTOS_FAVORITOS = [
  { id: 1, nombre: "Torta Triple Chocolate", precio: "S/. 64.00", imagen: imgTcTripleChocolate },
  { id: 2, nombre: "Tequeños Clasicos", precio: "S/. 32.30", imagen: imgTvClasicos },
  { id: 3, nombre: "Trufas de Fresa", precio: "S/. 33.75", imagen: imgTFresa },
  { id: 4, nombre: "Torta red velvet", precio: "S/. 33.75", imagen: imgTcRedVelvet },
  { id: 5, nombre: "Mini Empanadas de Queso", precio: "S/. 30.60", imagen: imgMeQueso },
  { id: 6, nombre: "Tequeños Clasicos", precio: "S/. 22.40", imagen: imgAClasico },
  { id: 7, nombre: "Trufas de Fresa", precio: "S/. 37.80", imagen: imgCArandano }, 
  { id: 8, nombre: "Cupcake de chocolate", precio: "S/. 33.75", imagen: imgCChocolate }
];

const Perfil5 = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <>
      <div style={{ backgroundColor: 'white', border: '2px solid #EAAFB8', borderRadius: '20px', padding: '40px' }}>
        
        {/* Cabecera Título y Botón Eliminar Todos */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px', borderBottom: "2px solid #FDF2F3", paddingBottom: "20px", flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <i className="fa-regular fa-heart" style={{ color: '#C6676D', fontSize: '26px' }}></i>
            <div>
              <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '20px', color: '#5A3E41', margin: '0' }}>MIS FAVORITOS</h3>
              <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: '0' }}>Tus productos favoritos, listos para disfrutar cuando quieras</p>
            </div>
          </div>
          <button style={{ backgroundColor: 'transparent', color: '#C6676D', border: 'none', fontFamily: 'Poppins-Medium', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Eliminar todos <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>

        {/* GRILLA DE PRODUCTOS */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(4, 1fr)", /* 4 columnas de igual tamaño */
          gap: "15px" /* Un poco menos de espacio para que quepan holgadas */
        }}>
          {PRODUCTOS_FAVORITOS.map((prod) => {
            const isHovered = hoveredCard === prod.id;
            
            return (
              <div 
                key={prod.id} 
                onMouseEnter={() => setHoveredCard(prod.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ 
                  border: `1px solid ${isHovered ? '#C6676D' : '#EAAFB8'}`, 
                  borderRadius: "15px", 
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#fff"
                }}
              >
                {/* Contenedor de la Imagen */}
                <div style={{ position: 'relative', width: '100%', height: '140px' }}>
                  <img src={prod.imagen} alt={prod.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '10px', right: '10px', color: '#fff', fontSize: '18px', cursor: 'pointer', filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.3))' }}>
                    <i className="fa-solid fa-heart"></i>
                  </div>
                </div>

                {/* Contenido de la tarjeta */}
                <div style={{ padding: "12px", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}>
                  <div>
                    <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '12px', color: '#5A3E41', margin: "0 0 4px 0", lineHeight: "1.2" }}>{prod.nombre}</h4>
                    <p style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#777', margin: "0 0 12px 0" }}>{prod.precio}</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button style={{ backgroundColor: '#C6676D', color: 'white', border: 'none', borderRadius: '8px', padding: '8px', fontFamily: 'Poppins-Medium', fontSize: '10px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', transition: 'background-color 0.2s' }}>
                      <i className="fa-solid fa-cart-shopping"></i> AÑADIR AL CARRITO
                    </button>
                    <button style={{ background: 'none', border: 'none', color: '#C6676D', fontFamily: 'Poppins-Regular', fontSize: '10px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                      <i className="fa-regular fa-trash-can"></i> Quitar de favoritos
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BANNER PROMOCIONAL */}
        <div style={{ marginTop: '30px', backgroundColor: "#FDF2F3", borderRadius: '15px', padding: "20px 30px", display: "flex", alignItems: "center", gap: '20px' }}>
          <div style={{ color: "#C6676D", fontSize: '40px', flexShrink: 0 }}>
            <i className="fa-solid fa-bag-shopping"></i>
          </div>
          <div>
            <h5 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: "0 0 5px 0" }}>Guarda tus favoritos y encuéntralos siempre que los necesites</h5>
            <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#5A3E41', margin: 0 }}>Los mejores dulce siempre a un click</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default Perfil5;
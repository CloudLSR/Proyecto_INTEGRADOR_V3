import React, { useState } from "react";
import logoPrincipal from './assets/logo.png'; 

// IMÁGENES DE PRODUCTOS
import imgTcTripleChocolate from './assets/products/tc-triple-chocolate.png';
import imgCArandano from './assets/products/c-arandano.png';
import imgAClasico from './assets/products/a-clasico.png';
import imgTFresa from './assets/products/t-fresa.png';
import imgMeQueso from './assets/products/me-queso.png';
import imgTvClasicos from './assets/products/tv-clasicos.png'; // Asumiendo que tienes esta para tequeños

const AdminMenu3 = () => {

  // Data simulada para las tarjetas KPI
  const metricas = [
    { valor: 54, etiqueta: "Total de productos", icon: "fa-solid fa-cake-candles", color: "#F194B4", bg: "#FDF2F3", border: "#FADADD" },
    { valor: 46, etiqueta: "Activos", icon: "fa-solid fa-box-open", color: "#F2C94C", bg: "#FFF9E6", border: "#FDE49E" },
    { valor: 8, etiqueta: "Inactivos", icon: "fa-solid fa-eye-slash", color: "#27AE60", bg: "#E9F7EF", border: "#A9DFBF" },
    { valor: 10, etiqueta: "Categorías", icon: "fa-solid fa-tags", color: "#9B59B6", bg: "#F4ECF7", border: "#D7BDE2" },
  ];

  // Data simulada para los productos
  const productos = [
    { id: 1, img: imgTcTripleChocolate, nombre: "Torta Triple Chocolate", desc: "Deliciosa torta de chocolate humedo con ganache", categoria: "Tortas clásicas", precio: "S/ 90.00", stock: 12, estadoStock: "Stock bajo", colorStock: "#F194B4", activo: true },
    { id: 2, img: imgCArandano, nombre: "Cupcake de Arándanos", desc: "Deliciosa torta de chocolate humedo con ganache", categoria: "Cupcakes", precio: "S/ 16.00", stock: 46, estadoStock: "En stock", colorStock: "#27AE60", activo: true },
    { id: 3, img: imgAClasico, nombre: "Alfajor Clásico", desc: "Deliciosa torta de chocolate humedo con ganache", categoria: "Alfajores", precio: "S/ 11.00", stock: 50, estadoStock: "En Stock", colorStock: "#27AE60", activo: true },
    { id: 4, img: imgTFresa, nombre: "Trufas de Fresa", desc: "Chocolate negro con una suave crema de fresa natural", categoria: "Trufas", precio: "S/ 28.00", stock: 12, estadoStock: "Stock bajo", colorStock: "#F194B4", activo: true },
    { id: 5, img: imgMeQueso, nombre: "Mini Empanadas de Queso", desc: "Deliciosa torta de chocolate humedo con ganache", categoria: "Mini Empanadas", precio: "S/ 12.00", stock: 0, estadoStock: "Agotado", colorStock: "#999", activo: false },
    { id: 6, img: imgTvClasicos, nombre: "Tequeños Clásicos", desc: "Deliciosa torta de chocolate humedo con ganache", categoria: "Tequeños", precio: "S/ 15.00", stock: 12, estadoStock: "Stock bajo", colorStock: "#F194B4", activo: true },
  ];

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%', width: '100%' }}>

      {/* ========== TÍTULO Y BOTÓN AGREGAR ========== */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 5px 0', textTransform: 'uppercase' }}>
            PRODUCTOS
          </h1>
          <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>
            Gestiona tu catálogo de productos.
          </p>
        </div>
        <button style={{ backgroundColor: '#FCF0F2', color: '#C3666D', border: '1.5px solid #C3666D', borderRadius: '8px', padding: '10px 20px', fontFamily: 'Poppins-SemiBold', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>
          <i className="fa-solid fa-bag-shopping"></i> AGREGAR PRODUCTO
        </button>
      </div>

      {/* ========== TARJETAS DE MÉTRICAS (KPIs) ========== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '35px' }}>
        {metricas.map((metrica, index) => (
          <div key={index} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', border: `2px solid ${metrica.border}`, display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
            <div style={{ width: '55px', height: '55px', backgroundColor: metrica.bg, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: metrica.color, fontSize: '24px', flexShrink: 0 }}>
              <i className={metrica.icon}></i>
            </div>
            <div>
              <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '28px', color: '#5A3E41', margin: '0 0 2px 0', lineHeight: '1' }}>{metrica.valor}</h2>
              <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', margin: 0, lineHeight: '1.2' }}>{metrica.etiqueta}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ========== BARRA DE BÚSQUEDA Y FILTROS ========== */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '0 15px', backgroundColor: 'white' }}>
          <i className="fa-solid fa-magnifying-glass" style={{ color: '#999', fontSize: '16px' }}></i>
          <input 
            type="text" 
            placeholder="Buscar el pedido por ID, categoría o producto ..." 
            style={{ border: 'none', outline: 'none', width: '100%', padding: '12px 10px', fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#5A3E41' }}
          />
        </div>
        <button style={{ backgroundColor: 'white', color: '#C3666D', border: '1.5px solid #C3666D', borderRadius: '8px', padding: '0 25px', fontFamily: 'Poppins-Medium', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fa-solid fa-filter"></i> Filtros
        </button>
      </div>

      {/* ========== LISTA DE PRODUCTOS ========== */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px' }}>
        {productos.map((prod) => (
          <div key={prod.id} style={{ border: '1px solid #EAEAEA', borderRadius: '15px', padding: '20px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}>
            
            {/* Lado Izquierdo (Imagen + Info) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
              <img src={prod.img} alt={prod.nombre} style={{ width: '130px', height: '90px', objectFit: 'cover', borderRadius: '10px' }} onError={e => e.target.style.display='none'} />
              <div>
                <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: '0 0 5px 0' }}>{prod.nombre}</h3>
                <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: '0 0 8px 0', maxWidth: '280px' }}>{prod.desc}</p>
                <p style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#C3666D', margin: 0 }}>{prod.categoria}</p>
              </div>
            </div>

            {/* Centro (Precio) */}
            <div style={{ flexShrink: 0, width: '150px', textAlign: 'center' }}>
              <span style={{ fontFamily: 'Poppins-Medium', fontSize: '18px', color: '#5A3E41' }}>
                {prod.precio}
              </span>
            </div>

            {/* Lado Derecho (Stock + Botones) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px', width: '220px', justifyContent: 'flex-end' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                <span style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#5A3E41' }}>{prod.stock} unidades</span>
                <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: prod.colorStock }}>{prod.estadoStock}</span>
                <span style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: prod.activo ? '#27AE60' : '#777', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontSize: '10px' }}>●</span> {prod.activo ? 'Activo' : 'Inactivo'}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ border: '1.5px solid #F194B4', backgroundColor: 'transparent', color: '#F194B4', width: '35px', height: '40px', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px' }}>
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button style={{ border: '1.5px solid #F194B4', backgroundColor: 'transparent', color: '#F194B4', width: '35px', height: '40px', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px' }}>
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ========== PAGINACIÓN ========== */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: 0 }}>
          Mostrando de 1-6 de 56 productos
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={{ border: '1px solid #D9D9D9', background: 'white', color: '#C3666D', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium' }}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          
          <button style={{ border: 'none', background: '#C3666D', color: 'white', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Bold', fontSize: '14px' }}>1</button>
          <button style={{ border: '1px solid #D9D9D9', background: 'white', color: '#5A3E41', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium', fontSize: '14px' }}>2</button>
          <button style={{ border: '1px solid #D9D9D9', background: 'white', color: '#5A3E41', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium', fontSize: '14px' }}>3</button>
          
          <span style={{ fontFamily: 'Poppins-Bold', color: '#5A3E41', margin: '0 5px' }}>...</span>
          
          <button style={{ border: '1px solid #D9D9D9', background: 'white', color: '#5A3E41', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium', fontSize: '14px' }}>8</button>
          
          <button style={{ border: '1px solid #D9D9D9', background: 'white', color: '#C3666D', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium' }}>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      {/* ========== BANNER CONSEJO ========== */}
      <div style={{ backgroundColor: '#FFF6F7', border: '1.5px solid #FADADD', borderRadius: '15px', padding: '20px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '60px', height: '60px', backgroundColor: 'white', border: '2px solid #F194B4', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#F194B4', fontSize: '28px' }}>
            <i className="fa-solid fa-shield"></i>
          </div>
          <div>
            <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: '0 0 5px 0' }}>Consejo</h3>
            <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: 0 }}>Mantén tu catálogo actualizado para mejorar la experiencia de tus clientes.</p>
          </div>
        </div>
        {/* Usamos una de las imágenes de pastel como decoración o puedes reemplazarlo por el asset correcto */}
        <img src={imgTcTripleChocolate} alt="Decoración pastel" style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '10px' }} onError={e => e.target.style.display='none'} />
      </div>

      {/* ========== FOOTER ========== */}
      <p style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#999', margin: '0 0 20px 0' }}>
        <span style={{ color: '#C3666D' }}>♥</span> Gracias por endulzar cada día con tu trabajo
      </p>

    </div>
  );
};

export default AdminMenu3;
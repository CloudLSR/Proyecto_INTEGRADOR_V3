import React, { useState } from "react";
import logoPrincipal from './assets/logo.png'; 

// IMÁGENES DE PRODUCTOS
import imgTcTripleChocolate from './assets/products/tc-triple-chocolate.png';
import imgCArandano from './assets/products/c-arandano.png';
import imgAClasico from './assets/products/a-clasico.png';
import imgTFresa from './assets/products/t-fresa.png';
import imgMeQueso from './assets/products/me-queso.png';
import imgTvClasicos from './assets/products/tv-clasicos.png'; 

const AdminMenu3 = () => {

  // --- LÓGICA DE ESTADOS ---
  const [menuAbierto, setMenuAbierto] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [filtroAbierto, setFiltroAbierto] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1); // Nuevo estado para paginación
  
  const toggleMenu = (id) => setMenuAbierto(menuAbierto === id ? null : id);

  // --- COMPONENTES ---
  const MenuDesplegable = ({ id }) => (
    <div style={{ position: 'absolute', right: '0', top: '50px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0px 4px 15px rgba(0,0,0,0.15)', padding: '10px 0', width: '160px', zIndex: 100, display: 'flex', flexDirection: 'column', border: '1px solid #FADADD' }}>
      <button style={btnStyle} onClick={() => alert('Ver detalle ' + id)}>👁 Ver detalle</button>
      <button style={btnStyle} onClick={() => alert('Editar ' + id)}>✏️ Editar</button>
      <button style={{...btnStyle, color: '#C6676D'}} onClick={() => alert('Eliminar ' + id)}>🗑 Eliminar</button>
    </div>
  );

  const Paginacion = () => {
    const btnPagStyle = { width: '40px', height: '40px', border: '1px solid #EAEAEA', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#5A3E41', backgroundColor: 'white' };
    const btnActiveStyle = { ...btnPagStyle, backgroundColor: '#C3666D', color: 'white', border: 'none' };

    return (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '30px' }}>
        <button style={btnPagStyle} onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}><i className="fa-solid fa-arrow-left"></i></button>
        {[1, 2, 3].map(n => (
          <button key={n} style={paginaActual === n ? btnActiveStyle : btnPagStyle} onClick={() => setPaginaActual(n)}>{n}</button>
        ))}
        <span style={{ display: 'flex', alignItems: 'center', color: '#5A3E41' }}>...</span>
        <button style={paginaActual === 8 ? btnActiveStyle : btnPagStyle} onClick={() => setPaginaActual(8)}>8</button>
        <button style={btnPagStyle} onClick={() => setPaginaActual(prev => Math.min(prev + 1, 8))}><i className="fa-solid fa-arrow-right"></i></button>
      </div>
    );
  };

  const btnStyle = { background: 'none', border: 'none', padding: '8px 15px', textAlign: 'left', cursor: 'pointer', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#5A3E41' };

  const ModalAgregar = () => (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', width: '400px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}>
        <h2 style={{ fontFamily: 'Poppins-Bold', color: '#5A3E41', marginTop: 0 }}>{productoAEditar ? "Editar Producto" : "Agregar Producto"}</h2>
        <input type="text" defaultValue={productoAEditar?.nombre || ""} placeholder="Nombre del producto" style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        <input type="text" defaultValue={productoAEditar?.precio || ""} placeholder="Precio" style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        <input type="number" defaultValue={productoAEditar?.stock || ""} placeholder="Stock" style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Poppins-Regular', color: '#5A3E41' }}>
            <input type="checkbox" defaultChecked={productoAEditar?.activo ?? true} /> Producto Activo
        </label>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={() => { setModalAbierto(false); setProductoAEditar(null); }} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: 'Poppins-Medium' }}>Cancelar</button>
          <button onClick={() => { setModalAbierto(false); setProductoAEditar(null); }} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: '#C3666D', color: 'white', cursor: 'pointer', fontFamily: 'Poppins-Medium' }}>Guardar</button>
        </div>
      </div>
    </div>
  );

  const metricas = [
    { valor: 54, etiqueta: "Total de productos", icon: "fa-solid fa-cake-candles", color: "#F194B4", bg: "#FDF2F3", border: "#FADADD" },
    { valor: 46, etiqueta: "Activos", icon: "fa-solid fa-box-open", color: "#F2C94C", bg: "#FFF9E6", border: "#FDE49E" },
    { valor: 8, etiqueta: "Inactivos", icon: "fa-solid fa-eye-slash", color: "#27AE60", bg: "#E9F7EF", border: "#A9DFBF" },
    { valor: 10, etiqueta: "Categorías", icon: "fa-solid fa-tags", color: "#9B59B6", bg: "#F4ECF7", border: "#D7BDE2" },
  ];

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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 5px 0', textTransform: 'uppercase' }}>PRODUCTOS</h1>
        </div>
        <button onClick={() => { setProductoAEditar(null); setModalAbierto(true); }} style={{ backgroundColor: '#FCF0F2', color: '#C3666D', border: '1.5px solid #C3666D', borderRadius: '8px', padding: '10px 20px', fontFamily: 'Poppins-SemiBold', fontSize: '13px', cursor: 'pointer' }}>
          <i className="fa-solid fa-bag-shopping"></i> AGREGAR PRODUCTO
        </button>
      </div>

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

      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', position: 'relative' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '0 15px', backgroundColor: 'white' }}>
          <i className="fa-solid fa-magnifying-glass" style={{ color: '#999', fontSize: '16px' }}></i>
          <input type="text" placeholder="Buscar producto..." style={{ border: 'none', outline: 'none', width: '100%', padding: '12px 10px', fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#5A3E41' }} />
        </div>
        
        <div style={{ position: 'relative' }}>
            <button onClick={() => setFiltroAbierto(!filtroAbierto)} style={{ backgroundColor: 'white', color: '#C3666D', border: '1.5px solid #C3666D', borderRadius: '8px', padding: '0 25px', fontFamily: 'Poppins-Medium', fontSize: '14px', cursor: 'pointer', height: '100%' }}>
                <i className="fa-solid fa-filter"></i> Filtros
            </button>
            {filtroAbierto && (
                <div style={{ position: 'absolute', right: '0', top: '55px', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0px 10px 30px rgba(0,0,0,0.15)', padding: '10px 0', width: '220px', zIndex: 100, border: '1px solid #FADADD' }}>
                    <button style={btnStyle}>✅ Solo activos</button>
                    <button style={btnStyle}>⚠️ Stock crítico</button>
                </div>
            )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px' }}>
        {productos.map((prod) => (
          <div key={prod.id} style={{ border: '1px solid #EAEAEA', borderRadius: '15px', padding: '20px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
              <img src={prod.img} alt={prod.nombre} style={{ width: '130px', height: '90px', objectFit: 'cover', borderRadius: '10px' }} />
              <div>
                <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: '0 0 5px 0' }}>{prod.nombre}</h3>
                <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: 0 }}>{prod.categoria}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '30px', position: 'relative' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => { setProductoAEditar(prod); setModalAbierto(true); }} style={{ border: '1.5px solid #F194B4', backgroundColor: 'transparent', color: '#F194B4', width: '35px', height: '40px', borderRadius: '8px', cursor: 'pointer' }}>
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button onClick={() => toggleMenu(prod.id)} style={{ border: '1.5px solid #F194B4', backgroundColor: 'transparent', color: '#F194B4', width: '35px', height: '40px', borderRadius: '8px', cursor: 'pointer' }}>
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
              </div>
              {menuAbierto === prod.id && <MenuDesplegable id={prod.id} />}
            </div>
          </div>
        ))}
      </div>

      <Paginacion />

      {modalAbierto && <ModalAgregar />}
    </div>
  );
};

export default AdminMenu3;
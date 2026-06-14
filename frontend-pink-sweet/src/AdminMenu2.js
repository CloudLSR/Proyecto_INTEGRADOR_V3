import React, { useState } from "react";
import logoPrincipal from './assets/logo.png'; 

const AdminMenu2 = () => {
  // Estado para las pestañas de filtrado superior
  const [tabActiva, setTabActiva] = useState("Todos");

  // Data simulada basada en el Figma
  const pedidos = [
    { id: '#000123', cliente: 'Carlos Ramirez', productos: 3, fecha: '12 May 2025 . 3:45 p.m', estado: 'En preparación', precio: 'S/ 125.00', delivery: 'Delivery (Rappi)' },
    { id: '#000122', cliente: 'Carlos Ramirez', productos: 3, fecha: '12 May 2025 . 3:45 p.m', estado: 'Entregados', precio: 'S/ 125.00', delivery: 'Delivery (Rappi)' },
    { id: '#000121', cliente: 'Carlos Ramirez', productos: 3, fecha: '12 May 2025 . 3:45 p.m', estado: 'Cancelado', precio: 'S/ 125.00', delivery: 'Delivery (Rappi)' },
    { id: '#000120', cliente: 'Carlos Ramirez', productos: 3, fecha: '12 May 2025 . 3:45 p.m', estado: 'Entregados', precio: 'S/ 125.00', delivery: 'Delivery (Rappi)' },
    { id: '#000119', cliente: 'Carlos Ramirez', productos: 3, fecha: '12 May 2025 . 3:45 p.m', estado: 'Entregados', precio: 'S/ 125.00', delivery: 'Delivery (Rappi)' },
    { id: '#000118', cliente: 'Carlos Ramirez', productos: 3, fecha: '12 May 2025 . 3:45 p.m', estado: 'Cancelado', precio: 'S/ 125.00', delivery: 'Delivery (Rappi)' },
    { id: '#000117', cliente: 'Carlos Ramirez', productos: 3, fecha: '12 May 2025 . 3:45 p.m', estado: 'Entregados', precio: 'S/ 125.00', delivery: 'Delivery (Rappi)' },
  ];

  // Función para obtener colores según el estado
  const obtenerEstilosEstado = (estado) => {
    switch (estado) {
      case "En preparación": return { bg: "#DCE8F4", color: "#6A8BBD", icon: "fa-solid fa-basket-shopping" };
      case "Entregados": return { bg: "#E9F7EF", color: "#27AE60", icon: "fa-regular fa-circle-check" };
      case "Cancelado": return { bg: "#F4ECF7", color: "#9B59B6", icon: "fa-regular fa-circle-xmark" };
      default: return { bg: "#FADADD", color: "#C6676D", icon: "fa-regular fa-circle" };
    }
  };

  // Pestañas de filtrado
  const tabs = [
    { label: "Todos", count: 32, colorBadge: "#C3666D", bgBadge: "#FDF2F3" },
    { label: "En preparación", count: 5, colorBadge: "#6A8BBD", bgBadge: "#DCE8F4" },
    { label: "Entregados", count: 25, colorBadge: "#27AE60", bgBadge: "#E9F7EF" },
    { label: "Cancelados", count: 2, colorBadge: "#9B59B6", bgBadge: "#F4ECF7" },
  ];

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%', width: '100%' }}>

      {/* ========== TÍTULO Y BOTÓN AGREGAR ========== */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 5px 0', textTransform: 'uppercase' }}>
            PEDIDOS
          </h1>
          <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>
            Gestiona y supervisa todos los pedidos de tu negocio.
          </p>
        </div>
        <button style={{ backgroundColor: '#FCF0F2', color: '#C3666D', border: '1.5px solid #C3666D', borderRadius: '8px', padding: '10px 20px', fontFamily: 'Poppins-SemiBold', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>
          <i className="fa-solid fa-bag-shopping"></i> AGREGAR PEDIDO
        </button>
      </div>

      {/* ========== BARRA DE BÚSQUEDA Y FILTROS ========== */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '35px' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '0 15px', backgroundColor: 'white' }}>
          <i className="fa-solid fa-magnifying-glass" style={{ color: '#999', fontSize: '16px' }}></i>
          <input 
            type="text" 
            placeholder="Buscar el pedido por ID, cliente o producto ..." 
            style={{ border: 'none', outline: 'none', width: '100%', padding: '12px 10px', fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#5A3E41' }}
          />
        </div>
        <button style={{ backgroundColor: 'white', color: '#C3666D', border: '1.5px solid #C3666D', borderRadius: '8px', padding: '0 25px', fontFamily: 'Poppins-Medium', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fa-solid fa-filter"></i> Filtros
        </button>
      </div>

      {/* ========== TABS (ESTADOS DE PEDIDO) ========== */}
      <div style={{ display: 'flex', borderBottom: '2px solid #FDF2F3', marginBottom: '30px' }}>
        {tabs.map((tab) => {
          const isActive = tabActiva === tab.label;
          return (
            <div 
              key={tab.label}
              onClick={() => setTabActiva(tab.label)}
              style={{
                flex: 1,
                textAlign: 'center',
                paddingBottom: '15px',
                cursor: 'pointer',
                borderBottom: isActive ? '3px solid #C3666D' : '3px solid transparent',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontFamily: 'Poppins-Bold', fontSize: '15px', color: isActive ? '#5A3E41' : '#A08D8F' }}>
                {tab.label}
              </span>
              <span style={{ backgroundColor: tab.bgBadge, color: tab.colorBadge, fontFamily: 'Poppins-Bold', fontSize: '12px', padding: '2px 12px', borderRadius: '15px' }}>
                {tab.count}
              </span>
            </div>
          );
        })}
      </div>

      {/* ========== LISTA DE PEDIDOS ========== */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px' }}>
        {pedidos.map((pedido, index) => {
          const styles = obtenerEstilosEstado(pedido.estado);
          
          return (
            <div key={index} style={{ border: '1.5px solid #FADADD', borderRadius: '12px', padding: '20px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}>
              
              {/* Lado Izquierdo (Icono + Info) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '55px', height: '55px', backgroundColor: '#FDF2F3', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#F194B4', fontSize: '22px', flexShrink: 0 }}>
                  <i className="fa-solid fa-bag-shopping"></i>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: '0 0 2px 0' }}>{pedido.id}</h3>
                  <p style={{ fontFamily: 'Poppins-SemiBold', fontSize: '14px', color: '#5A3E41', margin: '0 0 2px 0' }}>{pedido.cliente}</p>
                  <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: '0 0 5px 0' }}>{pedido.productos} productos</p>
                  <p style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#999', margin: 0, display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <i className="fa-regular fa-clock"></i> {pedido.fecha}
                  </p>
                </div>
              </div>

              {/* Lado Derecho (Estado + Precio + Delivery + Menú) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '35px' }}>
                
                {/* Columna Estado y Precio */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                  <div style={{ backgroundColor: styles.bg, color: styles.color, padding: '4px 14px', borderRadius: '20px', fontFamily: 'Poppins-Medium', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <i className={styles.icon}></i> {pedido.estado}
                  </div>
                  <div style={{ fontFamily: 'Poppins-Bold', fontSize: '20px', color: '#5A3E41' }}>
                    {pedido.precio}
                  </div>
                  <div style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#C3666D', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <i className="fa-solid fa-motorcycle"></i> {pedido.delivery}
                  </div>
                </div>

                {/* Botón de opciones (3 puntitos) */}
                <button style={{ border: '1.5px solid #F194B4', backgroundColor: 'transparent', color: '#F194B4', width: '35px', height: '45px', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>

              </div>
            </div>
          );
        })}
      </div>

      {/* ========== PAGINACIÓN ========== */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
        <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: 0 }}>
          Mostrando de 1-7 de 56 pedidos
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

      {/* ========== FOOTER ========== */}
      <p style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#999', margin: '0 0 20px 0' }}>
        <span style={{ color: '#C3666D' }}>♥</span> Gracias por endulzar cada día con tu trabajo
      </p>

    </div>
  );
};

export default AdminMenu2;
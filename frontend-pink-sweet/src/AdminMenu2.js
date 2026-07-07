import React, { useState } from "react";

const AdminMenu2 = () => {
  const [tabActiva, setTabActiva] = useState("Todos");
  const [menuAbierto, setMenuAbierto] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [nuevoPedido, setNuevoPedido] = useState({ cliente: '', productos: '', precio: '' });

  const [pedidos, setPedidos] = useState([
    { id: '#000123', cliente: 'Carlos Ramirez', productos: 3, fecha: '12 May 2025 . 3:45 p.m', estado: 'En preparación', precio: 'S/ 125.00', delivery: 'Delivery (Rappi)' },
    { id: '#000122', cliente: 'Carlos Ramirez', productos: 3, fecha: '12 May 2025 . 3:45 p.m', estado: 'Entregados', precio: 'S/ 125.00', delivery: 'Delivery (Rappi)' },
    { id: '#000121', cliente: 'Carlos Ramirez', productos: 3, fecha: '12 May 2025 . 3:45 p.m', estado: 'Cancelado', precio: 'S/ 125.00', delivery: 'Delivery (Rappi)' },
    { id: '#000120', cliente: 'Carlos Ramirez', productos: 3, fecha: '12 May 2025 . 3:45 p.m', estado: 'Entregados', precio: 'S/ 125.00', delivery: 'Delivery (Rappi)' },
    { id: '#000119', cliente: 'Carlos Ramirez', productos: 3, fecha: '12 May 2025 . 3:45 p.m', estado: 'Entregados', precio: 'S/ 125.00', delivery: 'Delivery (Rappi)' },
    { id: '#000118', cliente: 'Carlos Ramirez', productos: 3, fecha: '12 May 2025 . 3:45 p.m', estado: 'Cancelado', precio: 'S/ 125.00', delivery: 'Delivery (Rappi)' },
    { id: '#000117', cliente: 'Carlos Ramirez', productos: 3, fecha: '12 May 2025 . 3:45 p.m', estado: 'Entregados', precio: 'S/ 125.00', delivery: 'Delivery (Rappi)' },
  ]);

  const toggleMenu = (id) => setMenuAbierto(menuAbierto === id ? null : id);

  const guardarPedido = () => {
    const nuevo = { 
      id: '#000' + Math.floor(Math.random() * 999), 
      cliente: nuevoPedido.cliente, 
      productos: nuevoPedido.productos, 
      fecha: new Date().toLocaleDateString() + ' . ' + new Date().toLocaleTimeString(), 
      estado: 'En preparación', 
      precio: 'S/ ' + nuevoPedido.precio, 
      delivery: 'Delivery (Rappi)' 
    };
    setPedidos([nuevo, ...pedidos]);
    setModalAbierto(false);
    setNuevoPedido({ cliente: '', productos: '', precio: '' });
  };

  const obtenerEstilosEstado = (estado) => {
    switch (estado) {
      case "En preparación": return { bg: "#DCE8F4", color: "#6A8BBD", icon: "fa-solid fa-basket-shopping" };
      case "Entregados": return { bg: "#E9F7EF", color: "#27AE60", icon: "fa-regular fa-circle-check" };
      case "Cancelado": return { bg: "#F4ECF7", color: "#9B59B6", icon: "fa-regular fa-circle-xmark" };
      default: return { bg: "#FADADD", color: "#C6676D", icon: "fa-regular fa-circle" };
    }
  };

  const tabs = [
    { label: "Todos", count: pedidos.length, colorBadge: "#C3666D", bgBadge: "#FDF2F3" },
    { label: "En preparación", count: pedidos.filter(p=>p.estado==="En preparación").length, colorBadge: "#6A8BBD", bgBadge: "#DCE8F4" },
    { label: "Entregados", count: pedidos.filter(p=>p.estado==="Entregados").length, colorBadge: "#27AE60", bgBadge: "#E9F7EF" },
    { label: "Cancelados", count: pedidos.filter(p=>p.estado==="Cancelado").length, colorBadge: "#9B59B6", bgBadge: "#F4ECF7" },
  ];

  const inputStyle = { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1.5px solid #FADADD', fontFamily: 'Poppins-Regular' };
  const btnStyle = { padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: 'Poppins-Bold' };

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%', width: '100%' }}>
      
      {/* MODAL CON DISEÑO INTEGRADO */}
      {modalAbierto && (
        <div style={{ position: 'fixed', top:0, left:0, width:'100%', height:'100%', backgroundColor:'rgba(0,0,0,0.3)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:999 }}>
          <div style={{ backgroundColor:'white', padding:'30px', borderRadius:'12px', width:'320px', border: '1.5px solid #FADADD' }}>
            <h3 style={{fontFamily:'Poppins-Bold', color: '#5A3E41', marginBottom: '20px'}}>Nuevo Pedido</h3>
            <input placeholder="Cliente" style={inputStyle} onChange={(e) => setNuevoPedido({...nuevoPedido, cliente: e.target.value})} />
            <input placeholder="Cant. Productos" style={inputStyle} onChange={(e) => setNuevoPedido({...nuevoPedido, productos: e.target.value})} />
            <input placeholder="Precio" style={inputStyle} onChange={(e) => setNuevoPedido({...nuevoPedido, precio: e.target.value})} />
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                <button style={{...btnStyle, backgroundColor: '#FDF2F3', color: '#C3666D'}} onClick={() => setModalAbierto(false)}>Cancelar</button>
                <button style={{...btnStyle, backgroundColor: '#C3666D', color: 'white'}} onClick={guardarPedido}>Guardar</button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 5px 0', textTransform: 'uppercase' }}>PEDIDOS</h1>
          <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>Gestiona y supervisa todos los pedidos de tu negocio.</p>
        </div>
        <button onClick={() => setModalAbierto(true)} style={{ backgroundColor: '#FCF0F2', color: '#C3666D', border: '1.5px solid #C3666D', borderRadius: '8px', padding: '10px 20px', fontFamily: 'Poppins-SemiBold', fontSize: '13px', cursor: 'pointer' }}>
          <i className="fa-solid fa-bag-shopping"></i> AGREGAR PEDIDO
        </button>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', borderBottom: '2px solid #FDF2F3', marginBottom: '30px' }}>
        {tabs.map((tab) => (
          <div key={tab.label} onClick={() => setTabActiva(tab.label)} style={{ flex: 1, textAlign: 'center', paddingBottom: '15px', cursor: 'pointer', borderBottom: tabActiva === tab.label ? '3px solid #C3666D' : '3px solid transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'Poppins-Bold', fontSize: '15px', color: tabActiva === tab.label ? '#5A3E41' : '#A08D8F' }}>{tab.label}</span>
            <span style={{ backgroundColor: tab.bgBadge, color: tab.colorBadge, fontFamily: 'Poppins-Bold', fontSize: '12px', padding: '2px 12px', borderRadius: '15px' }}>{tab.count}</span>
          </div>
        ))}
      </div>

      {/* LISTA */}
      {pedidos.filter(p => tabActiva === "Todos" || (tabActiva === "Cancelados" ? p.estado === "Cancelado" : p.estado === tabActiva)).map((pedido, index) => {
        const styles = obtenerEstilosEstado(pedido.estado);
        return (
          <div key={index} style={{ border: '1.5px solid #FADADD', borderRadius: '12px', padding: '20px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', marginBottom: '15px' }}>
            <div>
              <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41' }}>{pedido.id}</h3>
              <p style={{ fontFamily: 'Poppins-SemiBold', fontSize: '14px', color: '#5A3E41' }}>{pedido.cliente}</p>
            </div>
            <div style={{ backgroundColor: styles.bg, color: styles.color, padding: '4px 14px', borderRadius: '20px', fontSize: '11px' }}>
                <i className={styles.icon}></i> {pedido.estado}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminMenu2;
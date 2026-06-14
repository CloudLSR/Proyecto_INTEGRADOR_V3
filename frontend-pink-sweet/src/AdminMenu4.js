import React, { useState } from "react";
import logoPrincipal from './assets/logo.png'; 

const AdminMenu4 = () => {
  // Pestañas para la tabla
  const [tabActiva, setTabActiva] = useState("Todas las ventas");

  // Data simulada para las KPIs
  const kpis = [
    { titulo: "Ventas totales", valor: "S/3,420.00", porcentaje: "↑ 12%", extra: "vs. ayer", color: "#F194B4", bg: "#FDF2F3", border: "#FADADD", customIcon: "S/" },
    { titulo: "Pedidos realizados", valor: "42", porcentaje: "↑ 8%", extra: "vs. ayer", icon: "fa-solid fa-bag-shopping", color: "#F2C94C", bg: "#FFF9E6", border: "#FDE49E" },
    { titulo: "Tiket promedio", valor: "S/81.43", porcentaje: "↑ 5%", extra: "vs. ayer", icon: "fa-solid fa-receipt", color: "#27AE60", bg: "#E9F7EF", border: "#A9DFBF" },
    { titulo: "Productos vendidos", valor: "128", porcentaje: "↑ 15%", extra: "vs. ayer", icon: "fa-solid fa-cart-shopping", color: "#9B59B6", bg: "#F4ECF7", border: "#D7BDE2" },
  ];

  // Data simulada para la tabla de ventas
  const ventasData = [
    { id: '#00045', cliente: 'María Gómez', tel: '+51 987 654 321', fecha: '19 may. 2026', hora: '11:30 a.m.', prodCount: '3 productos', prodDesc: 'Torta, Cupcake, Alfajor', total: 'S/120.00', estado: 'Completado' },
    { id: '#00044', cliente: 'María Gómez', tel: '+51 987 654 321', fecha: '19 may. 2026', hora: '11:30 a.m.', prodCount: '3 productos', prodDesc: 'Torta, Cupcake, Alfajor', total: 'S/120.00', estado: 'Completado' },
    { id: '#00043', cliente: 'María Gómez', tel: '+51 987 654 321', fecha: '19 may. 2026', hora: '11:30 a.m.', prodCount: '3 productos', prodDesc: 'Torta, Cupcake, Alfajor', total: 'S/120.00', estado: 'Pendiente' },
    { id: '#00042', cliente: 'María Gómez', tel: '+51 987 654 321', fecha: '19 may. 2026', hora: '11:30 a.m.', prodCount: '3 productos', prodDesc: 'Torta, Cupcake, Alfajor', total: 'S/120.00', estado: 'Completado' },
    { id: '#00041', cliente: 'María Gómez', tel: '+51 987 654 321', fecha: '19 may. 2026', hora: '11:30 a.m.', prodCount: '3 productos', prodDesc: 'Torta, Cupcake, Alfajor', total: 'S/120.00', estado: 'Cancelado' },
    { id: '#00040', cliente: 'María Gómez', tel: '+51 987 654 321', fecha: '19 may. 2026', hora: '11:30 a.m.', prodCount: '3 productos', prodDesc: 'Torta, Cupcake, Alfajor', total: 'S/120.00', estado: 'Completado' },
    { id: '#00039', cliente: 'María Gómez', tel: '+51 987 654 321', fecha: '19 may. 2026', hora: '11:30 a.m.', prodCount: '3 productos', prodDesc: 'Torta, Cupcake, Alfajor', total: 'S/120.00', estado: 'Completado' },
    { id: '#00038', cliente: 'María Gómez', tel: '+51 987 654 321', fecha: '19 may. 2026', hora: '11:30 a.m.', prodCount: '3 productos', prodDesc: 'Torta, Cupcake, Alfajor', total: 'S/120.00', estado: 'Completado' },
  ];

  // Función para obtener el color del texto del estado
  const getColorEstado = (estado) => {
    switch (estado) {
      case 'Completado': return '#27AE60';
      case 'Pendiente': return '#F39C12';
      case 'Cancelado': return '#E74C3C';
      default: return '#777';
    }
  };

  const tabs = ["Todas las ventas", "Completadas", "Pendientes", "Canceladas"];

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%', width: '100%' }}>

      {/* ========== TÍTULO Y BOTÓN EXPORTAR ========== */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 5px 0', textTransform: 'uppercase' }}>
            VENTAS
          </h1>
          <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>
            Consulta y gestiona las ventas de tu negocio.
          </p>
        </div>
        <button style={{ backgroundColor: '#FCF0F2', color: '#C3666D', border: '1.5px solid #FADADD', borderRadius: '8px', padding: '10px 20px', fontFamily: 'Poppins-SemiBold', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>
          <i className="fa-solid fa-download"></i> Exportar reporte
        </button>
      </div>

      {/* ========== TARJETAS DE MÉTRICAS (KPIs) ========== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '35px' }}>
        {kpis.map((kpi, index) => (
          <div key={index} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', border: `2px solid ${kpi.border}`, display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
            <div style={{ width: '55px', height: '55px', backgroundColor: kpi.bg, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: kpi.color, fontSize: '22px', flexShrink: 0, fontFamily: 'Poppins-Bold' }}>
              {kpi.customIcon ? <span>{kpi.customIcon}</span> : <i className={kpi.icon}></i>}
            </div>
            <div>
              <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', margin: '0 0 2px 0' }}>{kpi.titulo}</p>
              <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '26px', color: '#5A3E41', margin: '0 0 5px 0', lineHeight: '1' }}>{kpi.valor}</h2>
              <p style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#777', margin: 0 }}>
                <span style={{ color: '#27AE60' }}>{kpi.porcentaje}</span> {kpi.extra}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ========== BARRA DE BÚSQUEDA Y FILTROS ========== */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '35px' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '0 15px', backgroundColor: 'white' }}>
          <i className="fa-solid fa-magnifying-glass" style={{ color: '#999', fontSize: '16px' }}></i>
          <input 
            type="text" 
            placeholder="Buscar el pedido, cliente o producto ..." 
            style={{ border: 'none', outline: 'none', width: '100%', padding: '12px 10px', fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#5A3E41' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ border: '1px solid #D9D9D9', borderRadius: '8px', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'white', fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', cursor: 'pointer' }}>
            <i className="fa-regular fa-calendar"></i>
            12 de may. 2026 - 19 de may. 2026
            <i className="fa-solid fa-chevron-down" style={{ fontSize: '10px', marginLeft: '5px' }}></i>
          </div>
          <button style={{ backgroundColor: 'white', color: '#C3666D', border: '1.5px solid #C3666D', borderRadius: '8px', padding: '0 25px', height: '100%', fontFamily: 'Poppins-Medium', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-filter"></i> Filtros
          </button>
        </div>
      </div>

      {/* ========== SECCIÓN DE GRÁFICOS ========== */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px', marginBottom: '40px' }}>
        
        {/* Gráfico Ventas por Día */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #EAEAEA' }}>
          <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0 0 20px 0' }}>Ventas por día</h3>
          
          <div style={{ height: '240px', width: '100%', position: 'relative' }}>
            <svg viewBox="0 0 700 250" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="ventasGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F194B4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#F194B4" stopOpacity="0" />
                </linearGradient>
                <filter id="tooltipShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.1"/>
                </filter>
              </defs>

              {/* Eje Y */}
              {[
                { y: 20, val: 'S/ 800' }, { y: 70, val: 'S/ 600' },
                { y: 120, val: 'S/ 400' }, { y: 170, val: 'S/ 200' }, { y: 220, val: 'S/ 0' }
              ].map((line, i) => (
                <g key={i}>
                  <text x="0" y={line.y + 4} fill="#999" fontSize="12" fontFamily="Poppins-Medium">{line.val}</text>
                  <line x1="50" y1={line.y} x2="700" y2={line.y} stroke="#EAEAEA" strokeWidth="1" strokeDasharray={i === 4 ? "0" : "5,5"} />
                </g>
              ))}

              {/* Eje X */}
              {['12 may.', '13 may.', '14 may.', '15 may.', '16 may.', '17 may.', '18 may.', '19 may.'].map((day, i) => (
                <text key={i} x={80 + (i * 85)} y="245" fill="#999" fontSize="12" fontFamily="Poppins-Medium" textAnchor="middle">{day}</text>
              ))}

              {/* Área del Gráfico con Curvas Bezier */}
              <path 
                d="M 80 180 C 110 180, 130 110, 165 110 C 200 110, 215 130, 250 130 C 285 130, 300 65, 335 65 C 370 65, 385 75, 420 75 C 455 75, 470 120, 505 120 C 540 120, 555 70, 590 70 C 625 70, 640 45, 675 45 L 675 220 L 80 220 Z" 
                fill="url(#ventasGradient)" 
              />
              
              {/* Línea Principal del Gráfico */}
              <path 
                d="M 80 180 C 110 180, 130 110, 165 110 C 200 110, 215 130, 250 130 C 285 130, 300 65, 335 65 C 370 65, 385 75, 420 75 C 455 75, 470 120, 505 120 C 540 120, 555 70, 590 70 C 625 70, 640 45, 675 45" 
                fill="none" stroke="#F194B4" strokeWidth="3" 
              />

              {/* Puntos de intersección */}
              {[
                { cx: 80, cy: 180 }, { cx: 165, cy: 110 }, { cx: 250, cy: 130 },
                { cx: 335, cy: 65 }, { cx: 420, cy: 75 }, { cx: 505, cy: 120 },
                { cx: 590, cy: 70 }, { cx: 675, cy: 45 }
              ].map((pt, i) => (
                <circle key={i} cx={pt.cx} cy={pt.cy} r="5" fill="white" stroke="#F194B4" strokeWidth="3" />
              ))}

              {/* Tooltip '15 may.' */}
              <g transform="translate(335, 15)" filter="url(#tooltipShadow)">
                <rect x="-55" y="0" width="110" height="40" rx="8" fill="white" />
                <text x="0" y="16" fill="#777" fontSize="11" fontFamily="Poppins-Medium" textAnchor="middle">15 may. 2026</text>
                <text x="0" y="32" fill="#5A3E41" fontSize="13" fontFamily="Poppins-Bold" textAnchor="middle">S/ 620.00</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Gráfico Ventas por Categoría */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #EAEAEA', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0 0 20px 0' }}>Ventas por categoría</h3>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', flex: 1 }}>
            <div style={{ width: '180px', height: '180px', position: 'relative' }}>
              <svg viewBox="0 0 32 32" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%', overflow: 'visible', filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.05))' }}>
                {/* 45% Tortas Clásicas */}
                <circle r="15.915" cx="16" cy="16" fill="transparent" stroke="#F194B4" strokeWidth="7" strokeDasharray="45 55" strokeDashoffset="0" />
                {/* 25% Cupcakes */}
                <circle r="15.915" cx="16" cy="16" fill="transparent" stroke="#9B59B6" strokeWidth="7" strokeDasharray="25 75" strokeDashoffset="-45" />
                {/* 15% Alfajores */}
                <circle r="15.915" cx="16" cy="16" fill="transparent" stroke="#F2C94C" strokeWidth="7" strokeDasharray="15 85" strokeDashoffset="-70" />
                {/* 10% Trufas */}
                <circle r="15.915" cx="16" cy="16" fill="transparent" stroke="#27AE60" strokeWidth="7" strokeDasharray="10 90" strokeDashoffset="-85" />
                {/* 5% Otros */}
                <circle r="15.915" cx="16" cy="16" fill="transparent" stroke="#C6676D" strokeWidth="7" strokeDasharray="5 95" strokeDashoffset="-95" />
              </svg>
              {/* Texto Central */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#777', fontFamily: 'Poppins-Medium' }}>Total</span>
                <span style={{ fontSize: '18px', color: '#5A3E41', fontFamily: 'Poppins-Bold', lineHeight: '1.2' }}>S/ 3,420.00</span>
              </div>
            </div>
          </div>

          {/* Leyenda */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><span style={{color: '#F194B4', fontSize:'18px', marginRight: '6px'}}>●</span> Tortas clásicas</div> <span>45%</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><span style={{color: '#9B59B6', fontSize:'18px', marginRight: '6px'}}>●</span> Cupcakes</div> <span>25%</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><span style={{color: '#F2C94C', fontSize:'18px', marginRight: '6px'}}>●</span> Alfajores</div> <span>15%</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><span style={{color: '#27AE60', fontSize:'18px', marginRight: '6px'}}>●</span> Trufas</div> <span>10%</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><span style={{color: '#C6676D', fontSize:'18px', marginRight: '6px'}}>●</span> Otros</div> <span>5%</span></div>
          </div>
        </div>

      </div>

      {/* ========== TABLA DE VENTAS ========== */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #EAEAEA', overflow: 'hidden', padding: '20px 30px', marginBottom: '30px' }}>
        
        {/* TABS DE LA TABLA */}
        <div style={{ display: 'flex', borderBottom: '2px solid #FDF2F3', marginBottom: '20px', gap: '30px' }}>
          {tabs.map((tab) => {
            const isActive = tabActiva === tab;
            return (
              <div 
                key={tab}
                onClick={() => setTabActiva(tab)}
                style={{
                  paddingBottom: '12px',
                  cursor: 'pointer',
                  borderBottom: isActive ? '3px solid #C3666D' : '3px solid transparent',
                  fontFamily: 'Poppins-Bold', 
                  fontSize: '15px', 
                  color: isActive ? '#C3666D' : '#A08D8F',
                  transition: 'all 0.2s'
                }}
              >
                {tab}
              </div>
            );
          })}
        </div>

        {/* ESTRUCTURA DE LA TABLA */}
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #EAEAEA' }}>
              <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '15px 10px', fontWeight: 'normal' }}>Pedido</th>
              <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '15px 10px', fontWeight: 'normal' }}>Cliente</th>
              <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '15px 10px', fontWeight: 'normal' }}>Fecha</th>
              <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '15px 10px', fontWeight: 'normal' }}>Productos</th>
              <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '15px 10px', fontWeight: 'normal' }}>Total</th>
              <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '15px 10px', fontWeight: 'normal' }}>Estado</th>
              <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '15px 10px', fontWeight: 'normal', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventasData.map((venta, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #F5F5F5' }}>
                <td style={{ padding: '15px 10px', verticalAlign: 'middle' }}>
                  <div style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41' }}>{venta.id}</div>
                  <a href="#" style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#F194B4', textDecoration: 'none' }}>Ver detalle</a>
                </td>
                <td style={{ padding: '15px 10px', verticalAlign: 'middle' }}>
                  <div style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41' }}>{venta.cliente}</div>
                  <div style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#777' }}>{venta.tel}</div>
                </td>
                <td style={{ padding: '15px 10px', verticalAlign: 'middle' }}>
                  <div style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#5A3E41' }}>{venta.fecha}</div>
                  <div style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#777' }}>{venta.hora}</div>
                </td>
                <td style={{ padding: '15px 10px', verticalAlign: 'middle' }}>
                  <div style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#5A3E41' }}>{venta.prodCount}</div>
                  <div style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#777' }}>{venta.prodDesc}</div>
                </td>
                <td style={{ padding: '15px 10px', verticalAlign: 'middle' }}>
                  <div style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#5A3E41' }}>{venta.total}</div>
                </td>
                <td style={{ padding: '15px 10px', verticalAlign: 'middle' }}>
                  <div style={{ fontFamily: 'Poppins-SemiBold', fontSize: '13px', color: getColorEstado(venta.estado) }}>
                    {venta.estado}
                  </div>
                </td>
                <td style={{ padding: '15px 10px', verticalAlign: 'middle', textAlign: 'center' }}>
                  <button style={{ background: 'none', border: 'none', color: '#F194B4', fontSize: '18px', cursor: 'pointer' }}>
                    <i className="fa-regular fa-eye"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ========== PAGINACIÓN ========== */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: 0 }}>
          Mostrando de 1-8 de 42 ventas
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

export default AdminMenu4;
import React from "react";
import logoPrincipal from './assets/logo.png'; 

// IMÁGENES DE PRODUCTOS (Reutilizadas para las categorías)
import imgTcTripleChocolate from './assets/products/tc-triple-chocolate.png';
import imgCArandano from './assets/products/c-arandano.png';
import imgAClasico from './assets/products/a-clasico.png';
import imgTFresa from './assets/products/t-fresa.png';
import imgMeQueso from './assets/products/me-queso.png';
import imgTvClasicos from './assets/products/tv-clasicos.png';

const AdminMenu8 = () => {

  // Data simulada para las tarjetas KPI
  const kpis = [
    { titulo: "Ingresos totales", valor: "S/5,680.00", porcentaje: "↑ 18.6%", extra: "vs. 05 May - 11 May", icon: "S/", customIcon: true, color: "#F194B4", border: "#FADADD" },
    { titulo: "Costos totales", valor: "S/2,350.00", porcentaje: "↑ 8.3%", extra: "vs. 05 May - 11 May", icon: "fa-solid fa-cart-shopping", color: "#F2C94C", border: "#FDE49E" },
    { titulo: "Ganancia neta", valor: "S/3,330.00", porcentaje: "↑ 26.4%", extra: "vs. 05 May - 11 May", icon: "fa-dollar", color: "#27AE60", border: "#A9DFBF" },
    { titulo: "Margen de ganancia", valor: "58.6%", porcentaje: "↑ 3.2%", extra: "vs. 05 May - 11 May", icon: "fa-solid fa-chart-column", color: "#9B59B6", border: "#D7BDE2" },
  ];

  // Data simulada para la tabla de categorías
  const categoriasData = [
    { nombre: "Entremets", img: imgTFresa, ingresos: "S/3,200.00", costos: "S/1,280.00", ganancia: "S/1,920.00", margen: "60.0%" },
    { nombre: "Tortas Clásicas", img: imgTcTripleChocolate, ingresos: "S/1,150.00", costos: "S/520.00", ganancia: "S/730.00", margen: "58.4%" },
    { nombre: "Galletas", img: imgAClasico, ingresos: "S/720.00", costos: "S/300.00", ganancia: "S/420.00", margen: "58.3%" },
    { nombre: "Tequeños", img: imgTvClasicos, ingresos: "S/510.00", costos: "S/250.00", ganancia: "S/260.00", margen: "51.0%" },
    { nombre: "Mini Sandwiches", img: imgMeQueso, ingresos: "S/3,200.00", costos: "S/1,280.00", ganancia: "S/1,920.00", margen: "60%" },
    { nombre: "Mini Empanadas", img: imgMeQueso, ingresos: "S/3,200.00", costos: "S/1,280.00", ganancia: "S/1,920.00", margen: "60%" },
    { nombre: "Alfajores", img: imgAClasico, ingresos: "S/3,200.00", costos: "S/1,280.00", ganancia: "S/1,920.00", margen: "60%" },
    { nombre: "Trufas", img: imgTFresa, ingresos: "S/3,200.00", costos: "S/1,280.00", ganancia: "S/1,920.00", margen: "60%" },
    { nombre: "Postres Fríos", img: imgTcTripleChocolate, ingresos: "S/3,200.00", costos: "S/1,280.00", ganancia: "S/1,920.00", margen: "60%" },
    { nombre: "Cupcakes", img: imgCArandano, ingresos: "S/3,200.00", costos: "S/1,280.00", ganancia: "S/1,920.00", margen: "60%" },
  ];

  const resumenGeneral = [
    { etiqueta: "Total de pedidos", valor: "152" },
    { etiqueta: "Ticket promedio", valor: "S/37.37" },
    { etiqueta: "Productos vendidos", valor: "438" },
    { etiqueta: "Devoluciones", valor: "S/120.00" },
    { etiqueta: "Descuentos aplicados", valor: "S/250.00" },
  ];

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%', width: '100%' }}>

      {/* ========== TÍTULO ========== */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 5px 0', textTransform: 'uppercase' }}>
          GANANCIAS
        </h1>
        <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>
          Resumen de ingresos, costos y ganancias
        </p>
      </div>

      {/* ========== CONTROLES (FECHA, FILTROS, EXPORTAR) ========== */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ border: '1px solid #D9D9D9', borderRadius: '8px', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'white', fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', cursor: 'pointer', width: '280px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fa-regular fa-calendar"></i>
              12 de may. 2026 - 19 de may. 2026
            </div>
            <i className="fa-solid fa-chevron-down" style={{ fontSize: '10px' }}></i>
          </div>
          <button style={{ backgroundColor: 'white', color: '#C3666D', border: '1.5px solid #C3666D', borderRadius: '8px', padding: '0 25px', height: '42px', fontFamily: 'Poppins-Medium', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-filter"></i> Filtros
          </button>
        </div>

        <button style={{ backgroundColor: '#FCF0F2', color: '#C3666D', border: '1.5px solid #FADADD', borderRadius: '8px', padding: '10px 20px', fontFamily: 'Poppins-SemiBold', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>
          <i className="fa-solid fa-download"></i> Exportar reporte
        </button>
      </div>

      {/* ========== TARJETAS DE MÉTRICAS (KPIs) ========== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '35px' }}>
        {kpis.map((kpi, index) => (
          <div key={index} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', border: `2px solid ${kpi.border}`, display: 'flex', alignItems: 'flex-start', gap: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: kpi.color, fontSize: '20px', flexShrink: 0, fontFamily: 'Poppins-Bold', border: `2px solid ${kpi.color}`, backgroundColor: 'white' }}>
              {kpi.customIcon ? <span>{kpi.icon}</span> : <i className={kpi.icon}></i>}
            </div>
            <div>
              <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', margin: '0 0 5px 0' }}>{kpi.titulo}</p>
              <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '26px', color: '#5A3E41', margin: '0 0 8px 0', lineHeight: '1' }}>{kpi.valor}</h2>
              <p style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#777', margin: 0 }}>
                <span style={{ color: '#27AE60' }}>{kpi.porcentaje}</span> {kpi.extra}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ========== GRÁFICO PRINCIPAL (SVG Estático) ========== */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #EAEAEA', marginBottom: '30px' }}>
        <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0 0 20px 0' }}>Ganancia neta</h3>
        
        <div style={{ height: '300px', width: '100%', position: 'relative' }}>
          <svg viewBox="0 0 700 250" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <linearGradient id="gananciaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C6676D" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#C6676D" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Eje Y */}
            {[
              { y: 20, val: 'S/ 1,200' }, { y: 70, val: 'S/ 900' },
              { y: 120, val: 'S/ 600' }, { y: 170, val: 'S/ 300' }, { y: 220, val: 'S/ 0' }
            ].map((line, i) => (
              <g key={i}>
                <text x="0" y={line.y + 4} fill="#999" fontSize="12" fontFamily="Poppins-Medium">{line.val}</text>
                <line x1="60" y1={line.y} x2="700" y2={line.y} stroke="#EAEAEA" strokeWidth="1" strokeDasharray={i === 4 ? "0" : "5,5"} />
              </g>
            ))}

            {/* Eje X */}
            {['12 may.', '13 may.', '14 may.', '15 may.', '16 may.', '17 may.', '18 may.'].map((day, i) => (
              <text key={i} x={90 + (i * 95)} y="245" fill="#999" fontSize="12" fontFamily="Poppins-Medium" textAnchor="middle">{day}</text>
            ))}

            {/* Área con gradiente (Líneas Rectas) */}
            <path 
              d="M 90 87 L 185 137 L 280 95 L 375 45 L 470 79 L 565 62 L 660 112 L 660 220 L 90 220 Z" 
              fill="url(#gananciaGradient)" 
            />
            
            {/* Línea Principal (Recta) */}
            <path 
              d="M 90 87 L 185 137 L 280 95 L 375 45 L 470 79 L 565 62 L 660 112" 
              fill="none" stroke="#C6676D" strokeWidth="3" 
            />

            {/* Puntos (Sólidos) */}
            {[
              { cx: 90, cy: 87 }, { cx: 185, cy: 137 }, { cx: 280, cy: 95 },
              { cx: 375, cy: 45 }, { cx: 470, cy: 79 }, { cx: 565, cy: 62 }, { cx: 660, cy: 112 }
            ].map((pt, i) => (
              <circle key={i} cx={pt.cx} cy={pt.cy} r="5" fill="#C6676D" />
            ))}
          </svg>
        </div>
      </div>

      {/* ========== GRÁFICO DONA Y COMPARACIÓN ========== */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '25px', marginBottom: '40px' }}>
        
        {/* Desglose de ganancias */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #EAEAEA' }}>
          <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0 0 20px 0' }}>Desglose de ganancias</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: '20px' }}>
            
            {/* Contenedor Donut SVG */}
            <div style={{ width: '220px', height: '220px', position: 'relative' }}>
              <svg viewBox="0 0 32 32" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%', overflow: 'visible', filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.05))' }}>
                {/* 64.6% Productos de pastelería */}
                <circle r="15.915" cx="16" cy="16" fill="transparent" stroke="#F194B4" strokeWidth="8" strokeDasharray="64.6 35.4" strokeDashoffset="0" />
                {/* 20.4% Bebidas y extras */}
                <circle r="15.915" cx="16" cy="16" fill="transparent" stroke="#F2C94C" strokeWidth="8" strokeDasharray="20.4 79.6" strokeDashoffset="-64.6" />
                {/* 15.0% Personalizados */}
                <circle r="15.915" cx="16" cy="16" fill="transparent" stroke="#D7BDE2" strokeWidth="8" strokeDasharray="15 85" strokeDashoffset="-85" />
              </svg>
              {/* Texto Central */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ fontSize: '15px', color: '#5A3E41', fontFamily: 'Poppins-Medium' }}>Total</span>
                <span style={{ fontSize: '24px', color: '#5A3E41', fontFamily: 'Poppins-Bold', lineHeight: '1.2' }}>S/ 3,330.00</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: '#F194B4', fontSize: '16px', marginTop: '2px' }}>●</span>
                <div>
                  <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', margin: '0 0 2px 0' }}>Productos de pastelería</p>
                  <p style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#777', margin: 0 }}>S/ 2,150.00 (64.6%)</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: '#F2C94C', fontSize: '16px', marginTop: '2px' }}>●</span>
                <div>
                  <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', margin: '0 0 2px 0' }}>Bebidas y extras</p>
                  <p style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#777', margin: 0 }}>S/ 680.00 (20.4%)</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: '#D7BDE2', fontSize: '16px', marginTop: '2px' }}>●</span>
                <div>
                  <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', margin: '0 0 2px 0' }}>Personalizados</p>
                  <p style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#777', margin: 0 }}>S/ 500.00 (15.0%)</p>
                </div>
              </div>
              <button style={{ alignSelf: 'flex-start', background: 'none', border: '1px solid #C3666D', color: '#C3666D', borderRadius: '6px', padding: '6px 15px', fontFamily: 'Poppins-Medium', fontSize: '13px', cursor: 'pointer', marginTop: '10px' }}>
                Ver detalles
              </button>
            </div>
          </div>
        </div>

        {/* Comparación de periodos */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #EAEAEA', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0 0 25px 0' }}>Comparación de periodos</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', margin: '0 0 2px 0' }}>Este periodo</p>
              <p style={{ fontFamily: 'Poppins-Regular', fontSize: '11px', color: '#777', margin: '0 0 8px 0' }}>12 may. - 15 may. 2026</p>
              <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#C6676D', margin: 0 }}>S/3,330.00</h4>
            </div>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#F194B4', color: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px' }}>
              <i className="fa-solid fa-arrow-trend-up"></i>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <div>
              <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', margin: '0 0 2px 0' }}>Periodo anterior</p>
              <p style={{ fontFamily: 'Poppins-Regular', fontSize: '11px', color: '#777', margin: '0 0 8px 0' }}>05 may. - 11 may. 2026</p>
              <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: 0 }}>S/2,950.00</h4>
            </div>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#EAEAEA', color: '#777', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px' }}>
              <i className="fa-solid fa-arrow-trend-up"></i>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #EAEAEA', paddingTop: '20px' }}>
            <div>
              <p style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#777', margin: '0 0 5px 0' }}>Variación</p>
              <p style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#27AE60', margin: '0 0 2px 0' }}>↑ +12.9%</p>
              <p style={{ fontFamily: 'Poppins-Regular', fontSize: '11px', color: '#777', margin: 0 }}>S/380.00 más</p>
            </div>
            <div style={{ width: '40px', height: '40px', border: '1.5px solid #27AE60', color: '#27AE60', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>
              <i className="fa-solid fa-arrow-up"></i>
            </div>
          </div>

        </div>

      </div>

      {/* ========== RESUMEN POR CATEGORÍA ========== */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0 0 20px 0' }}>Resumen por categoría</h3>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #EAEAEA', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #FDF2F3' }}>
                <th style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41', padding: '20px 30px' }}>Categoría</th>
                <th style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41', padding: '20px 30px' }}>Ingresos</th>
                <th style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41', padding: '20px 30px' }}>Costos</th>
                <th style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41', padding: '20px 30px' }}>Ganancia</th>
                <th style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41', padding: '20px 30px' }}>Margen</th>
              </tr>
            </thead>
            <tbody>
              {categoriasData.map((cat, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #F5F5F5' }}>
                  <td style={{ padding: '15px 30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img src={cat.img} alt={cat.nombre} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} onError={e => e.target.style.display='none'} />
                    <span style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#5A3E41' }}>{cat.nombre}</span>
                  </td>
                  <td style={{ padding: '15px 30px', fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777' }}>{cat.ingresos}</td>
                  <td style={{ padding: '15px 30px', fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777' }}>{cat.costos}</td>
                  <td style={{ padding: '15px 30px', fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777' }}>{cat.ganancia}</td>
                  <td style={{ padding: '15px 30px', fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#27AE60' }}>{cat.margen}</td>
                </tr>
              ))}
              {/* Fila de Total */}
              <tr style={{ backgroundColor: '#FAFAFA', borderTop: '2px solid #EAEAEA' }}>
                <td style={{ padding: '20px 30px', fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', textAlign: 'center' }}>Total</td>
                <td style={{ padding: '20px 30px', fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#5A3E41' }}>S/24,880.00</td>
                <td style={{ padding: '20px 30px', fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#5A3E41' }}>S/10,030.00</td>
                <td style={{ padding: '20px 30px', fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#5A3E41' }}>S/14,850.00</td>
                <td style={{ padding: '20px 30px', fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#27AE60' }}>59.7%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ========== RESUMEN GENERAL ========== */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #EAEAEA', padding: '30px', marginBottom: '30px' }}>
        <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0 0 25px 0' }}>Resumen general</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {resumenGeneral.map((item, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: index !== resumenGeneral.length - 1 ? '15px' : '0', borderBottom: index !== resumenGeneral.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
              <span style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#5A3E41' }}>{item.etiqueta}</span>
              <span style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777' }}>{item.valor}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ========== BANNER ¡BUEN TRABAJO! ========== */}
      <div style={{ backgroundColor: '#FFF6F7', borderRadius: '12px', padding: '30px', display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '40px' }}>
        <div style={{ color: '#F194B4', fontSize: '50px' }}>
          <i className="fa-solid fa-arrow-trend-up"></i>
        </div>
        <div>
          <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#C6676D', margin: '0 0 5px 0' }}>¡Buen trabajo!</h3>
          <p style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#C6676D', margin: 0 }}>Tu ganancia neta aumentó 26.4% en comparación con el periodo anterior.</p>
        </div>
      </div>

      {/* ========== FOOTER ========== */}
      <p style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#999', margin: '0 0 20px 0' }}>
        <span style={{ color: '#C3666D' }}>♥</span> Gracias por endulzar cada día con tu trabajo
      </p>

    </div>
  );
};

export default AdminMenu8;
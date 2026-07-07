import React from "react";
import logoPrincipal from './assets/logo.png'; 

const AdminMenu9 = () => {

  // Data simulada para las tarjetas KPI
  const kpis = [
    { valor: "8", subtitulo: "Reportes generados", detalle: "en este periodo", icon: "fa-regular fa-file-lines", color: "#F194B4", border: "#FADADD", bg: "#FDF2F3" },
    { valor: "8", subtitulo: "Descargados en", detalle: "este periodo", icon: "fa-solid fa-download", color: "#27AE60", border: "#A9DFBF", bg: "#E9F7EF" },
    { especial: true, titulo: "Ultimo reporte", valor: "18 may. 2026", detalle: "10:30 am", icon: "fa-regular fa-clock", color: "#9B59B6", border: "#D7BDE2", bg: "#F4ECF7" },
    { valor: "7", subtitulo: "Tipos de reportes", detalle: "disponibles", icon: "fa-solid fa-chart-pie", color: "#F2C94C", border: "#FDE49E", bg: "#FFF9E6" },
  ];

  // Data simulada para la tabla de reportes
  const reportesData = [
    { id: 1, nombre: "Reporte de ventas", descripcion: "Resumen de todas las ventas realizadas en el período.", periodo: "12 may. - 18 may. 2026", icon: "fas fa-chart-bar", color: "#F194B4", bg: "#FDF2F3" },
    { id: 2, nombre: "Reporte de ganancias", descripcion: "Detalle de ingresos, costos y ganancias del negocio.", periodo: "12 may. - 18 may. 2026", icon: "fa-dollar", color: "#27AE60", bg: "#E9F7EF" },
    { id: 3, nombre: "Reporte de productos", descripcion: "Productos más vendidos y rendimiento por producto.", periodo: "12 may. - 18 may. 2026", icon: "fa-solid fa-box", color: "#F2C94C", bg: "#FFF9E6" },
    { id: 4, nombre: "Reporte de pedidos", descripcion: "Historial y estado de todos los pedidos realizados.", periodo: "12 may. - 18 may. 2026", icon: "fa-solid fa-bag-shopping", color: "#9B59B6", bg: "#F4ECF7" },
    { id: 5, nombre: "Reporte de personal", descripcion: "Información y rendimiento del personal del negocio.", periodo: "12 may. - 18 may. 2026", icon: "fa-solid fa-user-group", color: "#F194B4", bg: "#FDF2F3" },
    { id: 6, nombre: "Reporte de horarios", descripcion: "Horarios programados y turnos del personal.", periodo: "12 may. - 18 may. 2026", icon: "fa-regular fa-calendar-days", color: "#5DADE2", bg: "#EBF5FB" },
    { id: 7, nombre: "Reporte de ofertas", descripcion: "Rendimiento de ofertas y descuentos aplicados.", periodo: "12 may. - 18 may. 2026", icon: "fa-solid fa-tag", color: "#E67E22", bg: "#FEF5E7" },
  ];

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%', width: '100%' }}>

      {/* TÍTULO */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 5px 0', textTransform: 'uppercase' }}>
          REPORTES
        </h1>
        <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>
          Descarga y consulta todos los reportes de tu negocio.
        </p>
      </div>

      {/* CONTROLES (FECHA, TIPO, FILTROS) */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ flex: 1, border: '1px solid #D9D9D9', borderRadius: '8px', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: 'white', fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', cursor: 'pointer', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-regular fa-calendar" style={{ color: '#777', fontSize: '16px' }}></i>
            12 de may. 2026 - 19 de may. 2026
          </div>
          <i className="fa-solid fa-chevron-down" style={{ fontSize: '10px', color: '#999' }}></i>
        </div>

        <div style={{ width: '250px', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '10px 20px', display: 'flex', alignItems: 'center', backgroundColor: 'white', fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', cursor: 'pointer', justifyContent: 'space-between' }}>
          Todos los tipos
          <i className="fa-solid fa-chevron-down" style={{ fontSize: '10px', color: '#999' }}></i>
        </div>

        <button style={{ backgroundColor: 'white', color: '#C3666D', border: '1.5px solid #C3666D', borderRadius: '8px', padding: '0 30px', height: '42px', fontFamily: 'Poppins-Medium', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fa-solid fa-filter"></i> Filtros
        </button>
      </div>

      {/* TARJETAS DE MÉTRICAS (KPIs) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
        {kpis.map((kpi, index) => (
          <div key={index} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', border: `2px solid ${kpi.border}`, display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
            <div style={{ width: '55px', height: '55px', borderRadius: '50%', backgroundColor: kpi.bg, display: 'flex', justifyContent: 'center', alignItems: 'center', color: kpi.color, fontSize: '24px', flexShrink: 0 }}>
              <i className={kpi.icon}></i>
            </div>
            <div>
              {kpi.especial ? (
                <>
                  <p style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#777', margin: '0 0 2px 0' }}>{kpi.titulo}</p>
                  <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: '0 0 2px 0', lineHeight: '1.2' }}>{kpi.valor}</h2>
                  <p style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#777', margin: 0 }}>{kpi.detalle}</p>
                </>
              ) : (
                <>
                  <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '28px', color: '#5A3E41', margin: '0 0 2px 0', lineHeight: '1' }}>{kpi.valor}</h2>
                  <p style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#777', margin: '0 0 2px 0' }}>{kpi.subtitulo}</p>
                  <p style={{ fontFamily: 'Poppins-Regular', fontSize: '11px', color: '#999', margin: 0 }}>{kpi.detalle}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* TABLA "TODOS LOS REPORTES" */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0 0 20px 0' }}>Todos los reportes</h3>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #EAEAEA', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #FDF2F3' }}>
                <th style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41', padding: '20px 30px' }}>Reporte</th>
                <th style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41', padding: '20px 30px' }}>Descripción</th>
                <th style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41', padding: '20px 30px' }}>Periodo</th>
                <th style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41', padding: '20px 30px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reportesData.map((rep, index) => (
                <tr key={rep.id} style={{ borderBottom: index !== reportesData.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                  <td style={{ padding: '20px 30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: rep.bg, color: rep.color, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px', flexShrink: 0, border: `1.5px solid ${rep.color}40` }}>
                        <i className={rep.icon}></i>
                      </div>
                      <span style={{ fontFamily: 'Poppins-Medium', fontSize: '15px', color: '#5A3E41' }}>{rep.nombre}</span>
                    </div>
                  </td>
                  <td style={{ padding: '20px 30px', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', maxWidth: '300px', lineHeight: '1.4' }}>
                    {rep.descripcion}
                  </td>
                  <td style={{ padding: '20px 30px', fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777' }}>
                    {rep.periodo}
                  </td>
                  <td style={{ padding: '20px 30px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button style={{ backgroundColor: 'white', color: '#27AE60', border: '1.5px solid #27AE60', borderRadius: '6px', padding: '6px 15px', fontFamily: 'Poppins-Medium', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <i className="fa-solid fa-download"></i> Excel
                      </button>
                      <button style={{ backgroundColor: 'white', color: '#C6676D', border: '1.5px solid #C6676D', borderRadius: '6px', padding: '6px 15px', fontFamily: 'Poppins-Medium', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <i className="fa-solid fa-download"></i> PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* BANNER INFORMACIÓN IMPORTANTE */}
      <div style={{ backgroundColor: '#FFF6F7', borderRadius: '15px', padding: '35px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #FADADD' }}>
        <div style={{ maxWidth: '600px' }}>
          <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#C6676D', margin: '0 0 15px 0' }}>Información importante</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#C6676D', fontFamily: 'Poppins-Regular', fontSize: '13px', lineHeight: '1.8' }}>
            <li>Los reportes se generan en tiempo real con la información más actualizada.</li>
            <li>Puedes descargar los reportes en formato PDF o Excel.</li>
            <li>Los reportes pueden tardar unos minutos en generarse según la cantidad de datos.</li>
          </ul>
        </div>
        
        {/* Gráfico representativo CSS */}
        <div style={{ position: 'relative', width: '120px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
           <div style={{ position: 'absolute', width: '90px', height: '80px', backgroundColor: '#FADADD', borderRadius: '8px', transform: 'rotate(-10deg)', zIndex: 1 }}></div>
           <div style={{ position: 'absolute', width: '80px', height: '90px', backgroundColor: 'white', border: '2px solid #FADADD', borderRadius: '4px', transform: 'rotate(5deg)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '4px solid #5DADE2', borderTopColor: '#F2C94C', borderRightColor: '#F194B4' }}></div>
              <div style={{ width: '60%', height: '4px', backgroundColor: '#EAEAEA', marginTop: '10px', borderRadius: '2px' }}></div>
              <div style={{ width: '40%', height: '4px', backgroundColor: '#EAEAEA', marginTop: '5px', borderRadius: '2px' }}></div>
           </div>
           <div style={{ position: 'absolute', bottom: '-10px', width: '110px', height: '60px', backgroundColor: '#F194B4', borderRadius: '8px', transform: 'rotate(-5deg)', zIndex: 3, borderTop: '4px solid #C6676D' }}></div>
        </div>
      </div>

      {/* FOOTER */}
      <p style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#999', margin: '40px 0 20px 0' }}>
        <span style={{ color: '#C3666D' }}>♥</span> Gracias por endulzar cada día con tu trabajo
      </p>

    </div>
  );
};

export default AdminMenu9;
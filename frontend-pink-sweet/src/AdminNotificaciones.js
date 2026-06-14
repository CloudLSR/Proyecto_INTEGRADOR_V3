import React from "react";

const AdminNotificaciones = () => {

  // Data simulada para las tarjetas KPI
  const kpis = [
    { titulo: "Total de notificaciones", valor: "24", detalle: "todas las notificaciones", icon: "fa-regular fa-bell", color: "#F194B4", border: "#FADADD" },
    { titulo: "No leídas", valor: "8", detalle: "pendientes por leer", icon: "fa-regular fa-envelope", color: "#F2C94C", border: "#FDE49E" },
    { titulo: "Leídas", valor: "16", detalle: "notificaciones leídas", icon: "fa-regular fa-circle-check", color: "#27AE60", border: "#A9DFBF" },
    { titulo: "Hoy", valor: "7", detalle: "recibidas hoy", icon: "fa-regular fa-calendar", color: "#9B59B6", border: "#D7BDE2" },
  ];

  // Data simulada para la lista de notificaciones
  const notificacionesData = [
    { titulo: "Nuevo pedido recibido", desc: "Tienes un nuevo pedido #000129 de María Gomez.", tiempo: "Hace 10 min", unread: true },
    { titulo: "Pago confirmado", desc: "El pago del pedido #000128 ha sido confirmado.", tiempo: "Hace 35 min", unread: true },
    { titulo: "Producto con Stock bajo", desc: 'El producto "tequeños con queso" tiene bajo stock.', tiempo: "Hace 1 hora", unread: true },
    { titulo: "Comentario nuevo", desc: "Tienes un nuevo comentario en el pedido #000125.", tiempo: "Hace 2 horas", unread: true },
    { titulo: "Recordatorio de respaldo", desc: "No olvides de realizar el respaldo de la base de datos.", tiempo: "Hace 3 horas", unread: false },
    { titulo: "Actualización del sistema", desc: "Se ha actualizado el sistema a la versión 1.0.0.", tiempo: "Ayer, 09:15 AM", unread: false }
  ];

  // Data para los filtros de la derecha
  const filtrosEstado = [
    { label: "Todas las notificaciones", count: 24, icon: "fa-regular fa-circle-check", color: "#C6676D", active: true },
    { label: "No leídas", count: 8, icon: "fa-regular fa-bell", color: "#999", active: false },
    { label: "Leídas", count: 16, icon: "fa-regular fa-circle-check", color: "#999", active: false }
  ];

  const filtrosTipo = [
    { label: "Pedidos", count: 8, icon: "fa-solid fa-bag-shopping", color: "#F2C94C" },
    { label: "Pagos", count: 4, icon: "fa-solid fa-money-bill-wave", color: "#27AE60" },
    { label: "Productos", count: 3, icon: "fa-solid fa-box", color: "#F39C12" },
    { label: "Comentarios", count: 2, icon: "fa-regular fa-comment-dots", color: "#9B59B6" },
    { label: "Sistema", count: 4, icon: "fa-solid fa-gear", color: "#9B59B6" },
    { label: "Recordatorios", count: 3, icon: "fa-solid fa-cloud", color: "#5DADE2" }
  ];

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%', width: '100%' }}>
      
      {/* ========== TÍTULO ========== */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 5px 0' }}>Notificaciones</h1>
        <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>Revisa todas las notificaciones y novedades del sistema.</p>
      </div>

      {/* ========== KPIs ========== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '35px' }}>
        {kpis.map((kpi, index) => (
          <div key={index} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', border: `1.5px solid ${kpi.border}`, display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
            <div style={{ color: kpi.color, fontSize: '32px', flexShrink: 0 }}>
              <i className={kpi.icon}></i>
            </div>
            <div>
              <p style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#777', margin: '0 0 2px 0' }}>{kpi.titulo}</p>
              <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '24px', color: '#5A3E41', margin: '0 0 2px 0', lineHeight: '1.2' }}>{kpi.valor}</h2>
              <p style={{ fontFamily: 'Poppins-Regular', fontSize: '11px', color: '#999', margin: 0 }}>{kpi.detalle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ========== CONTENIDO PRINCIPAL (LISTA + FILTROS) ========== */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '25px', marginBottom: '35px' }}>
        
        {/* === COLUMNA IZQUIERDA: LISTA DE NOTIFICACIONES === */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #EAEAEA', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
            <div style={{ color: '#F194B4', fontSize: '20px' }}><i className="fa-regular fa-bell"></i></div>
            <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: 0 }}>Notificaciones recientes</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', flexGrow: 1 }}>
            {notificacionesData.map((noti, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: index !== notificacionesData.length - 1 ? '1px solid #F5F5F5' : 'none', paddingBottom: index !== notificacionesData.length - 1 ? '20px' : '0' }}>
                <div>
                  <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41', margin: '0 0 5px 0' }}>{noti.titulo}</h4>
                  <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: 0 }}>{noti.desc}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#999', whiteSpace: 'nowrap' }}>{noti.tiempo}</span>
                  {noti.unread ? (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#C6676D' }}></div>
                  ) : (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'transparent' }}></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Paginación */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', borderTop: '1px solid #EAEAEA', paddingTop: '20px' }}>
            <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: 0 }}>
              Mostrando de 1 a 7 de 24 notificaciones
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button style={{ border: '1px solid #D9D9D9', background: 'white', color: '#C3666D', width: '30px', height: '30px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium' }}><i className="fa-solid fa-arrow-left"></i></button>
              <button style={{ border: 'none', background: '#C3666D', color: 'white', width: '30px', height: '30px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Bold', fontSize: '13px' }}>1</button>
              <button style={{ border: '1px solid #D9D9D9', background: 'white', color: '#5A3E41', width: '30px', height: '30px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium', fontSize: '13px' }}>2</button>
              <button style={{ border: '1px solid #D9D9D9', background: 'white', color: '#5A3E41', width: '30px', height: '30px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium', fontSize: '13px' }}>3</button>
              <span style={{ fontFamily: 'Poppins-Bold', color: '#5A3E41', margin: '0 5px' }}>...</span>
              <button style={{ border: '1px solid #D9D9D9', background: 'white', color: '#C3666D', width: '30px', height: '30px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium' }}><i className="fa-solid fa-arrow-right"></i></button>
            </div>
          </div>
        </div>

        {/* === COLUMNA DERECHA: FILTROS Y CONFIGURACIÓN === */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #EAEAEA', height: 'fit-content' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
            <div style={{ color: '#F194B4', fontSize: '20px' }}><i className="fa-solid fa-filter"></i></div>
            <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: 0 }}>Filtros y configuración</h3>
          </div>

          {/* Estado */}
          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41', margin: '0 0 15px 0' }}>Estado</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {filtrosEstado.map((est, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: est.active ? '#C6676D' : '#777' }}>
                    <i className={est.icon} style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}></i>
                    <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px' }}>{est.label}</span>
                  </div>
                  <span style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: est.active ? '#C6676D' : '#777' }}>{est.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tipo de notificación */}
          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41', margin: '0 0 15px 0' }}>Tipo de notificación</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {filtrosTipo.map((tipo, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className={tipo.icon} style={{ fontSize: '16px', width: '20px', textAlign: 'center', color: tipo.color }}></i>
                    <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777' }}>{tipo.label}</span>
                  </div>
                  <span style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777' }}>{tipo.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fecha */}
          <div style={{ marginBottom: '30px' }}>
            <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41', margin: '0 0 15px 0' }}>Fecha</h4>
            <div style={{ border: '1px solid #D9D9D9', borderRadius: '8px', padding: '10px 15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', cursor: 'pointer' }}>
              <span style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777' }}>01/05/2026 - 04/06/2026</span>
              <i className="fa-regular fa-calendar" style={{ color: '#5A3E41' }}></i>
            </div>
          </div>

          {/* Botón Marcar Leídas */}
          <button style={{ width: '100%', backgroundColor: 'transparent', color: '#C6676D', border: '1.5px solid #C6676D', borderRadius: '8px', padding: '12px', fontFamily: 'Poppins-Medium', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s' }}>
            Marcar todas como leídas
          </button>

        </div>
      </div>

      {/* ========== BANNER INFERIOR ========== */}
      <div style={{ backgroundColor: '#FFF6F7', borderRadius: '12px', padding: '30px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #FADADD', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <div style={{ color: '#F194B4', fontSize: '60px' }}>
            <i className="fa-regular fa-bell"></i>
          </div>
          <div>
            <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#C6676D', margin: '0 0 5px 0' }}>¡Mantente al día!</h3>
            <p style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#C6676D', margin: 0, maxWidth: '500px', lineHeight: '1.4' }}>
              Activa las notificaciones para no perderte ninguna actualización importante sobre tu negocio.
            </p>
          </div>
        </div>
        <div style={{ color: '#F194B4', fontSize: '50px' }}>
          <i className="fa-solid fa-cupcake"></i>
        </div>
      </div>

      {/* ========== FOOTER ========== */}
      <p style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#999', margin: '0 0 20px 0' }}>
        <span style={{ color: '#C3666D' }}>♥</span> Gracias por endulzar cada día con tu trabajo
      </p>

    </div>
  );
};

export default AdminNotificaciones;
import React, { useState, useMemo } from "react";

const INICIALES = [
  { id: 1, titulo: "Nuevo pedido recibido", desc: "Tienes un nuevo pedido #000129 de María Gómez.", tiempo: "Hace 10 min", tipo: "Pedidos", unread: true },
  { id: 2, titulo: "Pago confirmado", desc: "El pago del pedido #000128 ha sido confirmado.", tiempo: "Hace 35 min", tipo: "Pagos", unread: true },
  { id: 3, titulo: "Producto con stock bajo", desc: 'El producto "Tequeños con queso" tiene bajo stock.', tiempo: "Hace 1 hora", tipo: "Productos", unread: true },
  { id: 4, titulo: "Comentario nuevo", desc: "Tienes un nuevo comentario en el pedido #000125.", tiempo: "Hace 2 horas", tipo: "Comentarios", unread: true },
  { id: 5, titulo: "Recordatorio de respaldo", desc: "No olvides realizar el respaldo de la base de datos.", tiempo: "Hace 3 horas", tipo: "Recordatorios", unread: false },
  { id: 6, titulo: "Actualización del sistema", desc: "Se ha actualizado el sistema a la versión 1.0.0.", tiempo: "Ayer, 09:15 AM", tipo: "Sistema", unread: false },
];

const AdminNotificaciones = () => {
  const [items, setItems] = useState(INICIALES);
  const [filtro, setFiltro] = useState("Todas");
  const [pagina, setPagina] = useState(1);
  const porPagina = 4;

  const marcarLeida = (id) => setItems(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  const marcarTodas = () => setItems(prev => prev.map(n => ({ ...n, unread: false })));

  const total = items.length;
  const noLeidas = items.filter(n => n.unread).length;
  const leidas = total - noLeidas;

  const filtrados = useMemo(() => {
    if (filtro === "No leídas") return items.filter(n => n.unread);
    if (filtro === "Leídas") return items.filter(n => !n.unread);
    return items;
  }, [items, filtro]);

  const totalPag = Math.max(1, Math.ceil(filtrados.length / porPagina));
  const pag = Math.min(pagina, totalPag);
  const visibles = filtrados.slice((pag - 1) * porPagina, pag * porPagina);

  const kpis = [
    { titulo: "Total de notificaciones", valor: total, icon: "fa-regular fa-bell", color: "#F194B4", border: "#FADADD" },
    { titulo: "No leídas", valor: noLeidas, icon: "fa-regular fa-envelope", color: "#F2C94C", border: "#FDE49E" },
    { titulo: "Leídas", valor: leidas, icon: "fa-regular fa-circle-check", color: "#27AE60", border: "#A9DFBF" },
    { titulo: "Hoy", valor: items.filter(n => n.tiempo.toLowerCase().includes("hace")).length, icon: "fa-regular fa-calendar", color: "#9B59B6", border: "#D7BDE2" },
  ];

  const filtrosEstado = [
    { label: "Todas", count: total }, { label: "No leídas", count: noLeidas }, { label: "Leídas", count: leidas },
  ];
  const pagBtn = (a) => ({ border: a ? 'none' : '1px solid #D9D9D9', background: a ? '#C3666D' : 'white', color: a ? 'white' : '#5A3E41', width: '30px', height: '30px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium', fontSize: '13px' });

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%', width: '100%' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 5px 0' }}>Notificaciones</h1>
        <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>Revisa todas las notificaciones y novedades del sistema.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '35px' }}>
        {kpis.map((kpi, index) => (
          <div key={index} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', border: `1.5px solid ${kpi.border}`, display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ color: kpi.color, fontSize: '32px', flexShrink: 0 }}><i className={kpi.icon}></i></div>
            <div>
              <p style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#777', margin: '0 0 2px 0' }}>{kpi.titulo}</p>
              <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '24px', color: '#5A3E41', margin: 0, lineHeight: 1.2 }}>{kpi.valor}</h2>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '25px', marginBottom: '35px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #EAEAEA', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
            <div style={{ color: '#F194B4', fontSize: '20px' }}><i className="fa-regular fa-bell"></i></div>
            <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: 0 }}>Notificaciones recientes</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flexGrow: 1 }}>
            {visibles.length === 0 && <p style={{ color: '#999', fontFamily: 'Poppins-Regular' }}>No hay notificaciones.</p>}
            {visibles.map((noti) => (
              <div key={noti.id} onClick={() => marcarLeida(noti.id)} title={noti.unread ? "Marcar como leída" : ""} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #F5F5F5', paddingBottom: '18px', cursor: noti.unread ? 'pointer' : 'default', opacity: noti.unread ? 1 : 0.6 }}>
                <div>
                  <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41', margin: '0 0 5px 0' }}>{noti.titulo}</h4>
                  <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: 0 }}>{noti.desc}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#999', whiteSpace: 'nowrap' }}>{noti.tiempo}</span>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: noti.unread ? '#C6676D' : 'transparent' }}></div>
                </div>
              </div>
            ))}
          </div>

          {totalPag > 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', borderTop: '1px solid #EAEAEA', paddingTop: '20px' }}>
              <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: 0 }}>Página {pag} de {totalPag}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={() => setPagina(p => Math.max(p - 1, 1))} style={pagBtn(false)}><i className="fa-solid fa-arrow-left"></i></button>
                {Array.from({ length: totalPag }, (_, i) => i + 1).map(n => (
                  <button key={n} onClick={() => setPagina(n)} style={pagBtn(pag === n)}>{n}</button>
                ))}
                <button onClick={() => setPagina(p => Math.min(p + 1, totalPag))} style={pagBtn(false)}><i className="fa-solid fa-arrow-right"></i></button>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #EAEAEA', height: 'fit-content' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
            <div style={{ color: '#F194B4', fontSize: '20px' }}><i className="fa-solid fa-filter"></i></div>
            <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: 0 }}>Filtros</h3>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41', margin: '0 0 15px 0' }}>Estado</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filtrosEstado.map((est) => (
                <div key={est.label} onClick={() => { setFiltro(est.label === "Todas" ? "Todas" : est.label); setPagina(1); }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '8px 12px', borderRadius: '8px', backgroundColor: filtro === est.label ? '#FDF2F3' : 'transparent' }}>
                  <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: filtro === est.label ? '#C6676D' : '#777' }}>{est.label}</span>
                  <span style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: filtro === est.label ? '#C6676D' : '#777' }}>{est.count}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={marcarTodas} disabled={noLeidas === 0} style={{ width: '100%', backgroundColor: noLeidas === 0 ? '#f0f0f0' : 'transparent', color: noLeidas === 0 ? '#aaa' : '#C6676D', border: `1.5px solid ${noLeidas === 0 ? '#ddd' : '#C6676D'}`, borderRadius: '8px', padding: '12px', fontFamily: 'Poppins-Medium', fontSize: '13px', cursor: noLeidas === 0 ? 'default' : 'pointer' }}>
            Marcar todas como leídas
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNotificaciones;
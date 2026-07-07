import React, { useState, useEffect, useMemo } from "react";
import { apiGet, apiPut } from "./api";

const ESTADOS = ["Pendiente", "Preparando", "Enviado", "Entregado", "Cancelado"];

const estiloEstado = (estado) => {
  switch (estado) {
    case "Pendiente":  return { bg: "#FADADD", color: "#C6676D", icon: "fa-regular fa-circle" };
    case "Preparando": return { bg: "#DCE8F4", color: "#6A8BBD", icon: "fa-solid fa-basket-shopping" };
    case "Enviado":    return { bg: "#FFF9E6", color: "#D9A600", icon: "fa-solid fa-truck-fast" };
    case "Entregado":  return { bg: "#E9F7EF", color: "#27AE60", icon: "fa-regular fa-circle-check" };
    case "Cancelado":  return { bg: "#F4ECF7", color: "#9B59B6", icon: "fa-regular fa-circle-xmark" };
    default:           return { bg: "#EEE", color: "#777", icon: "fa-regular fa-circle" };
  }
};

const AdminMenu2 = () => {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [tabActiva, setTabActiva] = useState("Todos");

  const cargar = () => {
    setCargando(true);
    apiGet("/api/admin/pedidos")
      .then(data => { setPedidos(Array.isArray(data) ? data : []); setError(""); })
      .catch(() => setError("No se pudieron cargar los pedidos. Verifica tu sesión de administrador."))
      .finally(() => setCargando(false));
  };
  useEffect(() => { cargar(); }, []);

  const cambiarEstado = async (id, estado) => {
    try {
      await apiPut(`/api/admin/pedidos/${id}/estado`, { estado });
      setPedidos(prev => prev.map(o => o.id === id ? { ...o, estado } : o));
    } catch (e) { alert(e.message); }
  };

  const tabs = useMemo(() => ([
    { label: "Todos",      count: pedidos.length,                                            colorBadge: "#C3666D", bgBadge: "#FDF2F3" },
    { label: "Pendiente",  count: pedidos.filter(p => p.estado === "Pendiente").length,       colorBadge: "#C6676D", bgBadge: "#FADADD" },
    { label: "Preparando", count: pedidos.filter(p => p.estado === "Preparando").length,      colorBadge: "#6A8BBD", bgBadge: "#DCE8F4" },
    { label: "Entregado",  count: pedidos.filter(p => p.estado === "Entregado").length,       colorBadge: "#27AE60", bgBadge: "#E9F7EF" },
    { label: "Cancelado",  count: pedidos.filter(p => p.estado === "Cancelado").length,       colorBadge: "#9B59B6", bgBadge: "#F4ECF7" },
  ]), [pedidos]);

  const visibles = pedidos.filter(p => tabActiva === "Todos" || p.estado === tabActiva);

  const fmtFecha = (f) => {
    if (!f) return "";
    try { return new Date(f).toLocaleString("es-PE", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }); }
    catch { return String(f); }
  };

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%', width: '100%' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 5px 0', textTransform: 'uppercase' }}>PEDIDOS</h1>
          <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>Gestiona y supervisa todos los pedidos de tu negocio.</p>
        </div>
        <button onClick={cargar} style={{ backgroundColor: '#FCF0F2', color: '#C3666D', border: '1.5px solid #C3666D', borderRadius: '8px', padding: '10px 20px', fontFamily: 'Poppins-SemiBold', fontSize: '13px', cursor: 'pointer' }}>
          <i className="fa-solid fa-rotate-right"></i> ACTUALIZAR
        </button>
      </div>

      <div style={{ display: 'flex', borderBottom: '2px solid #FDF2F3', marginBottom: '30px' }}>
        {tabs.map((tab) => (
          <div key={tab.label} onClick={() => setTabActiva(tab.label)} style={{ flex: 1, textAlign: 'center', paddingBottom: '15px', cursor: 'pointer', borderBottom: tabActiva === tab.label ? '3px solid #C3666D' : '3px solid transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'Poppins-Bold', fontSize: '15px', color: tabActiva === tab.label ? '#5A3E41' : '#A08D8F' }}>{tab.label}</span>
            <span style={{ backgroundColor: tab.bgBadge, color: tab.colorBadge, fontFamily: 'Poppins-Bold', fontSize: '12px', padding: '2px 12px', borderRadius: '15px' }}>{tab.count}</span>
          </div>
        ))}
      </div>

      {cargando && <p style={{ color: '#999', fontFamily: 'Poppins-Regular' }}>Cargando pedidos…</p>}
      {error && <p style={{ color: '#C6676D', fontFamily: 'Poppins-Medium' }}>{error}</p>}
      {!cargando && !error && visibles.length === 0 && <p style={{ color: '#999', fontFamily: 'Poppins-Regular' }}>No hay pedidos en esta categoría.</p>}

      {visibles.map((pedido) => {
        const st = estiloEstado(pedido.estado);
        return (
          <div key={pedido.id} style={{ border: '1.5px solid #FADADD', borderRadius: '12px', padding: '20px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', marginBottom: '15px', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: 0 }}>Pedido #{String(pedido.id).padStart(6, '0')}</h3>
              <p style={{ fontFamily: 'Poppins-SemiBold', fontSize: '14px', color: '#5A3E41', margin: '4px 0 0' }}>
                {pedido.usuario ? `${pedido.usuario.nombre || ''} ${pedido.usuario.apellido || ''}`.trim() : 'Cliente'}
              </p>
              <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#999', margin: '2px 0 0' }}>
                {fmtFecha(pedido.fecha)} · {(pedido.detalles?.length || 0)} ítem(s) · S/ {Number(pedido.total || 0).toFixed(2)}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ backgroundColor: st.bg, color: st.color, padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontFamily: 'Poppins-Medium' }}>
                <i className={st.icon}></i> {pedido.estado}
              </span>
              <select value={pedido.estado} onChange={e => cambiarEstado(pedido.id, e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #FADADD', fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', cursor: 'pointer', backgroundColor: 'white' }}>
                {ESTADOS.map(es => <option key={es} value={es}>{es}</option>)}
              </select>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminMenu2;
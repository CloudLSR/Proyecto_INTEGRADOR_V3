import React, { useState, useEffect, useMemo } from "react";
import { apiGet, apiPut, apiDelete } from "./api";

const renderStars = (rating) =>
  [1, 2, 3, 4, 5].map(i => (
    <i key={i} className="fa-solid fa-star" style={{ color: i <= rating ? '#F2C94C' : '#EAEAEA', fontSize: '14px', marginRight: '2px' }}></i>
  ));

const AdminMenu10 = () => {
  const [comentarios, setComentarios] = useState([]);   // {..., _aprobado}
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const cargar = () => {
    setCargando(true);
    Promise.all([
      apiGet("/api/comentarios/aprobados").catch(() => []),
      apiGet("/api/comentarios/pendientes").catch(() => []),
    ]).then(([apr, pen]) => {
      const a = (Array.isArray(apr) ? apr : []).map(c => ({ ...c, _aprobado: true }));
      const p = (Array.isArray(pen) ? pen : []).map(c => ({ ...c, _aprobado: false }));
      setComentarios([...p, ...a]);
      setError("");
    }).catch(() => setError("No se pudieron cargar los comentarios."))
      .finally(() => setCargando(false));
  };
  useEffect(() => { cargar(); }, []);

  const aprobar = async (id) => {
    try { await apiPut(`/api/comentarios/${id}/aprobar`); cargar(); }
    catch (e) { alert(e.message); }
  };
  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar este comentario?")) return;
    try { await apiDelete(`/api/comentarios/${id}`); cargar(); }
    catch (e) { alert(e.message); }
  };

  const exportarCSV = () => {
    const filas = [["Nombre", "Producto", "Calificacion", "Comentario", "Estado"]];
    comentarios.forEach(c => filas.push([
      c.nombre || (c.usuario ? c.usuario.nombre : ""),
      c.producto?.nombre || "",
      c.calificacion ?? "",
      (c.contenido || "").replace(/\n/g, " "),
      c._aprobado ? "Aprobado" : "Pendiente",
    ]));
    const csv = filas.map(f => f.map(x => `"${String(x).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url; a.download = "comentarios.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const filtrados = useMemo(() => {
    let arr = comentarios;
    if (tab === "Positivos") arr = arr.filter(c => (c.calificacion || 0) >= 4);
    else if (tab === "Neutrales") arr = arr.filter(c => c.calificacion === 3);
    else if (tab === "Negativos") arr = arr.filter(c => (c.calificacion || 0) <= 2 && c.calificacion != null);
    else if (tab === "Pendientes") arr = arr.filter(c => !c._aprobado);
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase();
      arr = arr.filter(c => (c.nombre || c.usuario?.nombre || "").toLowerCase().includes(q) ||
                            (c.producto?.nombre || "").toLowerCase().includes(q));
    }
    return arr;
  }, [comentarios, tab, busqueda]);

  const total = comentarios.length;
  const promedio = total ? (comentarios.reduce((a, c) => a + (c.calificacion || 0), 0) / total) : 0;
  const positivos = comentarios.filter(c => (c.calificacion || 0) >= 4).length;
  const neutrales = comentarios.filter(c => c.calificacion === 3).length;
  const negativos = comentarios.filter(c => (c.calificacion || 0) <= 2 && c.calificacion != null).length;
  const pct = (n) => total ? `(${((n / total) * 100).toFixed(1)}%)` : "(0%)";

  const kpis = [
    { titulo: "Calificación promedio", valor: promedio.toFixed(1), detalle: `Basado en ${total} comentarios`, icon: "fa-regular fa-star", color: "#F194B4", border: "#FADADD" },
    { titulo: "Positivos", valor: positivos, porcentaje: pct(positivos), detalle: "4-5 estrellas", icon: "fa-regular fa-face-smile", color: "#27AE60", border: "#A9DFBF" },
    { titulo: "Neutrales", valor: neutrales, porcentaje: pct(neutrales), detalle: "3 estrellas", icon: "fa-regular fa-face-meh", color: "#F2C94C", border: "#FDE49E" },
    { titulo: "Negativos", valor: negativos, porcentaje: pct(negativos), detalle: "1-2 estrellas", icon: "fa-regular fa-face-frown", color: "#9B59B6", border: "#D7BDE2" },
  ];

  const resumen = [5, 4, 3, 2, 1].map(e => {
    const n = comentarios.filter(c => c.calificacion === e).length;
    return { estrellas: e, count: `${n} ${pct(n)}`, width: total ? `${(n / total) * 100}%` : "0%" };
  });

  const pendientesCount = comentarios.filter(c => !c._aprobado).length;
  const tabs = [
    { id: "Todos", label: `Todos (${total})` },
    { id: "Pendientes", label: `Pendientes (${pendientesCount})` },
    { id: "Positivos", label: `Positivos (${positivos})` },
    { id: "Neutrales", label: `Neutrales (${neutrales})` },
    { id: "Negativos", label: `Negativos (${negativos})` },
  ];

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%', width: '100%' }}>

      <div style={{ marginBottom: '25px' }}>
        <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 5px 0' }}>Comentarios</h1>
        <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>Gestiona las opiniones de tus clientes sobre sus pedidos.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '30px' }}>
        <button onClick={exportarCSV} style={{ backgroundColor: '#FCF0F2', color: '#C3666D', border: '1.5px solid #FADADD', borderRadius: '8px', padding: '10px 20px', fontFamily: 'Poppins-SemiBold', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fa-solid fa-download"></i> Exportar reporte
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
        {kpis.map((kpi, index) => (
          <div key={index} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', border: `2px solid ${kpi.border}`, display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ color: kpi.color, fontSize: '46px', flexShrink: 0 }}><i className={kpi.icon}></i></div>
            <div>
              <p style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#777', margin: '0 0 2px 0' }}>{kpi.titulo}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '28px', color: '#5A3E41', margin: 0, lineHeight: 1 }}>{kpi.valor}</h2>
                {kpi.porcentaje && <span style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777' }}>{kpi.porcentaje}</span>}
              </div>
              <p style={{ fontFamily: 'Poppins-Regular', fontSize: '11px', color: '#999', margin: 0 }}>{kpi.detalle}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0 0 15px 0' }}>Comentarios recientes</h3>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #EAEAEA', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EAEAEA', padding: '0 30px' }}>
            <div style={{ display: 'flex', gap: '30px' }}>
              {tabs.map(t => (
                <div key={t.id} onClick={() => setTab(t.id)} style={{ fontFamily: tab === t.id ? 'Poppins-Bold' : 'Poppins-Medium', fontSize: '14px', color: tab === t.id ? '#C3666D' : '#999', padding: '20px 0', borderBottom: tab === t.id ? '3px solid #C3666D' : '3px solid transparent', cursor: 'pointer' }}>{t.label}</div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #D9D9D9', borderRadius: '20px', padding: '8px 15px', width: '250px' }}>
              <input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar por cliente o producto..." style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'Poppins-Regular', fontSize: '12px' }} />
              <i className="fa-solid fa-magnifying-glass" style={{ color: '#999', fontSize: '14px' }}></i>
            </div>
          </div>

          {cargando && <p style={{ padding: 30, color: '#999', fontFamily: 'Poppins-Regular' }}>Cargando comentarios…</p>}
          {error && <p style={{ padding: 30, color: '#C6676D', fontFamily: 'Poppins-Medium' }}>{error}</p>}
          {!cargando && !error && filtrados.length === 0 && <p style={{ padding: 30, color: '#999', fontFamily: 'Poppins-Regular' }}>No hay comentarios en esta categoría.</p>}

          {!cargando && filtrados.length > 0 && (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #EAEAEA' }}>
                  {["Cliente", "Producto", "Calificación", "Comentario", "Estado", "Acciones"].map((h, i) => (
                    <th key={i} style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#C6676D', padding: '15px 30px', fontWeight: 'normal', textAlign: i === 5 ? 'center' : 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtrados.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid #F5F5F5' }}>
                    <td style={{ padding: '15px 30px', fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41' }}>{c.nombre || c.usuario?.nombre || "Anónimo"}</td>
                    <td style={{ padding: '15px 30px', fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#777' }}>{c.producto?.nombre || "—"}</td>
                    <td style={{ padding: '15px 30px' }}><div style={{ display: 'flex' }}>{renderStars(c.calificacion || 0)}</div></td>
                    <td style={{ padding: '15px 30px', fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#5A3E41', maxWidth: '260px', lineHeight: '1.4' }}>{c.contenido}</td>
                    <td style={{ padding: '15px 30px' }}>
                      <span style={{ fontFamily: 'Poppins-Bold', fontSize: '11px', color: c._aprobado ? '#27AE60' : '#D9A600' }}>{c._aprobado ? "Aprobado" : "Pendiente"}</span>
                    </td>
                    <td style={{ padding: '15px 30px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        {!c._aprobado && (
                          <button onClick={() => aprobar(c.id)} title="Aprobar" style={{ border: '1.5px solid #27AE60', background: 'transparent', color: '#27AE60', width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer' }}><i className="fa-solid fa-check"></i></button>
                        )}
                        <button onClick={() => eliminar(c.id)} title="Eliminar" style={{ border: '1.5px solid #C6676D', background: 'transparent', color: '#C6676D', width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer' }}><i className="fa-solid fa-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #EAEAEA', padding: '30px', marginBottom: '40px', maxWidth: '520px' }}>
        <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0 0 25px 0' }}>Resumen de calificaciones</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {resumen.map((item) => (
            <div key={item.estrellas} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', width: '70px' }}>{item.estrellas} estrellas</span>
              <div style={{ flex: 1, height: '14px', backgroundColor: '#F5F5F5', borderRadius: '7px', overflow: 'hidden' }}>
                <div style={{ width: item.width, height: '100%', backgroundColor: '#D68994', borderRadius: '7px' }}></div>
              </div>
              <span style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', width: '90px', textAlign: 'right' }}>{item.count}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #EAEAEA' }}>
            <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777' }}>Total de comentarios</span>
            <span style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41' }}>{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu10;
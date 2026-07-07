import React, { useState, useEffect, useMemo } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "./api";

const estadoOferta = (o) => {
  if (!o.oferActiva) return "Inactiva";
  const hoy = new Date().toISOString().slice(0, 10);
  if (o.oferFechaInicio && hoy < o.oferFechaInicio) return "Programada";
  if (o.oferFechaFin && hoy > o.oferFechaFin) return "Finalizada";
  return "Activa";
};
const colorEstado = (e) => ({ Activa: "#27AE60", Programada: "#6A8BBD", Finalizada: "#999", Inactiva: "#C6676D" }[e] || "#777");

const AdminMenu7 = () => {
  const [ofertas, setOfertas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [modal, setModal] = useState(false);
  const [editar, setEditar] = useState(null);
  const [pagina, setPagina] = useState(1);
  const porPagina = 6;

  const cargar = () => {
    setCargando(true);
    Promise.all([
      apiGet("/api/admin/ofertas").catch(() => []),
      apiGet("/api/admin/productos").catch(() => []),
    ]).then(([ofs, prods]) => {
      setOfertas(Array.isArray(ofs) ? ofs : []);
      setProductos(Array.isArray(prods) ? prods : []);
      setError("");
    }).catch(() => setError("No se pudieron cargar las ofertas."))
      .finally(() => setCargando(false));
  };
  useEffect(() => { cargar(); }, []);

  const toggle = async (o) => {
    try { await apiPut(`/api/admin/ofertas/${o.oferId}/toggle`); cargar(); }
    catch (e) { alert(e.message); }
  };
  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar esta oferta?")) return;
    try { await apiDelete(`/api/admin/ofertas/${id}`); cargar(); }
    catch (e) { alert(e.message); }
  };
  const guardar = async (form) => {
    const body = {
      oferTitulo: form.titulo,
      oferDescripcion: form.descripcion,
      oferDescuento: form.descuento === "" ? null : Number(form.descuento),
      oferFechaInicio: form.fechaInicio || null,
      oferFechaFin: form.fechaFin || null,
      oferActiva: form.activa,
      producto: form.productoId ? { id: Number(form.productoId) } : null,
    };
    try {
      if (editar) await apiPut(`/api/admin/ofertas/${editar.oferId}`, body);
      else await apiPost("/api/admin/ofertas", body);
      setModal(false); setEditar(null); cargar();
    } catch (e) { alert(e.message); }
  };

  const filtradas = useMemo(() => {
    let arr = ofertas;
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase();
      arr = arr.filter(o => (o.oferTitulo || "").toLowerCase().includes(q));
    }
    if (filtroEstado !== "Todos") arr = arr.filter(o => estadoOferta(o) === filtroEstado);
    return arr;
  }, [ofertas, busqueda, filtroEstado]);

  const totalPag = Math.max(1, Math.ceil(filtradas.length / porPagina));
  const pag = Math.min(pagina, totalPag);
  const visibles = filtradas.slice((pag - 1) * porPagina, pag * porPagina);
  useEffect(() => { setPagina(1); }, [busqueda, filtroEstado]);

  const cuenta = (e) => ofertas.filter(o => estadoOferta(o) === e).length;
  const kpis = [
    { valor: cuenta("Activa"), etiqueta: "Ofertas activas", icon: "fa-solid fa-ticket", color: "#F194B4", border: "#FADADD" },
    { valor: cuenta("Programada"), etiqueta: "Programadas", icon: "fa-regular fa-calendar", color: "#F2C94C", border: "#FDE49E" },
    { valor: cuenta("Finalizada"), etiqueta: "Finalizadas", icon: "fa-regular fa-circle-check", color: "#27AE60", border: "#A9DFBF" },
    { valor: ofertas.length, etiqueta: "Total de ofertas", icon: "fa-solid fa-tags", color: "#9B59B6", border: "#D7BDE2" },
  ];

  const pagBtn = (a) => ({ border: a ? 'none' : '1px solid #D9D9D9', background: a ? '#C3666D' : 'white', color: a ? 'white' : '#5A3E41', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium', fontSize: '14px' });

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%', width: '100%' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 5px 0', textTransform: 'uppercase' }}>OFERTAS</h1>
          <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>Crea y gestiona las ofertas y promociones de tu tienda.</p>
        </div>
        <button onClick={() => { setEditar(null); setModal(true); }} style={{ backgroundColor: '#FCF0F2', color: '#C3666D', border: '1.5px solid #C3666D', borderRadius: '8px', padding: '10px 20px', fontFamily: 'Poppins-SemiBold', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fa-solid fa-plus"></i> Nueva oferta
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '35px' }}>
        {kpis.map((k, i) => (
          <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', border: `2px solid ${k.border}`, display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '55px', height: '55px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: k.color, fontSize: '24px' }}><i className={k.icon}></i></div>
            <div>
              <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '28px', color: '#5A3E41', margin: 0, lineHeight: 1 }}>{k.valor}</h2>
              <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', margin: '5px 0 0' }}>{k.etiqueta}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', alignItems: 'center' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '0 15px', backgroundColor: 'white' }}>
          <i className="fa-solid fa-magnifying-glass" style={{ color: '#999' }}></i>
          <input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar oferta..." style={{ border: 'none', outline: 'none', width: '100%', padding: '12px 10px', fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#5A3E41' }} />
        </div>
        <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)} style={{ border: '1px solid #D9D9D9', borderRadius: '8px', padding: '11px 15px', backgroundColor: 'white', fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', cursor: 'pointer' }}>
          {["Todos", "Activa", "Programada", "Finalizada", "Inactiva"].map(e => <option key={e} value={e}>{e}</option>)}
        </select>
      </div>

      {cargando && <p style={{ color: '#999', fontFamily: 'Poppins-Regular' }}>Cargando ofertas…</p>}
      {error && <p style={{ color: '#C6676D', fontFamily: 'Poppins-Medium' }}>{error}</p>}
      {!cargando && !error && filtradas.length === 0 && <p style={{ color: '#999', fontFamily: 'Poppins-Regular' }}>No hay ofertas.</p>}

      {!cargando && filtradas.length > 0 && (
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #EAEAEA', padding: '15px 30px', marginBottom: '30px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #FDF2F3' }}>
                {["Oferta", "Descuento", "Vigencia", "Estado", "Acciones"].map((h, i) => (
                  <th key={i} style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '15px 10px', fontWeight: 'normal', textAlign: i === 4 ? 'center' : 'left' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibles.map((o) => {
                const est = estadoOferta(o);
                return (
                  <tr key={o.oferId} style={{ borderBottom: '1px solid #F5F5F5' }}>
                    <td style={{ padding: '15px 10px' }}>
                      <div style={{ fontFamily: 'Poppins-Bold', fontSize: '13px', color: '#5A3E41' }}>{o.oferTitulo}</div>
                      <div style={{ fontFamily: 'Poppins-Regular', fontSize: '11px', color: '#777', maxWidth: '260px' }}>{o.oferDescripcion}</div>
                    </td>
                    <td style={{ padding: '15px 10px', fontFamily: 'Poppins-Bold', fontSize: '13px', color: '#5A3E41' }}>{o.oferDescuento != null ? `${o.oferDescuento}%` : "—"}</td>
                    <td style={{ padding: '15px 10px', fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#777' }}>{o.oferFechaInicio || "?"} → {o.oferFechaFin || "?"}</td>
                    <td style={{ padding: '15px 10px', fontFamily: 'Poppins-Bold', fontSize: '12px', color: colorEstado(est) }}>{est}</td>
                    <td style={{ padding: '15px 10px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button onClick={() => toggle(o)} title={o.oferActiva ? "Desactivar" : "Activar"} style={{ border: '1.5px solid #6A8BBD', backgroundColor: 'transparent', color: '#6A8BBD', width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer' }}>
                          <i className={o.oferActiva ? "fa-solid fa-toggle-on" : "fa-solid fa-toggle-off"}></i>
                        </button>
                        <button onClick={() => { setEditar(o); setModal(true); }} title="Editar" style={{ border: '1.5px solid #F194B4', backgroundColor: 'transparent', color: '#F194B4', width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer' }}>
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <button onClick={() => eliminar(o.oferId)} title="Eliminar" style={{ border: '1.5px solid #C6676D', backgroundColor: 'transparent', color: '#C6676D', width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer' }}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {totalPag > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '40px' }}>
          <button onClick={() => setPagina(p => Math.max(p - 1, 1))} style={pagBtn(false)}><i className="fa-solid fa-arrow-left"></i></button>
          {Array.from({ length: totalPag }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setPagina(n)} style={pagBtn(pag === n)}>{n}</button>
          ))}
          <button onClick={() => setPagina(p => Math.min(p + 1, totalPag))} style={pagBtn(false)}><i className="fa-solid fa-arrow-right"></i></button>
        </div>
      )}

      {modal && (
        <ModalOferta oferta={editar} productos={productos}
          onCancelar={() => { setModal(false); setEditar(null); }} onGuardar={guardar} />
      )}
    </div>
  );
};

function ModalOferta({ oferta, productos, onCancelar, onGuardar }) {
  const [form, setForm] = useState({
    titulo: oferta?.oferTitulo || "",
    descripcion: oferta?.oferDescripcion || "",
    descuento: oferta?.oferDescuento ?? "",
    fechaInicio: oferta?.oferFechaInicio || "",
    fechaFin: oferta?.oferFechaFin || "",
    activa: oferta?.oferActiva ?? true,
    productoId: oferta?.producto?.id || "",
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const input = { width: '100%', padding: '10px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box', fontFamily: 'Poppins-Regular' };
  const submit = () => { if (!form.titulo.trim()) { alert("El título es obligatorio."); return; } onGuardar(form); };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', width: '440px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto' }}>
        <h2 style={{ fontFamily: 'Poppins-Bold', color: '#5A3E41', marginTop: 0 }}>{oferta ? "Editar Oferta" : "Nueva Oferta"}</h2>
        <input value={form.titulo} onChange={e => set('titulo', e.target.value)} placeholder="Título de la oferta" style={input} />
        <textarea value={form.descripcion} onChange={e => set('descripcion', e.target.value)} placeholder="Descripción" rows={2} style={{ ...input, resize: 'vertical' }} />
        <input type="number" step="0.01" value={form.descuento} onChange={e => set('descuento', e.target.value)} placeholder="Descuento (%)" style={input} />
        <label style={{ fontFamily: 'Poppins-Medium', fontSize: 12, color: '#777' }}>Vigencia</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input type="date" value={form.fechaInicio} onChange={e => set('fechaInicio', e.target.value)} style={input} />
          <input type="date" value={form.fechaFin} onChange={e => set('fechaFin', e.target.value)} style={input} />
        </div>
        <select value={form.productoId} onChange={e => set('productoId', e.target.value)} style={input}>
          <option value="">— Producto (opcional) —</option>
          {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Poppins-Regular', color: '#5A3E41', margin: '8px 0' }}>
          <input type="checkbox" checked={form.activa} onChange={e => set('activa', e.target.checked)} /> Oferta activa
        </label>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button onClick={onCancelar} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontFamily: 'Poppins-Medium' }}>Cancelar</button>
          <button onClick={submit} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: '#C3666D', color: 'white', cursor: 'pointer', fontFamily: 'Poppins-Medium' }}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default AdminMenu7;
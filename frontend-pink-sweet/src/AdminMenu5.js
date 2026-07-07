import React, { useState, useEffect, useMemo } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "./api";

const AdminMenu5 = () => {
  const [personal, setPersonal] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [modal, setModal] = useState(false);
  const [editar, setEditar] = useState(null);
  const [pagina, setPagina] = useState(1);
  const porPagina = 6;

  const cargar = () => {
    setCargando(true);
    apiGet("/api/admin/personal")
      .then(d => { setPersonal(Array.isArray(d) ? d : []); setError(""); })
      .catch(() => setError("No se pudo cargar el personal."))
      .finally(() => setCargando(false));
  };
  useEffect(() => { cargar(); }, []);

  const guardar = async (form) => {
    const body = {
      perNombre: form.nombre, perApellido: form.apellido,
      perCorreo: form.correo, perTelefono: form.telefono,
      perFechaIngreso: form.fechaIngreso || null,
    };
    try {
      if (editar) await apiPut(`/api/admin/personal/${editar.perId}`, body);
      else await apiPost("/api/admin/personal", body);
      setModal(false); setEditar(null); cargar();
    } catch (e) { alert(e.message); }
  };
  const cambiarEstado = async (p) => {
    const nuevo = p.perEstado === "Activo" ? "Inactivo" : "Activo";
    try { await apiPut(`/api/admin/personal/${p.perId}/estado`, { estado: nuevo }); cargar(); }
    catch (e) { alert(e.message); }
  };
  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar a este miembro del equipo?")) return;
    try { await apiDelete(`/api/admin/personal/${id}`); cargar(); }
    catch (e) { alert(e.message); }
  };

  const filtrados = useMemo(() => {
    if (!busqueda.trim()) return personal;
    const q = busqueda.toLowerCase();
    return personal.filter(p =>
      `${p.perNombre || ""} ${p.perApellido || ""}`.toLowerCase().includes(q) ||
      (p.perCorreo || "").toLowerCase().includes(q));
  }, [personal, busqueda]);

  const totalPag = Math.max(1, Math.ceil(filtrados.length / porPagina));
  const pag = Math.min(pagina, totalPag);
  const visibles = filtrados.slice((pag - 1) * porPagina, pag * porPagina);
  useEffect(() => { setPagina(1); }, [busqueda]);

  const activos = personal.filter(p => p.perEstado === "Activo").length;
  const kpis = [
    { valor: personal.length, etiqueta: "Total de personal", icon: "fa-solid fa-user-group", color: "#F194B4", border: "#FADADD" },
    { valor: activos, etiqueta: "Activos", icon: "fa-solid fa-certificate", color: "#27AE60", border: "#A9DFBF" },
    { valor: personal.length - activos, etiqueta: "Inactivos", icon: "fa-solid fa-user-minus", color: "#F2C94C", border: "#FDE49E" },
    { valor: personal.reduce((a, p) => a + (p.horarios?.length || 0), 0), etiqueta: "Horarios asignados", icon: "fa-regular fa-calendar", color: "#9B59B6", border: "#D7BDE2" },
  ];
  const pagBtn = (a) => ({ border: a ? 'none' : '1px solid #D9D9D9', background: a ? '#C3666D' : 'white', color: a ? 'white' : '#5A3E41', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium' });

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 5px 0', textTransform: 'uppercase' }}>PERSONAL</h1>
          <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>Gestiona tu equipo de trabajo.</p>
        </div>
        <button onClick={() => { setEditar(null); setModal(true); }} style={{ backgroundColor: '#FCF0F2', color: '#C3666D', border: '1.5px solid #C3666D', borderRadius: '8px', padding: '10px 20px', fontFamily: 'Poppins-SemiBold', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fa-solid fa-user-plus"></i> AGREGAR PERSONAL
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '35px' }}>
        {kpis.map((k, i) => (
          <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', border: `2px solid ${k.border}`, display: 'flex', alignItems: 'center', gap: '20px' }}>
            <i className={k.icon} style={{ fontSize: '34px', color: k.color }}></i>
            <div>
              <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '28px', color: '#5A3E41', margin: 0, lineHeight: 1 }}>{k.valor}</h2>
              <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', margin: '4px 0 0' }}>{k.etiqueta}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #EAEAEA', marginBottom: '35px' }}>
        <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0 0 25px 0' }}>Miembros de equipo</h3>
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '0 15px', backgroundColor: 'white', marginBottom: '25px' }}>
          <i className="fa-solid fa-magnifying-glass" style={{ color: '#999' }}></i>
          <input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar por nombre o correo..." style={{ border: 'none', outline: 'none', width: '100%', padding: '12px 10px', fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#5A3E41' }} />
        </div>

        {cargando && <p style={{ color: '#999', fontFamily: 'Poppins-Regular' }}>Cargando personal…</p>}
        {error && <p style={{ color: '#C6676D', fontFamily: 'Poppins-Medium' }}>{error}</p>}
        {!cargando && !error && filtrados.length === 0 && <p style={{ color: '#999', fontFamily: 'Poppins-Regular' }}>No hay personal registrado.</p>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
          {visibles.map((p) => {
            const nombre = `${p.perNombre || ""} ${p.perApellido || ""}`.trim();
            return (
              <div key={p.perId} style={{ border: '1.5px solid #EAEAEA', borderRadius: '12px', padding: '15px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(nombre || 'NA')}&background=C3666D&color=fff&size=128`} alt={nombre} style={{ width: '55px', height: '55px', borderRadius: '50%' }} />
                  <div>
                    <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '15px', color: '#5A3E41', margin: '0 0 2px 0' }}>{nombre || "Sin nombre"}</h4>
                    <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: 0 }}>{p.perCorreo}</p>
                    <p style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#999', margin: 0 }}>{p.perTelefono || "Sin teléfono"}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button onClick={() => cambiarEstado(p)} title="Cambiar estado" style={{ display: 'flex', alignItems: 'center', gap: '6px', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'Poppins-Medium', fontSize: '13px', color: p.perEstado === "Activo" ? '#27AE60' : '#999' }}>
                    <span style={{ fontSize: '10px' }}>●</span> {p.perEstado}
                  </button>
                  <button onClick={() => { setEditar(p); setModal(true); }} title="Editar" style={{ border: '1.5px solid #F194B4', backgroundColor: 'transparent', color: '#F194B4', width: '35px', height: '38px', borderRadius: '8px', cursor: 'pointer' }}><i className="fa-solid fa-pen"></i></button>
                  <button onClick={() => eliminar(p.perId)} title="Eliminar" style={{ border: '1.5px solid #C6676D', backgroundColor: 'transparent', color: '#C6676D', width: '35px', height: '38px', borderRadius: '8px', cursor: 'pointer' }}><i className="fa-solid fa-trash"></i></button>
                </div>
              </div>
            );
          })}
        </div>

        {totalPag > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', borderTop: '1px solid #EAEAEA', paddingTop: '20px' }}>
            <button onClick={() => setPagina(p => Math.max(p - 1, 1))} style={pagBtn(false)}><i className="fa-solid fa-arrow-left"></i></button>
            {Array.from({ length: totalPag }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPagina(n)} style={pagBtn(pag === n)}>{n}</button>
            ))}
            <button onClick={() => setPagina(p => Math.min(p + 1, totalPag))} style={pagBtn(false)}><i className="fa-solid fa-arrow-right"></i></button>
          </div>
        )}
      </div>

      {modal && (
        <ModalPersonal persona={editar}
          onCancelar={() => { setModal(false); setEditar(null); }} onGuardar={guardar} />
      )}
    </div>
  );
};

function ModalPersonal({ persona, onCancelar, onGuardar }) {
  const [form, setForm] = useState({
    nombre: persona?.perNombre || "", apellido: persona?.perApellido || "",
    correo: persona?.perCorreo || "", telefono: persona?.perTelefono || "",
    fechaIngreso: persona?.perFechaIngreso || "",
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const input = { width: '100%', padding: '10px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box', fontFamily: 'Poppins-Regular' };
  const submit = () => {
    if (!form.nombre.trim() || !form.correo.trim()) { alert("Nombre y correo son obligatorios."); return; }
    onGuardar(form);
  };
  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', width: '420px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}>
        <h2 style={{ fontFamily: 'Poppins-Bold', color: '#5A3E41', marginTop: 0 }}>{persona ? "Editar personal" : "Agregar personal"}</h2>
        <input value={form.nombre} onChange={e => set('nombre', e.target.value)} placeholder="Nombre" style={input} />
        <input value={form.apellido} onChange={e => set('apellido', e.target.value)} placeholder="Apellido" style={input} />
        <input type="email" value={form.correo} onChange={e => set('correo', e.target.value)} placeholder="Correo" style={input} />
        <input value={form.telefono} onChange={e => set('telefono', e.target.value)} placeholder="Teléfono" style={input} />
        <label style={{ fontFamily: 'Poppins-Medium', fontSize: 12, color: '#777' }}>Fecha de ingreso</label>
        <input type="date" value={form.fechaIngreso} onChange={e => set('fechaIngreso', e.target.value)} style={input} />
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button onClick={onCancelar} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontFamily: 'Poppins-Medium' }}>Cancelar</button>
          <button onClick={submit} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: '#C3666D', color: 'white', cursor: 'pointer', fontFamily: 'Poppins-Medium' }}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default AdminMenu5;
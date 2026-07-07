import React, { useState, useEffect } from "react";
import { apiGet, apiPost, apiDelete } from "./api";

const DIAS = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

const AdminMenu6 = () => {
  const [personal, setPersonal] = useState([]);
  const [selId, setSelId] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [cargandoH, setCargandoH] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ dia: "Lunes", entrada: "08:00", salida: "16:00" });

  useEffect(() => {
    apiGet("/api/admin/personal")
      .then(d => {
        const arr = Array.isArray(d) ? d : [];
        setPersonal(arr);
        if (arr.length) setSelId(String(arr[0].perId));
        setError("");
      })
      .catch(() => setError("No se pudo cargar el personal."))
      .finally(() => setCargando(false));
  }, []);

  const cargarHorarios = (id) => {
    if (!id) { setHorarios([]); return; }
    setCargandoH(true);
    apiGet(`/api/admin/personal/${id}/horarios`)
      .then(d => setHorarios(Array.isArray(d) ? d : []))
      .catch(() => setHorarios([]))
      .finally(() => setCargandoH(false));
  };
  useEffect(() => { cargarHorarios(selId); }, [selId]);

  const agregar = async () => {
    if (!selId) return;
    const body = { horDia: form.dia, horEntrada: `${form.entrada}:00`, horSalida: `${form.salida}:00` };
    try { await apiPost(`/api/admin/personal/${selId}/horarios`, body); cargarHorarios(selId); }
    catch (e) { alert(e.message); }
  };
  const eliminar = async (horId) => {
    if (!window.confirm("¿Eliminar este horario?")) return;
    try { await apiDelete(`/api/admin/personal/horarios/${horId}`); cargarHorarios(selId); }
    catch (e) { alert(e.message); }
  };

  const empleado = personal.find(p => String(p.perId) === String(selId));
  const nombreEmp = empleado ? `${empleado.perNombre || ""} ${empleado.perApellido || ""}`.trim() : "";
  const hhmm = (t) => (t ? String(t).slice(0, 5) : "");
  const input = { padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontFamily: 'Poppins-Regular', fontSize: '13px' };

  const totalHoras = horarios.reduce((acc, h) => {
    const e = hhmm(h.horEntrada), s = hhmm(h.horSalida);
    if (!e || !s) return acc;
    const [eh, em] = e.split(":").map(Number), [sh, sm] = s.split(":").map(Number);
    return acc + Math.max(0, (sh * 60 + sm - eh * 60 - em) / 60);
  }, 0);

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%', width: '100%' }}>
      <div style={{ marginBottom: '25px' }}>
        <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 5px 0', textTransform: 'uppercase' }}>HORARIOS</h1>
        <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>Asigna y gestiona los turnos de tu equipo.</p>
      </div>

      {cargando && <p style={{ color: '#999', fontFamily: 'Poppins-Regular' }}>Cargando personal…</p>}
      {error && <p style={{ color: '#C6676D', fontFamily: 'Poppins-Medium' }}>{error}</p>}

      {!cargando && !error && (
        <>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '25px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'Poppins-Medium', fontSize: 12, color: '#777', marginBottom: 5 }}>Empleado</label>
              <select value={selId} onChange={e => setSelId(e.target.value)} style={{ ...input, minWidth: 260 }}>
                {personal.length === 0 && <option value="">Sin personal</option>}
                {personal.map(p => <option key={p.perId} value={p.perId}>{`${p.perNombre || ""} ${p.perApellido || ""}`.trim()}</option>)}
              </select>
            </div>
            <div style={{ backgroundColor: 'white', border: '2px solid #FADADD', borderRadius: '12px', padding: '15px 25px' }}>
              <span style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#C3666D' }}>{totalHoras.toFixed(1)}h</span>
              <p style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#777', margin: 0 }}>programadas</p>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #EAEAEA', padding: '25px 30px', marginBottom: '25px' }}>
            <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: '0 0 15px 0' }}>Agregar turno {nombreEmp && `· ${nombreEmp}`}</h3>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div><label style={{ display: 'block', fontFamily: 'Poppins-Medium', fontSize: 11, color: '#777', marginBottom: 4 }}>Día</label>
                <select value={form.dia} onChange={e => setForm(f => ({ ...f, dia: e.target.value }))} style={input}>
                  {DIAS.map(d => <option key={d} value={d}>{d}</option>)}
                </select></div>
              <div><label style={{ display: 'block', fontFamily: 'Poppins-Medium', fontSize: 11, color: '#777', marginBottom: 4 }}>Entrada</label>
                <input type="time" value={form.entrada} onChange={e => setForm(f => ({ ...f, entrada: e.target.value }))} style={input} /></div>
              <div><label style={{ display: 'block', fontFamily: 'Poppins-Medium', fontSize: 11, color: '#777', marginBottom: 4 }}>Salida</label>
                <input type="time" value={form.salida} onChange={e => setForm(f => ({ ...f, salida: e.target.value }))} style={input} /></div>
              <button onClick={agregar} disabled={!selId} style={{ backgroundColor: '#C3666D', color: 'white', border: 'none', borderRadius: '8px', padding: '11px 22px', fontFamily: 'Poppins-SemiBold', fontSize: '13px', cursor: selId ? 'pointer' : 'default' }}>
                <i className="fa-solid fa-plus"></i> Agregar
              </button>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #EAEAEA', padding: '25px 30px', marginBottom: '40px' }}>
            <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: '0 0 15px 0' }}>Turnos asignados</h3>
            {cargandoH && <p style={{ color: '#999', fontFamily: 'Poppins-Regular' }}>Cargando horarios…</p>}
            {!cargandoH && horarios.length === 0 && <p style={{ color: '#999', fontFamily: 'Poppins-Regular' }}>Este empleado no tiene turnos asignados.</p>}
            {!cargandoH && horarios.length > 0 && (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead><tr style={{ borderBottom: '2px solid #FDF2F3' }}>
                  {["Día", "Entrada", "Salida", ""].map((h, i) => <th key={i} style={{ padding: '12px 10px', fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', fontWeight: 'normal', textAlign: i === 3 ? 'center' : 'left' }}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {horarios.map((h) => (
                    <tr key={h.horId} style={{ borderBottom: '1px solid #F5F5F5' }}>
                      <td style={{ padding: '12px 10px', fontFamily: 'Poppins-SemiBold', fontSize: '13px', color: '#5A3E41' }}>{h.horDia}</td>
                      <td style={{ padding: '12px 10px', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#5A3E41' }}>{hhmm(h.horEntrada)}</td>
                      <td style={{ padding: '12px 10px', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#5A3E41' }}>{hhmm(h.horSalida)}</td>
                      <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                        <button onClick={() => eliminar(h.horId)} title="Eliminar" style={{ border: '1.5px solid #C6676D', background: 'transparent', color: '#C6676D', width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer' }}><i className="fa-solid fa-trash"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminMenu6;
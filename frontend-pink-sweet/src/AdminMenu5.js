import React, { useState, useEffect, useMemo } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "./api";

const AdminMenu5 = () => {
  // LÓGICA DE ESTADOS
  const [personal, setPersonal] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const porPagina = 6;
  
  const [modalAbierto, setModalAbierto] = useState(false);
  const [personaAEditar, setPersonaAEditar] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(null); // Para el botón de 3 puntitos

  // LLAMADAS A LA API
  const cargar = () => {
    setCargando(true);
    apiGet("/api/admin/personal")
      .then(d => { setPersonal(Array.isArray(d) ? d : []); setError(""); })
      .catch(() => setError("No se pudo cargar el personal. Verificando conexión..."))
      .finally(() => setCargando(false));
  };
  
  useEffect(() => { cargar(); }, []);

  const guardar = async (form) => {
    const body = {
      perNombre: form.nombre, 
      perApellido: form.apellido,
      perCorreo: form.correo, 
      perTelefono: form.telefono,
      rol: form.rol, // Añadido para respetar tu diseño
      perEstado: form.estado // Añadido para respetar tu diseño
    };
    try {
      if (personaAEditar) await apiPut(`/api/admin/personal/${personaAEditar.perId}`, body);
      else await apiPost("/api/admin/personal", body);
      setModalAbierto(false); 
      setPersonaAEditar(null); 
      cargar();
    } catch (e) { alert(e.message); }
  };

  const cambiarEstado = async (p) => {
    const nuevo = p.perEstado === "Activo" ? "Inactivo" : "Activo";
    try { 
      await apiPut(`/api/admin/personal/${p.perId}/estado`, { estado: nuevo }); 
      setMenuAbierto(null);
      cargar(); 
    } catch (e) { alert(e.message); }
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar a este miembro del equipo?")) return;
    try { 
      await apiDelete(`/api/admin/personal/${id}`); 
      setMenuAbierto(null);
      cargar(); 
    } catch (e) { alert(e.message); }
  };

  // FILTROS Y PAGINACIÓN
  const filtrados = useMemo(() => {
    if (!busqueda.trim()) return personal;
    const q = busqueda.toLowerCase();
    return personal.filter(p =>
      `${p.perNombre || ""} ${p.perApellido || ""}`.toLowerCase().includes(q) ||
      (p.perCorreo || "").toLowerCase().includes(q) ||
      (p.rol || "").toLowerCase().includes(q)
    );
  }, [personal, busqueda]);

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / porPagina));
  const pagina = Math.min(paginaActual, totalPaginas);
  const visibles = filtrados.slice((pagina - 1) * porPagina, pagina * porPagina);
  
  useEffect(() => { setPaginaActual(1); }, [busqueda]);

  // KPIs DINÁMICOS
  const totalPersonal = personal.length || 0;
  const activos = personal.filter(p => p.perEstado === "Activo").length || 0;
  const inactivos = totalPersonal - activos;

  const kpis = [
    { valor: totalPersonal, etiqueta: "Total de personal", link: "Ver todos", icon: "fa-solid fa-user-group", color: "#F194B4", colorLink: "#F194B4", border: "#FADADD" },
    { valor: activos, etiqueta: "Activos", link: "Ver activos", icon: "fa-solid fa-certificate", color: "#F2C94C", colorLink: "#F2C94C", border: "#FDE49E" },
    { valor: inactivos, etiqueta: "Inactivos", link: "Ver inactivos", icon: "fa-solid fa-user-minus", color: "#27AE60", colorLink: "#27AE60", border: "#A9DFBF" },
    { valor: "0", etiqueta: "Nuevos este mes", link: "Ver nuevos", icon: "fa-solid fa-user-plus", color: "#9B59B6", colorLink: "#9B59B6", border: "#D7BDE2" },
  ];

  // DATA ESTÁTICA PARA EL DISEÑO
  const infoImportante = [
    { icon: "fa-solid fa-key", title: "Roles y permisos", desc: "Asigna roles y permisos para controlar el acceso de tu equipo." },
    { icon: "fa-solid fa-bullhorn", title: "Comunicación", desc: "Mantén los datos de contacto actualizados para una mejor coordinación." },
    { icon: "fa-solid fa-arrow-trend-up", title: "Desempeño", desc: "Evalúa el desempeño de tu equipo regularmente." },
    { icon: "fa-solid fa-shield", title: "Seguridad", desc: "Asegúrate de que cada miembro tenga acceso solo a lo necesario." },
    { icon: "fa-solid fa-book-open-reader", title: "Capacitación", desc: "Brinda capacitaciones para mantener a tu equipo actualizado." },
  ];

  const distribucion = [
    { cargo: "Reposteras", count: "0", icon: "fa-solid fa-cake-candles", color: "#F194B4", border: "#FADADD" },
    { cargo: "Decoradoras", count: "0", icon: "fa-solid fa-box", color: "#F2C94C", border: "#FDE49E" },
    { cargo: "At. al cliente", count: "0", icon: "fa-solid fa-file-lines", color: "#27AE60", border: "#A9DFBF" },
    { cargo: "Administración", count: "0", icon: "fa-solid fa-shield", color: "#9B59B6", border: "#D7BDE2" },
  ];

  // Componente Auxiliar para Menú Desplegable
  const toggleMenu = (id) => setMenuAbierto(menuAbierto === id ? null : id);
  const btnStyleMenu = { background: 'none', border: 'none', padding: '10px 15px', textAlign: 'left', cursor: 'pointer', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#5A3E41', width: '100%', transition: 'background 0.2s' };

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%', width: '100%' }}>

      {/* TÍTULO Y BOTÓN AGREGAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 5px 0', textTransform: 'uppercase' }}>
            PERSONAL
          </h1>
          <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>
            Gestiona tu equipo de trabajo.
          </p>
        </div>
        <button onClick={() => { setPersonaAEditar(null); setModalAbierto(true); }} style={{ backgroundColor: '#FCF0F2', color: '#C3666D', border: '1.5px solid #FADADD', borderRadius: '8px', padding: '10px 20px', fontFamily: 'Poppins-SemiBold', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>
          <i className="fa-solid fa-user-plus"></i> AGREGAR PERSONAL
        </button>
      </div>

      {/* TARJETAS DE MÉTRICAS (KPIs) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '35px' }}>
        {kpis.map((kpi, index) => (
          <div key={index} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', border: `2px solid ${kpi.border}`, display: 'flex', flexDirection: 'column', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
              <i className={kpi.icon} style={{ fontSize: '36px', color: kpi.color }}></i>
              <div>
                <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '28px', color: '#5A3E41', margin: '0 0 2px 0', lineHeight: '1' }}>{kpi.valor}</h2>
                <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', margin: 0, lineHeight: '1.2' }}>{kpi.etiqueta}</p>
              </div>
            </div>
            <a href="#" style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: kpi.colorLink, textDecoration: 'underline' }}>{kpi.link}</a>
          </div>
        ))}
      </div>

      {/* SECCIÓN PRINCIPAL (LISTA + INFO) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '25px', marginBottom: '35px' }}>
        
        {/* Lado Izquierdo: Miembros del Equipo */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #EAEAEA' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
             <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: 0 }}>Miembros de equipo</h3>
             {cargando && <span style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#999' }}>Cargando...</span>}
          </div>
          
          {/* Barra de búsqueda y filtro */}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '0 15px', backgroundColor: 'white' }}>
              <i className="fa-solid fa-magnifying-glass" style={{ color: '#999', fontSize: '16px' }}></i>
              <input 
                type="text" 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre, cargo o correo ..." 
                style={{ border: 'none', outline: 'none', width: '100%', padding: '12px 10px', fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#5A3E41' }}
              />
            </div>
            <button style={{ backgroundColor: 'white', color: '#C3666D', border: '1.5px solid #C3666D', borderRadius: '8px', padding: '0 25px', fontFamily: 'Poppins-Medium', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-filter"></i> Filtros
            </button>
          </div>

          {/* Mensajes de error/vacío */}
          {error && <p style={{ color: '#C6676D', fontFamily: 'Poppins-Medium', textAlign: 'center' }}>{error}</p>}
          {!cargando && !error && visibles.length === 0 && <p style={{ color: '#999', fontFamily: 'Poppins-Regular', textAlign: 'center', padding: '20px 0' }}>A la espera de datos / No hay personal registrado.</p>}

          {/* Lista de personal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
            {visibles.map((persona) => {
              const nombreCompleto = `${persona.perNombre || ""} ${persona.perApellido || ""}`.trim() || "Usuario";
              const esActivo = persona.perEstado === "Activo";
              const idUnico = persona.perId || Math.random();

              return (
                <div key={idUnico} style={{ border: '1.5px solid #EAEAEA', borderRadius: '12px', padding: '15px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(nombreCompleto)}&background=random&color=fff&size=128`} alt={nombreCompleto} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '15px', color: '#5A3E41', margin: '0 0 2px 0' }}>{nombreCompleto}</h4>
                      <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', margin: '0 0 2px 0' }}>{persona.rol || "Sin cargo asignado"}</p>
                      <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: 0 }}>{persona.perCorreo || "-"}</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Poppins-Medium', fontSize: '13px', color: esActivo ? '#27AE60' : '#777' }}>
                      <span style={{ fontSize: '10px' }}>●</span> {persona.perEstado || "Inactivo"}
                    </div>
                    
                    <button onClick={() => toggleMenu(idUnico)} style={{ border: '1.5px solid #F194B4', backgroundColor: 'transparent', color: '#F194B4', width: '35px', height: '40px', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>

                    {/* Menú Desplegable (3 puntos funcionales) */}
                    {menuAbierto === idUnico && (
                      <div style={{ position: 'absolute', right: '0', top: '50px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0px 4px 15px rgba(0,0,0,0.15)', padding: '5px 0', width: '150px', zIndex: 100, border: '1px solid #FADADD' }}>
                        <button style={btnStyleMenu} onClick={() => { setPersonaAEditar(persona); setModalAbierto(true); setMenuAbierto(null); }}>✏️ Editar</button>
                        <button style={btnStyleMenu} onClick={() => cambiarEstado(persona)}>🔄 Cambiar Estado</button>
                        <button style={{...btnStyleMenu, color: '#C6676D'}} onClick={() => eliminar(persona.perId)}>🗑 Eliminar</button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Paginación */}
          {totalPaginas > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #EAEAEA', paddingTop: '20px' }}>
              <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: 0 }}>
                Mostrando de {(pagina - 1) * porPagina + (visibles.length > 0 ? 1 : 0)}-{Math.min(pagina * porPagina, filtrados.length)} de {filtrados.length} personas
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={() => setPaginaActual(p => Math.max(p - 1, 1))} style={{ border: '1px solid #D9D9D9', background: 'white', color: '#C3666D', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(n => (
                  <button 
                    key={n} 
                    onClick={() => setPaginaActual(n)} 
                    style={{ 
                      border: pagina === n ? 'none' : '1px solid #D9D9D9', 
                      background: pagina === n ? '#C3666D' : 'white', 
                      color: pagina === n ? 'white' : '#5A3E41', 
                      width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Bold', fontSize: '14px' 
                    }}>
                    {n}
                  </button>
                ))}
                
                <button onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas))} style={{ border: '1px solid #D9D9D9', background: 'white', color: '#C3666D', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Lado Derecho: Información importante */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #EAEAEA', height: 'fit-content' }}>
          <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: '0 0 25px 0' }}>Información importante</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {infoImportante.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <i className={item.icon} style={{ fontSize: '22px', color: '#F194B4', marginTop: '3px', width: '25px', textAlign: 'center' }}></i>
                <div>
                  <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '13px', color: '#5A3E41', margin: '0 0 5px 0' }}>{item.title}</h4>
                  <p style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#777', margin: 0, lineHeight: '1.4' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* DISTRIBUCIÓN POR CARGO */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #EAEAEA', marginBottom: '30px' }}>
        <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0 0 25px 0' }}>Distribución por cargo</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {distribucion.map((dist, index) => (
            <div key={index} style={{ border: `1.5px solid ${dist.border}`, borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ color: dist.color, fontSize: '32px' }}>
                <i className={dist.icon}></i>
              </div>
              <div>
                <p style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41', margin: '0 0 2px 0' }}>{dist.cargo}</p>
                <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '20px', color: '#5A3E41', margin: '0 0 2px 0' }}>{dist.count}</h3>
                <p style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#777', margin: 0 }}>Personas</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <p style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#999', margin: '0 0 20px 0' }}>
        <span style={{ color: '#C3666D' }}>♥</span> Gracias por endulzar cada día con tu trabajo
      </p>

      {/* MODAL ESTILIZADO */}
      {modalAbierto && (
        <ModalPersonal 
          persona={personaAEditar}
          onCancelar={() => { setModalAbierto(false); setPersonaAEditar(null); }} 
          onGuardar={guardar} 
        />
      )}

    </div>
  );
};

// Componente Modal adaptado a tu Diseño UI
function ModalPersonal({ persona, onCancelar, onGuardar }) {
  const [form, setForm] = useState({
    nombre: persona?.perNombre || "", 
    apellido: persona?.perApellido || "",
    correo: persona?.perCorreo || "", 
    telefono: persona?.perTelefono || "",
    rol: persona?.rol || "",
    estado: persona?.perEstado || "Activo"
  });
  
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const input = { width: '100%', padding: '12px', margin: '8px 0', borderRadius: '8px', border: '1px solid #D9D9D9', boxSizing: 'border-box', fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#5A3E41', outline: 'none' };
  
  const submit = () => {
    if (!form.nombre.trim() || !form.correo.trim()) { alert("El nombre y el correo son obligatorios."); return; }
    onGuardar(form);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(2px)' }}>
      <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '20px', width: '450px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', border: '1px solid #FADADD' }}>
        <h2 style={{ fontFamily: 'Poppins-Bold', color: '#5A3E41', marginTop: 0, fontSize: '20px' }}>
          {persona ? "Editar personal" : "Agregar personal"}
        </h2>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <input value={form.nombre} onChange={e => set('nombre', e.target.value)} placeholder="Nombre" style={input} />
          <input value={form.apellido} onChange={e => set('apellido', e.target.value)} placeholder="Apellido" style={input} />
        </div>
        
        <input type="email" value={form.correo} onChange={e => set('correo', e.target.value)} placeholder="Correo electrónico" style={input} />
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <input value={form.telefono} onChange={e => set('telefono', e.target.value)} placeholder="Teléfono" style={input} />
          <select value={form.rol} onChange={e => set('rol', e.target.value)} style={input}>
            <option value="">-- Seleccionar Cargo --</option>
            <option value="Administradora">Administrador(a)</option>
            <option value="Repostera">Repostero(a)</option>
            <option value="Decoradora">Decorador(a)</option>
            <option value="At. al cliente">At. al cliente</option>
          </select>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Poppins-Medium', color: '#5A3E41', marginTop: '10px', fontSize: '14px', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.estado === "Activo"} onChange={e => set('estado', e.target.checked ? "Activo" : "Inactivo")} style={{ accentColor: '#C3666D', width: '18px', height: '18px' }} /> 
            Usuario Activo en el sistema
        </label>

        <div style={{ display: 'flex', gap: '12px', marginTop: '25px' }}>
          <button onClick={onCancelar} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1.5px solid #D9D9D9', background: 'white', color: '#777', cursor: 'pointer', fontFamily: 'Poppins-SemiBold', fontSize: '14px', transition: 'all 0.2s' }}>Cancelar</button>
          <button onClick={submit} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: '#C3666D', color: 'white', cursor: 'pointer', fontFamily: 'Poppins-SemiBold', fontSize: '14px', boxShadow: '0 4px 10px rgba(195, 102, 109, 0.3)', transition: 'all 0.2s' }}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default AdminMenu5;
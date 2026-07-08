import React, { useState, useEffect, useMemo } from "react";
import { apiGet, apiPost } from "./api";
import logoPrincipal from './assets/logo.png';

const AdminMenu6 = () => {
  // LÓGICA DE ESTADOS
  const [vistaActiva, setVistaActiva] = useState("Vista semanal");
  const [toggleTiempo, setToggleTiempo] = useState("Semana");
  
  const [personal, setPersonal] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const porPagina = 5; 
  
  const [modalAbierto, setModalAbierto] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(null); // Estado para el menú de 3 puntos

  // LLAMADAS A LA API
  const cargarPersonal = () => {
    setCargando(true);
    apiGet("/api/admin/personal")
      .then(d => { setPersonal(Array.isArray(d) ? d : []); setError(""); })
      .catch(() => setError("No se pudo cargar el personal para los horarios."))
      .finally(() => setCargando(false));
  };

  useEffect(() => { cargarPersonal(); }, []);

  // FUNCIÓN EXPORTAR CSV
  const exportarCSV = () => {
    const filasExportar = horariosProgramados.length > 0 
      ? horariosProgramados.map(h => [h.nombre, h.cargo, h.turnoHora, h.dias, h.horas, h.estado])
      : [["Sin datos", "", "", "", "", ""]];
      
    const rows = [["Empleado", "Cargo", "Turno", "Días", "Horas Semanales", "Estado"], ...filasExportar];
    const csv = rows.map(r => r.map(x => `"${x}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a"); a.href = url; a.download = `horarios_programados.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  // FILTROS Y PAGINACIÓN
  const personalFiltrado = useMemo(() => {
    if (!busqueda.trim()) return personal;
    const q = busqueda.toLowerCase();
    return personal.filter(p => 
      `${p.perNombre || ""} ${p.perApellido || ""}`.toLowerCase().includes(q) ||
      (p.rol || "").toLowerCase().includes(q)
    );
  }, [personal, busqueda]);

  const totalPaginas = Math.max(1, Math.ceil(personalFiltrado.length / porPagina));
  const pagina = Math.min(paginaActual, totalPaginas);
  const visibles = personalFiltrado.slice((pagina - 1) * porPagina, pagina * porPagina);

  useEffect(() => { setPaginaActual(1); }, [busqueda]);

  // MAPEO DE DATOS PARA LA VISTA SEMANAL
  const horarioSemanal = visibles.map(p => ({
    id: p.perId || Math.random(),
    nombre: `${p.perNombre || ""} ${p.perApellido || ""}`.trim() || "Sin Nombre",
    cargo: p.rol || "Sin cargo",
    lun: p.horarios?.lun || "Descanso", 
    mar: p.horarios?.mar || "Descanso", 
    mie: p.horarios?.mie || "Descanso", 
    jue: p.horarios?.jue || "Descanso", 
    vie: p.horarios?.vie || "Descanso", 
    sab: p.horarios?.sab || "-", 
    dom: p.horarios?.dom || "-"
  }));

  // MAPEO DE DATOS PARA TABLA INFERIOR
  const horariosProgramados = visibles.map(p => ({
    id: p.perId || Math.random(),
    nombre: `${p.perNombre || ""} ${p.perApellido || ""}`.trim() || "Sin Nombre",
    cargo: p.rol || "Sin cargo",
    turnoLabel: p.turnoLabel || "Mañana", 
    turnoHora: p.turnoHora || "00:00 am - 00:00 pm",
    dias: p.diasProgramados || "Lun, Mar, Mié",
    horas: p.totalHoras ? `${p.totalHoras}h` : "0h",
    estado: p.perEstado || "Activo",
    colorTurno: p.turnoLabel === "Tarde" ? "#F194B4" : "#C6676D"
  }));

  // KPIs DINÁMICOS
  const kpis = [
    { valor: personal.length || "0", subtitulo: "hoy", etiqueta: "Personal en turno", icon: "fa-solid fa-user-group", color: "#F194B4", bg: "#FDF2F3", border: "#FADADD" },
    { valor: "0", subtitulo: "personas", etiqueta: "Descansos hoy", icon: "fa-solid fa-mug-hot", color: "#F2C94C", bg: "#FFF9E6", border: "#FDE49E" },
    { valor: "0h", subtitulo: "esta semana", etiqueta: "Horas programadas", icon: "fa-regular fa-clock", color: "#27AE60", bg: "#E9F7EF", border: "#A9DFBF" },
    { valor: "0", subtitulo: "por asignar", etiqueta: "Turnos pendientes", icon: "fa-regular fa-calendar", color: "#9B59B6", bg: "#F4ECF7", border: "#D7BDE2" },
  ];

  // Estilos de Cargo
  const getCargoStyle = (cargo) => {
    switch (cargo) {
      case "Administradora":
      case "Administrador":
      case "Administración": return { color: "#C6676D", border: "1px solid #FADADD" };
      case "Repostera": 
      case "Repostero": return { color: "#F39C12", border: "1px solid #FDE49E" };
      case "Decoradora": 
      case "Decorador": return { color: "#9B59B6", border: "1px solid #D7BDE2" };
      case "At. al cliente": return { color: "#27AE60", border: "1px solid #A9DFBF" };
      default: return { color: "#777", border: "1px solid #EAEAEA" };
    }
  };

  const TurnoBadge = ({ valor, cargo }) => {
    if (valor === "Descanso" || valor === "-" || !valor) {
      return <span style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#999' }}>{valor || "-"}</span>;
    }
    const style = getCargoStyle(cargo);
    return (
      <div style={{ padding: '6px 10px', borderRadius: '15px', border: style.border, color: style.color, fontFamily: 'Poppins-Medium', fontSize: '11px', textAlign: 'center', whiteSpace: 'nowrap' }}>
        {valor}
      </div>
    );
  };

  const toggleMenu = (id) => setMenuAbierto(menuAbierto === id ? null : id);
  const btnStyleMenu = { background: 'none', border: 'none', padding: '10px 15px', textAlign: 'left', cursor: 'pointer', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#5A3E41', width: '100%', transition: 'background 0.2s' };

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%', width: '100%' }}>

      {/* TÍTULO Y BOTÓN NUEVO HORARIO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 5px 0', textTransform: 'uppercase' }}>
            HORARIOS
          </h1>
          <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>
            Gestiona los turnos y jornadas del personal.
          </p>
        </div>
        <button onClick={() => setModalAbierto(true)} style={{ backgroundColor: '#FCF0F2', color: '#C3666D', border: '1.5px solid #FADADD', borderRadius: '8px', padding: '10px 20px', fontFamily: 'Poppins-SemiBold', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>
          <i className="fa-regular fa-clock"></i> Nuevo horario
        </button>
      </div>

      {/* BARRA DE BÚSQUEDA Y FILTROS */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '35px' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '0 15px', backgroundColor: 'white' }}>
          <i className="fa-solid fa-magnifying-glass" style={{ color: '#999', fontSize: '16px' }}></i>
          <input 
            type="text" 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar empleado ..." 
            style={{ border: 'none', outline: 'none', width: '100%', padding: '12px 10px', fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#5A3E41' }}
          />
        </div>
        
        {/* Toggle Semana / Mes */}
        <div style={{ display: 'flex', border: '1px solid #C3666D', borderRadius: '8px', overflow: 'hidden' }}>
          <button onClick={() => setToggleTiempo("Semana")} style={{ backgroundColor: toggleTiempo === "Semana" ? '#FCF0F2' : 'white', color: toggleTiempo === "Semana" ? '#C3666D' : '#777', border: 'none', padding: '0 20px', fontFamily: toggleTiempo === "Semana" ? 'Poppins-Bold' : 'Poppins-Medium', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-regular fa-calendar-days"></i> Semana
          </button>
          <div style={{ width: '1px', backgroundColor: '#C3666D' }}></div>
          <button onClick={() => setToggleTiempo("Mes")} style={{ backgroundColor: toggleTiempo === "Mes" ? '#FCF0F2' : 'white', color: toggleTiempo === "Mes" ? '#C3666D' : '#777', border: 'none', padding: '0 20px', fontFamily: toggleTiempo === "Mes" ? 'Poppins-Bold' : 'Poppins-Medium', fontSize: '13px', cursor: 'pointer' }}>
            Mes
          </button>
        </div>

        <button style={{ backgroundColor: 'white', color: '#C3666D', border: '1px solid #C3666D', borderRadius: '8px', padding: '0 25px', fontFamily: 'Poppins-Medium', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fa-solid fa-filter"></i> Filtros
        </button>
      </div>

      {/* TARJETAS DE MÉTRICAS (KPIs) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
        {kpis.map((kpi, index) => (
          <div key={index} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', border: `2px solid ${kpi.border}`, display: 'flex', alignItems: 'flex-start', gap: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
            <div style={{ width: '45px', height: '45px', backgroundColor: kpi.bg, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: kpi.color, fontSize: '20px', flexShrink: 0 }}>
              <i className={kpi.icon}></i>
            </div>
            <div>
              <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', margin: '0 0 8px 0' }}>{kpi.etiqueta}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '26px', color: '#5A3E41', margin: '0', lineHeight: '1' }}>{kpi.valor}</h2>
                <p style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#999', margin: 0 }}>{kpi.subtitulo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VISTA SEMANAL (TABLA CALENDARIO) */}
      <div style={{ marginBottom: '40px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '2px solid #FDF2F3', paddingBottom: '15px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '30px' }}>
            {["Vista semanal", "Vista mensual"].map((tab) => {
              const isActive = vistaActiva === tab;
              return (
                <div 
                  key={tab} onClick={() => setVistaActiva(tab)}
                  style={{
                    paddingBottom: '15px', marginBottom: '-17px', cursor: 'pointer',
                    borderBottom: isActive ? '3px solid #C3666D' : '3px solid transparent',
                    fontFamily: 'Poppins-Bold', fontSize: '16px', color: isActive ? '#C3666D' : '#A08D8F',
                    transition: 'all 0.2s'
                  }}
                >
                  {tab}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button style={{ background: 'white', border: '1px solid #D9D9D9', borderRadius: '6px', width: '30px', height: '30px', color: '#C3666D', cursor: 'pointer' }}><i className="fa-solid fa-chevron-left"></i></button>
              <span style={{ fontFamily: 'Poppins-SemiBold', fontSize: '14px', color: '#5A3E41' }}>Semana Actual</span>
              <button style={{ background: 'white', border: '1px solid #D9D9D9', borderRadius: '6px', width: '30px', height: '30px', color: '#C3666D', cursor: 'pointer' }}><i className="fa-solid fa-chevron-right"></i></button>
            </div>
            <button style={{ background: 'white', border: '1.5px solid #FADADD', borderRadius: '20px', padding: '6px 20px', fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#C3666D', cursor: 'pointer' }}>Hoy</button>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', border: '1px solid #EAEAEA', borderRadius: '12px', overflowX: 'auto', padding: '10px 20px 20px 20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', minWidth: '1000px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #EAEAEA' }}>
                <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '20px 10px', textAlign: 'left', fontWeight: 'normal' }}>Empleado/ Día</th>
                {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map(dia => (
                  <th key={dia} style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '20px 10px', fontWeight: 'normal' }}>{dia}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr><td colSpan="8" style={{ padding: '30px', color: '#999', fontFamily: 'Poppins-Regular' }}>Cargando datos...</td></tr>
              ) : horarioSemanal.length === 0 ? (
                <tr><td colSpan="8" style={{ padding: '30px', color: '#999', fontFamily: 'Poppins-Regular' }}>A la espera de datos / Sin personal.</td></tr>
              ) : (
                horarioSemanal.map((emp) => (
                  <tr key={emp.id} style={{ borderBottom: '1px solid #F5F5F5' }}>
                    <td style={{ padding: '15px 10px', textAlign: 'left' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(emp.nombre)}&background=random&color=fff&size=128`} alt={emp.nombre} style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '13px', color: '#5A3E41', margin: '0 0 2px 0', whiteSpace: 'nowrap' }}>{emp.nombre}</h4>
                          <p style={{ fontFamily: 'Poppins-Medium', fontSize: '11px', color: '#999', margin: 0 }}>{emp.cargo}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '15px 5px' }}><TurnoBadge valor={emp.lun} cargo={emp.cargo} /></td>
                    <td style={{ padding: '15px 5px' }}><TurnoBadge valor={emp.mar} cargo={emp.cargo} /></td>
                    <td style={{ padding: '15px 5px' }}><TurnoBadge valor={emp.mie} cargo={emp.cargo} /></td>
                    <td style={{ padding: '15px 5px' }}><TurnoBadge valor={emp.jue} cargo={emp.cargo} /></td>
                    <td style={{ padding: '15px 5px' }}><TurnoBadge valor={emp.vie} cargo={emp.cargo} /></td>
                    <td style={{ padding: '15px 5px' }}><TurnoBadge valor={emp.sab} cargo={emp.cargo} /></td>
                    <td style={{ padding: '15px 5px' }}><TurnoBadge valor={emp.dom} cargo={emp.cargo} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '20px', flexWrap: 'wrap' }}>
          {[
            { label: "Administración", color: "#C6676D" },
            { label: "Repostera", color: "#F39C12" },
            { label: "Decoración", color: "#9B59B6" },
            { label: "At. al cliente", color: "#27AE60" },
            { label: "Descanso", color: "#999" }
          ].map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: item.color }}></div>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* HORARIOS PROGRAMADOS (TABLA INFERIOR) */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '20px', color: '#5A3E41', margin: 0 }}>Horarios programados</h3>
          <button onClick={exportarCSV} style={{ backgroundColor: '#FCF0F2', color: '#C3666D', border: '1.5px solid #FADADD', borderRadius: '8px', padding: '8px 20px', fontFamily: 'Poppins-Medium', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>
            <i className="fa-solid fa-download"></i> Exportar horarios
          </button>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #EAEAEA', overflow: 'hidden', padding: '15px 25px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #EAEAEA' }}>
                <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '15px 10px', fontWeight: 'normal' }}>Empleado</th>
                <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '15px 10px', fontWeight: 'normal' }}>Turno</th>
                <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '15px 10px', fontWeight: 'normal' }}>Días</th>
                <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '15px 10px', fontWeight: 'normal' }}>Horas semanales</th>
                <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '15px 10px', fontWeight: 'normal' }}>Estado</th>
                <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '15px 10px', fontWeight: 'normal', textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {horariosProgramados.length === 0 ? (
                <tr><td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#999', fontFamily: 'Poppins-Regular' }}>Sin turnos programados.</td></tr>
              ) : (
                horariosProgramados.map((prog) => (
                  <tr key={prog.id} style={{ borderBottom: '1px solid #F5F5F5' }}>
                    <td style={{ padding: '15px 10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(prog.nombre)}&background=random&color=fff&size=128`} alt={prog.nombre} style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '13px', color: '#5A3E41', margin: '0 0 2px 0' }}>{prog.nombre}</h4>
                          <p style={{ fontFamily: 'Poppins-Medium', fontSize: '11px', color: '#999', margin: 0 }}>{prog.cargo}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '15px 10px' }}>
                      <span style={{ fontFamily: 'Poppins-SemiBold', fontSize: '13px', color: prog.colorTurno }}>{prog.turnoLabel}</span>
                      <span style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', marginLeft: '8px' }}>{prog.turnoHora}</span>
                    </td>
                    <td style={{ padding: '15px 10px' }}>
                      <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777' }}>{prog.dias}</span>
                    </td>
                    <td style={{ padding: '15px 10px' }}>
                      <span style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#5A3E41' }}>{prog.horas}</span>
                    </td>
                    <td style={{ padding: '15px 10px' }}>
                      <span style={{ fontFamily: 'Poppins-SemiBold', fontSize: '13px', color: prog.estado === 'Activo' ? '#27AE60' : '#999' }}>{prog.estado}</span>
                    </td>
                    <td style={{ padding: '15px 10px', textAlign: 'center', position: 'relative' }}>
                      <button onClick={() => toggleMenu(prog.id)} style={{ background: 'none', border: 'none', color: '#F194B4', fontSize: '20px', cursor: 'pointer' }}>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      
                      {/* Menú Desplegable de Acciones */}
                      {menuAbierto === prog.id && (
                        <div style={{ position: 'absolute', right: '40px', top: '15px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0px 4px 15px rgba(0,0,0,0.15)', padding: '5px 0', width: '130px', zIndex: 100, border: '1px solid #FADADD' }}>
                          <button style={btnStyleMenu} onClick={() => alert("Editar programacion de " + prog.nombre)}>✏️ Editar</button>
                          <button style={{...btnStyleMenu, color: '#C6676D'}} onClick={() => alert("Eliminar horario")}>🗑 Eliminar</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINACIÓN */}
      {totalPaginas > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: 0 }}>
            Mostrando de {(pagina - 1) * porPagina + (visibles.length > 0 ? 1 : 0)}-{Math.min(pagina * porPagina, personalFiltrado.length)} de {personalFiltrado.length} registros
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

      {/* FOOTER */}
      <p style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#999', margin: '0 0 20px 0' }}>
        <span style={{ color: '#C3666D' }}>♥</span> Gracias por endulzar cada día con tu trabajo
      </p>

      {/* MODAL NUEVO HORARIO */}
      {modalAbierto && (
        <ModalAsignarHorario 
          personal={personal}
          onCancelar={() => setModalAbierto(false)} 
          onGuardar={async (form) => {
            try {
              const body = { horDia: form.dia, horEntrada: `${form.entrada}:00`, horSalida: `${form.salida}:00` };
              await apiPost(`/api/admin/personal/${form.empleadoId}/horarios`, body);
              setModalAbierto(false);
              cargarPersonal(); 
            } catch (e) {
              alert(e.message || "Error al guardar el horario.");
            }
          }} 
        />
      )}

    </div>
  );
};

// Componente Modal
function ModalAsignarHorario({ personal, onCancelar, onGuardar }) {
  const [form, setForm] = useState({ empleadoId: "", dia: "Lunes", entrada: "08:00", salida: "16:00" });
  const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const inputStyle = { width: '100%', padding: '12px', margin: '8px 0', borderRadius: '8px', border: '1px solid #D9D9D9', boxSizing: 'border-box', fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#5A3E41', outline: 'none' };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(2px)' }}>
      <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '20px', width: '450px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', border: '1px solid #FADADD' }}>
        <h2 style={{ fontFamily: 'Poppins-Bold', color: '#5A3E41', marginTop: 0, fontSize: '20px' }}>Asignar Turno</h2>
        
        <label style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#777' }}>Empleado</label>
        <select value={form.empleadoId} onChange={e => set('empleadoId', e.target.value)} style={inputStyle}>
          <option value="">-- Seleccionar Empleado --</option>
          {personal.map(p => (
            <option key={p.perId} value={p.perId}>{`${p.perNombre || ""} ${p.perApellido || ""}`.trim()}</option>
          ))}
        </select>

        <label style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#777', marginTop: '10px', display: 'block' }}>Día de la semana</label>
        <select value={form.dia} onChange={e => set('dia', e.target.value)} style={inputStyle}>
          {DIAS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#777' }}>Hora Entrada</label>
            <input type="time" value={form.entrada} onChange={e => set('entrada', e.target.value)} style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#777' }}>Hora Salida</label>
            <input type="time" value={form.salida} onChange={e => set('salida', e.target.value)} style={inputStyle} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '25px' }}>
          <button onClick={onCancelar} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1.5px solid #D9D9D9', background: 'white', color: '#777', cursor: 'pointer', fontFamily: 'Poppins-SemiBold', fontSize: '14px', transition: 'all 0.2s' }}>Cancelar</button>
          <button onClick={() => { if(!form.empleadoId) { alert("Selecciona un empleado"); return; } onGuardar(form); }} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: '#C3666D', color: 'white', cursor: 'pointer', fontFamily: 'Poppins-SemiBold', fontSize: '14px', boxShadow: '0 4px 10px rgba(195, 102, 109, 0.3)', transition: 'all 0.2s' }}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default AdminMenu6;
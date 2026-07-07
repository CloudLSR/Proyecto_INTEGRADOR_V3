import React, { useState } from "react";
import logoPrincipal from './assets/logo.png';

const AdminMenu6 = () => {
  const [vistaActiva, setVistaActiva] = useState("Vista semanal");
  const [toggleTiempo, setToggleTiempo] = useState("Semana");

  // Data simulada para las KPIs
  const kpis = [
    { valor: "8", subtitulo: "hoy", etiqueta: "Personal en turno", icon: "fa-solid fa-user-group", color: "#F194B4", bg: "#FDF2F3", border: "#FADADD" },
    { valor: "2", subtitulo: "personas", etiqueta: "Descansos hoy", icon: "fa-solid fa-mug-hot", color: "#F2C94C", bg: "#FFF9E6", border: "#FDE49E" },
    { valor: "164h", subtitulo: "esta semana", etiqueta: "Horas programadas", icon: "fa-regular fa-clock", color: "#27AE60", bg: "#E9F7EF", border: "#A9DFBF" },
    { valor: "3", subtitulo: "por asignar", etiqueta: "Turnos pendientes", icon: "fa-regular fa-calendar", color: "#9B59B6", bg: "#F4ECF7", border: "#D7BDE2" },
  ];

  // Función para obtener el color del badge de horario según el cargo
  const getCargoStyle = (cargo) => {
    switch (cargo) {
      case "Administradora":
      case "Administración": return { color: "#C6676D", border: "1px solid #FADADD" };
      case "Repostera": return { color: "#F39C12", border: "1px solid #FDE49E" };
      case "Decoradora": return { color: "#9B59B6", border: "1px solid #D7BDE2" };
      case "At. al cliente": return { color: "#27AE60", border: "1px solid #A9DFBF" };
      default: return { color: "#777", border: "1px solid #EAEAEA" };
    }
  };

  // Data simulada para la vista semanal
  const horarioSemanal = [
    { id: 1, nombre: "María Fernández", cargo: "Administradora", lun: "8:00 am - 4:00 pm", mar: "8:00 am - 4:00 pm", mie: "8:00 am - 4:00 pm", jue: "8:00 am - 4:00 pm", vie: "8:00 am - 4:00 pm", sab: "-", dom: "Descanso" },
    { id: 2, nombre: "Valeria Rodríguez", cargo: "Repostera", lun: "6:00 am - 2:00 pm", mar: "6:00 am - 2:00 pm", mie: "6:00 am - 2:00 pm", jue: "Descanso", vie: "6:00 am - 2:00 pm", sab: "6:00 am - 1:00 pm", dom: "Descanso" },
    { id: 3, nombre: "Lucía Gómez", cargo: "Decoradora", lun: "9:00 am - 5:00 pm", mar: "9:00 am - 5:00 pm", mie: "Descanso", jue: "9:00 am - 5:00 pm", vie: "9:00 am - 5:00 pm", sab: "9:00 am - 2:00 pm", dom: "Descanso" },
    { id: 4, nombre: "Diana Salazar", cargo: "At. al cliente", lun: "10:00 am - 6:00 pm", mar: "10:00 am - 6:00 pm", mie: "10:00 am - 6:00 pm", jue: "Descanso", vie: "10:00 am - 6:00 pm", sab: "10:00 am - 2:00 pm", dom: "Descanso" },
    { id: 5, nombre: "Andrea Torres", cargo: "Repostera", lun: "8:00 am - 4:00 pm", mar: "8:00 am - 4:00 pm", mie: "Descanso", jue: "8:00 am - 4:00 pm", vie: "8:00 am - 4:00 pm", sab: "-", dom: "Descanso" },
    { id: 6, nombre: "Sofía Herrera", cargo: "Decoradora", lun: "6:00 am - 2:00 pm", mar: "Descanso", mie: "6:00 am - 2:00 pm", jue: "6:00 am - 2:00 pm", vie: "6:00 am - 2:00 pm", sab: "6:00 am - 1:00 pm", dom: "Descanso" },
    { id: 7, nombre: "Carlos Ramírez", cargo: "Administrador", lun: "7:00 am - 3:00 pm", mar: "7:00 am - 3:00 pm", mie: "7:00 am - 3:00 pm", jue: "7:00 am - 3:00 pm", vie: "Descanso", sab: "-", dom: "Descanso" },
  ];

  // Data simulada para la tabla de Horarios programados
  const horariosProgramados = [
    { id: 1, nombre: "María Fernández", cargo: "Administradora", turnoLabel: "Mañana", turnoHora: "8:00 am - 4:00 pm", dias: "Lun, Mar, Mié, Jue, Vie", horas: "40h", estado: "Activo", colorTurno: "#C6676D" },
    { id: 2, nombre: "Lucía Gómez", cargo: "Decoradora", turnoLabel: "Mañana", turnoHora: "6:00 am - 2:00 pm", dias: "Lun, Mar, Mié, Vie, Sáb", horas: "36h", estado: "Activo", colorTurno: "#C6676D" },
    { id: 3, nombre: "Valeria Rodríguez", cargo: "Repostera", turnoLabel: "Mañana", turnoHora: "9:00 am - 5:00 pm", dias: "Lun, Mar, Jue, Vie, Sáb", horas: "36h", estado: "Activo", colorTurno: "#C6676D" },
    { id: 4, nombre: "Diana Salazar", cargo: "At. al cliente", turnoLabel: "Tarde", turnoHora: "10:00 am - 6:00 pm", dias: "Lun, Mar, Mié, Vie, Sáb", horas: "36h", estado: "Activo", colorTurno: "#F194B4" },
    { id: 5, nombre: "Andrea Torres", cargo: "Repostera", turnoLabel: "Mañana", turnoHora: "8:00 am - 4:00 pm", dias: "Lun, Mar, Jue, Vie", horas: "32h", estado: "Activo", colorTurno: "#C6676D" },
  ];

  // Componente para renderizar la píldora de horario en la tabla semanal
  const TurnoBadge = ({ valor, cargo }) => {
    if (valor === "Descanso" || valor === "-") {
      return <span style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#999' }}>{valor}</span>;
    }
    const style = getCargoStyle(cargo);
    return (
      <div style={{ padding: '6px 10px', borderRadius: '15px', border: style.border, color: style.color, fontFamily: 'Poppins-Medium', fontSize: '11px', textAlign: 'center', whiteSpace: 'nowrap' }}>
        {valor}
      </div>
    );
  };

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
        <button style={{ backgroundColor: '#FCF0F2', color: '#C3666D', border: '1.5px solid #FADADD', borderRadius: '8px', padding: '10px 20px', fontFamily: 'Poppins-SemiBold', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>
          <i className="fa-regular fa-clock"></i> Nuevo horario
        </button>
      </div>

      {/* BARRA DE BÚSQUEDA Y FILTROS */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '35px' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '0 15px', backgroundColor: 'white' }}>
          <i className="fa-solid fa-magnifying-glass" style={{ color: '#999', fontSize: '16px' }}></i>
          <input 
            type="text" 
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
        
        {/* Controles de la tabla semanal */}
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
              <span style={{ fontFamily: 'Poppins-SemiBold', fontSize: '14px', color: '#5A3E41' }}>11 - 17 de mayo, 2026</span>
              <button style={{ background: 'white', border: '1px solid #D9D9D9', borderRadius: '6px', width: '30px', height: '30px', color: '#C3666D', cursor: 'pointer' }}><i className="fa-solid fa-chevron-right"></i></button>
            </div>
            <button style={{ background: 'white', border: '1.5px solid #FADADD', borderRadius: '20px', padding: '6px 20px', fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#C3666D', cursor: 'pointer' }}>Hoy</button>
          </div>
        </div>

        {/* Tabla Semanal */}
        <div style={{ backgroundColor: 'white', border: '1px solid #EAEAEA', borderRadius: '12px', overflowX: 'auto', padding: '10px 20px 20px 20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', minWidth: '1000px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #EAEAEA' }}>
                <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '20px 10px', textAlign: 'left', fontWeight: 'normal' }}>Empleado/ Día</th>
                {["Lun 11", "Mar 12", "Mié 13", "Jue 14", "Vie 15", "Sáb 16", "Dom 17"].map(dia => (
                  <th key={dia} style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '20px 10px', fontWeight: 'normal' }}>{dia}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {horarioSemanal.map((emp) => (
                <tr key={emp.id} style={{ borderBottom: '1px solid #F5F5F5' }}>
                  <td style={{ padding: '15px 10px', textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <img src={`https://ui-avatars.com/api/?name=${emp.nombre}&background=random&color=fff&size=128`} alt={emp.nombre} style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' }} />
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Leyenda de cargos */}
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
          <button style={{ backgroundColor: '#FCF0F2', color: '#C3666D', border: '1.5px solid #FADADD', borderRadius: '8px', padding: '8px 20px', fontFamily: 'Poppins-Medium', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
              {horariosProgramados.map((prog) => (
                <tr key={prog.id} style={{ borderBottom: '1px solid #F5F5F5' }}>
                  <td style={{ padding: '15px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <img src={`https://ui-avatars.com/api/?name=${prog.nombre}&background=random&color=fff&size=128`} alt={prog.nombre} style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' }} />
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
                    <span style={{ fontFamily: 'Poppins-SemiBold', fontSize: '13px', color: '#27AE60' }}>{prog.estado}</span>
                  </td>
                  <td style={{ padding: '15px 10px', textAlign: 'center' }}>
                    <button style={{ background: 'none', border: 'none', color: '#F194B4', fontSize: '20px', cursor: 'pointer' }}>
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINACIÓN */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: 0 }}>
          Mostrando de 1-5 de 12 registros
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={{ border: '1px solid #D9D9D9', background: 'white', color: '#C3666D', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium' }}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button style={{ border: 'none', background: '#C3666D', color: 'white', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Bold', fontSize: '14px' }}>1</button>
          <button style={{ border: '1px solid #D9D9D9', background: 'white', color: '#5A3E41', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium', fontSize: '14px' }}>2</button>
          <button style={{ border: '1px solid #D9D9D9', background: 'white', color: '#C3666D', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium' }}>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <p style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#999', margin: '0 0 20px 0' }}>
        <span style={{ color: '#C3666D' }}>♥</span> Gracias por endulzar cada día con tu trabajo
      </p>

    </div>
  );
};

export default AdminMenu6;
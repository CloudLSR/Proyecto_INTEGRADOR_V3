import React from "react";

const AdminPerfil = () => {

  // Data simulada para las tarjetas KPI superiores
  const kpis = [
    { titulo: "Tipo de Usuario", valor: "Administrador", icon: "fa-regular fa-user", color: "#F194B4", border: "#FADADD" },
    { titulo: "Área asignada", valor: "Administración", icon: "fa-solid fa-briefcase", color: "#27AE60", border: "#A9DFBF" },
    { titulo: "Fecha de ingreso", valor: "15/05/2026", icon: "fa-regular fa-calendar-days", color: "#F2C94C", border: "#FDE49E" },
    { titulo: "Permisos", valor: "Acceso completo", icon: "fa-regular fa-circle-check", color: "#9B59B6", border: "#D7BDE2" },
  ];

  // Data simulada para los permisos
  const permisos = [
    "Gestión de Pedidos", "Gestión de Productos", "Gestión de Ventas", "Gestión de Personal",
    "Gestión de Horarios", "Gestión de Ofertas", "Gestión de Ganancias", "Gestión de Reportes",
    "Gestión de Comentarios", "Configuración del Sistema"
  ];

  // Data simulada para la actividad reciente
  const actividadReciente = [
    { fecha: "Hoy 09:15 AM", modulo: "Acceso", accion: "Inicio de sesión", detalle: "Ingreso al sistema correctamente" },
    { fecha: "Hoy 09:32 AM", modulo: "Ventas", accion: "Consulta", detalle: "Consultó el listado de ventas" },
    { fecha: "Hoy 10:05 AM", modulo: "Pedidos", accion: "Gestión", detalle: "Actualizó estado de un pedido" },
    { fecha: "Ayer 04:10 PM", modulo: "Reportes", accion: "Consulta", detalle: "Generó reporte de ventas diarias" },
    { fecha: "Ayer 05:45 PM", modulo: "Acceso", accion: "Cierre de sesión", detalle: "Salida del sistema" },
  ];

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%', width: '100%' }}>
      
      {/* TÍTULO */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 5px 0' }}>Perfil de Usuario</h1>
        <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>Consulta la información de tu cuenta dentro del sistema.</p>
      </div>

      {/* TARJETAS SUPERIORES (KPIs) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '35px' }}>
        {kpis.map((kpi, index) => (
          <div key={index} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px 25px', border: `1.5px solid ${kpi.border}`, display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
            <div style={{ color: kpi.color, fontSize: '32px', flexShrink: 0 }}>
              <i className={kpi.icon}></i>
            </div>
            <div>
              <p style={{ fontFamily: 'Poppins-Medium', fontSize: '11px', color: '#777', margin: '0 0 2px 0' }}>{kpi.titulo}</p>
              <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: 0, lineHeight: '1.2' }}>{kpi.valor}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* PANELES DE INFORMACIÓN PRINCIPAL */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
        
        {/* COLUMNA IZQUIERDA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          {/* Información Personal */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #EAEAEA' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
              <div style={{ color: '#F194B4', fontSize: '18px' }}><i className="fa-solid fa-store"></i></div>
              <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: 0 }}>Información personal</h3>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#EAEAEA', overflow: 'hidden', border: '3px solid #FADADD' }}>
                {/* Fallback en caso de no tener la imagen aún */}
                <img src="https://i.pravatar.cc/150?img=47" alt="Perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <i className="fa-regular fa-user" style={{ color: '#F194B4', fontSize: '18px', marginTop: '3px' }}></i>
                <div>
                  <p style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#5A3E41', margin: '0 0 2px 0' }}>Nombre completo</p>
                  <p style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#777', margin: 0 }}>María Fernández</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <i className="fa-solid fa-phone" style={{ color: '#F194B4', fontSize: '16px', marginTop: '3px' }}></i>
                <div>
                  <p style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#5A3E41', margin: '0 0 2px 0' }}>Teléfono</p>
                  <p style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#777', margin: 0 }}>+51 987654321</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <i className="fa-regular fa-id-card" style={{ color: '#F194B4', fontSize: '16px', marginTop: '3px' }}></i>
                <div>
                  <p style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#5A3E41', margin: '0 0 2px 0' }}>Documento</p>
                  <p style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#777', margin: 0 }}>75489632</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <i className="fa-solid fa-location-dot" style={{ color: '#F194B4', fontSize: '16px', marginTop: '3px' }}></i>
                <div>
                  <p style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#5A3E41', margin: '0 0 2px 0' }}>Dirección</p>
                  <p style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#777', margin: 0 }}>Lima, Perú</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <i className="fa-regular fa-envelope" style={{ color: '#F194B4', fontSize: '16px', marginTop: '3px' }}></i>
                <div>
                  <p style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#5A3E41', margin: '0 0 2px 0' }}>Correo electrónico</p>
                  <p style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#777', margin: 0 }}>admin@gmail.com</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <i className="fa-regular fa-calendar" style={{ color: '#F194B4', fontSize: '16px', marginTop: '3px' }}></i>
                <div>
                  <p style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#5A3E41', margin: '0 0 2px 0' }}>Fecha de nacimiento</p>
                  <p style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#777', margin: 0 }}>15/08/2002</p>
                </div>
              </div>
            </div>
          </div>

          {/* Información Laboral */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #EAEAEA' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
              <div style={{ color: '#F194B4', fontSize: '18px' }}><i className="fa-solid fa-briefcase"></i></div>
              <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: 0 }}>Información laboral</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <i className="fa-regular fa-building" style={{ color: '#F194B4', fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                  <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41' }}>Área</span>
                </div>
                <span style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777' }}>Administración</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <i className="fa-regular fa-user" style={{ color: '#F194B4', fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                  <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41' }}>Cargo</span>
                </div>
                <span style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777' }}>Administrador General</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <i className="fa-regular fa-calendar-days" style={{ color: '#F194B4', fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                  <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41' }}>Fecha de contratación</span>
                </div>
                <span style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777' }}>15/05/2026</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <i className="fa-regular fa-file-lines" style={{ color: '#F194B4', fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                  <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41' }}>Tipo de contrato</span>
                </div>
                <span style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777' }}>Indefinido</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <i className="fa-regular fa-clock" style={{ color: '#F194B4', fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                  <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41' }}>Horario asignado</span>
                </div>
                <span style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777' }}>Mañana</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <i className="fa-solid fa-dollar-sign" style={{ color: '#F194B4', fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                  <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41' }}>Categoría salarial</span>
                </div>
                <span style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777' }}>Nivel administrativo</span>
              </div>
            </div>
          </div>

        </div>

        {/* COLUMNA DERECHA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          {/* Información de Acceso */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #EAEAEA' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
              <div style={{ color: '#F194B4', fontSize: '18px' }}><i className="fa-solid fa-circle-info"></i></div>
              <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: 0 }}>Información de acceso</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <i className="fa-regular fa-user" style={{ color: '#F194B4', fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                  <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41' }}>Usuario</span>
                </div>
                <span style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777' }}>admin_Maria</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <i className="fa-solid fa-user-group" style={{ color: '#F194B4', fontSize: '16px', width: '20px', textAlign: 'center' }}></i>
                  <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41' }}>Rol</span>
                </div>
                <span style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777' }}>Administrador General</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <i className="fa-regular fa-clock" style={{ color: '#F194B4', fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                  <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41' }}>Ultimo acceso</span>
                </div>
                <span style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777' }}>04 Jun 2026 - 09:15 AM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <i className="fa-solid fa-globe" style={{ color: '#F194B4', fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                  <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41' }}>Última IP</span>
                </div>
                <span style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777' }}>192.168.1.100</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <i className="fa-regular fa-circle-check" style={{ color: '#27AE60', fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                  <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41' }}>Estado</span>
                </div>
                <span style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#27AE60' }}>Activo</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <i className="fa-solid fa-lock" style={{ color: '#F194B4', fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                  <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41' }}>Nivel de acceso</span>
                </div>
                <span style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777' }}>Completo</span>
              </div>
            </div>
          </div>

          {/* Permisos del sistema */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #EAEAEA', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
              <div style={{ color: '#F194B4', fontSize: '18px' }}><i className="fa-solid fa-shield-halved"></i></div>
              <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: 0 }}>Permisos del sistema</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {permisos.map((permiso, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <i className="fa-regular fa-circle-check" style={{ color: '#27AE60', fontSize: '16px' }}></i>
                  <span style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#5A3E41' }}>{permiso}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ACTIVIDAD RECIENTE */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #EAEAEA', marginBottom: '35px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
          <div style={{ color: '#F194B4', fontSize: '18px' }}><i className="fa-regular fa-clock"></i></div>
          <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: 0 }}>Actividad reciente</h3>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #EAEAEA' }}>
              <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#C6676D', padding: '0 0 15px 0', fontWeight: 'normal' }}>Fecha y hora</th>
              <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#C6676D', padding: '0 0 15px 0', fontWeight: 'normal' }}>Módulo</th>
              <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#C6676D', padding: '0 0 15px 0', fontWeight: 'normal' }}>Acción realizada</th>
              <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#C6676D', padding: '0 0 15px 0', fontWeight: 'normal' }}>Detalle</th>
            </tr>
          </thead>
          <tbody>
            {actividadReciente.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: '15px 0', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777' }}>{item.fecha}</td>
                <td style={{ padding: '15px 0', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#5A3E41' }}>{item.modulo}</td>
                <td style={{ padding: '15px 0', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#5A3E41' }}>{item.accion}</td>
                <td style={{ padding: '15px 0', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777' }}>{item.detalle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BANNER ADMINISTRADOR PRINCIPAL */}
      <div style={{ backgroundColor: '#FFF6F7', borderRadius: '12px', padding: '30px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #FADADD', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <div style={{ color: '#F194B4', fontSize: '60px' }}>
            <i className="fa-regular fa-user"></i>
          </div>
          <div>
            <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#C6676D', margin: '0 0 5px 0' }}>Administrador principal</h3>
            <p style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#C6676D', margin: 0, maxWidth: '500px', lineHeight: '1.4' }}>
              Tienes acceso completo a todos los módulos del sistema y puedes supervisar la operación general de la pastelería.
            </p>
          </div>
        </div>
        <div style={{ color: '#F194B4', fontSize: '50px' }}>
          <i className="fa-solid fa-cupcake"></i>
        </div>
      </div>

      {/* FOOTER */}
      <p style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#999', margin: '0 0 20px 0' }}>
        <span style={{ color: '#C3666D' }}>♥</span> Gracias por endulzar cada día con tu trabajo
      </p>

    </div>
  );
};

export default AdminPerfil;
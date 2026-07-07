import React from "react";
import logoPrincipal from './assets/logo.png'; 

const AdminMenu5 = () => {

  // Data simulada para las tarjetas KPI
  const kpis = [
    { valor: "12", etiqueta: "Total de personal", link: "Ver todos", icon: "fa-solid fa-user-group", color: "#F194B4", colorLink: "#F194B4", border: "#FADADD" },
    { valor: "10", etiqueta: "Activos", link: "Ver activos", icon: "fa-solid fa-certificate", color: "#F2C94C", colorLink: "#F2C94C", border: "#FDE49E" },
    { valor: "2", etiqueta: "Inactivos", link: "Ver inactivos", icon: "fa-solid fa-user-minus", color: "#27AE60", colorLink: "#27AE60", border: "#A9DFBF" },
    { valor: "1", etiqueta: "Nuevos este mes", link: "Ver nuevos", icon: "fa-solid fa-user-plus", color: "#9B59B6", colorLink: "#9B59B6", border: "#D7BDE2" },
  ];

  // Data simulada para la lista de personal
  const personal = [
    { id: 1, nombre: "María Fernández", rol: "Administradora", email: "maria@sweetcreamrose.com", estado: "Activo" },
    { id: 2, nombre: "Lucía Gomez", rol: "Repostera", email: "lucia@sweetcreamrose.com", estado: "Inactivo" },
    { id: 3, nombre: "Valeria Rodríguez", rol: "Decoradora", email: "valeria@sweetcreamrose.com", estado: "Activo" },
    { id: 4, nombre: "Carlos Ramírez", rol: "At. al cliente", email: "carlos@sweetcreamrose.com", estado: "Activo" },
    { id: 5, nombre: "Diana Salazar", rol: "At. al cliente", email: "diana@sweetcreamrose.com", estado: "Activo" },
    { id: 6, nombre: "Andrea Torres", rol: "Repostera", email: "andrea@sweetcreamrose.com", estado: "Activo" },
    { id: 7, nombre: "Javier Ruiz", rol: "Administración", email: "javier@sweetcreamrose.com", estado: "Inactivo" },
  ];

  // Data para el panel de Información importante
  const infoImportante = [
    { icon: "fa-solid fa-key", title: "Roles y permisos", desc: "Asigna roles y permisos para controlar el acceso de tu equipo." },
    { icon: "fa-solid fa-bullhorn", title: "Comunicación", desc: "Mantén los datos de contacto actualizados para una mejor coordinación." },
    { icon: "fa-solid fa-arrow-trend-up", title: "Desempeño", desc: "Evalúa el desempeño de tu equipo regularmente." },
    { icon: "fa-solid fa-shield", title: "Seguridad", desc: "Asegúrate de que cada miembro tenga acceso solo a lo necesario." },
    { icon: "fa-solid fa-book-open-reader", title: "Capacitación", desc: "Brinda capacitaciones para mantener a tu equipo actualizado." },
  ];

  // Data para Distribución por cargo
  const distribucion = [
    { cargo: "Reposteras", count: "4", icon: "fa-solid fa-cake-candles", color: "#F194B4", border: "#FADADD" },
    { cargo: "Decoradoras", count: "2", icon: "fa-solid fa-box", color: "#F2C94C", border: "#FDE49E" },
    { cargo: "At. al cliente", count: "2", icon: "fa-solid fa-file-lines", color: "#27AE60", border: "#A9DFBF" },
    { cargo: "Administración", count: "2", icon: "fa-solid fa-shield", color: "#9B59B6", border: "#D7BDE2" },
  ];

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
        <button style={{ backgroundColor: '#FCF0F2', color: '#C3666D', border: '1.5px solid #FADADD', borderRadius: '8px', padding: '10px 20px', fontFamily: 'Poppins-SemiBold', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>
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
          <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0 0 25px 0' }}>Miembros de equipo</h3>
          
          {/* Barra de búsqueda y filtro */}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '0 15px', backgroundColor: 'white' }}>
              <i className="fa-solid fa-magnifying-glass" style={{ color: '#999', fontSize: '16px' }}></i>
              <input 
                type="text" 
                placeholder="Buscar por nombre, cargo o correo ..." 
                style={{ border: 'none', outline: 'none', width: '100%', padding: '12px 10px', fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#5A3E41' }}
              />
            </div>
            <button style={{ backgroundColor: 'white', color: '#C3666D', border: '1.5px solid #C3666D', borderRadius: '8px', padding: '0 25px', fontFamily: 'Poppins-Medium', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-filter"></i> Filtros
            </button>
          </div>

          {/* Lista de personal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
            {personal.map((persona) => (
              <div key={persona.id} style={{ border: '1.5px solid #EAEAEA', borderRadius: '12px', padding: '15px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  {/* Usando ui-avatars para generar fotos de perfil geniales con las iniciales */}
                  <img src={`https://ui-avatars.com/api/?name=${persona.nombre}&background=random&color=fff&size=128`} alt={persona.nombre} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '15px', color: '#5A3E41', margin: '0 0 2px 0' }}>{persona.nombre}</h4>
                    <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', margin: '0 0 2px 0' }}>{persona.rol}</p>
                    <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: 0 }}>{persona.email}</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Poppins-Medium', fontSize: '13px', color: persona.estado === "Activo" ? '#27AE60' : '#777' }}>
                    <span style={{ fontSize: '10px' }}>●</span> {persona.estado}
                  </div>
                  <button style={{ border: '1.5px solid #F194B4', backgroundColor: 'transparent', color: '#F194B4', width: '35px', height: '40px', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #EAEAEA', paddingTop: '20px' }}>
            <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: 0 }}>
              Mostrando de 1-8 de 12 personas
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

    </div>
  );
};

export default AdminMenu5;
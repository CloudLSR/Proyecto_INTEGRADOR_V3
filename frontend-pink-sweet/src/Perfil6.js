import React, { useState } from "react";

const Perfil6 = () => {
  // Estado para los toggles de notificaciones
  const [toggles, setToggles] = useState({
    pedidos: true,
    cambios: true,
    ofertas: true,
    recordatorios: true,
    correo: true
  });

  const handleToggle = (key) => {
    setToggles({ ...toggles, [key]: !toggles[key] });
  };

  // Componente interno para toggle switch
  const ToggleSwitch = ({ isOn, onClick }) => (
    <div 
      onClick={onClick}
      style={{ 
        width: '46px', 
        height: '24px', 
        backgroundColor: isOn ? '#C6676D' : '#EAAFB8', 
        borderRadius: '15px', 
        position: 'relative', 
        cursor: 'pointer', 
        transition: 'background-color 0.3s',
        flexShrink: 0
      }}
    >
      <div style={{ 
        width: '18px', 
        height: '18px', 
        backgroundColor: 'white', 
        borderRadius: '50%', 
        position: 'absolute', 
        top: '3px', 
        left: isOn ? '25px' : '3px', 
        transition: 'left 0.3s',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }} />
    </div>
  );

  return (
    <>
      {/* CONTENEDOR MAESTRO DE CONFIGURACIÓN */}
      <div style={{ backgroundColor: 'white', border: '2px solid #EAAFB8', borderRadius: '20px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
        
        <div style={{ paddingBottom: '10px' }}>
          <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '24px', color: '#5A3E41', margin: '0 0 5px 0', letterSpacing: '0.5px' }}>CONFIGURACIÓN</h2>
          <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>Administra tu cuenta y las preferencias del sistema</p>
        </div>

        {/* INFORMACIÓN DE LA CUENTA */}
        <div style={{ border: '2px solid #EAAFB8', borderRadius: '15px', padding: '30px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px', borderBottom: "1px solid #FDF2F3", paddingBottom: "20px", flexWrap: 'wrap', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: "50%", backgroundColor: "#FDF2F3", display: "flex", alignItems: "center", justifyContent: "center", color: "#C6676D", fontSize: '20px' }}>
                <i className="fa-regular fa-user"></i>
              </div>
              <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0' }}>Información de la cuenta</h3>
            </div>
            <button style={{ backgroundColor: 'transparent', color: '#C6676D', border: '2px solid #EAAFB8', padding: '6px 20px', borderRadius: '20px', fontFamily: 'Poppins-Medium', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'border-color 0.2s' }}
                    onMouseOver={(e) => e.target.style.borderColor = '#C6676D'}
                    onMouseOut={(e) => e.target.style.borderColor = '#EAAFB8'}>
              <i className="fa-solid fa-pen-to-square"></i> Editar
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { label: "Nombre completo", value: "María Rodríguez", icon: "fa-regular fa-user" },
              { label: "Correo electrónico", value: "maria.rodriguez@gmail.com", icon: "fa-regular fa-envelope" },
              { label: "Teléfono", value: "+51 987654987", icon: "fa-solid fa-phone" },
              { label: "Fecha de nacimiento", value: "15 de mayo de 1998", icon: "fa-regular fa-calendar" },
              { label: "Genero", value: "Femenino", icon: "fa-solid fa-venus-mars" },
              { label: "Fecha de registro", value: "20 de enero de 2024", icon: "fa-regular fa-id-card" }
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', borderBottom: i < 5 ? '1px solid #FDF2F3' : 'none', paddingBottom: i < 5 ? '15px' : '0' }}>
                <div style={{ width: '250px', color: '#5A3E41', display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'Poppins-Bold', fontSize: '13px' }}>
                  <i className={row.icon} style={{ color: '#C6676D', width: '20px', textAlign: 'center', fontSize: '16px' }}></i> {row.label}
                </div>
                <div style={{ color: '#5A3E41', fontFamily: 'Poppins-Regular', fontSize: '14px' }}>{row.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CAMBIAR CONTRASEÑA */}
        <div style={{ border: '2px solid #EAAFB8', borderRadius: '15px', padding: '30px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: "50%", backgroundColor: "#FDF2F3", display: "flex", alignItems: "center", justifyContent: "center", color: "#C6676D", fontSize: '20px' }}>
              <i className="fa-solid fa-lock"></i>
            </div>
            <div>
              <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0 0 2px 0' }}>Cambiar contraseña</h3>
              <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: '0' }}>Asegurate de llevar una contraseña segura</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { id: 'actual', label: 'Contraseña actual:', placeholder: 'Ingresa tu contraseña actual' },
              { id: 'nueva', label: 'Nueva contraseña:', placeholder: 'Ingresa tu nueva contraseña' },
              { id: 'confirmar', label: 'Confirmar nueva contraseña:', placeholder: 'Confirmar tu nueva contraseña' }
            ].map((input) => (
              <div key={input.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontFamily: 'Poppins-Bold', fontSize: '13px', color: '#5A3E41' }}>{input.label}</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="password" 
                    placeholder={input.placeholder} 
                    style={{ width: '100%', padding: '12px 45px 12px 15px', border: '2px solid #EAAFB8', borderRadius: '10px', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#5A3E41', outline: 'none', boxSizing: 'border-box' }} 
                  />
                  <i className="fa-regular fa-eye-slash" style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#777', cursor: 'pointer' }}></i>
                </div>
              </div>
            ))}
            
            <button style={{ backgroundColor: '#C6676D', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '8px', fontFamily: 'Poppins-Medium', fontSize: '13px', cursor: 'pointer', alignSelf: 'flex-end', marginTop: '10px' }}>
              Actualizar contraseña
            </button>
          </div>
        </div>

        {/* NOTIFICACIONES */}
        <div style={{ border: '2px solid #EAAFB8', borderRadius: '15px', padding: '30px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: "50%", backgroundColor: "#FDF2F3", display: "flex", alignItems: "center", justifyContent: "center", color: "#C6676D", fontSize: '20px' }}>
              <i className="fa-regular fa-bell"></i>
            </div>
            <div>
              <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0 0 2px 0' }}>Notificaciones</h3>
              <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: '0' }}>Elige que notificaciones deseas recibir.</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { key: 'pedidos', title: 'Nuevos pedidos', sub: 'Elige el modo de visualización' },
              { key: 'cambios', title: 'Cambios en pedidos', sub: 'Selecciona el idioma del sistema' },
              { key: 'ofertas', title: 'Ofertas y promociones', sub: 'Selecciona tu zona horaria' },
              { key: 'recordatorios', title: 'Recordatorios importantes', sub: 'Recibe recordatorios del sistema' },
              { key: 'correo', title: 'Notificaciones por correo', sub: 'Recibe notificaciones tambien por gmail' }
            ].map((item, i) => (
              <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: i < 4 ? '15px' : '0', borderBottom: i < 4 ? '1px solid #FDF2F3' : 'none' }}>
                <div>
                  <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41', margin: '0 0 3px 0' }}>{item.title}</h4>
                  <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: 0 }}>{item.sub}</p>
                </div>
                <ToggleSwitch isOn={toggles[item.key]} onClick={() => handleToggle(item.key)} />
              </div>
            ))}
          </div>
        </div>

        {/* SEGURIDAD DE LA CUENTA */}
        <div style={{ border: '2px solid #EAAFB8', borderRadius: '15px', padding: '30px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: "50%", backgroundColor: "#FDF2F3", display: "flex", alignItems: "center", justifyContent: "center", color: "#C6676D", fontSize: '20px' }}>
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div>
              <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0 0 2px 0' }}>Seguridad de la cuenta</h3>
              <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: '0' }}>Refuerza la seguridad de tu cuenta</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { title: 'Verificación de dos pasos', sub: 'Aumenta la seguridad de tu cuenta', btnText: 'ACTIVAR' },
              { title: 'Dispositivos conectados', sub: 'Administra los dispositivos con acceso a tu cuenta', btnText: 'VER DISPOSITIVOS' },
              { title: 'Sesiones activas', sub: 'Revisa y cierra sesiones activas', btnText: 'VER SESIONES' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: i < 2 ? '15px' : '0', borderBottom: i < 2 ? '1px solid #FDF2F3' : 'none', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41', margin: '0 0 3px 0' }}>{item.title}</h4>
                  <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: 0 }}>{item.sub}</p>
                </div>
                <button style={{ backgroundColor: 'transparent', color: '#C6676D', border: '2px solid #EAAFB8', padding: '8px 25px', borderRadius: '25px', fontFamily: 'Poppins-Medium', fontSize: '12px', cursor: 'pointer', transition: 'border-color 0.3s' }}
                        onMouseOver={(e) => e.target.style.borderColor = '#C6676D'}
                        onMouseOut={(e) => e.target.style.borderColor = '#EAAFB8'}
                >
                  {item.btnText}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default Perfil6;
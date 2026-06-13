import React, { useState } from "react";

const LISTA_DIRECCIONES = [
  {
    id: 1,
    etiqueta: "Casa",
    esPrincipal: true,
    icono: "fa-solid fa-house",
    direccion: "Av. Los Rosales 123",
    distrito: "San Borja, Lima - Lima",
    referencia: "Frente al parque, casa blanca con rejas negras",
    telefono: "+51 987654321"
  },
  {
    id: 2,
    etiqueta: "Trabajo",
    esPrincipal: false,
    icono: "fa-solid fa-building",
    direccion: "Calle Los Flores 456, Oficina 301",
    distrito: "Miraflores, Lima - Lima",
    referencia: "Cerca de la Iglesia, color beige",
    telefono: "+51 988776655"
  },
  {
    id: 3,
    etiqueta: "Casa de mis padres",
    esPrincipal: false,
    icono: "fa-solid fa-house-chimney-user",
    direccion: "Jr. Las Pantuflas 789",
    distrito: "Surco, Lima - Lima",
    referencia: "Casa de 2 pisos color beige",
    telefono: "+51 955112233"
  }
];

const Perfil3 = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <>
      {/* CONTENEDOR PRINCIPAL DIRECCIONES */}
      <div style={{ backgroundColor: 'white', border: '2px solid #EAAFB8', borderRadius: '20px', padding: '40px' }}>
        
        {/* Cabecera Título y Botón Agregar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px', borderBottom: "2px solid #FDF2F3", paddingBottom: "20px", flexWrap: 'wrap', gap: '15px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <i className="fa-solid fa-location-dot" style={{ color: '#C6676D', fontSize: '24px' }}></i>
            <div>
              <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '20px', color: '#5A3E41', margin: '0' }}>MIS DIRECCIONES</h3>
              <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: '0' }}>Gestiona las direcciones donde quieres recibir tus pedidos.</p>
            </div>
          </div>

          <button style={{ 
            backgroundColor: '#C6676D', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '10px', 
            fontFamily: 'Poppins-Bold', 
            fontSize: '13px', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <i className="fa-solid fa-plus"></i> Agregar dirección
          </button>
        </div>

        {/* LISTA DE DIRECCIONES */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {LISTA_DIRECCIONES.map((item) => {
            const isHovered = hoveredCard === item.id;
            
            return (
              <div 
                key={item.id} 
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ 
                  display: "flex", 
                  gap: "20px", 
                  border: `2px solid ${isHovered ? '#C6676D' : '#FDF2F3'}`, 
                  borderRadius: "15px", 
                  padding: "25px", 
                  alignItems: "flex-start", 
                  position: "relative",
                  transition: "all 0.2s ease"
                }}
              >
                
                {/* Icono Redondo */}
                <div style={{ width: '50px', height: '50px', borderRadius: "50%", backgroundColor: "#FADADD", display: "flex", alignItems: "center", justifyContent: "center", color: "#C6676D", fontSize: '20px', flexShrink: 0 }}>
                  <i className={item.icono}></i>
                </div>

                {/* Textos de la Dirección */}
                <div style={{ flex: 1 }}>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                    <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: 0 }}>{item.etiqueta}</h4>
                    {item.esPrincipal && (
                      <span style={{ backgroundColor: "#FADADD", color: "#C6676D", fontSize: '11px', fontFamily: 'Poppins-Bold', padding: "4px 12px", borderRadius: "15px" }}>
                        Dirección principal
                      </span>
                    )}
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#5A3E41' }}>
                    <span><strong>Dirección:</strong> {item.direccion}</span>
                    <span style={{ color: "#C6676D", fontFamily: 'Poppins-Medium' }}>{item.distrito}</span>
                    <span style={{ color: "#777", fontSize: '13px' }}><strong>Referencia:</strong> {item.referencia}</span>
                    <span style={{ color: "#777", fontSize: '13px' }}><strong>Teléfono:</strong> {item.telefono}</span>
                  </div>
                </div>

                {/* Botones de Acción (Editar / Eliminar) */}
                <div style={{ position: "absolute", top: "25px", right: "25px", display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end" }}>
                  <button style={{ background: "none", border: "none", fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                    <i className="fa-regular fa-pen-to-square"></i> Editar
                  </button>
                  
                  {!item.esPrincipal && (
                    <button style={{ background: "none", border: "none", fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                      <i className="fa-regular fa-trash-can"></i> Eliminar
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* BANNER RECOMENDACIÓN INFERIOR */}
        <div style={{ marginTop: '30px', backgroundColor: "#FDF2F3", border: "2px dashed #EAAFB8", borderRadius: '15px', padding: "20px 25px", display: "flex", alignItems: "center", gap: '20px' }}>
          <div style={{ color: "#C6676D", fontSize: '28px' }}>
            <i className="fa-solid fa-truck-fast"></i>
          </div>
          <div>
            <h5 style={{ fontFamily: 'Poppins-Bold', fontSize: '15px', color: '#5A3E41', margin: "0 0 5px 0" }}>Tu pedido llegará más rápido</h5>
            <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: 0 }}>Asegúrate de que tu dirección esté actualizada para una mejor experiencia de entrega.</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default Perfil3;
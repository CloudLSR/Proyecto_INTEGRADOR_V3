import React, { useState } from "react";

const METODOS_PAGO = [
  { id: 1, tipo: "Visa terminada en 1234", titular: "María Rodríguez", expiracion: "Vence 12/26", principal: true, logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" },
  { id: 2, tipo: "Mastercard terminada en 5678", titular: "María Rodríguez", expiracion: "Vence 08/27", principal: false, logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" },
  { id: 3, tipo: "Interbank terminada en 4567", titular: "María Rodríguez", expiracion: "Vence 03/26", principal: false, logoUrl: "https://yt3.googleusercontent.com/ytc/AIdro_mN-kE_zF41cEmsKIfk2-3KigQn95o5v8Yg4h-lVw=s900-c-k-c0x00ffffff-no-rj" },
  { id: 4, tipo: "YAPE", titular: "+51 987654123", expiracion: "María Rodríguez", principal: false, logoUrl: "https://seeklogo.com/images/Y/yape-logo-3E473EE7E5-seeklogo.com.png" }
];

const Perfil4 = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleAgregarMetodo = () => {
    setShowModal(true);
  };

  const handleConocerMas = () => {
    window.open("https://tusitioweb.com/politicas-de-seguridad", "_blank");
  };

  return (
    <>
      {/* MODAL DE AGREGAR MÉTODO */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', width: '400px', border: '2px solid #EAAFB8' }}>
            <h3 style={{ color: '#5A3E41', marginBottom: '20px', fontFamily: 'Poppins-Bold' }}>Agregar nuevo método</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input placeholder="Nombre del titular" style={{ padding: '10px', borderRadius: '8px', border: '1px solid #EAAFB8' }} />
              <input placeholder="Número de tarjeta" style={{ padding: '10px', borderRadius: '8px', border: '1px solid #EAAFB8' }} />
              <div style={{ display: 'flex', gap: '10px' }}>
                <input placeholder="MM/YY" style={{ padding: '10px', borderRadius: '8px', border: '1px solid #EAAFB8', width: '50%' }} />
                <input placeholder="CVV" style={{ padding: '10px', borderRadius: '8px', border: '1px solid #EAAFB8', width: '50%' }} />
              </div>
              <button onClick={() => setShowModal(false)} style={{ backgroundColor: '#C6676D', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', cursor: 'pointer', marginTop: '10px', fontFamily: 'Poppins-Bold' }}>
                GUARDAR MÉTODO
              </button>
              <button onClick={() => setShowModal(false)} style={{ backgroundColor: 'transparent', color: '#5A3E41', border: '1px solid #EAAFB8', padding: '10px', borderRadius: '10px', cursor: 'pointer', fontFamily: 'Poppins-Regular' }}>
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTENEDOR PRINCIPAL */}
      <div style={{ backgroundColor: 'white', border: '2px solid #EAAFB8', borderRadius: '20px', padding: '40px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px', borderBottom: "2px solid #FDF2F3", paddingBottom: "20px", flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <i className="fa-regular fa-credit-card" style={{ color: '#C6676D', fontSize: '24px' }}></i>
            <div>
              <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '20px', color: '#5A3E41', margin: '0' }}>MÉTODOS DE PAGO</h3>
              <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: '0' }}>Administra tus tarjetas y métodos de pago de forma segura</p>
            </div>
          </div>
          
          <button 
            onClick={handleAgregarMetodo}
            style={{ backgroundColor: '#C6676D', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', fontFamily: 'Poppins-Bold', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            + AGREGAR MÉTODO
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {METODOS_PAGO.map((card) => {
            const isHovered = hoveredCard === card.id;
            
            return (
              <div 
                key={card.id} 
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", border: `2px solid ${isHovered ? '#C6676D' : '#FDF2F3'}`, borderRadius: "15px", padding: "20px 25px", transition: "all 0.2s ease", flexWrap: "wrap", gap: "15px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                  <div style={{ width: '80px', display: 'flex', justifyContent: 'center' }}>
                    <img src={card.logoUrl} alt={card.tipo} style={{ width: '100%', maxHeight: '40px', objectFit: 'contain', borderRadius: card.id === 3 || card.id === 4 ? '8px' : '0' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                      <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '15px', color: '#5A3E41', margin: 0 }}>{card.tipo}</h4>
                      {card.principal && <span style={{ backgroundColor: "#FADADD", color: "#C6676D", fontSize: '11px', fontFamily: 'Poppins-Bold', padding: "4px 15px", borderRadius: "20px" }}>Principal</span>}
                    </div>
                    <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#5A3E41', margin: 0 }}>{card.titular}</p>
                    <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', margin: 0 }}>{card.expiracion}</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <span style={{ color: "#6A8BBD", fontFamily: 'Poppins-Medium', fontSize: '14px', display: "flex", alignItems: "center", gap: "6px" }}>
                    <i className="fa-regular fa-circle-check"></i> Activa
                  </span>
                  
                  <button onClick={() => toggleMenu(card.id)} style={{ background: "none", border: "none", color: "#5A3E41", cursor: "pointer", fontSize: '20px', padding: '5px' }}>
                    ⋮
                  </button>

                  {openMenuId === card.id && (
                    <div style={{ position: "absolute", right: "20px", top: "50px", backgroundColor: "white", border: "1px solid #EAAFB8", borderRadius: "8px", padding: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 10, display: "flex", flexDirection: "column", gap: "5px" }}>
                      <button onClick={() => { alert('Generando recibo personalizado...'); setOpenMenuId(null); }} style={{ background: 'none', border: 'none', padding: '5px 10px', cursor: 'pointer', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#5A3E41', textAlign: 'left' }}>Recibo personalizado</button>
                      <button onClick={() => { alert('Generando recibo regular...'); setOpenMenuId(null); }} style={{ background: 'none', border: 'none', padding: '5px 10px', cursor: 'pointer', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#5A3E41', textAlign: 'left' }}>Recibo regular</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '30px', backgroundColor: "#FDF2F3", borderRadius: '15px', padding: "20px 30px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ display: "flex", alignItems: "center", gap: '20px' }}>
            <div style={{ width: '50px', height: '50px', display: "flex", alignItems: "center", justifyContent: "center", color: "#C6676D", fontSize: '35px', flexShrink: 0 }}>
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div>
              <h5 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: "0 0 5px 0" }}>Tus pagos 100% protegidos</h5>
              <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#5A3E41', margin: 0, maxWidth: '450px' }}>
                Usamos tecnología de encriptación avanzada para proteger tu información y garantizar compras seguras
              </p>
            </div>
          </div>

          <span 
            onClick={handleConocerMas}
            style={{ color: '#C6676D', fontFamily: 'Poppins-Medium', fontSize: '14px', cursor: 'pointer' }}
          >
            Conocer más →
          </span>
        </div>
      </div>
    </>
  );
};

export default Perfil4;
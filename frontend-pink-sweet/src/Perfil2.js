import React, { useState } from "react";
import iconShop from './assets/icon-shop.png';

// PRODUCTOS
import imgTcTripleChocolate from './assets/products/tc-triple-chocolate.png';
import imgCArandano from './assets/products/c-arandano.png';
import imgAClasico from './assets/products/a-clasico.png';
import imgTFresa from './assets/products/t-fresa.png';
import imgMeQueso from './assets/products/me-queso.png';

const LISTA_PEDIDOS = [
  {
    id: "#000125",
    fecha: "12 de mayo, 2026",
    hora: "10:30 am",
    estado: "Pendiente",
    total: "S/ 96.50",
    productosContador: "3 productos",
    imagenPrincipal: imgTcTripleChocolate,
    miniaturas: [imgTcTripleChocolate, imgCArandano, imgAClasico]
  },
  {
    id: "#000124",
    fecha: "5 de mayo, 2026",
    hora: "4:15 pm",
    estado: "Entregado",
    total: "S/ 64.00",
    productosContador: "2 productos",
    imagenPrincipal: imgCArandano,
    miniaturas: [imgCArandano, imgAClasico]
  },
  {
    id: "#000123",
    fecha: "28 de abril, 2026",
    hora: "11:20 am",
    estado: "Cancelado",
    total: "S/ 44.00",
    productosContador: "2 productos",
    imagenPrincipal: imgAClasico,
    miniaturas: [imgAClasico, imgCArandano]
  },
  {
    id: "#000122",
    fecha: "15 de abril, 2026",
    hora: "9:45 am",
    estado: "Entregado",
    total: "S/ 128.00",
    productosContador: "4 productos",
    imagenPrincipal: imgTFresa, 
    miniaturas: [imgTFresa, imgCArandano, imgAClasico]
  },
  {
    id: "#000121",
    fecha: "13 de abril, 2026",
    hora: "2:30 pm",
    estado: "Cancelado",
    total: "S/ 38.00",
    productosContador: "1 producto",
    imagenPrincipal: imgMeQueso, 
    miniaturas: [imgMeQueso]
  }
];

const Perfil2 = () => {
  const [filtro, setFiltro] = useState("Todos");

  // Filtramos la lista de pedidos según el botón seleccionado
  const pedidosFiltrados = LISTA_PEDIDOS.filter(p => {
    if (filtro === "Todos") return true;
    return p.estado === filtro;
  });

  const obtenerEstilosEstado = (estado) => {
    switch (estado) {
      case "Pendiente": return { bg: "#DCE8F4", color: "#6A8BBD", icon: "fa-regular fa-circle-check" };
      case "Entregado": return { bg: "#FADADD", color: "#C6676D", icon: "fa-regular fa-circle-check" };
      case "Cancelado": return { bg: "#F2F2F2", color: "#8E8E8E", icon: "fa-regular fa-circle-xmark" };
      default: return { bg: "#FADADD", color: "#C6676D", icon: "fa-regular fa-circle-check" };
    }
  };

  return (
    <>
      {/* CONTENEDOR PRINCIPAL MIS PEDIDOS */}
      <div style={{ backgroundColor: 'white', border: '2px solid #EAAFB8', borderRadius: '20px', padding: '40px' }}>
        
        {/* Cabecera Título */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
          <i className="fa-solid fa-bag-shopping" style={{ color: '#C6676D', fontSize: '24px' }}></i>
          <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '20px', color: '#5A3E41', margin: '0' }}>MIS PEDIDOS</h3>
        </div>

        {/* BARRA DE FILTROS Y ORDENAMIENTO */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", marginBottom: "30px", borderBottom: "2px solid #FDF2F3", paddingBottom: "20px", flexWrap: "wrap" }}>
          
          {/* Botones de Filtro estilo Pills */}
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            {["Todos", "Pendientes", "Entregados", "Cancelados"].map((label) => {
              const valorFiltro = label === "Pendientes" ? "Pendiente" : label === "Entregados" ? "Entregado" : label === "Cancelados" ? "Cancelado" : "Todos";
              const isActive = filtro === valorFiltro;

              return (
                <button 
                  key={label} 
                  onClick={() => setFiltro(valorFiltro)}
                  style={{ 
                    backgroundColor: isActive ? '#C6676D' : 'white', 
                    color: isActive ? 'white' : '#C6676D', 
                    border: '2px solid #EAAFB8', 
                    borderColor: isActive ? '#C6676D' : '#EAAFB8',
                    fontFamily: 'Poppins-Medium', 
                    fontSize: '13px', 
                    padding: '8px 22px', 
                    borderRadius: '25px', 
                    cursor: 'pointer', 
                    transition: 'all 0.2s' 
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
          
          {/* Select de Ordenamiento */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontFamily: 'Poppins-Bold', fontSize: '13px', color: '#5A3E41' }}>Ordenar por:</span>
            <select 
              defaultValue="recientes" 
              style={{ 
                border: '2px solid #5A3E41', 
                backgroundColor: 'white', 
                padding: '6px 15px', 
                fontFamily: 'Poppins-Medium', 
                fontSize: '13px', 
                color: '#5A3E41', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                outline: 'none' 
              }}
            >
              <option value="recientes">Más recientes</option>
              <option value="antiguos">Más antiguos</option>
            </select>
          </div>
        </div>

        {/* LISTA DE PEDIDOS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          {pedidosFiltrados.map((pedido) => {
            const badge = obtenerEstilosEstado(pedido.estado);
            
            return (
              <div key={pedido.id} style={{ display: "flex", gap: "25px", border: "2px solid #EAAFB8", borderRadius: "20px", padding: "20px 25px", alignItems: "center", flexWrap: "wrap" }}>
                
                {/* Imagen Principal */}
                <div style={{ flexShrink: 0 }}>
                  <img src={pedido.imagenPrincipal} alt={pedido.id} style={{ width: "160px", height: "120px", objectFit: "cover", borderRadius: "15px" }} />
                </div>

                {/* Detalles de Texto e Imágenes Pequeñas */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                  <div>
                    <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: "0 0 5px 0" }}>Pedido {pedido.id}</h4>
                    <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#5A3E41', margin: "0 0 5px 0" }}>{pedido.fecha} . {pedido.hora}</p>
                    <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', margin: 0 }}>{pedido.productosContador}</p>
                  </div>
                  
                  {/* Círculos de miniaturas superpuestas */}
                  <div style={{ display: "flex", alignItems: "center", marginTop: "15px" }}>
                    {pedido.miniaturas.map((thumb, idx) => (
                      <img 
                        key={idx} 
                        src={thumb} 
                        alt="miniatura" 
                        style={{ 
                          width: "35px", 
                          height: "35px", 
                          borderRadius: "50%", 
                          objectFit: "cover", 
                          border: "2px solid white",
                          marginLeft: idx > 0 ? "-10px" : "0", // Este margen negativo crea la superposición
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                        }} 
                      />
                    ))}
                  </div>
                </div>

                {/* Columna Derecha de la Tarjeta (Estado, Total, Botón) */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between", minWidth: "150px", height: "120px" }}>
                  
                  {/* Badge de Estado */}
                  <div style={{ backgroundColor: badge.bg, color: badge.color, padding: '8px 18px', borderRadius: '25px', fontFamily: 'Poppins-Bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className={badge.icon}></i> {pedido.estado}
                  </div>
                  
                  {/* Total del Pedido */}
                  <div style={{ textAlign: "right", margin: "10px 0" }}>
                    <span style={{ display: "block", fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777' }}>Total:</span>
                    <strong style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41' }}>{pedido.total}</strong>
                  </div>
                  
                  {/* Botón Ver Detalles */}
                  <button 
                    style={{ 
                      backgroundColor: "#C6676D", 
                      color: "white", 
                      border: "none", 
                      borderRadius: "8px", 
                      fontFamily: "Poppins-Medium", 
                      fontSize: "13px", 
                      padding: "8px 20px", 
                      cursor: "pointer",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px"
                    }}
                  >
                    Ver detalles <span style={{ fontSize: '16px' }}>→</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* BANNER DE CONTACTO INFERIOR */}
      <div style={{ backgroundColor: '#FACFD8', borderRadius: '20px', padding: '25px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box', marginTop: '25px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '80px', height: '80px', flexShrink: 0, backgroundColor: 'white', border: '3px solid #EAAFB8', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
            <img src={iconShop} alt="Icono Tienda" style={{ width: '60%', height: 'auto', objectFit: 'contain' }} />
          </div>
          <div>
            <h3 style={{ color: '#7D2530', margin: '0 0 5px 0', fontSize: '18px', fontFamily: 'Poppins-SemiBold' }}>¿No encuentras lo que buscas?</h3>
            <p style={{ margin: '0', color: '#B14B47', fontSize: '15px', fontFamily: 'Signika-Regular', maxWidth: '350px', lineHeight: '1.2' }}>Contáctanos y con gusto te ayudamos a crear el postre perfecto</p>
          </div>
        </div>
        <button style={{ backgroundColor: '#C3666D', color: 'white', fontSize: '14px', fontFamily: 'Poppins-Bold', border: 'none', padding: '10px 25px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          CONTACTAR <span style={{ fontSize: '16px' }}>›</span>
        </button>
      </div>

    </>
  );
};

export default Perfil2;
import React from "react";
import logoPrincipal from './assets/logo.png'; 

// IMÁGENES DE PRODUCTOS (Reutilizadas de los anteriores)
import imgTcTripleChocolate from './assets/products/tc-triple-chocolate.png';
import imgAClasico from './assets/products/a-clasico.png';
import imgCArandano from './assets/products/c-arandano.png';
import imgTFresa from './assets/products/t-fresa.png';
import imgTvClasicos from './assets/products/tv-clasicos.png';

const AdminMenu7 = () => {

  // Data simulada para las tarjetas KPI
  const kpis = [
    { valor: "8", etiqueta: "Ofertas activas", extra: "↑ 2 más que el mes pasado", extraColor: "#27AE60", icon: "fa-solid fa-ticket", color: "#F194B4", border: "#FADADD" },
    { valor: "46", etiqueta: "Programadas", extra: "Próximos 30 días", extraColor: "#999", icon: "fa-regular fa-calendar", color: "#F2C94C", border: "#FDE49E" },
    { valor: "25", etiqueta: "Finalizadas", extra: "Este mes", extraColor: "#999", icon: "fa-regular fa-circle-check", color: "#27AE60", border: "#A9DFBF" },
    { valor: "15.6%", etiqueta: "Aumento en ventas", extra: "↑ vs. sin ofertas", extraColor: "#27AE60", icon: "fa-solid fa-arrow-trend-up", color: "#9B59B6", border: "#D7BDE2" },
  ];

  // Data simulada para la tabla de ofertas
  const ofertasData = [
    { id: 1, img: imgTcTripleChocolate, titulo: "20% de descuento en tortas", subtitulo: "En todas las tortas seleccionadas", tipo: "Porcentaje", dcto: "20%", dctoTxt: "de descuento", vigencia: "10 may. - 25 may. 2026", estado: "Activa", uso: "145 veces" },
    { id: 2, img: imgAClasico, titulo: "15% de descuento en alfajores", subtitulo: "Descuento de alfajores clásicos", tipo: "Porcentaje", dcto: "15%", dctoTxt: "de descuento", vigencia: "1 may. - 15 may. 2026", estado: "Finalizada", uso: "76 veces" },
    { id: 3, img: imgTcTripleChocolate, titulo: "Envío gratis", subtitulo: "En compras mayores a S/ 80", tipo: "Envío gratis", dcto: "Envío gratis", dctoTxt: "Min S/ 80", vigencia: "5 may. - 20 may. 2026", estado: "Activa", uso: "60 veces" },
    { id: 4, img: imgTFresa, titulo: "10% en productos nuevos", subtitulo: "En productos nuevos de la semana", tipo: "Porcentaje", dcto: "10%", dctoTxt: "de descuento", vigencia: "20 may. - 27 may. 2026", estado: "Programada", uso: "0 veces" },
    { id: 5, img: imgCArandano, titulo: "3x2 en Galletas", subtitulo: "Lleva 3 y paga 2", tipo: "3x2", dcto: "3x2", dctoTxt: "En productos seleccionados", vigencia: "22 may. - 5 may. 2026", estado: "Programada", uso: "0 veces" },
    { id: 6, img: imgTvClasicos, titulo: "20% en tequeños", subtitulo: "Descuento especial", tipo: "Porcentaje", dcto: "20%", dctoTxt: "de descuento", vigencia: "1 abr. - 30 abr. 2026", estado: "Finalizada", uso: "122 veces" },
  ];

  // Funciones para obtener colores de badges
  const getColorTipo = (tipo) => {
    switch (tipo) {
      case "Porcentaje": return "#C6676D";
      case "Envío gratis": return "#6A8BBD";
      case "3x2": return "#9B59B6";
      default: return "#777";
    }
  };

  const getColorEstado = (estado) => {
    switch (estado) {
      case "Activa": return "#27AE60";
      case "Finalizada": return "#999";
      case "Programada": return "#6A8BBD";
      default: return "#777";
    }
  };

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%', width: '100%' }}>

      {/* ========== TÍTULO Y BOTÓN NUEVA OFERTA ========== */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 5px 0', textTransform: 'uppercase' }}>
            OFERTAS
          </h1>
          <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>
            Crea y gestiona las ofertas y promociones de tu tienda.
          </p>
        </div>
        <button style={{ backgroundColor: '#FCF0F2', color: '#C3666D', border: '1.5px solid #FADADD', borderRadius: '8px', padding: '10px 20px', fontFamily: 'Poppins-SemiBold', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>
          <i className="fa-solid fa-tags"></i> Nueva oferta
        </button>
      </div>

      {/* ========== TARJETAS DE MÉTRICAS (KPIs) ========== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '35px' }}>
        {kpis.map((kpi, index) => (
          <div key={index} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', border: `2px solid ${kpi.border}`, display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
            <div style={{ width: '55px', height: '55px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: kpi.color, fontSize: '24px', flexShrink: 0 }}>
              <i className={kpi.icon}></i>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '2px' }}>
                <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '28px', color: '#5A3E41', margin: '0', lineHeight: '1' }}>{kpi.valor}</h2>
              </div>
              <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', margin: '0 0 5px 0' }}>{kpi.etiqueta}</p>
              <p style={{ fontFamily: 'Poppins-Medium', fontSize: '11px', color: kpi.extraColor, margin: 0 }}>
                {kpi.extra}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ========== BARRA DE BÚSQUEDA Y FILTROS ========== */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '0 15px', backgroundColor: 'white' }}>
          <i className="fa-solid fa-magnifying-glass" style={{ color: '#999', fontSize: '16px' }}></i>
          <input 
            type="text" 
            placeholder="Buscar oferta..." 
            style={{ border: 'none', outline: 'none', width: '100%', padding: '12px 10px', fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#5A3E41' }}
          />
        </div>
        
        {/* Select Estado */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <span style={{ fontFamily: 'Poppins-Medium', fontSize: '11px', color: '#5A3E41', marginLeft: '5px' }}>Estado</span>
          <div style={{ border: '1px solid #D9D9D9', borderRadius: '8px', padding: '10px 15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', width: '150px', cursor: 'pointer' }}>
            Todos <i className="fa-solid fa-chevron-down" style={{ fontSize: '10px' }}></i>
          </div>
        </div>

        {/* Select Tipo */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <span style={{ fontFamily: 'Poppins-Medium', fontSize: '11px', color: '#5A3E41', marginLeft: '5px' }}>Tipo</span>
          <div style={{ border: '1px solid #D9D9D9', borderRadius: '8px', padding: '10px 15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', width: '150px', cursor: 'pointer' }}>
            Todos <i className="fa-solid fa-chevron-down" style={{ fontSize: '10px' }}></i>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button style={{ backgroundColor: 'white', color: '#C3666D', border: '1.5px solid #C3666D', borderRadius: '8px', padding: '0 25px', height: '42px', fontFamily: 'Poppins-Medium', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-filter"></i> Filtros
          </button>
        </div>
      </div>

      {/* ========== OFERTA ACTIVA DESTACADA ========== */}
      <div style={{ backgroundColor: 'white', border: '1.5px solid #FADADD', borderRadius: '15px', padding: '30px', marginBottom: '35px', position: 'relative' }}>
        <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#C3666D', margin: '0 0 20px 0' }}>Oferta activa destacada</h3>
        
        {/* Badge Activa top right */}
        <div style={{ position: 'absolute', top: '30px', right: '30px', border: '1.5px solid #C3666D', color: '#C3666D', backgroundColor: '#FCF0F2', padding: '4px 15px', borderRadius: '20px', fontFamily: 'Poppins-Medium', fontSize: '12px' }}>
          Activa
        </div>

        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <img src={imgTcTripleChocolate} alt="Destacada" style={{ width: '220px', height: '140px', objectFit: 'cover', borderRadius: '12px' }} />
          
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 8px 0' }}>20% de descuento en tortas</h2>
            <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: '0 0 25px 0' }}>En todas las tortas seleccionadas</p>
            
            <div style={{ display: 'flex', gap: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-regular fa-calendar-xmark" style={{ color: '#F194B4', fontSize: '20px' }}></i>
                <div>
                  <p style={{ fontFamily: 'Poppins-SemiBold', fontSize: '12px', color: '#777', margin: '0 0 2px 0' }}>Vigente hasta</p>
                  <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', margin: 0 }}>25 may. 2026</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-solid fa-percent" style={{ color: '#F194B4', fontSize: '20px' }}></i>
                <div>
                  <p style={{ fontFamily: 'Poppins-SemiBold', fontSize: '12px', color: '#777', margin: '0 0 2px 0' }}>Tipo</p>
                  <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', margin: 0 }}>Porcentaje</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-solid fa-cart-shopping" style={{ color: '#F194B4', fontSize: '20px' }}></i>
                <div>
                  <p style={{ fontFamily: 'Poppins-SemiBold', fontSize: '12px', color: '#777', margin: '0 0 2px 0' }}>Aplicado en</p>
                  <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', margin: 0 }}>12 productos</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-regular fa-user" style={{ color: '#F194B4', fontSize: '20px' }}></i>
                <div>
                  <p style={{ fontFamily: 'Poppins-SemiBold', fontSize: '12px', color: '#777', margin: '0 0 2px 0' }}>Usada</p>
                  <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', margin: 0 }}>145 veces</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== TABLA DE OFERTAS ========== */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #EAEAEA', overflow: 'hidden', padding: '15px 30px', marginBottom: '30px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #FDF2F3' }}>
              <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '15px 10px', fontWeight: 'normal' }}>Oferta</th>
              <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '15px 10px', fontWeight: 'normal' }}>Tipo</th>
              <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '15px 10px', fontWeight: 'normal' }}>Descuento</th>
              <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '15px 10px', fontWeight: 'normal' }}>Vigencia</th>
              <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '15px 10px', fontWeight: 'normal' }}>Estado</th>
              <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '15px 10px', fontWeight: 'normal' }}>Uso</th>
              <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', padding: '15px 10px', fontWeight: 'normal', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ofertasData.map((oferta) => (
              <tr key={oferta.id} style={{ borderBottom: '1px solid #F5F5F5' }}>
                <td style={{ padding: '15px 10px', verticalAlign: 'middle', width: '300px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img src={oferta.img} alt="Oferta" style={{ width: '60px', height: '45px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontFamily: 'Poppins-Bold', fontSize: '13px', color: '#5A3E41', margin: '0 0 2px 0' }}>{oferta.titulo}</div>
                      <div style={{ fontFamily: 'Poppins-Regular', fontSize: '11px', color: '#777', maxWidth: '200px' }}>{oferta.subtitulo}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '15px 10px', verticalAlign: 'middle' }}>
                  <span style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: getColorTipo(oferta.tipo) }}>{oferta.tipo}</span>
                </td>
                <td style={{ padding: '15px 10px', verticalAlign: 'middle' }}>
                  <div style={{ fontFamily: 'Poppins-Bold', fontSize: '13px', color: '#5A3E41' }}>{oferta.dcto}</div>
                  <div style={{ fontFamily: 'Poppins-Regular', fontSize: '11px', color: '#777' }}>{oferta.dctoTxt}</div>
                </td>
                <td style={{ padding: '15px 10px', verticalAlign: 'middle' }}>
                  <span style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#777' }}>{oferta.vigencia}</span>
                </td>
                <td style={{ padding: '15px 10px', verticalAlign: 'middle' }}>
                  <span style={{ fontFamily: 'Poppins-Bold', fontSize: '12px', color: getColorEstado(oferta.estado) }}>{oferta.estado}</span>
                </td>
                <td style={{ padding: '15px 10px', verticalAlign: 'middle' }}>
                  <span style={{ fontFamily: 'Poppins-Bold', fontSize: '13px', color: '#5A3E41' }}>{oferta.uso}</span>
                </td>
                <td style={{ padding: '15px 10px', verticalAlign: 'middle', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <button style={{ border: '1.5px solid #F194B4', backgroundColor: 'transparent', color: '#F194B4', width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <i className="fa-regular fa-eye"></i>
                    </button>
                    <button style={{ border: '1.5px solid #F194B4', backgroundColor: 'transparent', color: '#F194B4', width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ========== PAGINACIÓN ========== */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: 0 }}>
          Mostrando de 1-8 de 42 ofertas
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={{ border: '1px solid #D9D9D9', background: 'white', color: '#C3666D', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium' }}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button style={{ border: 'none', background: '#C3666D', color: 'white', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Bold', fontSize: '14px' }}>1</button>
          <button style={{ border: '1px solid #D9D9D9', background: 'white', color: '#5A3E41', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium', fontSize: '14px' }}>2</button>
          <button style={{ border: '1px solid #D9D9D9', background: 'white', color: '#5A3E41', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium', fontSize: '14px' }}>3</button>
          <span style={{ fontFamily: 'Poppins-Bold', color: '#5A3E41', margin: '0 5px' }}>...</span>
          <button style={{ border: '1px solid #D9D9D9', background: 'white', color: '#5A3E41', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium', fontSize: '14px' }}>8</button>
          <button style={{ border: '1px solid #D9D9D9', background: 'white', color: '#C3666D', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium' }}>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      {/* ========== FOOTER ========== */}
      <p style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#999', margin: '0 0 20px 0' }}>
        <span style={{ color: '#C3666D' }}>♥</span> Gracias por endulzar cada día con tu trabajo
      </p>

    </div>
  );
};

export default AdminMenu7;
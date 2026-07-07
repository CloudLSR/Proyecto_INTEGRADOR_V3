import React from "react";
import logoPrincipal from './assets/logo.png'; 

// IMÁGENES DE PRODUCTOS (Reutilizadas como placeholders)
import imgTcTripleChocolate from './assets/products/tc-triple-chocolate.png';
import imgAClasico from './assets/products/a-clasico.png';
import imgCArandano from './assets/products/c-arandano.png';
import imgTFresa from './assets/products/t-fresa.png';
import imgTvClasicos from './assets/products/tv-clasicos.png';

const AdminMenu10 = () => {

  // Data simulada para las tarjetas KPI
  const kpis = [
    { titulo: "Calificación promedio", valor: "4.6", detalle: "Basado en 128 comentarios", icon: "fa-regular fa-star", color: "#F194B4", border: "#FADADD" },
    { titulo: "Positivos", valor: "86", porcentaje: "(67.2%)", detalle: "Comentarios positivos", icon: "fa-regular fa-face-smile", color: "#27AE60", border: "#A9DFBF" },
    { titulo: "Neutrales", valor: "24", porcentaje: "(18.8%)", detalle: "Comentarios neutrales", icon: "fa-regular fa-face-meh", color: "#F2C94C", border: "#FDE49E" },
    { titulo: "Negativos", valor: "18", porcentaje: "(14.0%)", detalle: "Comentarios negativos", icon: "fa-regular fa-face-frown", color: "#9B59B6", border: "#D7BDE2" },
  ];

  // Temas más mencionados
  const temas = [
    { nombre: "Sabor/Calidad", menciones: "62 menciones", icon: "fa-solid fa-cake-candles", color: "#F194B4", border: "#FADADD" },
    { nombre: "Entrega", menciones: "28 menciones", icon: "fa-solid fa-motorcycle", color: "#9B59B6", border: "#D7BDE2" },
    { nombre: "Empaque", menciones: "19 menciones", icon: "fa-solid fa-box", color: "#F2C94C", border: "#FDE49E" },
    { nombre: "Presentación", menciones: "11 menciones", icon: "fa-solid fa-gift", color: "#27AE60", border: "#A9DFBF" },
    { nombre: "Atención", menciones: "8 menciones", icon: "fa-solid fa-headset", color: "#5DADE2", border: "#AED6F1" },
  ];

  // Comentarios Recientes
  const comentariosData = [
    { id: "000125", prods: "4 productos", cliente: "María Gómez", tel: "+51 987 654 321", calificacion: 5, comentario: "Todo estuvo delicioso, la torta estaba increíble. ¡Volveré a pedir!", fecha: "19 may. 2026", hora: "11:30 a.m." },
    { id: "000124", prods: "3 productos", cliente: "Carlos Ramírez", tel: "+51 912 345 678", calificacion: 4, comentario: "Muy rico todo, solo que la entrega tardó más de lo esperado.", fecha: "18 may. 2026", hora: "9:30 a.m." },
    { id: "000123", prods: "3 productos", cliente: "Valeia Pérez", tel: "+51 987 654 321", calificacion: 5, comentario: "Los Cupcakes estaban esponjosos y frescos. ¡riquísimos!", fecha: "17 may. 2026", hora: "8:15 p.m." },
    { id: "000122", prods: "5 productos", cliente: "Luis Gómez", tel: "+51 923 456 789", calificacion: 4, comentario: "Buena calidad en los productos, a mi familia le encantó la torta.", fecha: "17 may. 2026", hora: "6:00 p.m." },
    { id: "000121", prods: "3 productos", cliente: "Andrea Aguilar", tel: "+51 911 223 445", calificacion: 3, comentario: "Estaba rico, pero el empaque llegó un poco dañado.", fecha: "16 may. 2026", hora: "4:20 p.m." },
    { id: "000120", prods: "4 productos", cliente: "Jorge Palomino", tel: "+51 987 654 321", calificacion: 5, comentario: "Excelente servicio y sabor, todo llegó perfecto.", fecha: "16 may. 2026", hora: "2:10 p.m." },
    { id: "000119", prods: "3 productos", cliente: "Melissa Saavedra", tel: "+51 987 654 321", calificacion: 4, comentario: "Muy buenos los postres, la presentación 10/10.", fecha: "15 may. 2026", hora: "11:00 a.m." },
    { id: "000118", prods: "2 productos", cliente: "Diego Salazar", tel: "Sin teléfono", calificacion: 5, comentario: "No me gustó tanto el sabor de la torta, esperaba más.", fecha: "15 may. 2026", hora: "10:15 a.m." },
  ];

  // Productos más mencionados positivamente
  const productosMencionados = [
    { id: 1, nombre: "Torta de chocolate", img: imgTcTripleChocolate, menciones: "48 menciones", rating: "4.7" },
    { id: 2, nombre: "Alfajores clásicos", img: imgAClasico, menciones: "36 menciones", rating: "4.6" },
    { id: 3, nombre: "Alfajores chocolate blanco", img: imgCArandano, menciones: "22 menciones", rating: "4.5" },
    { id: 4, nombre: "Trufas de maracuya", img: imgTFresa, menciones: "18 menciones", rating: "4.4" },
    { id: 5, nombre: "Galletas personalizadas", img: imgTvClasicos, menciones: "16 menciones", rating: "4.6" },
  ];

  // Resumen de calificaciones
  const resumenCalificaciones = [
    { estrellas: 5, width: "70%", count: "72 (56.3%)" },
    { estrellas: 4, width: "35%", count: "32 (25.0%)" },
    { estrellas: 3, width: "12%", count: "10 (7.8%)" },
    { estrellas: 2, width: "8%", count: "8 (6.2%)" },
    { estrellas: 1, width: "5%", count: "6 (4.7%)" },
  ];

  // Función para renderizar estrellas
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i key={i} className="fa-solid fa-star" style={{ color: i <= rating ? '#F2C94C' : '#EAEAEA', fontSize: '14px', marginRight: '2px' }}></i>
      );
    }
    return stars;
  };

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%', width: '100%' }}>

      {/* TÍTULO */}
      <div style={{ marginBottom: '25px' }}>
        <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 5px 0' }}>Comentarios</h1>
        <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>Gestiona las opiniones de tus clientes sobre sus pedidos.</p>
      </div>

      {/* CONTROLES */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ border: '1px solid #D9D9D9', borderRadius: '8px', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'white', fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', cursor: 'pointer', width: '280px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fa-regular fa-calendar"></i> 12 de may. 2026 - 19 de may. 2026
            </div>
            <i className="fa-solid fa-chevron-down" style={{ fontSize: '10px' }}></i>
          </div>
          <button style={{ backgroundColor: 'white', color: '#C3666D', border: '1.5px solid #C3666D', borderRadius: '8px', padding: '0 25px', height: '42px', fontFamily: 'Poppins-Medium', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-filter"></i> Filtros
          </button>
        </div>
        <button style={{ backgroundColor: '#FCF0F2', color: '#C3666D', border: '1.5px solid #FADADD', borderRadius: '8px', padding: '10px 20px', fontFamily: 'Poppins-SemiBold', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fa-solid fa-download"></i> Exportar reporte
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
        {kpis.map((kpi, index) => (
          <div key={index} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', border: `2px solid ${kpi.border}`, display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
            <div style={{ color: kpi.color, fontSize: '50px', flexShrink: 0 }}>
              <i className={kpi.icon}></i>
            </div>
            <div>
              <p style={{ fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#777', margin: '0 0 2px 0' }}>{kpi.titulo}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '28px', color: '#5A3E41', margin: '0 0 2px 0', lineHeight: '1' }}>{kpi.valor}</h2>
                {kpi.porcentaje && <span style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777' }}>{kpi.porcentaje}</span>}
              </div>
              <p style={{ fontFamily: 'Poppins-Regular', fontSize: '11px', color: '#999', margin: 0 }}>{kpi.detalle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* TEMAS MÁS MENCIONADOS */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0 0 15px 0' }}>Temas más mencionados</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {temas.map((tema, index) => (
            <div key={index} style={{ backgroundColor: 'white', border: `1.5px solid ${tema.border}`, borderRadius: '10px', padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '15px', minWidth: '180px' }}>
              <div style={{ color: tema.color, fontSize: '24px' }}>
                <i className={tema.icon}></i>
              </div>
              <div>
                <p style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41', margin: '0 0 2px 0' }}>{tema.nombre}</p>
                <p style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#777', margin: 0 }}>{tema.menciones}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMENTARIOS RECIENTES */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0 0 15px 0' }}>Comentarios recientes</h3>
        
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #EAEAEA', overflow: 'hidden' }}>
          {/* TABS Y BUSCADOR */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EAEAEA', padding: '0 30px' }}>
            <div style={{ display: 'flex', gap: '30px' }}>
              <div style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#C3666D', padding: '20px 0', borderBottom: '3px solid #C3666D', cursor: 'pointer' }}>Todos (128)</div>
              <div style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#999', padding: '20px 0', cursor: 'pointer' }}>Positivos (86)</div>
              <div style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#999', padding: '20px 0', cursor: 'pointer' }}>Neutrales (24)</div>
              <div style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#999', padding: '20px 0', cursor: 'pointer' }}>Negativos (18)</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #D9D9D9', borderRadius: '20px', padding: '8px 15px', width: '250px' }}>
              <input type="text" placeholder="Buscar por pedido o cliente..." style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'Poppins-Regular', fontSize: '12px' }} />
              <i className="fa-solid fa-magnifying-glass" style={{ color: '#999', fontSize: '14px' }}></i>
            </div>
          </div>

          {/* TABLA */}
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #EAEAEA' }}>
                <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#C6676D', padding: '15px 30px', fontWeight: 'normal' }}>Pedido</th>
                <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#C6676D', padding: '15px 30px', fontWeight: 'normal' }}>Cliente</th>
                <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#C6676D', padding: '15px 30px', fontWeight: 'normal' }}>Calificación</th>
                <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#C6676D', padding: '15px 30px', fontWeight: 'normal' }}>Comentario</th>
                <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#C6676D', padding: '15px 30px', fontWeight: 'normal' }}>Fecha</th>
                <th style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#C6676D', padding: '15px 30px', fontWeight: 'normal', textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {comentariosData.map((com, index) => (
                <tr key={index} style={{ borderBottom: index !== comentariosData.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                  <td style={{ padding: '15px 30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '35px', height: '35px', backgroundColor: '#FDF2F3', color: '#C6676D', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px' }}>
                        <i className="fa-solid fa-bag-shopping"></i>
                      </div>
                      <div>
                        <p style={{ fontFamily: 'Poppins-Bold', fontSize: '13px', color: '#5A3E41', margin: '0 0 2px 0' }}>#{com.id}</p>
                        <p style={{ fontFamily: 'Poppins-Regular', fontSize: '11px', color: '#777', margin: 0 }}>{com.prods}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '15px 30px' }}>
                    <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', margin: '0 0 2px 0' }}>{com.cliente}</p>
                    <p style={{ fontFamily: 'Poppins-Regular', fontSize: '11px', color: '#777', margin: 0 }}>{com.tel}</p>
                  </td>
                  <td style={{ padding: '15px 30px' }}>
                    <div style={{ display: 'flex' }}>{renderStars(com.calificacion)}</div>
                  </td>
                  <td style={{ padding: '15px 30px', fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#5A3E41', maxWidth: '280px', lineHeight: '1.4' }}>
                    {com.comentario}
                  </td>
                  <td style={{ padding: '15px 30px' }}>
                    <p style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#5A3E41', margin: '0 0 2px 0' }}>{com.fecha}</p>
                    <p style={{ fontFamily: 'Poppins-Regular', fontSize: '11px', color: '#777', margin: 0 }}>{com.hora}</p>
                  </td>
                  <td style={{ padding: '15px 30px', textAlign: 'center' }}>
                    <button style={{ border: 'none', background: 'transparent', color: '#C6676D', fontSize: '18px', cursor: 'pointer' }}>
                      <i className="fa-regular fa-eye"></i>
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
          Mostrando de 1 a 8 de 128 comentarios
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={{ border: '1px solid #D9D9D9', background: 'white', color: '#C3666D', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium' }}><i className="fa-solid fa-arrow-left"></i></button>
          <button style={{ border: 'none', background: '#C3666D', color: 'white', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Bold', fontSize: '14px' }}>1</button>
          <button style={{ border: '1px solid #D9D9D9', background: 'white', color: '#5A3E41', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium', fontSize: '14px' }}>2</button>
          <button style={{ border: '1px solid #D9D9D9', background: 'white', color: '#5A3E41', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium', fontSize: '14px' }}>3</button>
          <span style={{ fontFamily: 'Poppins-Bold', color: '#5A3E41', margin: '0 5px' }}>...</span>
          <button style={{ border: '1px solid #D9D9D9', background: 'white', color: '#5A3E41', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium', fontSize: '14px' }}>16</button>
          <button style={{ border: '1px solid #D9D9D9', background: 'white', color: '#C3666D', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins-Medium' }}><i className="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>

      {/* PANELES INFERIORES */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '40px' }}>
        
        {/* Productos más mencionados positivamente */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #EAEAEA', padding: '30px' }}>
          <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0 0 25px 0' }}>Productos más mencionados positivamente</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {productosMencionados.map((prod, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', width: '15px' }}>{prod.id}</span>
                  <img src={prod.img} alt={prod.nombre} style={{ width: '45px', height: '45px', borderRadius: '8px', objectFit: 'cover' }} />
                  <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41' }}>{prod.nombre}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777' }}>{prod.menciones}</span>
                  <span style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    {prod.rating} <i className="fa-solid fa-star" style={{ color: '#F2C94C', fontSize: '12px' }}></i>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen de calificaciones */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #EAEAEA', padding: '30px' }}>
          <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0 0 25px 0' }}>Resumen de calificaciones</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {resumenCalificaciones.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', width: '60px' }}>{item.estrellas} estrellas</span>
                <div style={{ flex: 1, height: '14px', backgroundColor: '#F5F5F5', borderRadius: '7px', overflow: 'hidden' }}>
                  <div style={{ width: item.width, height: '100%', backgroundColor: '#D68994', borderRadius: '7px' }}></div>
                </div>
                <span style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', width: '70px', textAlign: 'right' }}>{item.count}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #EAEAEA' }}>
              <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777' }}>Total de comentarios</span>
              <span style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41' }}>128</span>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <p style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#999', margin: '0 0 20px 0' }}>
        <span style={{ color: '#C3666D' }}>♥</span> Gracias por endulzar cada día con tu trabajo
      </p>

    </div>
  );
};

export default AdminMenu10;
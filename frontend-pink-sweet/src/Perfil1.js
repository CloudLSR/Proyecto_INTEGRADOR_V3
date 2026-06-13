import React, { useState } from "react";
import iconShop from './assets/icon-shop.png';

// PRODUCTOS
import imgTcTripleChocolate from './assets/products/tc-triple-chocolate.png';
import imgCArandano from './assets/products/c-arandano.png';
import imgAClasico from './assets/products/a-clasico.png';
import imgTFresa from './assets/products/t-fresa.png';

// DATA DE USUARIO
const usuarioInfo = {
  nombre: "María Rodríguez",
  correo: "maria.rodriguez@gmail.com",
  telefono: "+51 987654987",
  fechaNacimiento: "15 de mayo de 1998",
  genero: "Femenino",
  fechaRegistro: "20 de enero de 2024"
};

const actividadUsuario = {
  totalPedidos: "12 pedidos",
  ultimoPedido: "#000125 - 12 de mayo de 2026",
  totalGastado: "+51 987654987"
};

// DATA DE PEDIDOS RECIENTES
const PEDIDOS_RECIENTES = [
  {
    id: "#000125",
    nombre: "Torta Triple Chocolate",
    fecha: "12 de mayo, 2026",
    estado: "Entregado",
    imagen: imgTcTripleChocolate
  },
  {
    id: "#000124",
    nombre: "Cupcakes de Arándano",
    fecha: "05 de mayo, 2026",
    estado: "Entregado",
    imagen: imgCArandano
  },
  {
    id: "#000123",
    nombre: "Alfajor Clásico",
    fecha: "28 de abril, 2026",
    estado: "Entregado",
    imagen: imgAClasico
  }
];

// DATA DE PRODUCTOS FAVORITOS
const PRODUCTOS_FAVORITOS = [
  {
    id: 1,
    nombre: "Torta Triple Chocolate",
    descripcion: "Delicioso bizcocho de chocolate con relleno y cobertura de ganache, decorado con crema de chocolate.",
    precio: "80.00",
    imagen: imgTcTripleChocolate
  },
  {
    id: 2,
    nombre: "Trufas de Fresa",
    descripcion: "Chocolate negro relleno de una suave crema de fresa natural. Dulces, frutales y absolutamente irresistibles.",
    precio: "45.00",
    imagen: imgTFresa
  },
  {
    id: 3,
    nombre: "Alfajor Clásico",
    descripcion: "Delicadas tapitas artesanales con un suave relleno de dulce de leche y un toque de azúcar en polvo.",
    precio: "28.00",
    imagen: imgAClasico
  },
  {
    id: 4,
    nombre: "Cupcakes de Arándano",
    descripcion: "Delicioso y suave pastelito de miga fina con un toque de dulzor a chocolate, es ideal para decorar con crema batida.",
    precio: "42.00",
    imagen: imgCArandano
  }
];

const Perfil1 = ({ setActiveTab }) => {
  const [wishlist, setWishlist] = useState([1, 2, 3, 4]);
  const toggleWish = i => setWishlist(w => w.includes(i) ? w.filter(x => x !== i) : [...w, i]);

  return (
    <>
      {/* INFORMACIÓN PERSONAL Y ACTIVIDAD */}
      <div style={{ backgroundColor: 'white', border: '2px solid #EAAFB8', borderRadius: '20px', padding: '40px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
          <i className="fa-regular fa-user" style={{ color: '#C6676D', fontSize: '24px' }}></i>
          <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '20px', color: '#5A3E41', margin: '0' }}>INFORMACIÓN PERSONAL</h3>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginBottom: '50px' }}>
          {[
            { label: "Nombre completo", value: usuarioInfo.nombre, icon: "fa-regular fa-user" },
            { label: "Correo electrónico", value: usuarioInfo.correo, icon: "fa-regular fa-envelope" },
            { label: "Teléfono", value: usuarioInfo.telefono, icon: "fa-solid fa-phone" },
            { label: "Fecha de nacimiento", value: usuarioInfo.fechaNacimiento, icon: "fa-regular fa-calendar" },
            { label: "Genero", value: usuarioInfo.genero, icon: "fa-solid fa-venus-mars" },
            { label: "Fecha de registro", value: usuarioInfo.fechaRegistro, icon: "fa-regular fa-id-card" }
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', fontFamily: 'Poppins-Medium', fontSize: '14px' }}>
              <div style={{ width: '250px', color: '#5A3E41', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <i className={row.icon} style={{ color: '#C6676D', width: '20px', textAlign: 'center', fontSize: '16px' }}></i> {row.label}
              </div>
              <div style={{ color: '#5A3E41', fontFamily: 'Poppins-Regular' }}>{row.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
          <i className="fa-regular fa-calendar" style={{ color: '#C6676D', fontSize: '24px' }}></i>
          <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '20px', color: '#5A3E41', margin: '0' }}>MI ACTIVIDAD</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {[
            { label: "Total de pedidos realizados", value: actividadUsuario.totalPedidos, icon: "fa-solid fa-bag-shopping" },
            { label: "Último pedido", value: actividadUsuario.ultimoPedido, icon: "fa-regular fa-clock" },
            { label: "Total gastado", value: actividadUsuario.totalGastado, icon: "fa-solid fa-money-bill" }
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', fontFamily: 'Poppins-Medium', fontSize: '14px' }}>
              <div style={{ width: '250px', color: '#5A3E41', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '24px', height: '24px', border: '2px solid #C6676D', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <i className={row.icon} style={{ color: '#C6676D', fontSize: '12px' }}></i>
                </div>
                {row.label}
              </div>
              <div style={{ color: '#5A3E41', fontFamily: 'Poppins-Regular' }}>{row.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PEDIDOS RECIENTES */}
      <div style={{ backgroundColor: 'white', border: '2px solid #EAAFB8', borderRadius: '20px', padding: '30px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <i className="fa-solid fa-bag-shopping" style={{ color: '#C6676D', fontSize: '24px' }}></i>
            <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '20px', color: '#5A3E41', margin: '0' }}>MIS PEDIDOS RECIENTES</h3>
          </div>
          {/* Aquí usamos setActiveTab para cambiar a la pestaña de pedidos */}
          <span onClick={() => setActiveTab("pedidos")} style={{ color: '#C6676D', fontFamily: 'Poppins-Medium', fontSize: '14px', cursor: 'pointer' }}>
            Ver todos →
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {PEDIDOS_RECIENTES.map((pedido, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #EAAFB8', borderRadius: '15px', padding: '15px 25px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <img src={pedido.imagen} alt={pedido.nombre} style={{ width: '120px', height: '90px', objectFit: 'cover', borderRadius: '20px' }} />
                <div>
                  <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: '0 0 5px 0' }}>Pedido {pedido.id}</h4>
                  <p style={{ fontFamily: 'Poppins-Regular', fontSize: '15px', color: '#5A3E41', margin: '0 0 2px 0' }}>{pedido.nombre}</p>
                  <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: '0' }}>{pedido.fecha}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ backgroundColor: '#FADADD', color: '#C6676D', padding: '6px 16px', borderRadius: '20px', fontFamily: 'Poppins-Medium', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <i className="fa-regular fa-circle-check"></i> {pedido.estado}
                  </div>
                  <i className="fa-solid fa-chevron-right" style={{ color: '#5A3E41', fontSize: '16px', cursor: 'pointer' }}></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCTOS FAVORITOS */}
      <div style={{ backgroundColor: 'white', border: '2px solid #EAAFB8', borderRadius: '20px', padding: '30px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <i className="fa-regular fa-heart" style={{ color: '#C6676D', fontSize: '24px' }}></i>
            <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '20px', color: '#5A3E41', margin: '0' }}>MIS PRODUCTOS FAVORITOS</h3>
          </div>
          {/* Aquí usamos setActiveTab para cambiar a la pestaña de favoritos */}
          <span onClick={() => setActiveTab("favoritos")} style={{ color: '#C6676D', fontFamily: 'Poppins-Medium', fontSize: '14px', cursor: 'pointer' }}>
            Ver todos →
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
          {PRODUCTOS_FAVORITOS.map((p) => (
            <div key={p.id} style={{ border: '2px solid #EAAFB8', borderRadius: '20px', overflow: 'hidden', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '120px' }}>
                <img src={p.imagen} alt={p.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div onClick={() => toggleWish(p.id)} style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(255,255,255,0.9)', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                  <i className={wishlist.includes(p.id) ? "fa-solid fa-heart" : "fa-regular fa-heart"} style={{ color: '#C6676D', fontSize: '14px', marginTop: '1px' }}></i>
                </div>
              </div>
              <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
                <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '12px', color: '#5A3E41', margin: '0 0 5px 0' }}>{p.nombre}</h3>
                <p style={{ fontFamily: 'Poppins-Medium', fontSize: '10px', color: '#644444', margin: '0 0 10px 0', lineHeight: '1.4', flexGrow: 1 }}>{p.descripcion}</p>
                <div style={{ fontFamily: 'Poltawski-Nowy', fontSize: '16px', color: '#644444', marginBottom: '10px' }}>
                  S/. {p.precio}
                </div>
                <button style={{ backgroundColor: '#C6676D', color: '#FFFFFF', border: 'none', padding: '8px', borderRadius: '8px', fontFamily: 'Poppins-Medium', fontSize: '11px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', width: '100%' }}>
                  <i className="fa-solid fa-cart-shopping"></i> AÑADIR AL CARRITO
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BANNER DE CONTACTO */}
      <div style={{ backgroundColor: '#FACFD8', borderRadius: '20px', padding: '25px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box' }}>
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

export default Perfil1;
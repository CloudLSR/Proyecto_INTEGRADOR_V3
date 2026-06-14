import React, { useState } from "react";
import iconShop from './assets/icon-shop.png';

import imgTcTripleChocolate from './assets/products/tc-triple-chocolate.png';
import imgCArandano from './assets/products/c-arandano.png';
import imgAClasico from './assets/products/a-clasico.png';
import imgTFresa from './assets/products/t-fresa.png';

const PEDIDOS_RECIENTES = [
  { id: "#000125", nombre: "Torta Triple Chocolate", fecha: "12 de mayo, 2026",  estado: "Entregado", imagen: imgTcTripleChocolate },
  { id: "#000124", nombre: "Cupcakes de Arándano",   fecha: "05 de mayo, 2026",  estado: "Entregado", imagen: imgCArandano },
  { id: "#000123", nombre: "Alfajor Clásico",        fecha: "28 de abril, 2026", estado: "Entregado", imagen: imgAClasico }
];

const PRODUCTOS_FAVORITOS = [
  { id: 1, nombre: "Torta Triple Chocolate", descripcion: "Delicioso bizcocho de chocolate con relleno y cobertura de ganache.", precio: "80.00", imagen: imgTcTripleChocolate },
  { id: 2, nombre: "Trufas de Fresa",        descripcion: "Chocolate negro relleno de una suave crema de fresa natural.",       precio: "45.00", imagen: imgTFresa },
  { id: 3, nombre: "Alfajor Clásico",        descripcion: "Delicadas tapitas con dulce de leche y azúcar en polvo.",            precio: "28.00", imagen: imgAClasico },
  { id: 4, nombre: "Cupcakes de Arándano",   descripcion: "Suave pastelito de miga fina ideal para decorar con crema batida.", precio: "42.00", imagen: imgCArandano }
];

const Perfil1 = ({ setActiveTab, usuario, setUsuario }) => {
  const [wishlist, setWishlist] = useState([1, 2, 3, 4]);
  const [editando,  setEditando]  = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [form, setForm] = useState({
    nombre:   usuario?.nombre   || '',
    apellido: usuario?.apellido || '',
    telefono: usuario?.telefono || '',
    fechaNacimiento: usuario?.fechaNacimiento || '',
    genero:          usuario?.genero          || ''
  });

  const toggleWish = i => setWishlist(w => w.includes(i) ? w.filter(x => x !== i) : [...w, i]);

  const formatearFechaRegistro = (f) => {
    if (!f) return '—';
    try {
      const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
      const d = new Date(f);
      return `${d.getDate()} de ${meses[d.getMonth()]}, ${d.getFullYear()}`;
    } catch { return '—'; }
  };

  const formatearFechaNac = (f) => {
    if (!f) return '—';
    try {
      const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
      const [a,m,d] = f.split('-');
      return `${parseInt(d)} de ${meses[parseInt(m)-1]}, ${a}`;
    } catch { return '—'; }
  };

  const guardarCambios = async () => {
    if (form.nombre && form.nombre[0] !== form.nombre[0].toUpperCase()) {
      alert('El nombre debe comenzar con mayúscula'); return;
    }
    if (form.apellido && form.apellido[0] !== form.apellido[0].toUpperCase()) {
      alert('El apellido debe comenzar con mayúscula'); return;
    }
    setGuardando(true);
    const token = localStorage.getItem('token');
    try {
      const res  = await fetch('http://localhost:8081/api/usuarios/perfil', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (setUsuario) setUsuario(prev => ({ ...prev, ...data }));
      setEditando(false);
    } catch {
      alert('Error al guardar. Intenta de nuevo.');
    }
    setGuardando(false);
  };

  return (
    <>
      {/* INFORMACIÓN PERSONAL */}
      <div style={{ backgroundColor: 'white', border: '2px solid #EAAFB8', borderRadius: '20px', padding: '40px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <i className="fa-regular fa-user" style={{ color: '#C6676D', fontSize: '24px' }}></i>
            <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '20px', color: '#5A3E41', margin: '0' }}>INFORMACIÓN PERSONAL</h3>
          </div>
          {!editando && (
            <button onClick={() => {
                setForm({ nombre: usuario?.nombre || '', apellido: usuario?.apellido || '', telefono: usuario?.telefono || '', fechaNacimiento: usuario?.fechaNacimiento || '', genero: usuario?.genero || '' });
                setEditando(true);
              }}
              style={{ backgroundColor: 'transparent', color: '#C6676D', border: '2px solid #EAAFB8', padding: '8px 20px', borderRadius: '20px', fontFamily: 'Poppins-Medium', fontSize: '13px', cursor: 'pointer' }}>
              <i className="fa-solid fa-pen-to-square"></i> Editar
            </button>
          )}
        </div>

        {/* MODO EDICIÓN */}
        {editando ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            {[
              { label: 'Nombre',   key: 'nombre',   placeholder: 'Ej: Juan' },
              { label: 'Apellido', key: 'apellido', placeholder: 'Ej: Pérez' },
              { label: 'Teléfono', key: 'telefono', placeholder: 'Ej: +51 999999999' },
              { label: 'Fecha de nacimiento', key: 'fechaNacimiento', placeholder: 'YYYY-MM-DD' },
              { label: 'Género',   key: 'genero',   placeholder: 'Masculino / Femenino / Otro' }
            ].map(({ label, key, placeholder }) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', fontFamily: 'Poppins-Medium', fontSize: '14px' }}>
                <div style={{ width: '250px', color: '#5A3E41' }}>{label}</div>
                <input
                  value={form[key]}
                  placeholder={placeholder}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  style={{ flex: 1, border: '2px solid #EAAFB8', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#5A3E41', outline: 'none' }}
                />
              </div>
            ))}
            <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
              <button onClick={guardarCambios} disabled={guardando}
                style={{ backgroundColor: '#C6676D', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '8px', fontFamily: 'Poppins-Bold', fontSize: '13px', cursor: 'pointer' }}>
                {guardando ? 'Guardando...' : 'Guardar cambios'}
              </button>
              <button onClick={() => setEditando(false)}
                style={{ backgroundColor: 'transparent', color: '#C6676D', border: '2px solid #EAAFB8', padding: '10px 25px', borderRadius: '8px', fontFamily: 'Poppins-Medium', fontSize: '13px', cursor: 'pointer' }}>
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          /* MODO LECTURA — mismo diseño que antes */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginBottom: '50px' }}>
            {[
              { label: "Nombre completo",    value: `${usuario?.nombre || ''} ${usuario?.apellido || ''}`.trim() || '—', icon: "fa-regular fa-user" },
              { label: "Correo electrónico", value: usuario?.correo    || '—', icon: "fa-regular fa-envelope" },
              { label: "Teléfono",           value: usuario?.telefono  || '—', icon: "fa-solid fa-phone" },
              { label: "Fecha de nacimiento", value: formatearFechaNac(usuario?.fechaNacimiento), icon: "fa-regular fa-calendar" },
              { label: "Genero",             value: usuario?.genero || '—', icon: "fa-solid fa-venus-mars" },
              { label: "Fecha de registro",  value: formatearFechaRegistro(usuario?.fechaRegistro), icon: "fa-regular fa-id-card" }
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', fontFamily: 'Poppins-Medium', fontSize: '14px' }}>
                <div style={{ width: '250px', color: '#5A3E41', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <i className={row.icon} style={{ color: '#C6676D', width: '20px', textAlign: 'center', fontSize: '16px' }}></i>
                  {row.label}
                </div>
                <div style={{ color: '#5A3E41', fontFamily: 'Poppins-Regular' }}>{row.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* MI ACTIVIDAD */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
          <i className="fa-regular fa-calendar" style={{ color: '#C6676D', fontSize: '24px' }}></i>
          <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '20px', color: '#5A3E41', margin: '0' }}>MI ACTIVIDAD</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {[
            { label: "Total de pedidos realizados", value: "0 pedidos", icon: "fa-solid fa-bag-shopping" },
            { label: "Último pedido",               value: "—",         icon: "fa-regular fa-clock" },
            { label: "Total gastado",               value: "S/. 0.00",  icon: "fa-solid fa-money-bill" }
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
          <span onClick={() => setActiveTab("pedidos")} style={{ color: '#C6676D', fontFamily: 'Poppins-Medium', fontSize: '14px', cursor: 'pointer' }}>Ver todos →</span>
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
          <span onClick={() => setActiveTab("favoritos")} style={{ color: '#C6676D', fontFamily: 'Poppins-Medium', fontSize: '14px', cursor: 'pointer' }}>Ver todos →</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
          {PRODUCTOS_FAVORITOS.map((p) => (
            <div key={p.id} style={{ border: '2px solid #EAAFB8', borderRadius: '20px', overflow: 'hidden', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '120px' }}>
                <img src={p.imagen} alt={p.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div onClick={() => toggleWish(p.id)} style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(255,255,255,0.9)', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                  <i className={wishlist.includes(p.id) ? "fa-solid fa-heart" : "fa-regular fa-heart"} style={{ color: '#C6676D', fontSize: '14px', marginTop: '1px' }}></i>
                </div>
              </div>
              <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '12px', color: '#5A3E41', margin: '0 0 5px 0' }}>{p.nombre}</h3>
                <p style={{ fontFamily: 'Poppins-Medium', fontSize: '10px', color: '#644444', margin: '0 0 10px 0', lineHeight: '1.4', flexGrow: 1 }}>{p.descripcion}</p>
                <div style={{ fontFamily: 'Poltawski-Nowy', fontSize: '16px', color: '#644444', marginBottom: '10px' }}>S/. {p.precio}</div>
                <button style={{ backgroundColor: '#C6676D', color: '#FFFFFF', border: 'none', padding: '8px', borderRadius: '8px', fontFamily: 'Poppins-Medium', fontSize: '11px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', width: '100%' }}>
                  <i className="fa-solid fa-cart-shopping"></i> AÑADIR AL CARRITO
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BANNER CONTACTO */}
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
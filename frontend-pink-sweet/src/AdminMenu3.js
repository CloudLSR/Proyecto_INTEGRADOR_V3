import React, { useState, useEffect, useMemo } from "react";
import { API_BASE, apiGet, apiPost, apiPut, apiDelete } from './api';

const AdminMenu3 = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState(null);          // null | 'conImagen' | 'sinCategoria'
  const [filtroAbierto, setFiltroAbierto] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const porPagina = 6;

  const cargar = () => {
    setCargando(true);
    apiGet('/api/admin/productos')
      .then(data => { setProductos(Array.isArray(data) ? data : []); setError(""); })
      .catch(() => setError("No se pudieron cargar los productos. Verifica tu sesión de administrador."))
      .finally(() => setCargando(false));
  };
  useEffect(() => { cargar(); }, []);

  // Categorías existentes (derivadas de los productos) para el selector del formulario
  const categorias = useMemo(() => {
    const map = new Map();
    productos.forEach(p => { if (p.categoria) map.set(p.categoria.id, p.categoria.descripcion); });
    return Array.from(map, ([id, descripcion]) => ({ id, descripcion }));
  }, [productos]);

  const eliminar = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    try {
      await apiDelete(`/api/admin/productos/${id}`);
      setMenuAbierto(null);
      cargar();
    } catch (e) { alert(e.message); }
  };

  const guardar = async (form) => {
    const body = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: form.precio === "" ? null : Number(form.precio),
      imagenUrl: form.imagenUrl || null,
      categoria: form.categoriaId ? { id: Number(form.categoriaId) } : null,
    };
    try {
      if (productoAEditar) await apiPut(`/api/admin/productos/${productoAEditar.id}`, body);
      else await apiPost('/api/admin/productos', body);
      setModalAbierto(false); setProductoAEditar(null);
      cargar();
    } catch (e) { alert(e.message); }
  };

  // --- filtrado + paginación (cliente) ---
  const filtrados = useMemo(() => {
    let arr = productos;
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase();
      arr = arr.filter(p => (p.nombre || '').toLowerCase().includes(q) ||
                            (p.categoria?.descripcion || '').toLowerCase().includes(q));
    }
    if (filtro === 'conImagen') arr = arr.filter(p => p.imagenUrl);
    if (filtro === 'sinCategoria') arr = arr.filter(p => !p.categoria);
    return arr;
  }, [productos, busqueda, filtro]);

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / porPagina));
  const pagina = Math.min(paginaActual, totalPaginas);
  const visibles = filtrados.slice((pagina - 1) * porPagina, pagina * porPagina);
  useEffect(() => { setPaginaActual(1); }, [busqueda, filtro]);

  const precioProm = productos.length
    ? (productos.reduce((a, p) => a + (Number(p.precio) || 0), 0) / productos.length) : 0;

  const metricas = [
    { valor: productos.length, etiqueta: "Total de productos", icon: "fa-solid fa-cake-candles", color: "#F194B4", bg: "#FDF2F3", border: "#FADADD" },
    { valor: categorias.length, etiqueta: "Categorías", icon: "fa-solid fa-tags", color: "#9B59B6", bg: "#F4ECF7", border: "#D7BDE2" },
    { valor: productos.filter(p => p.imagenUrl).length, etiqueta: "Con imagen", icon: "fa-solid fa-image", color: "#27AE60", bg: "#E9F7EF", border: "#A9DFBF" },
    { valor: `S/ ${precioProm.toFixed(2)}`, etiqueta: "Precio promedio", icon: "fa-solid fa-coins", color: "#F2C94C", bg: "#FFF9E6", border: "#FDE49E" },
  ];

  const btnStyle = { background: 'none', border: 'none', padding: '8px 15px', textAlign: 'left', cursor: 'pointer', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#5A3E41', width: '100%' };
  const imgFallback = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='130' height='90'><rect fill='%23FDF2F3' width='130' height='90'/><text x='65' y='52' text-anchor='middle' font-size='28'>🍰</text></svg>";

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%', width: '100%' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: 0, textTransform: 'uppercase' }}>PRODUCTOS</h1>
        <button onClick={() => { setProductoAEditar(null); setModalAbierto(true); }} style={{ backgroundColor: '#FCF0F2', color: '#C3666D', border: '1.5px solid #C3666D', borderRadius: '8px', padding: '10px 20px', fontFamily: 'Poppins-SemiBold', fontSize: '13px', cursor: 'pointer' }}>
          <i className="fa-solid fa-plus"></i> AGREGAR PRODUCTO
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '35px' }}>
        {metricas.map((m, i) => (
          <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', border: `2px solid ${m.border}`, display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
            <div style={{ width: '55px', height: '55px', backgroundColor: m.bg, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: m.color, fontSize: '24px', flexShrink: 0 }}>
              <i className={m.icon}></i>
            </div>
            <div>
              <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '26px', color: '#5A3E41', margin: '0 0 2px 0', lineHeight: '1' }}>{m.valor}</h2>
              <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', margin: 0 }}>{m.etiqueta}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #D9D9D9', borderRadius: '8px', padding: '0 15px', backgroundColor: 'white' }}>
          <i className="fa-solid fa-magnifying-glass" style={{ color: '#999', fontSize: '16px' }}></i>
          <input value={busqueda} onChange={e => setBusqueda(e.target.value)} type="text" placeholder="Buscar producto..." style={{ border: 'none', outline: 'none', width: '100%', padding: '12px 10px', fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#5A3E41' }} />
        </div>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setFiltroAbierto(!filtroAbierto)} style={{ backgroundColor: filtro ? '#C3666D' : 'white', color: filtro ? 'white' : '#C3666D', border: '1.5px solid #C3666D', borderRadius: '8px', padding: '0 25px', fontFamily: 'Poppins-Medium', fontSize: '14px', cursor: 'pointer', height: '100%' }}>
            <i className="fa-solid fa-filter"></i> Filtros
          </button>
          {filtroAbierto && (
            <div style={{ position: 'absolute', right: 0, top: '55px', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0px 10px 30px rgba(0,0,0,0.15)', padding: '10px 0', width: '220px', zIndex: 100, border: '1px solid #FADADD' }}>
              <button style={btnStyle} onClick={() => { setFiltro(null); setFiltroAbierto(false); }}>🔄 Todos</button>
              <button style={btnStyle} onClick={() => { setFiltro('conImagen'); setFiltroAbierto(false); }}>🖼️ Con imagen</button>
              <button style={btnStyle} onClick={() => { setFiltro('sinCategoria'); setFiltroAbierto(false); }}>🏷️ Sin categoría</button>
            </div>
          )}
        </div>
      </div>

      {cargando && <p style={{ color: '#999', fontFamily: 'Poppins-Regular' }}>Cargando productos…</p>}
      {error && <p style={{ color: '#C6676D', fontFamily: 'Poppins-Medium' }}>{error}</p>}
      {!cargando && !error && filtrados.length === 0 && <p style={{ color: '#999', fontFamily: 'Poppins-Regular' }}>No hay productos que coincidan.</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px' }}>
        {visibles.map((prod) => (
          <div key={prod.id} style={{ border: '1px solid #EAEAEA', borderRadius: '15px', padding: '20px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
              <img src={prod.imagenUrl ? (prod.imagenUrl.startsWith('http') ? prod.imagenUrl : `${API_BASE}${prod.imagenUrl}`) : imgFallback}
                   alt={prod.nombre} onError={e => { e.target.onerror = null; e.target.src = imgFallback; }}
                   style={{ width: '130px', height: '90px', objectFit: 'cover', borderRadius: '10px' }} />
              <div>
                <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: '0 0 5px 0' }}>{prod.nombre}</h3>
                <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: '0 0 4px 0' }}>{prod.categoria?.descripcion || 'Sin categoría'}</p>
                <span style={{ fontFamily: 'Poppins-SemiBold', fontSize: '14px', color: '#C3666D' }}>S/ {Number(prod.precio || 0).toFixed(2)}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
              <button onClick={() => { setProductoAEditar(prod); setModalAbierto(true); }} title="Editar" style={{ border: '1.5px solid #F194B4', backgroundColor: 'transparent', color: '#F194B4', width: '38px', height: '40px', borderRadius: '8px', cursor: 'pointer' }}>
                <i className="fa-solid fa-pen"></i>
              </button>
              <button onClick={() => eliminar(prod.id)} title="Eliminar" style={{ border: '1.5px solid #C6676D', backgroundColor: 'transparent', color: '#C6676D', width: '38px', height: '40px', borderRadius: '8px', cursor: 'pointer' }}>
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPaginas > 1 && (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '30px' }}>
          <button onClick={() => setPaginaActual(p => Math.max(p - 1, 1))} style={pagBtn(false)}><i className="fa-solid fa-arrow-left"></i></button>
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setPaginaActual(n)} style={pagBtn(pagina === n)}>{n}</button>
          ))}
          <button onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas))} style={pagBtn(false)}><i className="fa-solid fa-arrow-right"></i></button>
        </div>
      )}

      {modalAbierto && (
        <ModalProducto
          producto={productoAEditar}
          categorias={categorias}
          onCancelar={() => { setModalAbierto(false); setProductoAEditar(null); }}
          onGuardar={guardar}
        />
      )}
    </div>
  );
};

function pagBtn(active) {
  const base = { width: '40px', height: '40px', border: '1px solid #EAEAEA', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#5A3E41', backgroundColor: 'white' };
  return active ? { ...base, backgroundColor: '#C3666D', color: 'white', border: 'none' } : base;
}

function ModalProducto({ producto, categorias, onCancelar, onGuardar }) {
  const [form, setForm] = useState({
    nombre: producto?.nombre || "",
    precio: producto?.precio ?? "",
    descripcion: producto?.descripcion || "",
    imagenUrl: producto?.imagenUrl || "",
    categoriaId: producto?.categoria?.id || "",
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const input = { width: '100%', padding: '10px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box', fontFamily: 'Poppins-Regular' };

  const submit = () => {
    if (!form.nombre.trim()) { alert('El nombre es obligatorio.'); return; }
    onGuardar(form);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', width: '420px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}>
        <h2 style={{ fontFamily: 'Poppins-Bold', color: '#5A3E41', marginTop: 0 }}>{producto ? "Editar Producto" : "Agregar Producto"}</h2>
        <input type="text" value={form.nombre} onChange={e => set('nombre', e.target.value)} placeholder="Nombre del producto" style={input} />
        <input type="number" step="0.01" value={form.precio} onChange={e => set('precio', e.target.value)} placeholder="Precio (S/)" style={input} />
        <textarea value={form.descripcion} onChange={e => set('descripcion', e.target.value)} placeholder="Descripción" rows={3} style={{ ...input, resize: 'vertical' }} />
        <input type="text" value={form.imagenUrl} onChange={e => set('imagenUrl', e.target.value)} placeholder="URL de la imagen (ej: /images/torta.png)" style={input} />
        <select value={form.categoriaId} onChange={e => set('categoriaId', e.target.value)} style={input}>
          <option value="">— Sin categoría —</option>
          {categorias.map(c => <option key={c.id} value={c.id}>{c.descripcion}</option>)}
        </select>
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
          <button onClick={onCancelar} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontFamily: 'Poppins-Medium' }}>Cancelar</button>
          <button onClick={submit} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: '#C3666D', color: 'white', cursor: 'pointer', fontFamily: 'Poppins-Medium' }}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default AdminMenu3;
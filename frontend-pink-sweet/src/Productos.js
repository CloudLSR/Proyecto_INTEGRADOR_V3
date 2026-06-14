import React, { useState, useEffect } from 'react';
import logoPrincipal from './assets/logo.png';
import iconShop from './assets/icon-shop.png';
import dividerTitle from './assets/divider-title.png';
import dividerSub from './assets/divider-subtitle.png';
import dividerProduct from './assets/divider-product.png';

// ICONOS
import iconEntremets from './assets/icon-entremets.png';
import iconTortas from './assets/icon-tortas-clasicas.png';
import iconGalletas from './assets/icon-galletas.png';
import iconTequenos from './assets/icon-tequenos.png';
import iconSandwiches from './assets/icon-mini-sandwiches.png';
import iconEmpanadas from './assets/icon-mini-empanadas.png';
import iconAlfajores from './assets/icon-alfajores.png';
import iconTrufas from './assets/icon-trufas.png';
import iconPostres from './assets/icon-postres-frios.png';
import iconCupcakes from './assets/icon-cupcakes.png';

// IMÁGENES LOCALES (fallback mientras la BD no tenga imagenUrl reales subidas)
// ENTREMETS
import imgELimon from './assets/products/e-limon.png';
import imgEGlaseadoEspejo from './assets/products/e-glaseado-espejo.png';
import imgEFresa from './assets/products/e-fresa.png';
import imgEMora from './assets/products/e-mora.png';
import imgECoco from './assets/products/e-coco.png';
import imgEMiniEntremets from './assets/products/e-mini-entremets.png';

// TORTAS CLASICAS
import imgTcTripleChocolate from './assets/products/tc-triple-chocolate.png';
import imgTcVainillaConFrutas from './assets/products/tc-vainilla-con-frutas.png';
import imgTcZanahoria from './assets/products/tc-zanahoria.png';
import imgTcRedVelvet from './assets/products/tc-red-velvet.png';
import imgTcChocolate from './assets/products/tc-chocolate.png';
import imgTcMaracuya from './assets/products/tc-maracuya.png';

// GALLETAS
import imgGFresa from './assets/products/g-fresa.jpg';
import imgGPina from './assets/products/g-pina.jpg';
import imgGManzana from './assets/products/g-manzana.jpg';
import imgGChocolate from './assets/products/g-chocolate.png';
import imgGAvenaYPasas from './assets/products/g-avena-y-pasas.png';
import imgGPersonalizadas from './assets/products/g-personalizadas.jpg';

// TEQUENOS VARIADOS
import imgTvPollo from './assets/products/tv-pollo.png';
import imgTvClasicos from './assets/products/tv-clasicos.png';
import imgTvQuesoGouda from './assets/products/tv-queso-gouda.png';
import imgTvGuayabaYQueso from './assets/products/tv-guayaba-y-queso.png';
import imgTvJamonYQueso from './assets/products/tv-jamon-y-queso.png';
import imgTvNuttela from './assets/products/tv-nuttela.png';

// MINI SANDWICHES
import imgMsMiniSandwichesGourmet from './assets/products/ms-mini-sandwiches-gourmet.png';
import imgMsMiniCroissantsRellenos from './assets/products/ms-mini-croissants-rellenos.png';
import imgMsMiniSandwichesDelipe from './assets/products/ms-mini-sandwiches-delipe.png';
import imgMsMiniBaguettas from './assets/products/ms-mini-baguettas.png';
import imgMsMiniWraps from './assets/products/ms-mini-wraps.png';
import imgMsMiniCiabattas from './assets/products/ms-mini-ciabattas.png';

// MINI EMPANADAS
import imgMePollo from './assets/products/me-pollo.png';
import imgMeQueso from './assets/products/me-queso.png';
import imgMeCarne from './assets/products/me-carne.png';
import imgMeEspinacaYQueso from './assets/products/me-espinaca-y-queso.png';
import imgMeJamonYQueso from './assets/products/me-jamon-y-queso.png';
import imgMeChampinones from './assets/products/me-champinones.png';

// ALFAJORES
import imgAClasico from './assets/products/a-clasico.png';
import imgAChocolate from './assets/products/a-chocolate.png';
import imgACoco from './assets/products/a-coco.png';
import imgAManjarYNueces from './assets/products/a-manjar-y-nueces.png';
import imgAChocolateBlanco from './assets/products/a-chocolate-blanco.png';
import imgAColores from './assets/products/a-colores.png';

// TRUFAS
import imgTClasicas from './assets/products/t-clasicas.png';
import imgTFresa from './assets/products/t-fresa.png';
import imgTOreo from './assets/products/t-oreo.png';
import imgTMaracuya from './assets/products/t-maracuya.png';
import imgTChocolateBelga from './assets/products/t-chocolate-belga.png';
import imgTCoco from './assets/products/t-coco.png';

// POSTRES FRIOS
import imgPfMini3LechesClasico from './assets/products/pf-mini-3-leches-clasico.png';
import imgPfMini3LechesDeChocolate from './assets/products/pf-mini-3-leches-de-chocolate.png';
import imgPfMini3LechesDeFresa from './assets/products/pf-mini-3-leches-de-fresa.png';
import imgPfMini3LechesDeMaracuya from './assets/products/pf-mini-3-leches-de-maracuya.png';
import imgPfVasitoDeOreoCream from './assets/products/pf-vasito-de-oreo-cream.png';
import imgPfVasitoDeFresaYChantilly from './assets/products/pf-vasito-de-fresa-y-chantilly.png';

// CUPCAKES
import imgCChocolate from './assets/products/c-chocolate.jpg';
import imgCVainilla from './assets/products/c-vainilla.jpg';
import imgCZanahoria from './assets/products/c-zanahoria.jpg';
import imgCFresa from './assets/products/c-fresa.png';
import imgCOreo from './assets/products/c-oreo.png';
import imgCArandano from './assets/products/c-arandano.png';

// URL base del backend (donde vive /uploads y /api)
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// ─────────────────────────────────────────────────────────────────────────
// Configuración de categorías: id real (cat_id) <-> clave del frontend
// IMPORTANTE: estos ids deben coincidir con los cat_id generados al insertar
// en la tabla `categoria` (1=Entremets, 2=Tortas Clásicas, ... 10=Cupcakes)
// ─────────────────────────────────────────────────────────────────────────
const CATEGORIAS_CONFIG = [
  { catId: 1,  clave: 'entremets',  nombre: 'Entremets',        icono: iconEntremets,  titulo: 'ENTREMETS' },
  { catId: 2,  clave: 'tortas',     nombre: 'Tortas Clásicas',  icono: iconTortas,     titulo: 'TORTAS CLÁSICAS' },
  { catId: 3,  clave: 'galletas',   nombre: 'Galletas',         icono: iconGalletas,   titulo: 'GALLETAS' },
  { catId: 4,  clave: 'tequenos',   nombre: 'Tequeños',         icono: iconTequenos,   titulo: 'TEQUEÑOS VARIADOS' },
  { catId: 5,  clave: 'sandwiches', nombre: 'Mini Sandwiches',  icono: iconSandwiches, titulo: 'MINI SANDWICHES' },
  { catId: 6,  clave: 'empanadas',  nombre: 'Mini Empanadas',   icono: iconEmpanadas,  titulo: 'MINI EMPANADAS', col: undefined },
  { catId: 7,  clave: 'alfajores',  nombre: 'Alfajores',        icono: iconAlfajores,  titulo: 'ALFAJORES' },
  { catId: 8,  clave: 'trufas',     nombre: 'Trufas',           icono: iconTrufas,     titulo: 'TRUFAS' },
  { catId: 9,  clave: 'postres',    nombre: 'Postres Fríos',    icono: iconPostres,    titulo: 'POSTRES FRÍOS', col: '2 / 3' },
  { catId: 10, clave: 'cupcakes',   nombre: 'Cupcakes',         icono: iconCupcakes,   titulo: 'CUPCAKES', col: '3 / 4' },
];

// ─────────────────────────────────────────────────────────────────────────
// Fallback de imágenes locales por categoría, en el mismo orden en que se
// insertaron los productos en el SQL (poblar_productos.sql). Se usa solo si
// el producto no tiene imagenUrl válido o la imagen no carga.
// ─────────────────────────────────────────────────────────────────────────
const IMAGENES_FALLBACK = {
  entremets:  [imgELimon, imgEGlaseadoEspejo, imgEFresa, imgEMora, imgECoco, imgEMiniEntremets],
  tortas:     [imgTcTripleChocolate, imgTcVainillaConFrutas, imgTcZanahoria, imgTcRedVelvet, imgTcChocolate, imgTcMaracuya],
  galletas:   [imgGFresa, imgGPina, imgGManzana, imgGChocolate, imgGAvenaYPasas, imgGPersonalizadas],
  tequenos:   [imgTvPollo, imgTvClasicos, imgTvQuesoGouda, imgTvGuayabaYQueso, imgTvJamonYQueso, imgTvNuttela],
  sandwiches: [imgMsMiniSandwichesGourmet, imgMsMiniCroissantsRellenos, imgMsMiniSandwichesDelipe, imgMsMiniBaguettas, imgMsMiniWraps, imgMsMiniCiabattas],
  empanadas:  [imgMePollo, imgMeQueso, imgMeCarne, imgMeEspinacaYQueso, imgMeJamonYQueso, imgMeChampinones],
  alfajores:  [imgAClasico, imgAChocolate, imgACoco, imgAManjarYNueces, imgAChocolateBlanco, imgAColores],
  trufas:     [imgTClasicas, imgTFresa, imgTOreo, imgTMaracuya, imgTChocolateBelga, imgTCoco],
  postres:    [imgPfMini3LechesClasico, imgPfMini3LechesDeChocolate, imgPfMini3LechesDeFresa, imgPfMini3LechesDeMaracuya, imgPfVasitoDeOreoCream, imgPfVasitoDeFresaYChantilly],
  cupcakes:   [imgCChocolate, imgCVainilla, imgCZanahoria, imgCFresa, imgCOreo, imgCArandano],
};

const Productos = () => {
  const [categoriaActiva, setCategoriaActiva] = useState('empanadas');
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // cantidades por producto (id -> cantidad)
  const [cantidades, setCantidades] = useState({});

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setCargando(true);
        const resp = await fetch(`${API_BASE}/api/productos`);
        if (!resp.ok) throw new Error('No se pudo cargar productos');
        const data = await resp.json();
        setProductos(data);
        setError(null);
      } catch (err) {
        console.error('Error cargando productos:', err);
        setError('No se pudieron cargar los productos. Intenta nuevamente más tarde.');
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);

  const obtenerCantidad = (productoId) => cantidades[productoId] ?? 1;

  const cambiarCantidad = (productoId, valor) => {
    const num = parseInt(valor, 10);
    setCantidades((prev) => ({
      ...prev,
      [productoId]: isNaN(num) || num < 1 ? 1 : num,
    }));
  };

  const resolverImagen = (producto, claveCategoria, indice) => {
    if (producto.imagenUrl) {
      return `${API_BASE}${producto.imagenUrl}`;
    }
    const fallback = IMAGENES_FALLBACK[claveCategoria];
    if (fallback && fallback[indice % fallback.length]) {
      return fallback[indice % fallback.length];
    }
    return null;
  };

  const handleComprar = async (producto) => {
    const cantidad = obtenerCantidad(producto.id);
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      return;
    }

    try {
      const resp = await fetch(`${API_BASE}/api/carrito/agregar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productoId: producto.id,
          cantidad: cantidad,
        }),
      });

      if (!resp.ok) throw new Error('No se pudo agregar al carrito');

      alert(`"${producto.nombre}" agregado al carrito (x${cantidad}).`);
    } catch (err) {
      console.error('Error agregando al carrito:', err);
      alert('Ocurrió un error al agregar el producto al carrito.');
    }
  };

  const categoriaActivaConfig = CATEGORIAS_CONFIG.find((c) => c.clave === categoriaActiva);

  const productosDeCategoria = productos.filter(
    (p) => p.categoria && p.categoria.id === categoriaActivaConfig?.catId
  );

  return (
    <div style={{ backgroundColor: '#FFEFEF', fontFamily: 'sans-serif', minHeight: '100vh', paddingBottom: '80px' }}>

      <section style={{ textAlign: 'center', padding: '40px 20px' }}>
        <img src={logoPrincipal} alt="Logo Sweet Cream Rose" style={{ width: '230px', objectFit: 'contain', marginBottom: '15px' }} />
        <h2 style={{ color: '#5A3E41', margin: '10 0 25px 30', fontFamily: 'Poppins-Bold', fontSize: '30px' }}>PRODUCTOS</h2>
        <img src={dividerTitle} alt="divisor" style={{ width: '180px', height: 'auto', display: 'block', margin: '0 auto 20px auto' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', maxWidth: '850px', margin: '0 auto', justifyContent: 'center' }}>

          {CATEGORIAS_CONFIG.map((cat) => (
            <div
              key={cat.clave}
              onClick={() => setCategoriaActiva(cat.clave)}
              style={{
                gridColumn: cat.col ? cat.col : 'auto',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '90px',
                border: '2px solid #DE788E', borderRadius: '10px', padding: '0 15px',
                fontFamily: 'Poppins-SemiBold', cursor: 'pointer', fontWeight: 'bold',
                backgroundColor: categoriaActiva === cat.clave ? '#DE788E' : '#FFEFEF',
                color: categoriaActiva === cat.clave ? 'white' : '#984350',
              }}
            >
              <img
                src={cat.icono}
                alt="Icono"
                style={{
                  width: '60px', height: '60px', objectFit: 'contain',
                  filter: categoriaActiva === cat.clave ? 'brightness(0) invert(1)' : 'none'
                }}
              />
              {cat.nombre}
            </div>
          ))}

        </div>
      </section>

      {categoriaActivaConfig && (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px', marginTop: '30px', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '15px' }}>
            <img src={categoriaActivaConfig.icono} alt={`Icono ${categoriaActivaConfig.titulo}`} style={{ width: '80px', height: '80px' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h1 style={{ color: '#5A3E41', fontSize: '40px', fontFamily: 'Poppins-Bold', margin: '0' }}>
                {categoriaActivaConfig.titulo}
              </h1>
              <img src={dividerSub} alt="Divisor Subtitulo" style={{ width: '100%', height: '26px', marginTop: '-10px', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      )}

      <main style={{ maxWidth: '1100px', margin: '40px auto', display: 'flex', flexDirection: 'column', gap: '60px', padding: '0 20px' }}>

        {cargando && (
          <p style={{ textAlign: 'center', color: '#5A3E41', fontFamily: 'Poppins-Medium', fontSize: '18px' }}>
            Cargando productos...
          </p>
        )}

        {!cargando && error && (
          <p style={{ textAlign: 'center', color: '#C3666D', fontFamily: 'Poppins-Medium', fontSize: '18px' }}>
            {error}
          </p>
        )}

        {!cargando && !error && productosDeCategoria.length === 0 && (
          <p style={{ textAlign: 'center', color: '#5A3E41', fontFamily: 'Poppins-Medium', fontSize: '18px' }}>
            Todavía no hay productos en esta categoría.
          </p>
        )}

        {!cargando && !error && productosDeCategoria.map((prod, index) => {

          const isEven = index % 2 === 0;
          const imagenSrc = resolverImagen(prod, categoriaActiva, index);
          const cantidad = obtenerCantidad(prod.id);

          return (
            <div key={prod.id} style={{
              display: 'flex',
              flexDirection: isEven ? 'row' : 'row-reverse',
              height: '320px',
              backgroundColor: '#FFEFEF', border: '2px solid #C3666D', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}>

              <div style={{ flex: '1.3' }}>
                {imagenSrc ? (
                  <img src={imagenSrc} alt={prod.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#EAAFB8' }} />
                )}
              </div>

              <div style={{ flex: '1', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: isEven ? 'left' : 'right' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: isEven ? 'row' : 'row-reverse' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: isEven ? 'flex-start' : 'flex-end' }}>
                    <h2 style={{ color: '#5A3E41', fontSize: '32px', margin: '0 0 5px 0', fontFamily: 'Poppins-Bold' }}>{prod.nombre}</h2>
                    <img src={dividerProduct} alt="Divisor de Producto" style={{ width: '100%', height: '26px', marginTop: '-5px', objectFit: 'contain' }} />
                  </div>
                  <div style={{ width: '45px', height: '45px', borderRadius: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0px 5px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                    <span style={{ fontSize: '40px', color: '#C3666D', marginTop: '-2px' }}>♡</span>
                  </div>
                </div>

                <p style={{ color: '#222', fontSize: '15px', fontFamily: 'Poppins-Medium', lineHeight: '1.6', margin: '10px 0' }}>
                  {prod.descripcion}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: isEven ? 'flex-start' : 'flex-end' }}>
                  <span style={{ fontSize: '24px', color: '#5A3E41', fontFamily: 'Poltawski-Nowy' }}>S/. {Number(prod.precio).toFixed(2)}</span>
                  <span style={{ fontSize: '14px', color: '#59423CBA', fontFamily: 'Poppins-Medium' }}>por unidad</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px', justifyContent: isEven ? 'flex-start' : 'flex-end' }}>
                  <label style={{ fontSize: '15px', fontFamily: 'Poppins-Medium', color: '#000000' }}>Cantidad:</label>
                  <input
                    type="number"
                    min="1"
                    value={cantidad}
                    onChange={(e) => cambiarCantidad(prod.id, e.target.value)}
                    style={{ width: '110px', backgroundColor: '#EAAFB8', border: '1px solid #C3666D', borderRadius: '0px', padding: '5px', color: 'white', fontFamily: 'Poppins-Medium', textAlign: 'center' }}
                  />
                  <button
                    onClick={() => handleComprar(prod)}
                    style={{ backgroundColor: '#C3666D', color: 'white', border: 'none', padding: '6px 26px', borderRadius: '20px', cursor: 'pointer', fontFamily: 'Poppins-Medium', fontSize: '15px' }}
                  >
                    Comprar
                  </button>
                </div>
              </div>

            </div>
          );
        })}

      </main>

      <section style={{ backgroundColor: '#FACFD8', padding: '0 70px', margin: '80px auto 0', maxWidth: '940px', height: '175px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <div style={{ width: '130px', height: '130px', flexShrink: 0, backgroundColor: 'white', border: '4px solid #EAAFB8', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
            <img src={iconShop} alt="Icono Tienda" style={{ width: '65%', height: 'auto', objectFit: 'contain' }} />
          </div>
          <div>
            <h3 style={{ color: '#7D2530', margin: '0 0 5px 0', fontSize: '22px', fontFamily: 'Poppins-SemiBold' }}>¿No encuentras lo que buscas?</h3>
            <p style={{ margin: '0', color: '#B14B47', fontSize: '19px', fontFamily: 'Signika-Regular', maxWidth: '400px', lineHeight: '1.2' }}>Contáctanos y con gusto te ayudamos a crear el postre perfecto</p>
          </div>
        </div>
        <button style={{ backgroundColor: '#C3666D', color: 'white', fontSize: '16px', fontFamily: 'Poppins-Bold', border: 'none', padding: '12px 30px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>CONTACTAR <span style={{ fontSize: '18px' }}>›</span></button>
      </section>

    </div>
  );
};

export default Productos;
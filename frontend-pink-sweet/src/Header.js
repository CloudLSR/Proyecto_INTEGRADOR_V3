import React from 'react';
import bannerPrincipal from './assets/banner.png';
import iconUser from './assets/icon-user.png';
import iconCart from './assets/icon-cart.png';
import iconLupa from './assets/icon-lupa.png';

// Agregamos "page" a las props que recibe el Header
const Header = ({ page, setPage }) => {
  
  // Función para calcular el estilo del botón dependiendo de si está activo o no
  const estiloBoton = (rutaBoton) => ({
    border: 'none',
    padding: '8px 20px',
    // Aquí ocurre la magia: si la página actual coincide con el botón, color claro. Si no, oscuro.
    backgroundColor: page === rutaBoton ? '#FFEFEF' : '#EAAFB8',
    color: '#5A3E41',
    fontFamily: 'Poppins-SemiBold',
    fontSize: '14px',
    cursor: 'pointer'
  });

  return (
    <header style={{ backgroundColor: '#C6676D', width: '100%', position: 'sticky', top: 0, zIndex: 1000 }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img 
          src={bannerPrincipal} 
          alt="Sweet Cream Rose Logo" 
          style={{ height: '45px', objectFit: 'contain', cursor: 'pointer' }} 
          onClick={() => setPage('inicio')}
        />
        <nav style={{ display: 'flex', gap: '15px' }}>
          <button onClick={() => setPage('inicio')} style={estiloBoton('inicio')}>INICIO</button>
          <button onClick={() => setPage('productos')} style={estiloBoton('productos')}>PRODUCTOS</button>
          <button onClick={() => setPage('ofertas')} style={estiloBoton('ofertas')}>OFERTAS</button>
          <button onClick={() => setPage('nosotros')} style={estiloBoton('nosotros')}>NOSOTROS</button>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: '4px', padding: '0 10px', width: '220px' }}>
            <input type="text" placeholder="Buscar..." style={{ border: 'none', outline: 'none', width: '100%', padding: '8px 0', backgroundColor: 'transparent', fontFamily: 'sans-serif' }} />
            <img src={iconLupa} alt="Lupa" style={{ height: '16px', cursor: 'pointer', marginLeft: '5px' }} />
          </div>
          <img src={iconUser} alt="Usuario" style={{ height: '32px', cursor: 'pointer' }} />
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <img src={iconCart} alt="Carrito" style={{ height: '32px' }} />
            <div style={{ position: 'absolute', top: '-4px', right: '-4px', backgroundColor: 'white', color: '#C6676D', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px', fontWeight: 'bold' }}>0</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
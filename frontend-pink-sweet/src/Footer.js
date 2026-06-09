import React from 'react';
import logoPrincipal from './assets/logo.png';
import iconUser from './assets/icon-user.png';

const Footer = ({ setPage }) => {
  return (
      <footer style={{ backgroundColor: '#C2656C', color: 'white', padding: '60px 40px 20px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '160px', alignItems: 'flex-start', width: '100%', marginBottom: '40px', maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', maxWidth: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '120px', height: '120px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', margin: '0 auto' }}>
                <img src={logoPrincipal} alt="Logo Sweet Cream Rose" style={{ width: '80%', height: 'auto', objectFit: 'contain' }} />
            </div>
            <p style={{ fontSize: '12px', marginTop: '15px', color: 'white', lineHeight: '1.4', maxWidth: '180px' }}>En un mundo de experiencias duras con un pastel dale dulzura.</p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: 'bold', color: 'white' }}>ENLACES</h4>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0', lineHeight: '2', fontSize: '14px' }}>
                <li style={{ cursor: 'pointer', color: 'white' }}>Inicio</li>
                <li style={{ cursor: 'pointer', color: 'white' }}>Productos</li>
                <li style={{ cursor: 'pointer', color: 'white' }}>Ofertas</li>
                <li style={{ cursor: 'pointer', color: 'white' }}>Nosotros</li>
            </ul>
          </div>
          <div>
            <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: 'bold', color: 'white' }}>AYUDA</h4>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0', lineHeight: '2', fontSize: '14px' }}>
                <li style={{ cursor: 'pointer', color: 'white' }}>Preguntas frecuentes</li>
                <li style={{ cursor: 'pointer', color: 'white' }}>Políticas de envío</li>
                <li style={{ cursor: 'pointer', color: 'white' }}>Términos y condiciones</li>
                <li style={{ cursor: 'pointer', color: 'white' }}>Políticas de privacidad</li>
            </ul>
          </div>
          <div>
            <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: 'bold', color: 'white' }}>CONTÁCTANOS</h4>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0', lineHeight: '2', fontSize: '14px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white' }}><img src={iconUser} alt="Pin Icon" style={{ width: '16px', height: '16px' }} />Lima, Perú</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white' }}><img src={iconUser} alt="Phone Icon" style={{ width: '16px', height: '16px' }} />+51 987654900</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white' }}><img src={iconUser} alt="Envelope Icon" style={{ width: '16px', height: '16px' }} />info@SweetCreamRose.com</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white' }}><img src={iconUser} alt="Clock Icon" style={{ width: '16px', height: '16px' }} />Lunes a Sábado: 9am - 6pm</li>
            </ul>
          </div>
        </div>
        <div style={{ width: '100%', borderTop: '1px solid #EAAFB8', marginBottom: '20px' }}></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontSize: '15px', fontWeight: 'bold', color: 'white', fontFamily: 'Poppins-Bold' }}>SÍGUENOS</span>
            <img src={iconUser} alt="Facebook" style={{ width: '25px', height: '25px', cursor: 'pointer' }} />
            <img src={iconUser} alt="Instagram" style={{ width: '25px', height: '25px', cursor: 'pointer' }} />
            <img src={iconUser} alt="WhatsApp" style={{ width: '25px', height: '25px', cursor: 'pointer' }} />
          </div>
          <p style={{ fontSize: '13px', color: 'white', margin: '0', textAlign: 'right', fontFamily: 'Poppins-Regular' }}>© 2026 Sweet Cream Rose. Todos los derechos reservados.</p>
        </div>
      </footer>
  );
};

export default Footer;
import React from "react";

// IMÁGENES DE PRODUCTOS (Reutilizadas para los más vendidos)
import imgTcTripleChocolate from './assets/products/tc-triple-chocolate.png';
import imgCArandano from './assets/products/c-arandano.png';
import imgAClasico from './assets/products/a-clasico.png';
import imgTFresa from './assets/products/t-fresa.png';
import imgMeQueso from './assets/products/me-queso.png';

const AdminMenu1 = () => {
  
  // Data simulada para Pedidos Recientes
  const pedidosRecientes = [
    { id: '#000124', nombre: 'María Fernandez', tiempo: 'Hoy, 3:45 p.m.', estado: 'En preparación', bgBadge: '#FADADD', colorBadge: '#C6676D' },
    { id: '#000123', nombre: 'Carlos Ramirez', tiempo: 'Hoy, 3:20 p.m.', estado: 'En camino', bgBadge: '#DCE8F4', colorBadge: '#6A8BBD' },
    { id: '#000122', nombre: 'Valeria Rodriguez', tiempo: 'Hoy, 2:55 p.m.', estado: 'Entregado', bgBadge: '#E9F7EF', colorBadge: '#27AE60' },
    { id: '#000121', nombre: 'Lucia Gomez', tiempo: 'Hoy, 2:30 p.m.', estado: 'Entregado', bgBadge: '#E9F7EF', colorBadge: '#27AE60' },
    { id: '#000120', nombre: 'Diego Salazar', tiempo: 'Hoy, 1:45 p.m.', estado: 'Entregado', bgBadge: '#E9F7EF', colorBadge: '#27AE60' },
  ];

  // Data simulada para Productos Más Vendidos
  const productosVendidos = [
    { rank: 1, img: imgTcTripleChocolate, nombre: 'Torta triple chocolate', unidades: '142 unidades', precio: 'S/ 2,130.00' },
    { rank: 2, img: imgCArandano, nombre: 'Cupcake de arándanos', unidades: '98 unidades', precio: 'S/ 1,470.00' },
    { rank: 3, img: imgAClasico, nombre: 'Alfajor clásico', unidades: '87 unidades', precio: 'S/ 870.00' },
    { rank: 4, img: imgTFresa, nombre: 'Trufas de fresa', unidades: '76 unidades', precio: 'S/ 760.00' },
    { rank: 5, img: imgMeQueso, nombre: 'Mini empanadas de queso', unidades: '65 unidades', precio: 'S/ 715.00' },
  ];

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%' }}>
      
      {/* HEADER DEL DASHBOARD */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '35px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
          <div>
            <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '26px', color: '#5A3E41', margin: '0 0 5px 0', textTransform: 'uppercase' }}>
              ¡BIENVENIDA, ADMINISTRADORA! 👋
            </h1>
            <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>
              Este es el resumen general de tu negocio.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ border: '1px solid #D9D9D9', borderRadius: '10px', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'white', fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#5A3E41', cursor: 'pointer' }}>
            <i className="fa-regular fa-calendar"></i>
            12 de mayo, 2026
            <i className="fa-solid fa-chevron-down" style={{ fontSize: '12px', marginLeft: '10px' }}></i>
          </div>
        </div>
      </div>

      {/* TARJETAS DE MÉTRICAS (KPIs) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px', marginBottom: '35px' }}>
        
        {/* Tarjeta 1 */}
        <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '30px', border: '2px solid #FADADD' }}>
          <div style={{ width: '50px', height: '50px', backgroundColor: '#FDF2F3', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#F194B4', fontSize: '22px', marginBottom: '20px' }}>
            <i className="fa-solid fa-bag-shopping"></i>
          </div>
          <p style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', margin: '0 0 5px 0' }}>Pedidos activos</p>
          <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '36px', color: '#5A3E41', margin: '0 0 10px 0' }}>18</h2>
          <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', margin: '0 0 20px 0' }}><span style={{ color: '#27AE60' }}>+3 respecto a ayer ↑</span></p>
          <a href="#" style={{ fontFamily: 'Poppins-SemiBold', fontSize: '14px', color: '#F194B4', textDecoration: 'underline' }}>Ver pedidos</a>
        </div>

        {/* Tarjeta 2 */}
        <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '30px', border: '2px solid #FDE49E' }}>
          <div style={{ width: '50px', height: '50px', backgroundColor: '#FFF9E6', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#F2C94C', fontSize: '22px', marginBottom: '20px' }}>
            <i className="fa-solid fa-basket-shopping"></i>
          </div>
          <p style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', margin: '0 0 5px 0' }}>Ventas del día</p>
          <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '36px', color: '#5A3E41', margin: '0 0 10px 0' }}>S/1,285.00</h2>
          <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', margin: '0 0 20px 0' }}><span style={{ color: '#27AE60' }}>+12.5% respecto a ayer</span></p>
          <a href="#" style={{ fontFamily: 'Poppins-SemiBold', fontSize: '14px', color: '#F2C94C', textDecoration: 'underline' }}>Ver ventas</a>
        </div>

        {/* Tarjeta 3 */}
        <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '30px', border: '2px solid #A9DFBF' }}>
          <div style={{ width: '50px', height: '50px', backgroundColor: '#E9F7EF', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#27AE60', fontSize: '22px', marginBottom: '20px' }}>
            <i className="fa-solid fa-dollar-sign"></i>
          </div>
          <p style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', margin: '0 0 5px 0' }}>Ganancias del día</p>
          <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '36px', color: '#5A3E41', margin: '0 0 10px 0' }}>S/862.50</h2>
          <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', margin: '0 0 20px 0' }}><span style={{ color: '#27AE60' }}>+10.3% respecto a ayer</span></p>
          <a href="#" style={{ fontFamily: 'Poppins-SemiBold', fontSize: '14px', color: '#F194B4', textDecoration: 'underline' }}>Ver ganancias</a>
        </div>

        {/* Tarjeta 4 */}
        <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '30px', border: '2px solid #D7BDE2' }}>
          <div style={{ width: '50px', height: '50px', backgroundColor: '#F4ECF7', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#9B59B6', fontSize: '22px', marginBottom: '20px' }}>
            <i className="fa-solid fa-box-open"></i>
          </div>
          <p style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777', margin: '0 0 5px 0' }}>Productos bajos</p>
          <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '36px', color: '#5A3E41', margin: '0 0 10px 0' }}>7</h2>
          <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', margin: '0 0 20px 0' }}>requieren reposición</p>
          <a href="#" style={{ fontFamily: 'Poppins-SemiBold', fontSize: '14px', color: '#F194B4', textDecoration: 'underline' }}>Ver stock</a>
        </div>
      </div>

      {/* SECCIÓN DE GRÁFICOS (SVG Estáticos) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '25px', marginBottom: '35px' }}>
        
        {/* Gráfico Ventas */}
        <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '30px', border: '1px solid #EAEAEA' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: 0 }}>Ventas de la semana</h3>
            <button style={{ border: '1px solid #D9D9D9', background: 'white', borderRadius: '20px', padding: '6px 18px', fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', cursor: 'pointer' }}>Esta semana ⌄</button>
          </div>
          
          {/* Contenedor del Gráfico de Líneas SVG */}
          <div style={{ height: '280px', width: '100%', position: 'relative' }}>
            <svg viewBox="0 0 600 250" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F194B4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#F194B4" stopOpacity="0" />
                </linearGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.1"/>
                </filter>
              </defs>

              {/* Eje Y (Líneas y texto) */}
              {[
                { y: 20, val: 'S/ 2,000' }, { y: 70, val: 'S/ 1,500' },
                { y: 120, val: 'S/ 1,000' }, { y: 170, val: 'S/ 500' }, { y: 220, val: 'S/ 0' }
              ].map((line, i) => (
                <g key={i}>
                  <text x="0" y={line.y + 4} fill="#999" fontSize="12" fontFamily="Poppins-Medium">{line.val}</text>
                  <line x1="60" y1={line.y} x2="600" y2={line.y} stroke="#EAEAEA" strokeWidth="1" strokeDasharray={i === 4 ? "0" : "5,5"} />
                </g>
              ))}

              {/* Eje X (Texto) */}
              {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, i) => (
                <text key={i} x={90 + (i * 80)} y="245" fill="#999" fontSize="13" fontFamily="Poppins-Medium" textAnchor="middle">{day}</text>
              ))}

              {/* Área con gradiente */}
              <path d="M 90 170 L 170 110 L 250 140 L 330 90 L 410 40 L 490 85 L 570 120 L 570 220 L 90 220 Z" fill="url(#lineGradient)" />
              
              {/* Línea principal */}
              <path d="M 90 170 L 170 110 L 250 140 L 330 90 L 410 40 L 490 85 L 570 120" fill="none" stroke="#F194B4" strokeWidth="3" />

              {/* Puntos */}
              {[
                { cx: 90, cy: 170 }, { cx: 170, cy: 110 }, { cx: 250, cy: 140 },
                { cx: 330, cy: 90 }, { cx: 410, cy: 40 }, { cx: 490, cy: 85 }, { cx: 570, cy: 120 }
              ].map((pt, i) => (
                <circle key={i} cx={pt.cx} cy={pt.cy} r="5" fill="white" stroke="#F194B4" strokeWidth="3" />
              ))}

              {/* Tooltip 'Viernes' */}
              <g transform="translate(360, -5)" filter="url(#shadow)">
                <rect width="100" height="40" rx="8" fill="white" />
                <text x="50" y="16" fill="#777" fontSize="11" fontFamily="Poppins-Medium" textAnchor="middle">Viernes</text>
                <text x="50" y="32" fill="#5A3E41" fontSize="13" fontFamily="Poppins-Bold" textAnchor="middle">S/ 1,750.00</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Gráfico Donut Estados */}
        <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '30px', border: '1px solid #EAEAEA', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0 0 20px 0' }}>Estados de pedidos</h3>
          
          {/* Contenedor Donut SVG */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px', flex: 1 }}>
            <div style={{ width: '160px', height: '160px', position: 'relative' }}>
              <svg viewBox="0 0 32 32" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%', overflow: 'visible', filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.05))' }}>
                {/* Segmentos del Donut (Circunferencia = 100) */}
                <circle r="15.915" cx="16" cy="16" fill="transparent" stroke="#F194B4" strokeWidth="6" strokeDasharray="37 63" strokeDashoffset="0" /> {/* Rosa */}
                <circle r="15.915" cx="16" cy="16" fill="transparent" stroke="#F2C94C" strokeWidth="6" strokeDasharray="24 76" strokeDashoffset="-37" /> {/* Amarillo */}
                <circle r="15.915" cx="16" cy="16" fill="transparent" stroke="#6A8BBD" strokeWidth="6" strokeDasharray="26 74" strokeDashoffset="-61" /> {/* Azul */}
                <circle r="15.915" cx="16" cy="16" fill="transparent" stroke="#27AE60" strokeWidth="6" strokeDasharray="13 87" strokeDashoffset="-87" /> {/* Verde */}
              </svg>
              {/* Texto Central */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#777', fontFamily: 'Poppins-Medium' }}>Total</span>
                <span style={{ fontSize: '28px', color: '#5A3E41', fontFamily: 'Poppins-Bold', lineHeight: '1' }}>38</span>
              </div>
            </div>
          </div>

          {/* Leyenda del gráfico */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#777' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><span style={{color: '#F194B4', fontSize:'18px', marginRight:'8px'}}>●</span> En preparación</div> <span>14 (37%)</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><span style={{color: '#F2C94C', fontSize:'18px', marginRight:'8px'}}>●</span> Listos para envío</div> <span>9 (24%)</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><span style={{color: '#6A8BBD', fontSize:'18px', marginRight:'8px'}}>●</span> En camino</div> <span>10 (26%)</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><span style={{color: '#27AE60', fontSize:'18px', marginRight:'8px'}}>●</span> Entregados</div> <span>5 (13%)</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><span style={{color: '#9B59B6', fontSize:'18px', marginRight:'8px'}}>●</span> Cancelados</div> <span>0 (0%)</span></div>
          </div>
        </div>

      </div>

      {/* SECCIÓN LISTAS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '35px' }}>
        
        {/* Pedidos Recientes */}
        <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '30px', border: '1px solid #EAEAEA' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: 0 }}>Pedidos recientes</h3>
            <span style={{ color: '#C3666D', fontSize: '14px', fontFamily: 'Poppins-Medium', cursor: 'pointer' }}>Ver todos</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {pedidosRecientes.map((pedido, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '50px', height: '50px', backgroundColor: '#FDF2F3', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#F194B4', fontSize: '20px' }}>
                    <i className="fa-solid fa-bag-shopping"></i>
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '15px', color: '#5A3E41', margin: '0 0 2px 0' }}>{pedido.id}</h4>
                    <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#5A3E41', margin: '0 0 2px 0' }}>{pedido.nombre}</p>
                    <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#999', margin: 0 }}>{pedido.tiempo}</p>
                  </div>
                </div>
                <div style={{ backgroundColor: pedido.bgBadge, color: pedido.colorBadge, padding: '6px 16px', borderRadius: '20px', fontFamily: 'Poppins-Medium', fontSize: '12px' }}>
                  {pedido.estado}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '25px' }}>
            <a href="#" style={{ fontFamily: 'Poppins-Medium', fontSize: '14px', color: '#C3666D', textDecoration: 'none' }}>Ir a pedidos {'>'}</a>
          </div>
        </div>

        {/* Productos Más Vendidos */}
        <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '30px', border: '1px solid #EAEAEA' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: 0 }}>Productos más vendidos</h3>
            <span style={{ color: '#C3666D', fontSize: '14px', fontFamily: 'Poppins-Medium', cursor: 'pointer' }}>Ver todos</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {productosVendidos.map((prod, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{ fontFamily: 'Poppins-Bold', fontSize: '20px', color: '#5A3E41', width: '20px' }}>{prod.rank}</span>
                  <img src={prod.img} alt={prod.nombre} style={{ width: '80px', height: '55px', objectFit: 'cover', borderRadius: '12px' }} />
                  <div>
                    <h4 style={{ fontFamily: 'Poppins-Bold', fontSize: '14px', color: '#5A3E41', margin: '0 0 3px 0' }}>{prod.nombre}</h4>
                    <p style={{ fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#777', margin: 0 }}>{prod.unidades}</p>
                  </div>
                </div>
                <div style={{ fontFamily: 'Poppins-Medium', fontSize: '15px', color: '#5A3E41' }}>
                  {prod.precio}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ACCIONES RÁPIDAS */}
      <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '30px', border: '1px solid #EAEAEA', marginBottom: '40px' }}>
        <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '18px', color: '#5A3E41', margin: '0 0 25px 0' }}>Acciones rápidas</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
          
          {[
            { icon: 'fa-solid fa-cake-candles', text: 'Nuevo producto' },
            { icon: 'fa-solid fa-bag-shopping', text: 'Nuevo pedido manual' },
            { icon: 'fa-solid fa-dollar-sign', text: 'Registrar venta' },
            { icon: 'fa-solid fa-user-plus', text: 'Agregar personal' },
            { icon: 'fa-solid fa-file-invoice', text: 'Ver reportes' }
          ].map((accion, i) => (
            <div key={i} style={{ backgroundColor: '#FDF2F3', border: '2px solid #F194B4', borderRadius: '15px', padding: '25px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}>
              <div style={{ width: '50px', height: '50px', border: '2px solid #F194B4', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#F194B4', fontSize: '24px', marginBottom: '15px' }}>
                <i className={accion.icon}></i>
              </div>
              <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41', margin: 0, padding: '0 10px' }}>{accion.text}</p>
            </div>
          ))}

        </div>
      </div>

      {/* FOOTER */}
      <p style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#999', margin: '0 0 20px 0' }}>
        <span style={{ color: '#C3666D' }}>♥</span> Gracias por endulzar cada día con tu trabajo
      </p>

    </div>
  );
};

export default AdminMenu1;
import React from 'react';
import './TerminosCondiciones.css';

const TerminosCondiciones = ({ setPage }) => {
    const terminosData = [
        {
            id: 1,
            titulo: "1. ACEPTACIÓN DE LOS TÉRMINOS",
            descripcion: "Al acceder y utilizar nuestra aplicación, aceptas cumplir con estos términos y condiciones, así como nuestras políticas de privacidad y envío.",
            icon: "fas fa-file-alt"
        },
        {
            id: 2,
            titulo: "2. PRODUCTOS",
            descripcion: "Nuestros productos son elaborados artesanalmente con ingredientes de calidad. Las imágenes son referenciales y pueden variar ligeramente en decoración y presentación.",
            icon: "fas fa-shopping-bag"
        },
        {
            id: 3,
            titulo: "3. PRECIOS Y PAGOS",
            descripcion: "Todos los precios están expresados en soles (S/). El pago debe realizarse al momento de confirmar el pedido a través de los métodos disponibles en la aplicación.",
            icon: "fas fa-credit-card"
        },
        {
            id: 4,
            titulo: "4. ENVÍOS",
            descripcion: "Los envíos son realizados mediante plataformas externas de delivery. El tiempo de entrega puede variar según la ubicación y condiciones del servicio.",
            icon: "fas fa-motorcycle"
        },
        {
            id: 5,
            titulo: "5. CANCELACIONES Y MODIFICACIONES",
            descripcion: "Los pedidos solo pueden ser cancelados o modificados dentro del tiempo establecido antes de su preparación. Una vez en proceso, no podrán ser modificados.",
            icon: "fas fa-box"
        },
        {
            id: 6,
            titulo: "6. DEVOLUCIONES Y REEMBOLSOS",
            descripcion: "No realizamos devoluciones en productos perecederos. Si tu pedido llega con algún error o daño, contáctanos dentro de los primeros 30 minutos de recibido.",
            icon: "fas fa-sync-alt"
        },
        {
            id: 7,
            titulo: "7. PROTECCIÓN DE DATOS",
            descripcion: "Tu información personal está protegida y será utilizada únicamente para procesar tu pedido y mejorar tu experiencia en nuestra aplicación.",
            icon: "fas fa-shield-alt"
        },
        {
            id: 8,
            titulo: "8. RESPONSABILIDAD",
            descripcion: "Sweet Cream Rose no se hace responsable por retrasos o incidencias ocasionadas por terceros (servicio de delivery, proveedores o fuerza mayor).",
            icon: "fas fa-balance-scale"
        },
        {
            id: 9,
            titulo: "9. MODIFICACIONES",
            descripcion: "Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones serán publicadas en la aplicación.",
            icon: "fas fa-pen-square"
        },
        {
            id: 10,
            titulo: "10. CONTACTO",
            descripcion: "Para cualquier consulta, puedes escribirnos a través de nuestros canales de atención disponibles en la aplicación.",
            icon: "fas fa-heart"
        }
    ];

    return (
        <div className="terms-container">
            {/* Botón de retroceso */}
            <div className="terms-back-row">
                <button className="terms-back-btn" onClick={() => setPage('inicio')}>
                    <i className="fas fa-arrow-left"></i>
                </button>
            </div>

            {/* Encabezado Principal */}
            <div className="terms-header">
                <h2>TÉRMINOS Y CONDICIONES</h2>
                <div className="terms-deco">
                    <span className="terms-hearts">═══🧡═══</span>
                </div>
                <p className="terms-subtitle">
                    Al utilizar nuestra aplicación y realizar compras en Sweet Cream Rose, aceptas <br />
                    los siguientes términos y condiciones:
                </p>
            </div>

            {/* Caja Unificada de Términos (Borde redondeado de las imágenes) */}
            <div className="terms-box">
                {terminosData.map((item) => (
                    <div className="terms-item" key={item.id}>
                        <div className="terms-icon-wrapper">
                            <div className="terms-icon-circle">
                                <i className={item.icon}></i>
                            </div>
                        </div>
                        <div className="terms-text-content">
                            <h3>{item.titulo}</h3>
                            <p>{item.descripcion}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TerminosCondiciones;
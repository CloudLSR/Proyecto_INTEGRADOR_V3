import React from 'react';
import './PoliticasPrivacidad.css';

const PoliticasPrivacidad = ({ setPage }) => {
    const politicasData = [
        {
            id: 1,
            titulo: "1. INFORMACIÓN QUE RECOPILAMOS",
            descripcion: "Recopilamos información personal que nos proporcionas al registrarte, realizar compras o contactarnos, como nombre, correo electrónico, teléfono y dirección de entrega.",
            icon: "fas fa-user-shield"
        },
        {
            id: 2,
            titulo: "2. USO DE TU INFORMACIÓN",
            descripcion: "Utilizamos tu información para procesar pedidos, realizar entregas, mejorar tu experiencia en la aplicación y enviarte comunicaciones relacionadas con tus pedidos u ofertas.",
            icon: "fas fa-folder-open"
        },
        {
            id: 3,
            titulo: "3. PROTECCIÓN DE TU INFORMACIÓN",
            descripcion: "Podrás realizar el seguimiento de tu pedido en tiempo real a través del sistema de la plataforma de delivery, donde se mostrará el estado y ubicación del repartidor.",
            icon: "fas fa-shield-alt"
        },
        {
            id: 4,
            titulo: "4. COMPARTIR INFORMACIÓN",
            descripcion: "No vendemos ni alquilamos tu información personal. Podemos compartirla con servicios externos únicamente para procesar pagos o realizar entregas (ej. plataformas de delivery).",
            icon: "fas fa-share-alt"
        },
        {
            id: 5,
            titulo: "5. COOKIES Y TECNOLOGÍAS SIMILARES",
            descripcion: "Usamos cookies y tecnologías similares para mejorar tu navegación, recordar tus preferencias y analizar el uso de nuestra aplicación. Puedes desactivar las cookies desde la configuración de tu dispositivo.",
            icon: "fas fa-cookie-bite"
        },
        {
            id: 6,
            titulo: "6. TUS DERECHOS",
            descripcion: "Tienes derecho a acceder, corregir o eliminar tu información personal. Si deseas ejercer alguno de estos derechos, contáctanos a través de nuestros canales de atención.",
            icon: "fas fa-trash-alt"
        },
        {
            id: 7,
            titulo: "7. CAMBIOS EN LA POLÍTICA",
            descripcion: "Podemos actualizar esta política de privacidad en cualquier momento. Te notificaremos sobre cambios importantes a través de la aplicación o por correo electrónico.",
            icon: "fas fa-file-signature"
        },
        {
            id: 8,
            titulo: "8. CONTACTO",
            descripcion: "Si tienes dudas sobre esta política de privacidad, puedes escribirnos a info@sweetcreamrose.com o comunicarte a través de nuestros canales de atención en la aplicación.",
            icon: "fas fa-envelope"
        }
    ];

    return (
        <div className="privacy-container">
            {/* Botón Volver */}
            <div className="privacy-back-row">
                <button className="privacy-back-btn" onClick={() => setPage('inicio')}>
                    <i className="fas fa-arrow-left"></i>
                </button>
            </div>

            {/* Encabezado */}
            <div className="privacy-header">
                <h2>POLÍTICAS DE PRIVACIDAD</h2>
                <div className="privacy-deco">
                    <span className="privacy-hearts">═══🧡═══</span>
                </div>
                <p className="privacy-subtitle">
                    En Sweet Cream Rose, tu privacidad es muy importante para nosotros. Esta<br />
                    política explica cómo recopilamos, usamos y protegemos tu información.
                </p>
            </div>

            {/* Bloque Principal de Políticas */}
            <div className="privacy-box">
                {politicasData.map((item) => (
                    <div className="privacy-item" key={item.id}>
                        <div className="privacy-icon-wrapper">
                            <div className="privacy-icon-circle">
                                <i className={item.icon}></i>
                            </div>
                        </div>
                        <div className="privacy-text-content">
                            <h3>{item.titulo}</h3>
                            <p>{item.descripcion}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Banner Destacado Inferior de Confianza */}
            <div className="privacy-trust-banner">
                <div className="privacy-trust-icon">
                    <i className="fas fa-user-lock"></i>
                </div>
                <div className="privacy-trust-text">
                    <h4>Tu confianza es nuestro ingrediente principal</h4>
                    <p>Gracias por permitirnos ser parte de tus momentos más dulces.</p>
                </div>
            </div>
        </div>
    );
};

export default PoliticasPrivacidad;
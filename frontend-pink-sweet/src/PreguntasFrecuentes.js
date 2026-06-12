import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PreguntasFrecuentes.css';

// Componente hijo que mantiene tu función original de despliegue individual con useState
const FAQItem = ({ pregunta, respuesta, icon }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`faq-item ${isOpen ? 'active' : ''}`}>
            {/* Al hacer clic, se sigue alternando el estado de isOpen */}
            <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
                <span className="faq-title-wrapper">
                    <div className="faq-icon-circle">
                        <i className={icon}></i>
                    </div>
                    {pregunta}
                </span>
                <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} faq-arrow`}></i>
            </div>
            {/* Si isOpen es true, se renderiza la respuesta */}
            {isOpen && (
                <div className="faq-answer">
                    <p>{respuesta}</p>
                </div>
            )}
        </div>
    );
};

const PreguntasFrecuentes = () => {
    const navigate = useNavigate();

    // Datos reales estructurados con los iconos correspondientes para cada pregunta
    const data = [
        { 
            pregunta: "¿Cómo puedo realizar un pedido?", 
            respuesta: "Puedes realizar tu pedido explorando nuestro catálogo en la sección de Productos. Selecciona tus postres favoritos, añádelos al carrito y sigue los pasos para completar tus datos de entrega y el pago. También puedes escribirnos directamente por WhatsApp si deseas una atención personalizada.", 
            icon: "fas fa-shopping-bag" 
        },
        { 
            pregunta: "¿Cuáles son los métodos de pago disponibles?", 
            respuesta: "Aceptamos pagos con tarjetas de crédito y débito (Visa, Mastercard, Amex), transferencias bancarias directas y los principales aplicativos móviles de pago en Perú como Yape y Plin.", 
            icon: "fas fa-credit-card" 
        },
        { 
            pregunta: "¿Con cuánta anticipación debo hacer mi pedido?", 
            respuesta: "Para postres y pasteles del catálogo regular, puedes hacer tu pedido el mismo día sujeto a disponibilidad de delivery. Para pasteles personalizados o pedidos de eventos grandes, te recomendamos solicitarlos con un mínimo de 48 a 72 horas de anticipación.", 
            icon: "fas fa-clock" 
        },
        { 
            pregunta: "¿Tienen tienda física donde pueda recoger mi pedido?", 
            respuesta: "¡Sí! Puedes visitarnos y recoger tus pedidos directamente en nuestra sucursal de Los Olivos, ubicada en la Av. Los Próceres de Huandoy - Mz.33A Lt.13. Asegúrate de seleccionar la opción 'Recojo en tienda' al finalizar tu compra.", 
            icon: "fas fa-store" 
        },
        { 
            pregunta: "¿Cómo se realizan los envíos a domicilio?", 
            respuesta: "Los envíos se realizan mediante plataformas de delivery externas autorizadas que garantizan la rapidez del traslado. Todos nuestros postres viajan protegidos con un empaque especial de doble caja para asegurar que lleguen intactos a tu mesa.", 
            icon: "fas fa-motorcycle" 
        },
        { 
            pregunta: "¿Qué pasa si mi pedido llega dañado o incorrecto?", 
            respuesta: "Tu satisfacción es nuestra prioridad. Si hay algún inconveniente con el estado de tus postres o los productos recibidos, contáctanos de inmediato a nuestro WhatsApp de atención adjuntando una foto del empaque para darte una solución rápida o gestionar un cambio.", 
            icon: "fas fa-shield-alt" 
        }
    ];

    return (
        <div className="faq-container">
            {/* Botón Volver con navegación nativa de React Router */}
            <div className="faq-back-row">
                <button className="faq-back-btn" onClick={() => navigate('/')}>
                    <i className="fas fa-arrow-left"></i>
                </button>
            </div>

            {/* Encabezado Principal */}
            <div className="faq-header">
                <h2>PREGUNTAS FRECUENTES</h2>
                <div className="faq-deco">
                    <span className="faq-hearts">═══🧡═══</span>
                </div>
                <p className="faq-subtitle">
                    ¿Tienes dudas? Aquí encontrarás las respuestas a las consultas más comunes<br />
                    sobre nuestros postres, pedidos y políticas de atención.
                </p>
            </div>

            {/* Lista de Acordeones */}
            <div className="faq-list">
                {data.map((item, index) => (
                    <FAQItem key={index} {...item} />
                ))}
            </div>

            {/* Caja de contacto inferior */}
            <div className="contact-box">
                <div className="contact-box-text">
                    <h3>¿Aún tienes alguna duda?</h3>
                    <p>Si no encontraste lo que buscabas, nuestro equipo dulce está listo para ayudarte en tiempo real.</p>
                </div>
                <a 
                    href="https://wa.me/51992376537" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-whatsapp-btn"
                >
                    Contáctanos
                </a>
            </div>
        </div>
    );
};

export default PreguntasFrecuentes;
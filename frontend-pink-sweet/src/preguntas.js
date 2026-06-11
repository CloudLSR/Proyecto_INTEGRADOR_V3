import React, { useState } from 'react';
import './PreguntasFrecuentes.css';

const FAQItem = ({ pregunta, respuesta, icon }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`faq-item ${isOpen ? 'active' : ''}`}>
            <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
                <span><i className={icon}></i> {pregunta}</span>
                <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
            </div>
            {isOpen && <div className="faq-answer"><p>{respuesta}</p></div>}
        </div>
    );
};

const PreguntasFrecuentes = () => {
    const data = [
        { pregunta: "¿Cómo puedo realizar un pedido?", respuesta: "Puedes realizar tu pedido a través de nuestra tienda online...", icon: "fas fa-shopping-bag" },
        { pregunta: "¿Cómo puedo realizar un pedido?", respuesta: "Puedes realizar tu pedido a través de nuestra tienda online...", icon: "fas fa-shopping-bag" },
        { pregunta: "¿Cómo puedo realizar un pedido?", respuesta: "Puedes realizar tu pedido a través de nuestra tienda online...", icon: "fas fa-shopping-bag" },
        { pregunta: "¿Cómo puedo realizar un pedido?", respuesta: "Puedes realizar tu pedido a través de nuestra tienda online...", icon: "fas fa-shopping-bag" },
        { pregunta: "¿Cómo puedo realizar un pedido?", respuesta: "Puedes realizar tu pedido a través de nuestra tienda online...", icon: "fas fa-shopping-bag" },
        { pregunta: "¿Cómo puedo realizar un pedido?", respuesta: "Puedes realizar tu pedido a través de nuestra tienda online...", icon: "fas fa-shopping-bag" },
        { pregunta: "¿Cómo puedo realizar un pedido?", respuesta: "Puedes realizar tu pedido a través de nuestra tienda online...", icon: "fas fa-shopping-bag" }

        // Agrega aquí el resto de tus preguntas
    ];

    return (
        <div className="faq-container">
            <h2>Preguntas Frecuentes</h2>
            {data.map((item, index) => <FAQItem key={index} {...item} />)}
        </div>
    );
};

export default PreguntasFrecuentes;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PoliticasEnvio.css';

const PoliticasEnvio = () => {
    const navigate = useNavigate(); // Hook para la navegación nativa de React Router

    return (
        <div className="shipping-container">
            

            {/* Encabezado */}
            <div className="shipping-header">
                <h2>POLÍTICAS DE ENVÍO</h2>
                <div className="shipping-deco">
                    <span className="shipping-hearts">═══🧡═══</span>
                </div>
                <p className="shipping-subtitle">
                    Nos aseguramos de que tu pedido llegue en perfectas condiciones para que<br />
                    disfrutes cada detalle de nuestros productos.
                </p>
            </div>

            {/* Contenedor Unificado con Bordes Redondeados */}
            <div className="shipping-box">
                
                {/* SECCIÓN INTERNA 1: Entregas + Imagen de la Moto */}
                <div className="shipping-row-with-img">
                    <div className="shipping-text-block">
                        <div className="shipping-item">
                            <div className="shipping-icon-circle"><i className="fas fa-motorcycle"></i></div>
                            <div className="shipping-text-content">
                                <h3>TIPO DE ENTREGA</h3>
                                <p>El envío es realizado mediante una plataforma de delivery externa (como Rappi), sujeto a disponibilidad en la zona.</p>
                            </div>
                        </div>
                        <div className="shipping-item border-top-light">
                            <div className="shipping-icon-circle"><i className="fas fa-shipping-fast"></i></div>
                            <div className="shipping-text-content">
                                <h3>TIEMPO DE ENTREGA</h3>
                                <p>El tiempo estimado de entrega puede variar según la distancia, el tráfico y las condiciones del servicio de delivery.<br />
                                <span className="highlight-text-rose">Tiempo referencial: entre 25 y 40 minutos.</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. SEGUIMIENTO DEL PEDIDO */}
                <div className="shipping-item item-full-width border-top-solid">
                    <div className="shipping-icon-circle"><i className="fas fa-map-marker-alt"></i></div>
                    <div className="shipping-text-content">
                        <h3>SEGUIMIENTO DEL PEDIDO</h3>
                        <p>Podrás realizar el seguimiento de tu pedido en tiempo real a través del sistema de la plataforma de delivery, donde se mostrará el estado y ubicación del repartidor.</p>
                    </div>
                </div>

                {/* SECCIÓN INTERNA 2: Empaque + Imagen de la Caja Rosada */}
                <div className="shipping-row-with-img border-top-solid">
                    <div className="shipping-text-block">
                        <div className="shipping-item">
                            <div className="shipping-icon-circle"><i className="fas fa-box-open"></i></div>
                            <div className="shipping-text-content">
                                <h3>EMPAQUE DEL PRODUCTO</h3>
                                <p>Todos nuestros productos son empacados cuidadosamente utilizando un sistema de doble protección:</p>
                                <ul className="shipping-list">
                                    <li>Una caja interna decorada que contiene el producto.</li>
                                    <li>Una caja externa resistente que protege el traslado.</li>
                                </ul>
                                <p>Esto nos permite conservar la calidad y presentación del postre durante el envío.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. RESPONSABILIDAD */}
                <div className="shipping-item item-full-width border-top-solid">
                    <div className="shipping-icon-circle"><i className="fas fa-shield-alt"></i></div>
                    <div className="shipping-text-content">
                        <h3>RESPONSABILIDAD</h3>
                        <p>Nos responsabilizamos por la correcta preparación y embalaje del producto. El servicio de transporte es responsabilidad de la plataforma de delivery.</p>
                    </div>
                </div>

                {/* 6. CONDICIONES DE ENTREGA */}
                <div className="shipping-item item-full-width border-top-solid">
                    <div className="shipping-icon-circle"><i className="fas fa-user-check"></i></div>
                    <div className="shipping-text-content">
                        <h3>CONDICIONES DE ENTREGA</h3>
                        <p>Es responsabilidad del cliente brindar una dirección correcta y estar disponible al momento de la entrega para recibir el pedido.</p>
                    </div>
                </div>

                {/* 7. COBERTURA */}
                <div className="shipping-item item-full-width border-top-solid">
                    <div className="shipping-icon-circle"><i className="fas fa-map-marked-alt"></i></div>
                    <div className="shipping-text-content">
                        <h3>COBERTURA</h3>
                        <p>El servicio de envío está disponible únicamente en zonas cercanas y dentro del área de cobertura de la plataforma de delivery.</p>
                    </div>
                </div>

                {/* 8. COSTO DE ENVÍO */}
                <div className="shipping-item item-full-width border-top-solid">
                    <div className="shipping-icon-circle"><i className="fas fa-dollar-sign"></i></div>
                    <div className="shipping-text-content">
                        <h3>COSTO DE ENVÍO</h3>
                        <p>El costo de envío será determinado por la plataforma de delivery según la distancia y ubicación del cliente.</p>
                    </div>
                </div>

            </div>

            {/* Banner Inferior */}
            <div className="shipping-love-banner">
                <div className="shipping-love-icon">
                    <i className="fas fa-shipping-fast"></i>
                </div>
                <div className="shipping-love-text">
                    <h4>Nuestros postres viajan con amor</h4>
                    <p>Para que lleguen tan perfectos como salieron de nuestra repostería.</p>
                </div>
            </div>
        </div>
    );
};

export default PoliticasEnvio;
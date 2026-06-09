import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import cupcakeImg from './assets/cupcake_grafico.png';
import candadoRosa2Img from './assets/candadoRosa_2.png';
import candadoGrisImg from './assets/candadoGris.png';
import ojoGrisImg from './assets/ojoGris.png';

function CambiarPassword3() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [verPass, setVerPass] = useState(false);
    const [verConfirmar, setVerConfirmar] = useState(false);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const correo = localStorage.getItem('correo_recuperacion') || '';

    // ── Validaciones en tiempo real ──
    const tiene8 = password.length >= 8;
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);

    const handleActualizar = async () => {
        setError('');
        if (!tiene8 || !tieneMayuscula || !tieneNumero) {
            setError('La contraseña no cumple los requisitos.');
            return;
        }
        if (password !== confirmar) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        setCargando(true);
        try {
            const res = await fetch('http://localhost:8081/api/auth/nueva-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, password }),
            });
            if (res.ok) {
                navigate('/cambiar-password-4');
            } else {
                const data = await res.json();
                setError(data.mensaje || 'Error al actualizar la contraseña.');
            }
        } catch {
            setError('No se pudo conectar al servidor.');
        } finally {
            setCargando(false);
        }
    };

    return (
    <div className="auth-overlay">
        <div className="auth-card">

        {/* ── Panel rosado izquierdo ── */}
        <div className="panel-left">
            <h2 className="welcome-title">
                Bienvenido a<br />
                <span>Sweet Cream Rose</span>
            </h2>
            <div className="panel-middle">
                <img src={cupcakeImg} alt="Postre" className="food-img" />
                <p className="welcome-desc">
                    Donde Más que una torta, creamos momentos dulces que acompañan
                    tus mejores celebraciones, con sabor, dedicación y un toque de
                    felicidad en cada porción.
                </p>
            </div>
            <button className="btn-outline" onClick={() => navigate('/registro')}>
                Regístrase
            </button>
        </div>

        {/* ── Panel blanco derecho ── */}
        <div className="panel-right">
            <div className="form-content">

            <button className="back-link" onClick={() => navigate('/cambiar-password-2')}>
                ← Volver
            </button>

            <img src={candadoRosa2Img} alt="Candado" className="recover-icon-img" />

            <h2 className="form-title">Crear nueva contraseña</h2>

            <p className="hint-text" style={{ color: '#888' }}>
                Ingresa tu nueva contraseña para acceder a tu cuenta.
            </p>

            {error && <div className="error-msg">{error}</div>}

            {/* Nueva contraseña */}
            <label className="input-label">Nueva contraseña</label>
            <div className="input-icon-wrap">
                <img src={candadoGrisImg} alt="candado" className="input-icon-img" style={{ width: '55px', height: '55px', top: '45%', transform: 'translateY(-50%)' }} />
                <input
                    className="auth-input with-icon with-icon-right"
                    type={verPass ? 'text' : 'password'}
                    placeholder="••••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ height: '55px', paddingLeft: '4rem', paddingRight: '4rem' }}
                />
                <img src={ojoGrisImg} alt="ver" className="input-icon-right" style={{ width: '75px', height: '75px', top: '45%', transform: 'translateY(-50%)' }} onClick={() => setVerPass(!verPass)} />
                </div>

            {/* Confirmar contraseña */}
            <label className="input-label">Nueva contraseña</label>
            <div className="input-icon-wrap">
                <img src={candadoGrisImg} alt="candado" className="input-icon-img" style={{ width: '55px', height: '55px', top: '45%', transform: 'translateY(-50%)' }} />
                <input
                    className="auth-input with-icon with-icon-right"
                    type={verConfirmar ? 'text' : 'password'}
                    placeholder="••••••••••"
                    value={confirmar}
                    onChange={e => setConfirmar(e.target.value)}
                    style={{ height: '55px', paddingLeft: '4.5rem', paddingRight: '4rem' }}
                />
                <img src={ojoGrisImg} alt="ver" className="input-icon-right" style={{ width: '75px', height: '75px', top: '45%', transform: 'translateY(-50%)' }} onClick={() => setVerConfirmar(!verConfirmar)} />
            </div>

            {/* Caja de validaciones */}
            <div className="validaciones-box">
                <p className="validaciones-titulo">Tu contraseña de contener:</p>
                <div className={`validacion-item ${tiene8 ? 'ok' : ''}`}>
                    <span className="validacion-check">{tiene8 ? '✅' : '⬜'}</span>
                    Mínimo 8 caracteres
                </div>
                <div className={`validacion-item ${tieneMayuscula ? 'ok' : ''}`}>
                    <span className="validacion-check">{tieneMayuscula ? '✅' : '⬜'}</span>
                    Al menos una mayúscula
                </div>
                <div className={`validacion-item ${tieneNumero ? 'ok' : ''}`}>
                    <span className="validacion-check">{tieneNumero ? '✅' : '⬜'}</span>
                    Al menos un número
                </div>
            </div>

            <button
                className="btn-main"
                onClick={handleActualizar}
                disabled={cargando}
            >
                {cargando ? 'Actualizando...' : 'Actualizar contraseña'}
            </button>

            </div>
        </div>

        </div>
    </div>
    );
}

export default CambiarPassword3;
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import cupcakeImg from './assets/cupcake_grafico.png';
import mensajeRosaImg from './assets/mensajeRosa.png';

function CambiarPassword2() {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [segundos, setSegundos] = useState(48);
  const inputsRef = useRef([]);

  const correo = localStorage.getItem('correo_recuperacion') || 'user@sweetcreamrose.com';

  // ── Temporizador regresivo ──
  useEffect(() => {
    if (segundos <= 0) return;
    const timer = setInterval(() => {
      setSegundos(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [segundos]);

  const formatTiempo = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const seg = (s % 60).toString().padStart(2, '0');
    return `(${m}:${seg})`;
  };

  // ── Manejar entrada en cada cajita ──
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const nuevo = [...codigo];
    nuevo[index] = value;
    setCodigo(nuevo);
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // ── Manejar backspace ──
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !codigo[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // ── Reenviar código ──
  const handleReenviar = () => {
    if (segundos > 0) return;
    setSegundos(48);
    setCodigo(['', '', '', '', '', '']);
    fetch('http://localhost:8081/api/auth/recuperar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo }),
    }).catch(() => {});
  };

  // ── Verificar código ──
  const handleVerificar = async () => {
    const codigoCompleto = codigo.join('');
    if (codigoCompleto.length < 6) {
      setError('Por favor ingresa el código completo de 6 dígitos.');
      return;
    }
    setError('');
    setCargando(true);
    try {
      const res = await fetch('http://localhost:8081/api/auth/verificar-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, codigo: codigoCompleto }),
      });
      if (res.ok) {
        navigate('/cambiar-password-3');
      } else {
        const data = await res.json();
        setError(data.mensaje || 'Código incorrecto. Intenta nuevamente.');
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

            <button className="back-link" onClick={() => navigate('/cambiar-password-1')}>
              ← Volver
            </button>

            <img src={mensajeRosaImg} alt="Mensaje" className="recover-icon-img" />

            <h2 className="form-title">Verificar código</h2>

            <p className="hint-text" style={{ color: '#888' }}>
                Hemos enviado un código de verificación a<br />
                <span style={{ color: '#b86b6b', fontWeight: '600' }}>{correo}</span>
            </p>
            <p className="hint-text" style={{ color: '#888' }}>
                Ingresa el código de 6 dígitos continuar.
            </p>

            {error && <div className="error-msg">{error}</div>}

            {/* 6 cajitas del código */}
            <div className="codigo-boxes">
                {codigo.map((val, i) => (
                <input
                    key={i}
                    ref={el => inputsRef.current[i] = el}
                    className="codigo-input"
                    type="text"
                    maxLength={1}
                    value={val}
                    onChange={e => handleChange(e.target.value, i)}
                    onKeyDown={e => handleKeyDown(e, i)}
                />
              ))}
            </div>

            {/* Reenviar código + temporizador */}
            <p className="hint-text" style={{ color: '#888', marginTop: '12px' }}>
                ¿No recibiste el código?
            </p>
            <div className="reenviar-row">
                <button
                className="link-btn"
                onClick={handleReenviar}
                disabled={segundos > 0}
                style={{ opacity: segundos > 0 ? 0.5 : 1 }}
                >
                Reenviar código
                </button>
                <span className="timer-text">{formatTiempo(segundos)}</span>
            </div>

            <button
                className="btn-main"
                onClick={handleVerificar}
                disabled={cargando}
            >
                {cargando ? 'Verificando...' : 'Verificar código'}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default CambiarPassword2;
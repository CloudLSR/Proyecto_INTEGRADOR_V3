import React, { useState, useEffect } from "react";
import { apiGet } from "./api";

const PERIODOS = [
  { id: "mes", label: "Este mes", path: "/api/admin/ventas/mes" },
  { id: "semana", label: "Esta semana", path: "/api/admin/ventas/semana" },
  { id: "anio", label: "Este año", path: "/api/admin/ventas/anio" },
];
const MARGEN = 0.65; // margen estimado sobre ingresos

const AdminMenu8 = () => {
  const [periodo, setPeriodo] = useState("mes");
  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setCargando(true);
    apiGet(PERIODOS.find(x => x.id === periodo).path)
      .then(d => { setData(d); setError(""); })
      .catch(() => setError("No se pudieron cargar las ganancias."))
      .finally(() => setCargando(false));
  }, [periodo]);

  const ingresos = Number(data?.totalIngresos || 0);
  const ganancia = ingresos * MARGEN;
  const costos = ingresos - ganancia;

  const kpis = [
    { etiqueta: "Ingresos", valor: `S/ ${ingresos.toFixed(2)}`, icon: "fa-solid fa-sack-dollar", color: "#27AE60", border: "#A9DFBF" },
    { etiqueta: "Ganancia estimada", valor: `S/ ${ganancia.toFixed(2)}`, icon: "fa-solid fa-arrow-trend-up", color: "#F194B4", border: "#FADADD" },
    { etiqueta: "Costos estimados", valor: `S/ ${costos.toFixed(2)}`, icon: "fa-solid fa-receipt", color: "#F2C94C", border: "#FDE49E" },
    { etiqueta: "Órdenes válidas", valor: data?.ordenesValidas ?? 0, icon: "fa-regular fa-circle-check", color: "#6A8BBD", border: "#AED6F1" },
  ];

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%', width: '100%' }}>
      <div style={{ marginBottom: '25px' }}>
        <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 5px 0', textTransform: 'uppercase' }}>GANANCIAS</h1>
        <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>Ganancia estimada a partir de los ingresos (margen {Math.round(MARGEN * 100)}%).</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        {PERIODOS.map(p => (
          <button key={p.id} onClick={() => setPeriodo(p.id)} style={{ border: '1.5px solid #C3666D', background: periodo === p.id ? '#C3666D' : 'white', color: periodo === p.id ? 'white' : '#C3666D', borderRadius: '20px', padding: '8px 22px', fontFamily: 'Poppins-Medium', fontSize: '13px', cursor: 'pointer' }}>{p.label}</button>
        ))}
      </div>

      {cargando && <p style={{ color: '#999', fontFamily: 'Poppins-Regular' }}>Cargando…</p>}
      {error && <p style={{ color: '#C6676D', fontFamily: 'Poppins-Medium' }}>{error}</p>}

      {!cargando && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {kpis.map((k, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', border: `2px solid ${k.border}`, display: 'flex', alignItems: 'center', gap: '20px' }}>
              <i className={k.icon} style={{ fontSize: '34px', color: k.color }}></i>
              <div>
                <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '24px', color: '#5A3E41', margin: 0, lineHeight: 1 }}>{k.valor}</h2>
                <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', margin: '4px 0 0' }}>{k.etiqueta}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMenu8;
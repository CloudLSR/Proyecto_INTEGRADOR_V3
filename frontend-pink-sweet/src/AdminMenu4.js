import React, { useState, useEffect } from "react";
import { apiGet } from "./api";

const PERIODOS = [
  { id: "mes", label: "Este mes", path: "/api/admin/ventas/mes" },
  { id: "semana", label: "Esta semana", path: "/api/admin/ventas/semana" },
  { id: "anio", label: "Este año", path: "/api/admin/ventas/anio" },
];

const AdminMenu4 = () => {
  const [periodo, setPeriodo] = useState("mes");
  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setCargando(true);
    const p = PERIODOS.find(x => x.id === periodo);
    apiGet(p.path)
      .then(d => { setData(d); setError(""); })
      .catch(() => setError("No se pudieron cargar las ventas."))
      .finally(() => setCargando(false));
  }, [periodo]);

  // ventasPorDia puede ser objeto {fecha: total} o arreglo
  const filas = (() => {
    const v = data?.ventasPorDia;
    if (!v) return [];
    if (Array.isArray(v)) return v.map(x => [x.periodo || x.fecha || "", x.total ?? x.totalVentas ?? 0]);
    return Object.entries(v);
  })();

  const exportarCSV = () => {
    const rows = [["Periodo", "Total"], ...filas.map(([k, val]) => [k, val])];
    const csv = rows.map(r => r.map(x => `"${x}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a"); a.href = url; a.download = `ventas_${periodo}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const kpis = [
    { etiqueta: "Ingresos totales", valor: `S/ ${Number(data?.totalIngresos || 0).toFixed(2)}`, icon: "fa-solid fa-sack-dollar", color: "#27AE60", border: "#A9DFBF" },
    { etiqueta: "Órdenes totales", valor: data?.totalOrdenes ?? 0, icon: "fa-solid fa-bag-shopping", color: "#F194B4", border: "#FADADD" },
    { etiqueta: "Órdenes válidas", valor: data?.ordenesValidas ?? 0, icon: "fa-regular fa-circle-check", color: "#6A8BBD", border: "#AED6F1" },
    { etiqueta: "Órdenes canceladas", valor: data?.ordenesCanceladas ?? 0, icon: "fa-regular fa-circle-xmark", color: "#9B59B6", border: "#D7BDE2" },
  ];

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 5px 0', textTransform: 'uppercase' }}>VENTAS</h1>
          <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>Resumen de ingresos y órdenes de tu negocio.</p>
        </div>
        <button onClick={exportarCSV} style={{ backgroundColor: '#FCF0F2', color: '#C3666D', border: '1.5px solid #FADADD', borderRadius: '8px', padding: '10px 20px', fontFamily: 'Poppins-SemiBold', fontSize: '13px', cursor: 'pointer' }}>
          <i className="fa-solid fa-download"></i> Exportar CSV
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        {PERIODOS.map(p => (
          <button key={p.id} onClick={() => setPeriodo(p.id)} style={{ border: '1.5px solid #C3666D', background: periodo === p.id ? '#C3666D' : 'white', color: periodo === p.id ? 'white' : '#C3666D', borderRadius: '20px', padding: '8px 22px', fontFamily: 'Poppins-Medium', fontSize: '13px', cursor: 'pointer' }}>{p.label}</button>
        ))}
      </div>

      {cargando && <p style={{ color: '#999', fontFamily: 'Poppins-Regular' }}>Cargando ventas…</p>}
      {error && <p style={{ color: '#C6676D', fontFamily: 'Poppins-Medium' }}>{error}</p>}

      {!cargando && !error && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '35px' }}>
            {kpis.map((k, i) => (
              <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', border: `2px solid ${k.border}`, display: 'flex', alignItems: 'center', gap: '20px' }}>
                <i className={k.icon} style={{ fontSize: '34px', color: k.color }}></i>
                <div>
                  <h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '26px', color: '#5A3E41', margin: 0, lineHeight: 1 }}>{k.valor}</h2>
                  <p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', margin: '4px 0 0' }}>{k.etiqueta}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #EAEAEA', padding: '25px 30px' }}>
            <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: '0 0 15px 0' }}>Detalle por periodo</h3>
            {filas.length === 0 ? (
              <p style={{ color: '#999', fontFamily: 'Poppins-Regular' }}>Sin datos de ventas en este periodo.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead><tr style={{ borderBottom: '2px solid #FDF2F3' }}>
                  <th style={{ padding: '12px 10px', fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', fontWeight: 'normal' }}>Periodo</th>
                  <th style={{ padding: '12px 10px', fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', fontWeight: 'normal', textAlign: 'right' }}>Total</th>
                </tr></thead>
                <tbody>
                  {filas.map(([k, val], i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F5F5F5' }}>
                      <td style={{ padding: '10px', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#5A3E41' }}>{k}</td>
                      <td style={{ padding: '10px', fontFamily: 'Poppins-SemiBold', fontSize: '13px', color: '#C3666D', textAlign: 'right' }}>S/ {Number(val || 0).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminMenu4;
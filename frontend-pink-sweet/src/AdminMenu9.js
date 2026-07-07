import React, { useState, useEffect } from "react";
import { apiGet } from "./api";

const PERIODOS = [
  { id: "mensual", label: "Mensual", path: "/api/admin/reportes/mensual" },
  { id: "semanal", label: "Semanal", path: "/api/admin/reportes/semanal" },
  { id: "anual", label: "Anual", path: "/api/admin/reportes/anual" },
];

const AdminMenu9 = () => {
  const [periodo, setPeriodo] = useState("mensual");
  const [rep, setRep] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setCargando(true);
    const p = PERIODOS.find(x => x.id === periodo);
    apiGet(p.path)
      .then(d => { setRep(d); setError(""); })
      .catch(() => setError("No se pudieron cargar los reportes."))
      .finally(() => setCargando(false));
  }, [periodo]);

  const ventas = rep?.ventasPorPeriodo || [];
  const top = rep?.topProductos || [];

  const exportarCSV = () => {
    const rows = [["Periodo", "Ordenes", "Total"], ...ventas.map(v => [v.periodo, v.cantidadOrdenes, v.totalVentas])];
    const csv = rows.map(r => r.map(x => `"${x}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a"); a.href = url; a.download = `reporte_${periodo}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '40px 50px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', minHeight: '100%', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontFamily: 'Poppins-Bold', fontSize: '22px', color: '#5A3E41', margin: '0 0 5px 0', textTransform: 'uppercase' }}>REPORTES</h1>
          <p style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#777', margin: 0 }}>Análisis de ventas y productos destacados.</p>
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

      {cargando && <p style={{ color: '#999', fontFamily: 'Poppins-Regular' }}>Cargando reportes…</p>}
      {error && <p style={{ color: '#C6676D', fontFamily: 'Poppins-Medium' }}>{error}</p>}

      {!cargando && !error && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '30px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', border: '2px solid #A9DFBF', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <i className="fa-solid fa-sack-dollar" style={{ fontSize: '34px', color: '#27AE60' }}></i>
              <div><h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '26px', color: '#5A3E41', margin: 0 }}>S/ {Number(rep?.totalGeneral || 0).toFixed(2)}</h2><p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', margin: '4px 0 0' }}>Total general</p></div>
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', border: '2px solid #FADADD', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <i className="fa-solid fa-bag-shopping" style={{ fontSize: '34px', color: '#F194B4' }}></i>
              <div><h2 style={{ fontFamily: 'Poppins-Bold', fontSize: '26px', color: '#5A3E41', margin: 0 }}>{rep?.totalOrdenes ?? 0}</h2><p style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#777', margin: '4px 0 0' }}>Órdenes totales</p></div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #EAEAEA', padding: '25px 30px' }}>
              <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: '0 0 15px 0' }}>Ventas por periodo</h3>
              {ventas.length === 0 ? <p style={{ color: '#999', fontFamily: 'Poppins-Regular' }}>Sin datos.</p> : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead><tr style={{ borderBottom: '2px solid #FDF2F3' }}>
                    <th style={{ padding: '10px', textAlign: 'left', fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#777', fontWeight: 'normal' }}>Periodo</th>
                    <th style={{ padding: '10px', textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#777', fontWeight: 'normal' }}>Órdenes</th>
                    <th style={{ padding: '10px', textAlign: 'right', fontFamily: 'Poppins-Medium', fontSize: '12px', color: '#777', fontWeight: 'normal' }}>Total</th>
                  </tr></thead>
                  <tbody>{ventas.map((v, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F5F5F5' }}>
                      <td style={{ padding: '10px', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#5A3E41' }}>{v.periodo}</td>
                      <td style={{ padding: '10px', textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: '13px', color: '#5A3E41' }}>{v.cantidadOrdenes}</td>
                      <td style={{ padding: '10px', textAlign: 'right', fontFamily: 'Poppins-SemiBold', fontSize: '13px', color: '#C3666D' }}>S/ {Number(v.totalVentas || 0).toFixed(2)}</td>
                    </tr>
                  ))}</tbody>
                </table>
              )}
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #EAEAEA', padding: '25px 30px' }}>
              <h3 style={{ fontFamily: 'Poppins-Bold', fontSize: '16px', color: '#5A3E41', margin: '0 0 15px 0' }}>Productos más vendidos</h3>
              {top.length === 0 ? <p style={{ color: '#999', fontFamily: 'Poppins-Regular' }}>Sin datos.</p> : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {top.map((t, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontFamily: 'Poppins-Bold', color: '#C3666D', width: '18px' }}>{i + 1}</span>
                        <span style={{ fontFamily: 'Poppins-Medium', fontSize: '13px', color: '#5A3E41' }}>{t.nombreProducto}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'Poppins-Regular', fontSize: '12px', color: '#777' }}>{t.cantidadVendida} uds</div>
                        <div style={{ fontFamily: 'Poppins-SemiBold', fontSize: '13px', color: '#5A3E41' }}>S/ {Number(t.totalGenerado || 0).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminMenu9;
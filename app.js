const PRESETS = {
  "uni-sistemas":          { pension: 300,  salario: 4778, ciclos: 10 },
  "unmsm-sistemas":        { pension: 200,  salario: 4200, ciclos: 10 },
  "unmsm-economia":        { pension: 200,  salario: 3971, ciclos: 10 },
  "unmsm-admin":           { pension: 200,  salario: 3200, ciclos: 10 },
  "unmsm-comunicaciones":  { pension: 200,  salario: 1900, ciclos: 10 },
  "villarreal-sistemas":   { pension: 250,  salario: 3500, ciclos: 10 },
  "villarreal-admin":      { pension: 250,  salario: 2800, ciclos: 10 },
  "pacifico-economia":     { pension: 2200, salario: 5940, ciclos: 10 },
  "pacifico-admin":        { pension: 2200, salario: 5283, ciclos: 10 },
  "pucp-sistemas":         { pension: 2500, salario: 4895, ciclos: 10 },
  "pucp-economia":         { pension: 2500, salario: 5183, ciclos: 10 },
  "ulima-economia":        { pension: 2400, salario: 5015, ciclos: 10 },
  "ulima-admin":           { pension: 2400, salario: 4755, ciclos: 10 },
  "ulima-comunicaciones":  { pension: 2400, salario: 2028, ciclos: 10 },
  "utec-sistemas":         { pension: 2400, salario: 4700, ciclos: 10 },
  "upc-sistemas":          { pension: 2800, salario: 4711, ciclos: 10 },
  "upc-admin":             { pension: 2800, salario: 3031, ciclos: 10 },
  "upc-comunicaciones":    { pension: 2800, salario: 2028, ciclos: 10 },
};

const DB = [
  { uni: "UNI",         tipo: "publica",  carrera: "Ing. Sistemas",   pension: 300,  costo: 9000,  salario: 4778, eq: 0.2, roi: "green" },
  { uni: "UNMSM",       tipo: "publica",  carrera: "Ing. Sistemas",   pension: 200,  costo: 6000,  salario: 4200, eq: 0.1, roi: "green" },
  { uni: "Villarreal",  tipo: "publica",  carrera: "Ing. Sistemas",   pension: 250,  costo: 7500,  salario: 3500, eq: 0.2, roi: "green" },
  { uni: "UNMSM",       tipo: "publica",  carrera: "Economía",        pension: 200,  costo: 6000,  salario: 3971, eq: 0.1, roi: "green" },
  { uni: "UNMSM",       tipo: "publica",  carrera: "Administración",  pension: 200,  costo: 6000,  salario: 3200, eq: 0.2, roi: "green" },
  { uni: "Villarreal",  tipo: "publica",  carrera: "Administración",  pension: 250,  costo: 7500,  salario: 2800, eq: 0.2, roi: "green" },
  { uni: "UNMSM",       tipo: "publica",  carrera: "Comunicaciones",  pension: 200,  costo: 6000,  salario: 1900, eq: 0.3, roi: "green" },
  { uni: "PUCP",        tipo: "privada",  carrera: "Ing. Sistemas",   pension: 2500, costo: 150000,salario: 4895, eq: 2.6, roi: "green" },
  { uni: "UTEC",        tipo: "privada",  carrera: "Ing. Sistemas",   pension: 2400, costo: 144000,salario: 4700, eq: 2.6, roi: "green" },
  { uni: "UPC",         tipo: "privada",  carrera: "Ing. Sistemas",   pension: 2800, costo: 168000,salario: 4711, eq: 3.0, roi: "amber" },
  { uni: "U. Pacífico", tipo: "premium",  carrera: "Economía",        pension: 2200, costo: 132000,salario: 5940, eq: 1.9, roi: "green" },
  { uni: "PUCP",        tipo: "privada",  carrera: "Economía",        pension: 2500, costo: 150000,salario: 5183, eq: 2.4, roi: "green" },
  { uni: "U. Lima",     tipo: "privada",  carrera: "Economía",        pension: 2400, costo: 144000,salario: 5015, eq: 2.4, roi: "green" },
  { uni: "UPC",         tipo: "privada",  carrera: "Economía",        pension: 2800, costo: 168000,salario: 5036, eq: 2.8, roi: "green" },
  { uni: "U. Pacífico", tipo: "premium",  carrera: "Administración",  pension: 2200, costo: 132000,salario: 5283, eq: 2.1, roi: "green" },
  { uni: "U. Lima",     tipo: "privada",  carrera: "Administración",  pension: 2400, costo: 144000,salario: 4755, eq: 2.5, roi: "green" },
  { uni: "UPC",         tipo: "privada",  carrera: "Administración",  pension: 2800, costo: 168000,salario: 3031, eq: 4.6, roi: "red"   },
  { uni: "U. Lima",     tipo: "privada",  carrera: "Comunicaciones",  pension: 2400, costo: 144000,salario: 2028, eq: 5.9, roi: "red"   },
  { uni: "U. Pacífico", tipo: "premium",  carrera: "Comunicaciones",  pension: 2200, costo: 132000,salario: 2028, eq: 5.4, roi: "red"   },
  { uni: "UPC",         tipo: "privada",  carrera: "Comunicaciones",  pension: 2800, costo: 168000,salario: 2028, eq: 6.9, roi: "red"   },
];

function fmt(n) {
  return "S/ " + Math.round(n).toLocaleString("es-PE");
}

function applyPreset() {
  const key = document.getElementById("uni-preset").value;
  if (!key || !PRESETS[key]) return;
  const p = PRESETS[key];
  document.getElementById("pension").value   = p.pension;
  document.getElementById("salario").value   = p.salario;
  document.getElementById("ciclos").value    = p.ciclos;
  calculate();
}

function updateMeses() {
  const v = document.getElementById("meses").value;
  document.getElementById("meses-val").textContent = v + " meses";
}

function calculate() {
  const pension     = parseFloat(document.getElementById("pension").value)    || 0;
  const salario     = parseFloat(document.getElementById("salario").value)    || 0;
  const ciclos      = parseInt(document.getElementById("ciclos").value)       || 10;
  const crecimiento = parseFloat(document.getElementById("crecimiento").value) / 100 || 0.05;
  const meses       = parseInt(document.getElementById("meses").value)        || 5;

  if (!pension || !salario) {
    document.getElementById("result-empty").classList.remove("hidden");
    document.getElementById("result-content").classList.add("hidden");
    return;
  }

  const costo     = pension * ciclos * meses;
  const ingAnual  = salario * 12;
  const equilibrio = crecimiento > 0
    ? Math.log(1 + (costo * crecimiento) / ingAnual) / Math.log(1 + crecimiento)
    : costo / ingAnual;

  const roi5  = salario * (((1 + crecimiento) ** 5  - 1) / crecimiento) * 12 - costo;
  const roi10 = salario * (((1 + crecimiento) ** 10 - 1) / crecimiento) * 12 - costo;

  let verdict, verdictClass, emoji;
  if (equilibrio < 1) {
    verdict = "ROI excepcional — recuperas en menos de 1 año";
    verdictClass = "green"; emoji = "🟢";
  } else if (equilibrio < 3) {
    verdict = "ROI bueno — recuperas en " + equilibrio.toFixed(1) + " años";
    verdictClass = "green"; emoji = "🟢";
  } else if (equilibrio < 6) {
    verdict = "ROI moderado — " + equilibrio.toFixed(1) + " años para recuperar";
    verdictClass = "amber"; emoji = "🟡";
  } else if (equilibrio < 10) {
    verdict = "ROI bajo — " + equilibrio.toFixed(1) + " años para recuperar";
    verdictClass = "red"; emoji = "🔴";
  } else {
    verdict = "ROI peligroso — más de 10 años para recuperar";
    verdictClass = "red"; emoji = "🔴";
  }

  document.getElementById("result-empty").classList.add("hidden");
  document.getElementById("result-content").classList.remove("hidden");

  const banner = document.getElementById("verdict-banner");
  banner.className = "verdict-banner " + verdictClass;
  document.getElementById("verdict-emoji").textContent = emoji;
  document.getElementById("verdict-text").textContent  = verdict;

  document.getElementById("res-costo").textContent      = fmt(costo);
  document.getElementById("res-equilibrio").textContent = equilibrio.toFixed(1) + " años";
  document.getElementById("res-roi5").textContent       = fmt(roi5);
  document.getElementById("res-roi10").textContent      = fmt(roi10);

  const barPct = Math.min((equilibrio / 10) * 100, 100);
  const barColor = equilibrio < 3 ? "#1D9E75" : equilibrio < 6 ? "#BA7517" : "#E24B4A";
  document.getElementById("roi-bar").style.width      = barPct + "%";
  document.getElementById("roi-bar").style.background = barColor;
}

function getVerdict(eq) {
  if (eq < 1)  return { text: "Excepcional", cls: "green" };
  if (eq < 3)  return { text: "Bueno",       cls: "green" };
  if (eq < 6)  return { text: "Moderado",    cls: "amber" };
  if (eq < 10) return { text: "Bajo",        cls: "red"   };
  return              { text: "Peligroso",   cls: "red"   };
}

function loadComparador() {
  const examples = [
    { title: "UNMSM",       sub: "Ing. Sistemas — Pública", pension: 200,  costo: 6000,  salario: 4200, eq: 0.1 },
    { title: "PUCP",        sub: "Economía — Privada cara", pension: 2500, costo: 150000,salario: 5183, eq: 2.4 },
    { title: "UPC",         sub: "Comunicaciones — Privada",pension: 2800, costo: 168000,salario: 2028, eq: 6.9 },
  ];
  const container = document.getElementById("comparador-table");
  container.innerHTML = `<div class="comp-grid">${examples.map(e => {
    const v = getVerdict(e.eq);
    const roi10 = e.salario * (((1.05) ** 10 - 1) / 0.05) * 12 - e.costo;
    return `
      <div class="comp-card">
        <div class="comp-card-header">
          <div class="comp-card-title">${e.title}</div>
          <div class="comp-card-sub">${e.sub}</div>
        </div>
        <div class="comp-card-body">
          <div class="comp-row"><span class="comp-row-label">Pensión/mes</span><span class="comp-row-value">S/ ${e.pension.toLocaleString()}</span></div>
          <div class="comp-row"><span class="comp-row-label">Costo total</span><span class="comp-row-value">S/ ${e.costo.toLocaleString()}</span></div>
          <div class="comp-row"><span class="comp-row-label">Salario egreso</span><span class="comp-row-value">S/ ${e.salario.toLocaleString()}/mes</span></div>
          <div class="comp-row"><span class="comp-row-label">Punto equilibrio</span><span class="comp-row-value">${e.eq.toFixed(1)} años</span></div>
          <div class="comp-row"><span class="comp-row-label">ROI 10 años</span><span class="comp-row-value">S/ ${Math.round(roi10).toLocaleString()}</span></div>
          <div class="comp-verdict ${v.cls}">${v.text === "Excepcional" ? "🟢" : v.cls === "green" ? "🟢" : v.cls === "amber" ? "🟡" : "🔴"} ${v.text}</div>
        </div>
      </div>`;
  }).join("")}</div>`;
}

let currentFilter = "all";

function filterData(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderTable();
}

function renderTable() {
  const body = document.getElementById("data-body");
  const filtered = DB.filter(row => {
    if (currentFilter === "publica") return row.tipo === "publica";
    if (currentFilter === "privada") return row.tipo !== "publica";
    if (currentFilter === "green")   return row.roi === "green";
    if (currentFilter === "red")     return row.roi === "red";
    return true;
  });

  body.innerHTML = filtered.map(row => {
    const badgeCls = row.tipo === "publica" ? "badge-pub" : row.tipo === "premium" ? "badge-prem" : "badge-priv";
    const badgeTxt = row.tipo === "publica" ? "Pública" : row.tipo === "premium" ? "Premium" : "Privada";
    const bgColor  = row.roi === "green" ? "rgba(234,243,222,0.4)" : row.roi === "red" ? "rgba(250,236,231,0.4)" : "";
    const v = getVerdict(row.eq);
    return `
      <tr style="background:${bgColor}">
        <td style="font-weight:500">${row.uni}</td>
        <td><span class="badge ${badgeCls}">${badgeTxt}</span></td>
        <td>${row.carrera}</td>
        <td>S/ ${row.pension.toLocaleString()}</td>
        <td>S/ ${row.costo.toLocaleString()}</td>
        <td>S/ ${row.salario.toLocaleString()}</td>
        <td style="font-weight:600;color:${row.eq < 3 ? '#0F6E56' : row.eq < 6 ? '#854F0B' : '#993C1D'}">${row.eq.toFixed(1)} años</td>
        <td><span class="roi-chip ${v.cls}">${v.text === "Excepcional" ? "🟢" : v.cls === "green" ? "🟢" : v.cls === "amber" ? "🟡" : "🔴"} ${v.text}</span></td>
      </tr>`;
  }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  updateMeses();
  renderTable();
});
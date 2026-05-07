import { getAnalyticsData } from "@/lib/analyticsData";
import { BarChart3, MapPin, Activity, Users, Globe, Smartphone, MousePointer2, Clock } from "lucide-react";

export default async function AnalyticsPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const data = await getAnalyticsData(searchParams.vendedor);
  const rows = data.rows || [];

  const totalVisitas = rows.reduce((acc: number, row: any) => acc + Number(row.metricValues[1].value), 0) || 0;
  const ciudades = processGroupedData(rows, 0);
  const canales = processGroupedData(rows, 2);
  const dispositivos = processGroupedData(rows, 3);
  const avgEngagement = rows.length > 0 ? (rows.reduce((acc: number, row: any) => acc + Number(row.metricValues[3].value), 0) / rows.length * 100).toFixed(1) : 0;
  const avgTime = rows.length > 0 ? Math.floor(rows.reduce((acc: number, row: any) => acc + Number(row.metricValues[2].value), 0) / rows.length / 60) : 0;

  return (
    <div className="space-y-8">
      <div className="inline-flex items-center gap-3 border-b-2 border-slate-400 pb-2">
        <BarChart3 size={24} className="text-slate-500" />
        <h2 className="text-xl font-black uppercase tracking-tight text-slate-800">Métricas de Audiencia</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <Users size={80} className="absolute -right-4 -bottom-6 text-slate-500/10" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest relative z-10">Visitas totales (30 días)</p>
          <h2 className="text-4xl font-black text-slate-800 mt-1 relative z-10">{totalVisitas.toLocaleString()}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <Activity size={80} className="absolute -right-4 -bottom-6 text-slate-500/10" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Tendencia de actividad</p>
          <div className="relative z-10 h-16 flex items-end">
            <SimpleLineChart rows={rows} />
          </div>
        </div>
      </div>

      {/* CIUDADES ESTILO COMPARATIVA */}
      <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden">
        <div className="bg-slate-900 p-4 flex items-center gap-2">
          <MapPin size={16} className="text-white" />
          <h3 className="text-xs font-bold text-white uppercase tracking-widest">Principales Ciudades</h3>
        </div>
        <div className="p-6 space-y-5 bg-[#e6dcb7]/10">
          {ciudades.slice(0, 5).map((city: any, i: number) => (
            <div key={i}>
              <div className="flex justify-between text-[10px] font-black uppercase mb-1 text-slate-600">
                <span>{city.name}</span>
                <span>{city.count} visitas</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div style={{ width: `${(city.count / (ciudades[0]?.count || 1)) * 100}%` }} className="h-full bg-slate-600" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NUEVA SECCIÓN SEO (ABAJO) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 uppercase text-xs tracking-widest border-b border-slate-100 pb-2">
            <Globe size={16} className="text-slate-500" /> Origen del Tráfico
          </h3>
          <div className="space-y-4">
            {canales.map((c: any, i: number) => (
              <div key={i} className="border-b border-slate-50 pb-3 last:border-0">
                <div className="flex justify-between text-[10px] font-black uppercase mb-1">
                  <span className="text-slate-700">{translateChannel(c.name)}</span>
                  <span className="text-slate-900">{c.count}</span>
                </div>
                <p className="text-[9px] text-slate-400 italic leading-tight">{getChannelDesc(c.name)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600"><Clock size={20}/></div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Tiempo de Permanencia</p>
              <p className="text-xl font-black text-slate-800">{avgTime} min</p>
              <p className="text-[9px] text-slate-400 font-medium">Cuánto tiempo real miran los productos.</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600"><MousePointer2 size={20}/></div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Tasa de Interés</p>
              <p className="text-xl font-black text-slate-800">{avgEngagement}%</p>
              <p className="text-[9px] text-slate-400 font-medium">Porcentaje de gente que interactúa y no se va apenas entra.</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600"><Smartphone size={20}/></div>
            <div className="flex-1">
              <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Dispositivos (Móvil vs PC)</p>
              <div className="flex gap-4">
                {dispositivos.map((d:any, i:number) => (
                  <p key={i} className="text-lg font-black text-slate-800">{d.name === 'mobile' ? '📱' : '💻'} {((d.count / (totalVisitas || 1)) * 100).toFixed(0)}%</p>
                ))}
              </div>
              <p className="text-[9px] text-slate-400 font-medium mt-1">Vital para saber si su tienda se ve bien donde más la usan.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function translateChannel(name: string) {
  const map: any = { 'Organic Search': 'Google Orgánico', 'Direct': 'Tráfico Directo', 'Organic Social': 'Redes Sociales', 'Referral': 'Referidos' };
  return map[name] || name;
}
function getChannelDesc(name: string) {
  if (name === 'Organic Search') return "Para saber cuánta gente llega por Google sin pagar.";
  if (name === 'Direct') return "Clientes que entran directo por el link.";
  if (name === 'Organic Social') return "Vistas desde Instagram o Facebook.";
  return "Otras fuentes externas.";
}
function processGroupedData(rows: any[], dimIndex: number) {
  const map: any = {};
  rows?.forEach(row => {
    const name = row.dimensionValues[dimIndex].value;
    const count = Number(row.metricValues[0].value);
    if(name !== '(not set)') map[name] = (map[name] || 0) + count;
  });
  return Object.entries(map).map(([name, count]) => ({ name, count: count as number })).sort((a, b) => b.count - a.count);
}
function SimpleLineChart({ rows }: { rows: any[] }) {
  if (!rows || rows.length < 2) return <div className="text-slate-300 text-[10px]">Cargando...</div>;
  const points = rows.slice(-10).map((r, i) => `${i * 45},${60 - (Number(r.metricValues[0].value) * 2)}`).join(" ");
  return <svg viewBox="0 0 400 70" className="w-full h-full stroke-slate-400 fill-none stroke-3"><polyline points={points} strokeLinejoin="round" strokeLinecap="round" /></svg>;
}
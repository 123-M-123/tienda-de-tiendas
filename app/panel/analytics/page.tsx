import { getAnalyticsData } from "@/lib/analyticsData";
import { BarChart3, MapPin, Activity, Users, Globe, Smartphone, MousePointer2, Clock } from "lucide-react";

export default async function AnalyticsPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const data = await getAnalyticsData(searchParams.vendedor);
  const rows = data.rows || [];

  // 1. TOTAL ABSOLUTO (La base para todos los cálculos)
  const totalVisitas = rows.reduce((acc: number, row: any) => acc + Number(row.metricValues[1].value), 0) || 0;
  
  // 2. PROCESAMIENTO CON TOTAL REAL (Garantiza el 100%)
  const ciudades = processGroupedData(rows, 0);
  const canales = processGroupedData(rows, 2);
  const dispositivos = processGroupedData(rows, 3);
  
  const avgEngagement = rows.length > 0 
    ? (rows.reduce((acc: number, row: any) => acc + Number(row.metricValues[3].value), 0) / rows.length * 100).toFixed(1) 
    : "0";
    
  const avgTime = rows.length > 0 
    ? Math.floor(rows.reduce((acc: number, row: any) => acc + Number(row.metricValues[2].value), 0) / rows.length / 60) 
    : 0;

  return (
    <div className="space-y-8">
      <div className="inline-flex items-center gap-3 border-b-2 border-black pb-2">
        <BarChart3 size={24} className="text-slate-600" />
        <h2 className="text-xl font-black uppercase tracking-tight text-black">Métricas de Audiencia</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#faf7ed] p-6 rounded-xl border border-black shadow-lg relative overflow-hidden group">
          <Users size={110} className="absolute -right-4 -bottom-6 text-slate-900/20" />
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest relative z-10">Visitas totales (30 días)</p>
          <h2 className="text-4xl font-black text-black mt-1 relative z-10">{totalVisitas.toLocaleString()}</h2>
        </div>

        <div className="bg-[#faf7ed] p-6 rounded-xl border border-black shadow-lg relative overflow-hidden">
          <Activity size={110} className="absolute -right-4 -bottom-6 text-slate-900/20" />
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Tendencia de actividad</p>
          <div className="relative z-10 h-16 flex items-end"><SimpleLineChart rows={rows} /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        {/* CIUDADES */}
        <div className="rounded-xl border border-black shadow-xl overflow-hidden bg-[#faf7ed]">
          <div className="bg-slate-900 p-4 flex items-center gap-2">
            <MapPin size={16} className="text-white" />
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Principales Ciudades</h3>
          </div>
          <div className="p-6 space-y-5">
            {ciudades.slice(0, 5).map((city: any, i: number) => (
              <div key={i}>
                <div className="flex justify-between text-[10px] font-black uppercase mb-1 text-black">
                  <span>{city.name}</span>
                  <span>{city.count} visitas</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 border border-black/10 rounded-full overflow-hidden">
                  <div style={{ width: `${(city.count / (totalVisitas || 1)) * 100}%` }} className="h-full bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DISPOSITIVOS (FIX 100%) */}
        <div className="space-y-4">
          <StatCardSmall title="Tiempo de Permanencia" value={`${avgTime} min`} desc="Cuánto tiempo real miran los productos." icon={<Clock size={20}/>} />
          <div className="p-5 rounded-xl border border-black shadow-lg bg-[#faf7ed] flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white"><Smartphone size={20}/></div>
            <div className="flex-1">
              <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Dispositivos</p>
              <div className="flex gap-6">
                {dispositivos.map((d:any, i:number) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-lg font-black text-black">
                      {d.name.toLowerCase() === 'mobile' ? '📱' : '💻'} {((d.count / totalVisitas) * 100).toFixed(0)}%
                    </span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">{d.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helpers... (SimpleLineChart, StatCardSmall, processGroupedData se mantienen igual)
function StatCardSmall({ title, value, desc, icon }: any) {
  return (
    <div className="p-5 rounded-xl border border-black shadow-lg bg-[#faf7ed] flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">{icon}</div>
      <div>
        <p className="text-[9px] font-black text-slate-500 uppercase mb-1">{title}</p>
        <p className="text-xl font-black text-black">{value}</p>
        <p className="text-[9px] text-slate-500 font-bold italic">{desc}</p>
      </div>
    </div>
  );
}

function processGroupedData(rows: any[], dimIndex: number) {
  const map: any = {};
  rows?.forEach(row => {
    const name = row.dimensionValues[dimIndex].value;
    const count = Number(row.metricValues[1].value); // Usamos screenPageViews para coherencia
    if(name !== '(not set)') map[name] = (map[name] || 0) + count;
  });
  return Object.entries(map).map(([name, count]) => ({ name, count: count as number })).sort((a, b) => b.count - a.count);
}

function SimpleLineChart({ rows }: { rows: any[] }) {
  if (!rows || rows.length < 2) return <div className="text-slate-400 text-[10px]">Cargando historial...</div>;
  const points = rows.slice(-10).map((r, i) => `${i * 45},${60 - (Number(r.metricValues[1].value) * 0.1)}`).join(" ");
  return <svg viewBox="0 0 400 70" className="w-full h-full stroke-black fill-none stroke-2"><polyline points={points} strokeLinejoin="round" strokeLinecap="round" /></svg>;
}
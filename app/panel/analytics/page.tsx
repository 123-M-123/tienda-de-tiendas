import { getAnalyticsData } from "@/lib/analyticsData";
import { BarChart3, MapPin, TrendingUp, Users, Activity } from "lucide-react";

export default async function AnalyticsPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const data = await getAnalyticsData(searchParams.vendedor);
  const totalVisitas = data.rows?.reduce((acc: number, row: any) => acc + Number(row.metricValues[1].value), 0) || 0;
  const ciudades = processCities(data.rows);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Métricas de Audiencia</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Visitas */}
        <div className="bg-white p-6 rounded-4xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <Users size={100} className="absolute -right-4 -bottom-6 text-blue-500/10 group-hover:scale-110 transition-transform" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest relative z-10">Visitas totales (30 días)</p>
          <h2 className="text-4xl font-black text-blue-600 mt-1 relative z-10">{totalVisitas.toLocaleString()}</h2>
          <div className="flex items-center gap-2 mt-3 text-emerald-600 font-bold text-[10px] uppercase relative z-10">
            <TrendingUp size={14} /> <span>Tráfico verificado</span>
          </div>
        </div>

        {/* Card Tendencia */}
        <div className="bg-white p-6 rounded-4xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <Activity size={100} className="absolute -right-4 -bottom-6 text-slate-500/10 group-hover:scale-110 transition-transform" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Tendencia de actividad</p>
          <div className="relative z-10 h-16 flex items-end">
            <SimpleLineChart rows={data.rows} />
          </div>
        </div>
      </div>

      {/* Ciudades */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 pb-4 border-b border-slate-50 flex items-center gap-2">
          <MapPin size={18} className="text-blue-600" />
          <h3 className="font-bold text-slate-800">Principales Ciudades</h3>
        </div>
        <div className="p-8 space-y-6">
          {ciudades.length > 0 ? (
            ciudades.slice(0, 5).map((city: any, i: number) => (
              <div key={i}>
                <div className="flex justify-between text-[11px] font-bold uppercase mb-2 text-slate-500">
                  <span>{city.name}</span>
                  <span className="text-blue-600">{city.count} visitas</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${(city.count / ciudades[0].count) * 100}%` }} 
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-10 text-slate-400 text-sm italic">Sin datos de ubicación.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function SimpleLineChart({ rows }: { rows: any[] }) {
  if (!rows || rows.length < 2) return <div className="text-slate-300 text-[10px]">Cargando historial...</div>;
  const points = rows.slice(-10).map((r, i) => `${i * 45},${60 - (Number(r.metricValues[0].value) * 2)}`).join(" ");
  return (
    <svg viewBox="0 0 400 70" className="w-full h-full stroke-blue-600 fill-none stroke-4">
      <polyline points={points} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function processCities(rows: any[]) {
  const cityMap: any = {};
  rows?.forEach(row => {
    const name = row.dimensionValues[0].value;
    const count = Number(row.metricValues[1].value);
    if(name !== '(not set)') cityMap[name] = (cityMap[name] || 0) + count;
  });
  return Object.entries(cityMap).map(([name, count]) => ({ name, count: count as number })).sort((a, b) => b.count - a.count);
}
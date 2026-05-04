import { getAnalyticsData } from "@/lib/analyticsData";
import { BarChart3, MapPin, TrendingUp, Users } from "lucide-react";

export default async function AnalyticsPage({ 
  searchParams 
}: { 
  searchParams: { vendedor?: string } 
}) {
  // Pasamos el vendedor seleccionado a la función de Analytics
  const data = await getAnalyticsData(searchParams.vendedor);
  
  const totalVisitas = data.rows?.reduce((acc: number, row: any) => acc + Number(row.metricValues[1].value), 0) || 0;
  const ciudades = processCities(data.rows);

  return (
    <div className="space-y-8">
      <div className="inline-flex items-center gap-3 border-b-4 border-[#E63946] pb-2">
        <BarChart3 size={32} className="text-[#E63946]" />
        <h2 className="text-2xl font-black uppercase">Métricas de Audiencia</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Principal */}
        <div className="bg-white border-2 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
          <Users className="absolute -right-4 -bottom-4 text-gray-50 group-hover:text-[#F4EFE0] transition-colors" size={140} />
          <p className="text-xs font-black uppercase text-gray-400 tracking-widest relative z-10">Visitas totales (30 días)</p>
          <h2 className="text-6xl font-black text-[#E63946] mt-2 relative z-10">{totalVisitas.toLocaleString()}</h2>
          <div className="flex items-center gap-2 mt-4 text-[#1A7F5A] font-bold text-sm relative z-10">
            <TrendingUp size={16} /> <span>Tráfico en tiempo real</span>
          </div>
        </div>

        {/* Gráfico de Línea Simple (SVG) */}
        <div className="bg-white border-2 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <p className="text-xs font-black uppercase mb-4 text-gray-400 tracking-widest">Tendencia de actividad</p>
          <div className="flex-1 flex items-end">
            <SimpleLineChart rows={data.rows} />
          </div>
        </div>
      </div>

      {/* Ranking de Ciudades */}
      <div className="bg-white border-2 border-black p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-lg font-black uppercase mb-8 flex items-center gap-2">
          <MapPin className="text-[#E63946]" size={20} /> Principales Ciudades
        </h3>
        <div className="space-y-8">
          {ciudades.length > 0 ? (
            ciudades.slice(0, 5).map((city: any, i: number) => (
              <div key={i}>
                <div className="flex justify-between text-sm font-black uppercase mb-2">
                  <span>{city.name}</span>
                  <span className="text-[#E63946]">{city.count} visitas</span>
                </div>
                <div className="w-full h-6 bg-[#F4EFE0] border-2 border-black overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <div 
                    style={{ width: `${(city.count / ciudades[0].count) * 100}%` }} 
                    className="h-full bg-[#E63946] border-r-2 border-black"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-10 text-gray-400 italic">No hay suficientes datos de ubicación todavía.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// --- FUNCIONES AUXILIARES ---

function SimpleLineChart({ rows }: { rows: any[] }) {
  if (!rows || rows.length < 2) return <div className="w-full text-center text-gray-300 text-xs">Esperando más datos...</div>;
  const points = rows.slice(-10).map((r, i) => `${i * 40},${100 - (Number(r.metricValues[0].value) * 2)}`).join(" ");
  return (
    <svg viewBox="0 0 400 100" className="w-full h-28 stroke-[#E63946] fill-none stroke-4">
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
  return Object.entries(cityMap)
    .map(([name, count]) => ({ name, count: count as number }))
    .sort((a, b) => b.count - a.count);
}
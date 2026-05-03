import { getAnalyticsData } from "@/lib/analyticsData";

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();
  
  // Procesamos los datos de forma simple para la vista
  const totalVisitas = data.rows?.reduce((acc: number, row: any) => acc + Number(row.metricValues[1].value), 0) || 0;
  const ciudades = processCities(data.rows);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Principal */}
        <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase text-gray-500">Visitas totales (30 días)</p>
          <h2 className="text-5xl font-black text-[#E63946]">{totalVisitas.toLocaleString()}</h2>
          <p className="text-sm mt-2 text-gray-400 font-medium italic">Tráfico real verificado</p>
        </div>

        {/* Gráfico de Línea Simple (SVG) */}
        <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <p className="text-xs font-black uppercase mb-4 text-gray-500">Tendencia de actividad</p>
          <SimpleLineChart rows={data.rows} />
        </div>
      </div>

      {/* Ranking de Ciudades con barras de progreso CSS */}
      <div className="bg-white border-2 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-lg font-black uppercase mb-6 border-b-2 border-black pb-2">📍 Principales Ciudades</h3>
        <div className="space-y-6">
          {ciudades.slice(0, 5).map((city: any, i: number) => (
            <div key={i}>
              <div className="flex justify-between text-sm font-bold mb-1">
                <span>{city.name}</span>
                <span>{city.count} visitas</span>
              </div>
              <div className="w-full h-4 bg-[#F4EFE0] border border-black overflow-hidden">
                <div 
                  style={{ width: `${(city.count / ciudades[0].count) * 100}%` }} 
                  className="h-full bg-[#E63946]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- COMPONENTES AUXILIARES SIMPLES ---

function SimpleLineChart({ rows }: { rows: any[] }) {
  if (!rows) return null;
  // Extraemos puntos para el gráfico (muy simplificado)
  const points = rows.slice(-10).map((r, i) => `${i * 40},${100 - (Number(r.metricValues[0].value) / 2)}`).join(" ");

  return (
    <svg viewBox="0 0 400 100" className="w-full h-24 stroke-[#E63946] fill-none stroke-3">
      <polyline points={points} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function processCities(rows: any[]) {
  const cityMap: any = {};
  rows?.forEach(row => {
    const name = row.dimensionValues[0].value;
    const count = Number(row.metricValues[1].value);
    cityMap[name] = (cityMap[name] || 0) + count;
  });
  return Object.entries(cityMap)
    .map(([name, count]) => ({ name, count: count as number }))
    .sort((a, b) => b.count - a.count);
}
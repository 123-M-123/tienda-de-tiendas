import { NextResponse } from 'next/server';
import { getPanelData } from '@/lib/panelData';
import { slugify } from '@/lib/utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const vendedor = searchParams.get('vendedor');

  try {
    const productos = await getPanelData("Carga de productos", vendedor || undefined);
    
    const catMap = new Map();
    productos.forEach(row => {
      const label = row[6]; // Columna G
      if (label && label.trim() !== "") {
        const slug = slugify(label);
        if (!catMap.has(slug)) {
          catMap.set(slug, { label: label.trim(), slug, tipo: 'general' });
        }
      }
    });

    return NextResponse.json(Array.from(catMap.values()));
  } catch (error) {
    return NextResponse.json([]);
  }
}
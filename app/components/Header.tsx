export default function Header() {
  return (
    <header className="w-full flex justify-between items-center px-6 py-4 border-b">
      
      <div className="font-bold text-xl">
        Tienda de Tiendas
      </div>

      <nav className="hidden md:flex gap-6 text-sm">
        <a href="#beneficios" className="hover:opacity-70">Beneficios</a>
        <a href="#como-funciona" className="hover:opacity-70">Cómo funciona</a>
        <a href="#comparacion" className="hover:opacity-70">Comparación</a>
      </nav>

      <a
        href="https://wa.me/XXXXXXXXXXX"
        className="bg-black text-white px-4 py-2 rounded-xl text-sm"
      >
        Empezar gratis
      </a>
    </header>
  );
}
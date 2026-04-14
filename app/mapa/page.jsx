import { comparativas } from "../../data/comparativas";

export default function Mapa() {
  return (
    <div>
      <h1>Mapa de páginas</h1>
      <ul>
        {comparativas.map((c) => (
          <li key={c.slug}>
            <a href={`/comparador/${c.slug}`}>
              {c.slug}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
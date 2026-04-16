export default function TestPage() {
  return (
    <div style={{ padding: 40 }}>
      <h1>TEST INPUT</h1>

      <input placeholder="escribí acá" style={{ border: "1px solid black", padding: 10 }} />

      <br /><br />

      <label>
        <input type="checkbox" /> checkbox
      </label>
    </div>
  );
}
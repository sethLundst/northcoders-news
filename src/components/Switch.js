import "../styles/Switch.css";

export default function Switch({ state, setState }) {
  function handleChange() {
    setState(state);
  }
  return (
    <label className="switch">
      <input id="cb" type="checkbox" checked={state} onChange={handleChange} />
      <span className="slider" />
    </label>
  );
}

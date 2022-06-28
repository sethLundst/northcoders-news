import { Logo } from "../icons";
import "../styles/Loading.css";

function Loading() {
  return (
    <div className="loading-screen">
      <Logo className="loading-logo" alt="logo" />
      <p className="loading">Loading</p>
    </div>
  );
}

export default Loading;

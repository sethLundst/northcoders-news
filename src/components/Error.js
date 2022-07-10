import "../styles/Error.css";
import { Logo } from "../icons";
import { useNavigate } from "react-router-dom";

function Error({ message }) {
  const navigate = useNavigate();
  return (
    <div className="error">
      <Logo className="error-logo" />
      <div className="error-code">{message ? message.status : 404}</div>
      <div className="error-message">
        Oops! {message ? message.data.msg : "Page not found"}
      </div>
      <div>
        <button
          className="error-button"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default Error;

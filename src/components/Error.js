import "./Error.css";
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
      <button
        className="back-button"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
      <button
        className="back-button"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
    </div>
  );
}

export default Error;

import { useNavigate, Link } from "react-router-dom";
import Cookie from "js-cookie";

import "./index.css";

const Header = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookie.remove("jwt_token");
    navigate("/login");
  };

  return (
    <nav className="header-container">
      <Link to="/start">
        <img
          src="../../../static/images/Logo.png"
          alt="Logo"
          className="header-logo"
        />
      </Link>
      <button className="header-button" onClick={onClickLogout}>
        <img
          src="../../../static/images/log-out.png"
          alt="Logout"
          className="logout-icon"
        />
        <p className="logout-text">Logout</p>
      </button>
    </nav>
  );
};

export default Header;

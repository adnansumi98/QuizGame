import "./index.css";

const Header = () => {
  // TODO: implement Log out functionality in react context

  return (
    <div className="header-container">
      <img
        src="../../../static/images/Logo.png"
        alt="Logo"
        className="header-logo"
      />
      <button className="header-button" onClick={() => console.log("clicked")}>
        <img
          src="../../../static/images/log-out.png"
          alt="Logout"
          className="logout-icon"
        />
        <p className="logout-text">Logout</p>
      </button>
    </div>
  );
};

export default Header;

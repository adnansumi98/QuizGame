import { useState } from "react";
import Cookies from "js-cookie";
import "./index.css";
import { useNavigate } from "react-router-dom";

const apiConstants = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const onchangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const onchangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onchangeShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitLoginForm = async (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    try {
      const response = await fetch(
        "http://localhost:3001/proxy-login",
        options,
      );
      // const response = await fetch('https://apis.ccbp.in/login', options);
      const data = await response.json();

      if (data.jwt_token) {
        Cookies.set("jwt_token", data.jwt_token, { expires: 30 });
        navigate("/");
      }
    } catch (error) {
      console.error("Error occcured while logging in: " + error);
    }
  };

  return (
    <div className="login-conatiner">
      <form className="login-form" onSubmit={onSubmitLoginForm}>
        <img
          className="login-logo"
          src="../../../static/images/Logo.png"
          alt="Logo"
        />
        <label className="login-label" htmlFor="userName">
          USERNAME
        </label>
        <input
          className="login-input"
          type="text"
          id="userName"
          value={username}
          onChange={onchangeUsername}
        />
        <label className="login-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="login-input"
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={onchangePassword}
        />

        <div className="showpassword-container">
          <input
            className="showpassword-label"
            type="checkbox"
            id="toggleShowPassword"
            checked={showPassword}
            onChange={onchangeShowPassword}
          />
          <label className="showpassword-label" htmlFor="toggleShowPassword">
            Show Password
          </label>
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

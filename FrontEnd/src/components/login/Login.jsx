import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login({ setUser }) {
  const [userType, setUserType] = useState("student");
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const navigate = useNavigate();

  function funLogin(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passRef.current.value;

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    
    setUser({ userType, email });
    navigate("/display");
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>

        <div className="user-type-tabs">
          <button
            type="button"
            className={userType === "student" ? "active" : ""}
            onClick={() => setUserType("student")}
          >
            Student
          </button>
          <button
            type="button"
            className={userType === "admin" ? "active" : ""}
            onClick={() => setUserType("admin")}
          >
            Admin
          </button>
        </div>

        <form className="login-form" onSubmit={funLogin}>
          <label>
            Email:
            <input type="text" placeholder="Enter your email" ref={emailRef} />
          </label>

          <label>
            Password:
            <input type="password" placeholder="Enter your password" ref={passRef} />
          </label>

          <button type="submit" className="login-btn">
            Login as {userType.charAt(0).toUpperCase() + userType.slice(1)}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
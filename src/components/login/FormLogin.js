import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormLogin() {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [tempUsername, setTempUsername] = useState("admin@gmail.com");
  const [tempPassword, setTempPassword] = useState("123");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Sử dụng useNavigate thay cho useHistory

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (formData.email === tempUsername && formData.password === tempPassword) {
      setIsLoggedIn(true);
      console.log("Login successful");
      // Redirect to Home page
      navigate("/home"); // Sử dụng navigate thay cho history.push
    } else {
      console.log("Invalid username or password");
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Register Form Data:", formData);
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <h1>Sign In</h1>
      ) : (
        <>
          <div
            className={`form-container ${
              activeTab === "login" ? "login-container" : "register-container"
            }`}
          >
            <form
              onSubmit={
                activeTab === "login" ? handleLoginSubmit : handleRegisterSubmit
              }
            >
              <img
                style={{ width: "80px", height: "80px" }}
                src="https://cdn.haitrieu.com/wp-content/uploads/2022/12/Icon-Truong-Dai-hoc-Greenwich-Viet-Nam.png"
                alt=""
              />
              <h2 style={{ color: "Highlight" }}>Welcome to GreenWich Blog</h2>
              <h1>{activeTab === "login" ? "Sign In" : "Sign Up"}</h1>
              {activeTab === "register" && (
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {activeTab === "register" && (
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              )}
              <button type="submit">
                {activeTab === "login" ? "Sign In" : "Sign Up"}
              </button>
            </form>
            {activeTab === "login" ? (
              <p>
                Don't have an account?{" "}
                <span
                  className="tab-link"
                  onClick={() => handleTabChange("register")}
                >
                  Sign Up
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span
                  className="tab-link"
                  onClick={() => handleTabChange("login")}
                >
                  Sign In
                </span>
              </p>
            )}
            {activeTab === "login" && (
              <p>
                <span
                  className="tab-link"
                  onClick={() => handleTabChange("forgot")}
                >
                  Forgot Password?
                </span>
              </p>
            )}
          </div>
          <img
            style={{ width: "400px", height: "600px" }}
            src="https://i.pinimg.com/originals/1b/c8/53/1bc853096d57c63b2055fc0bbf30dd30.jpg"
            alt=""
          />
        </>
      )}
    </div>
  );
}

export default FormLogin;

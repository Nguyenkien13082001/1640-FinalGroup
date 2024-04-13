import React, { useEffect, useState } from "react";
import logo from "../../img/logoE.png";

// import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { ToastContainer, toast } from "react-toastify";
import { format } from "date-fns";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function FormLogin() {
  const [activeTab, setActiveTab] = useState("login");
  const [faculties, setFaculties] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    faculty: "",
  });

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    // Truy vấn API để lấy danh sách các khoa
    const fetchFaculties = async () => {
      try {
        const response = await apiClient.get(
          "https://magazine-web-670c.onrender.com/all-faculty"
        );

        setFaculties(response.data);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };
    fetchFaculties();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFacultyChange = (event) => {
    setFormData({ ...formData, faculty: event.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post(
        "https://magazine-web-670c.onrender.com/login",
        formData
      );
      // console.log(response.data.user.accessToken);
      if (
        response.data.user.role === "user" ||
        response.data.user.role === "student"
      ) {
        localStorage.setItem("accessToken", response.data.user.accessToken);
        localStorage.setItem("role", response.data.user.role);
        localStorage.setItem("user_id", response.data.user._id);
        setIsLoggedIn(true);
        navigate("/home");
        toast.success("Login successful!");
        console.log("Login successful!");
      } else {
        console.log("Email or Password incorect!");
        // Xử lý logic khi đăng nhập không thành công
        toast.error("Email or Password incorect!");
      }
    } catch (error) {
      // Xử lý lỗi tại đây
      toast.error("Email or Password incorect!");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (formData.confirmPassword !== formData.password) {
      toast.error("mat khau k trung");
    } else {
      try {
        const response = await apiClient.post(
          "https://magazine-web-670c.onrender.com/register  ",
          formData
        );
        if (response) {
          toast.success("Create account success!");
          setActiveTab("login");
        } else {
          // Xử lý logic khi đăng nhập không thành công
          toast.error("Register isnt success!");
        }
      } catch (error) {
        console.log(error);
        // Xử lý lỗi tại đây
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <div className="container ">
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
            id="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
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
          {activeTab === "register" && (
            <select
              name="faculty"
              value={formData.faculty}
              onChange={handleFacultyChange}
              required
            >
              <option value="">Select Faculty</option>

              {faculties.length != 0 &&
                faculties?.map((faculty) => {
                  return (
                    <option value={faculty._id}>{faculty.faculty_name}</option>
                  );
                })}
            </select>
          )}

          <button style={{ marginTop: "10px" }} type="submit">
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
            <span className="tab-link" onClick={() => handleTabChange("login")}>
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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link to="/Guest">
            <button
              style={{
                width: "200px",
                height: "40px",
                marginTop: "30px",
                borderRadius: "4%",
              }}
            >
              Log in as guest
            </button>
          </Link>
        </div>
      </div>

      <img
        style={{ width: "400px", height: "600px" }}
        src="https://i.pinimg.com/originals/1b/c8/53/1bc853096d57c63b2055fc0bbf30dd30.jpg"
        alt=""
      />
    </div>
  );
}

export default FormLogin;

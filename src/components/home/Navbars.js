import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdEventAvailable } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
    localStorage.removeItem("name");

    window.location.href = "/";
  };

  return (
    <div className={`header ${isOpen ? "open" : ""}`}>
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className="menu-icon"></div>
        <div className="menu-icon"></div>
        <div className="menu-icon"></div>
      </div>
      <div className="menu-items">
        <NavItem
          isOpen={isOpen}
          imageSrc=<AiOutlineHome className="seticon" />
          text="Home"
          to="/home"
        />
        <NavItem
          isOpen={isOpen}
          imageSrc=<CgProfile className="seticon" />
          text="Profile"
          to="/profile"
        />
        <NavItem
          isOpen={isOpen}
          imageSrc=<MdEventAvailable className="seticon" />
          text="List Event"
          to="/ListEvent"
        />

        <NavItem
          isOpen={isOpen}
          imageSrc=<AiOutlineLogout className="seticon" />
          text="Logout"
          onClick={handleLogout}
        ></NavItem>
      </div>
    </div>
  );
};

const NavItem = ({ isOpen, imageSrc, text, to, onClick }) => {
  return (
    <div className="nav-item" style={{ cursor: "pointer" }}>
      {isOpen ? (
        <Link to={to} onClick={onClick}>
          {imageSrc}
          <span>{text}</span>
        </Link>
      ) : (
        <Link to={to} onClick={onClick}>
          {imageSrc}
        </Link>
      )}
    </div>
  );
};

export default Header;

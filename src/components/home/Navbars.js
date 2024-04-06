import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
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
          imageSrc="img/dashboard.svg"
          text="Home"
          to="/home"
        />
        <NavItem
          isOpen={isOpen}
          imageSrc="img/manage user.svg"
          text="Profile"
          to="/profile"
        />
        <NavItem
          isOpen={isOpen}
          imageSrc="img/restaurant.svg"
          text="List Event"
          to="/ListEvent"
        />

        <NavItem
          isOpen={isOpen}
          imageSrc="img/logout.svg"
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
          <img src={imageSrc} alt={text} />
          <span>{text}</span>
        </Link>
      ) : (
        <Link to={to} onClick={onClick}>
          <img src={imageSrc} alt={text} />
        </Link>
      )}
    </div>
  );
};

export default Header;

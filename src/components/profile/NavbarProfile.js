import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "./../../img/logoE.png";
import "./../../style/style.css";

export default function NavbarProfile({ li }) {
  const [window, setWindow] = useState(true);

  return (
    <div>
      <nav className="navbar-menu">
        <ul className="navbar__list p-0">
          {li.map((item, i) => (
            <div className="navbar__li-box" key={i}>
              <img
                src={item[1]}
                alt={item[1]}
                style={{ paddingLeft: window ? 27 : 17 }}
              />
              <li
                className="navbar__li"
                style={{ display: window ? "inline-block" : "none" }}
              >
                {item[0]}
              </li>
            </div>
          ))}
        </ul>
      </nav>
    </div>
  );
}

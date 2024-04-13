import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "./../../img/logoE.png";
import "./../../style/style.css";
import { Link } from "react-router-dom";
import apiClient from "../../api/apiClient"; // Import thư viện gọi API

export default function Header(li) {
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    const posts = document.getElementsByClassName("post");
    for (let i = 0; i < posts.length; i++) {
      const postTitle = posts[i]
        .getElementsByTagName("h6")[0]
        .innerText.toLowerCase();
      if (postTitle.indexOf(search.toLowerCase()) === -1) {
        posts[i].style.display = "none";
      } else {
        posts[i].style.display = "block";
      }
    }
  }, [search]);

  return (
    <div className="Nav ">
      <Navbar
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          left: 0,
          height: "66px",
          backgroundColor: "#f8f9fa",
          fontSize: "16px",
          boxShadow: "1px 1px 5px #333",
          zIndex: 1000,
        }}
      >
        <Container style={{ backgroundColor: "#f8f9fa" }} fluid>
          <Link to="/home">
            {" "}
            <img
              style={{ width: "150px", height: "60px" }}
              src="https://upload.wikimedia.org/wikipedia/vi/b/bf/Official_logo_of_Greenwich_Vietnam.png"
              alt="logo EduSmart"
            />
          </Link>

          <Navbar.Collapse id="navbarScroll">
            <div className="SreachLogin">
              <div>
                <Form className="d-flex">
                  <Form.Control
                    style={{ backgroundColor: "#00ffcd29" }}
                    name="search"
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={handleChange}
                    value={search}
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </div>

              <div
                style={{
                  position: "absolute",
                  right: "10px",
                  bottom: 0,
                  marginBottom: "15px",
                }}
              ></div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

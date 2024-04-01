import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

function InforAcount(props) {
  // Thông tin tài khoản người dùng (có thể đặt từ props hoặc state)
  const { name, email, address, phone } = props.user;

  return (
    <div style={{ marginTop: "100px" }}>
      <div className="user-profile">
        <img
          style={{ height: "100px", width: "100px" }}
          src="https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"
          alt=""
        />
        <h1>User Profile</h1>
        <div className="profile-info">
          <label>Name:</label>
          <span>{name}</span>
        </div>
        <div className="profile-info">
          <label>Email:</label>
          <span>{email}</span>
        </div>
        <div className="profile-info">
          <label>Address:</label>
          <span>{address}</span>
        </div>
        <div className="profile-info">
          <label>Phone:</label>
          <span>{phone}</span>
        </div>
        <div className="button-container">
          <button className="edit-button">Edit Profile</button>
        </div>
      </div>
    </div>
  );
}

export default InforAcount;

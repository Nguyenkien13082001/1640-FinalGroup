import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import "./inforacount.css";
import Editprofile from "./Editprofile";

function InforAcount(props) {
  // Thông tin tài khoản người dùng (có thể đặt từ props hoặc state)
  // const { Username, Email, DoB, Status } = props.user;
  const [Listinfo, setListinfo] = useState({});
  useEffect(() => {
    getInfo();
  }, []);
  const getInfo = async () => {
    try {
      const response = await apiClient.get(
        "https://magazine-web-670c.onrender.com/profile"
      );
      console.log("check", response);
      setListinfo(response.data);
    } catch (error) {}
  };

  const handleUpdateUser = () => {
    getInfo();
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <div className="user-profile">
        <img src={Listinfo.image} alt="" />
        <h1>User Profile</h1>
        <div className="profile-info">
          <label>Name:</label>
          <span>{Listinfo.name}</span>
        </div>
        <div className="profile-info">
          <label>Email:</label>
          <span>{Listinfo.email}</span>
        </div>
        <div className="profile-info">
          <label>Faculty:</label>
          <span>{Listinfo.faculty && Listinfo.faculty.faculty_name}</span>
        </div>
        <div>
          <Editprofile
            user={Listinfo}
            onUpdateUser={handleUpdateUser}
          ></Editprofile>
        </div>
      </div>
    </div>
  );
}

export default InforAcount;

import React from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import "./LogoutGuest.css";

export default function LogoutGuest() {
  return (
    <div>
      <Link to="/">
        <button className="btnsp">
          <Image className="imgsp" src="img/logout.svg" alt="Support" />
        </button>
      </Link>
    </div>
  );
}

import React from "react";
import SliderHome from "../components/home/SliderHome";
import Doc from "../components/home/Doc";
import LayoutHome from "../layouts/LayoutHome";
import "./Home.css";
import LogoutGuest from "../components/home/LogoutGuest";

export default function Guest() {
  return (
    <div>
      <div className="doc-container">
        <LayoutHome>
          <SliderHome />
          <div>
            <Doc></Doc>
          </div>
        </LayoutHome>
      </div>
      <LogoutGuest></LogoutGuest>
    </div>
  );
}

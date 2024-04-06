import React from "react";
import SliderHome from "../components/home/SliderHome";
import Doc from "../components/home/Doc";
import LayoutHome from "../layouts/LayoutHome";
import "./Home.css";

export default function Home() {
  return (
    <div>
      <LayoutHome>
        <SliderHome />
        <div>
          <Doc></Doc>
        </div>
      </LayoutHome>
    </div>
  );
}

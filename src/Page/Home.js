import React from "react";
import SliderHome from "../components/home/SliderHome";
import Doc from "../components/home/Doc";
import LayoutHome from "../layouts/LayoutHome";
const list = [
  { id: 1, name: "Halo" },
  { id: 1, name: "Halo" },
  { id: 1, name: "Halo" },
  { id: 1, name: "Halo" },
  { id: 1, name: "Halo" },
  { id: 1, name: "Halo" },
  { id: 1, name: "Halokdahda" },
  { id: 1, name: "Halo" },
];
export default function Home() {
  const render = () => {
    return list.map((item) => {
      return (
        <div className="col-3 d-flex justify-content-center mb-3">
          <Doc item={item} />
        </div>
      );
    });
  };
  return (
    <LayoutHome>
      <SliderHome />
      <div
        style={{ marginTop: "10px", backgroundColor: "#b3979714" }}
        className="row justify-content-center mx-auto "
      >
        {render()}
      </div>
    </LayoutHome>
  );
}

import React from "react";
import LayoutHome from "../layouts/LayoutHome";
import NavbarProfile from "../components/profile/NavbarProfile";
import InforAcount from "../components/profile/InforAcount";

export default function Profile() {
  return (
    <LayoutHome>
      <div style={{ height: "80vh" }}>
        <InforAcount />
      </div>
    </LayoutHome>
  );
}
